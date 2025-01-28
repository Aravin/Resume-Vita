interface ResumeContent {
  personal?: {
    email?: string;
    phone?: string;
    summary?: string;
    name?: string;
    role?: string;
    location?: string;
  };
  employments?: Array<{
    title?: string;
    company?: string;
    location?: string;
    startDate?: string;
    endDate?: string;
    isCurrent?: boolean;
    summary?: string;
  }>;
  skills?: Array<{
    name?: string;
    level?: string;
  }>;
  educations?: Array<{
    institution?: string;
    subject?: string;
    startDate?: string;
    endDate?: string;
    summary?: string;
  }>;
}

interface ATSScore {
  overall: number;
  details: {
    keywords: number;
    format: number;
    content: number;
  };
  improvements: {
    keywords: string[];
    format: string[];
    content: string[];
  };
}

// Common keywords that ATS systems look for
const COMMON_KEYWORDS: Record<string, string[]> = {
  leadership: ['led', 'managed', 'coordinated', 'supervised', 'directed'],
  achievement: ['achieved', 'delivered', 'improved', 'increased', 'reduced', 'decreased'],
  development: ['developed', 'created', 'designed', 'implemented', 'built', 'engineered'],
  technical: ['node.js', 'react', 'typescript', 'javascript', 'angular', 'express', 'api'],
  soft_skills: ['collaborated', 'communicated', 'problem-solving', 'innovative', 'analytical']
};

// Minimum required lengths
const REQUIREMENTS = {
  SUMMARY_MIN_LENGTH: 100,
  EXPERIENCE_MIN_LENGTH: 50,
  MIN_SKILLS_COUNT: 7
} as const;

// Action verbs to check in experience
const EXPERIENCE_ACTION_VERBS = new Set(['developed', 'managed', 'created']);

export function calculateATSScore(resume: ResumeContent): ATSScore {
  const improvements = {
    keywords: [] as string[],
    format: [] as string[],
    content: [] as string[]
  };

  // Pre-compute commonly used values
  const hasEmployments = Array.isArray(resume.employments) && resume.employments.length > 0;
  const hasSkills = Array.isArray(resume.skills) && resume.skills.length > 0;
  const hasEducation = Array.isArray(resume.educations) && resume.educations.length > 0;
  const resumeText = JSON.stringify(resume).toLowerCase();

  // 1. Keywords scoring (30% of total)
  const keywordsResult = calculateKeywordScore(resumeText, improvements);

  // 2. Format scoring (30% of total)
  const formatResult = calculateFormatScore(
    resume,
    { hasEmployments, hasSkills, hasEducation },
    improvements
  );

  // 3. Content quality scoring (40% of total)
  const contentResult = calculateContentScore(
    resume,
    { hasEmployments, hasSkills, hasEducation },
    improvements
  );

  // Calculate overall score with weighted components
  const overall = Math.round(
    (keywordsResult * 0.3) +
    (formatResult * 0.3) +
    (contentResult * 0.4)
  );

  return {
    overall,
    details: {
      keywords: Math.round(keywordsResult),
      format: Math.round(formatResult),
      content: Math.round(contentResult)
    },
    improvements: {
      keywords: improvements.keywords.length > 0 ? improvements.keywords : ['Your keyword usage is good! Keep using action verbs and industry-specific terms.'],
      format: improvements.format.length > 0 ? improvements.format : ['Your resume format is well-structured!'],
      content: improvements.content.length > 0 ? improvements.content : ['Your content is detailed and well-organized!']
    }
  };
}

function calculateKeywordScore(
  resumeText: string,
  improvements: { keywords: string[] }
): number {
  let totalKeywords = 0;
  let foundKeywords = 0;
  const missingKeywordsByCategory: Record<string, string[]> = {};

  // Check keywords by category
  Object.entries(COMMON_KEYWORDS).forEach(([category, keywords]) => {
    totalKeywords += keywords.length;
    const found = keywords.filter((keyword: string) => resumeText.includes(keyword.toLowerCase()));
    foundKeywords += found.length;
    
    const missing = keywords.filter((keyword: string) => !resumeText.includes(keyword.toLowerCase()));
    if (missing.length > 0) {
      missingKeywordsByCategory[category] = missing;
    }
  });

  // Provide category-specific keyword improvements
  Object.entries(missingKeywordsByCategory).forEach(([category, missing]) => {
    const categoryName = category.replace('_', ' ');
    if (missing.length > 0) {
      improvements.keywords.push(
        `Consider adding more ${categoryName} keywords such as: ${missing.slice(0, 3).join(', ')}`
      );
    }
  });

  return (foundKeywords / totalKeywords) * 100;
}

function calculateFormatScore(
  resume: ResumeContent,
  cached: { hasEmployments: boolean; hasSkills: boolean; hasEducation: boolean },
  improvements: { format: string[] }
): number {
  const formatChecks = {
    contact: Boolean(resume.personal?.email && resume.personal?.phone),
    summary: Boolean(resume.personal?.summary?.trim()),
    experience: cached.hasEmployments,
    skills: cached.hasSkills,
    education: cached.hasEducation
  };

  if (!formatChecks.contact) {
    improvements.format.push('Ensure both email and phone number are included in your contact information');
  }
  if (!formatChecks.summary) {
    improvements.format.push('Add a professional summary that highlights your key achievements and career goals');
  }
  if (!formatChecks.experience) {
    improvements.format.push('Include your work experience with detailed responsibilities and achievements');
  }
  if (!formatChecks.skills) {
    improvements.format.push('List your technical and professional skills with proficiency levels');
  }
  if (!formatChecks.education) {
    improvements.format.push('Add your educational background including degrees and certifications');
  }

  return (Object.values(formatChecks).filter(Boolean).length / Object.keys(formatChecks).length) * 100;
}

function calculateContentScore(
  resume: ResumeContent,
  cached: { hasEmployments: boolean; hasSkills: boolean; hasEducation: boolean },
  improvements: { content: string[] }
): number {
  const summary = resume.personal?.summary?.trim() || '';
  
  const contentChecks = {
    summaryQuality: summary.length >= REQUIREMENTS.SUMMARY_MIN_LENGTH,
    experienceDetail: cached.hasEmployments ? checkExperienceDetail(resume.employments!) : false,
    skillsVariety: cached.hasSkills && (resume.skills?.length ?? 0) >= REQUIREMENTS.MIN_SKILLS_COUNT,
    dateCompleteness: cached.hasEmployments && resume.employments!.every(emp => 
      emp.startDate && (emp.endDate || emp.isCurrent)
    ),
    educationDetail: cached.hasEducation && resume.educations!.every(edu => 
      edu.institution && edu.subject && edu.startDate
    )
  };

  if (!contentChecks.summaryQuality) {
    improvements.content.push(
      `Expand your professional summary to at least ${REQUIREMENTS.SUMMARY_MIN_LENGTH} characters, highlighting your expertise and career achievements`
    );
  }
  if (!contentChecks.experienceDetail) {
    improvements.content.push(
      'Enhance work experience descriptions with specific achievements and quantifiable results (e.g., "Increased performance by 25%")'
    );
  }
  if (!contentChecks.skillsVariety) {
    improvements.content.push(
      `Add more diverse skills including both technical skills and soft skills (aim for at least ${REQUIREMENTS.MIN_SKILLS_COUNT} key skills)`
    );
  }
  if (!contentChecks.dateCompleteness) {
    improvements.content.push(
      'Ensure all employment entries have complete date information (start date and end date/current)'
    );
  }
  if (!contentChecks.educationDetail) {
    improvements.content.push(
      'Include complete education details with institution, degree, and dates for each entry'
    );
  }

  return (Object.values(contentChecks).filter(Boolean).length / Object.keys(contentChecks).length) * 100;
}

function checkExperienceDetail(employments: NonNullable<ResumeContent['employments']>): boolean {
  return employments.every(emp => {
    const summary = emp.summary?.trim().toLowerCase() || '';
    return summary.length >= REQUIREMENTS.EXPERIENCE_MIN_LENGTH && 
           Array.from(EXPERIENCE_ACTION_VERBS).some(verb => summary.includes(verb));
  });
}
