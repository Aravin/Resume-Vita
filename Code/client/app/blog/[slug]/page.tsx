import { notFound } from 'next/navigation';
import Link from 'next/link';

interface BlogPost {
  slug: string;
  title: string;
  content: string;
  date: string;
  readTime: string;
}

const blogPosts: Record<string, BlogPost> = {
  'ats-optimized-resume': {
    slug: 'ats-optimized-resume',
    title: 'Mastering ATS: How Resume-Vita Helps You Pass Applicant Tracking Systems',
    date: 'January 28, 2024',
    readTime: '5 min read',
    content: `
      In today's competitive job market, getting your resume past Applicant Tracking Systems (ATS) is crucial. Resume-Vita's advanced ATS optimization features are designed to help you succeed in this critical first step.

      ## What is ATS?
      Applicant Tracking Systems are software applications that companies use to manage their recruitment process. These systems scan resumes for relevant keywords and experience before they reach human recruiters.

      ## How Resume-Vita Helps
      ### 1. Real-time ATS Score
      - Get instant feedback on your resume's ATS compatibility
      - See which keywords are missing from your resume
      - Understand how well your resume matches the job description

      ### 2. Smart Keyword Suggestions
      - Receive intelligent suggestions based on your industry
      - Learn which terms are most valued in your field
      - Optimize your content without keyword stuffing

      ### 3. Format Optimization
      - Use ATS-friendly templates
      - Proper heading structure that ATS can parse
      - Clean, professional formatting that works for both ATS and human readers

      ## Best Practices for ATS Optimization
      1. Use standard section headings
      2. Avoid tables and complex formatting
      3. Include relevant keywords naturally
      4. Keep formatting consistent
      5. Use standard fonts

      ## Why Choose Resume-Vita?
      - Free and open-source platform
      - Regular updates based on latest ATS trends
      - Community-driven improvements
      - Professional templates that work

      Start optimizing your resume today with Resume-Vita and increase your chances of landing your dream job!
    `
  },
  'professional-resume-templates': {
    slug: 'professional-resume-templates',
    title: 'Create Professional Resumes in Minutes with Resume-Vita',
    date: 'January 25, 2024',
    readTime: '4 min read',
    content: `
      Resume-Vita offers a seamless experience for creating professional resumes that stand out. Our platform combines ease of use with powerful features to help you create the perfect resume.

      ## Why Professional Templates Matter
      Your resume is often the first impression you make on potential employers. A well-designed template helps you:
      - Present information clearly and professionally
      - Stand out from other candidates
      - Show attention to detail
      - Demonstrate professionalism

      ## Resume-Vita's Template Features
      ### 1. Professional Designs
      - Modern and classic options
      - Industry-specific templates
      - Clean, readable layouts

      ### 2. Customization Options
      - Color schemes
      - Font selections
      - Section arrangements
      - Spacing adjustments

      ### 3. Responsive Design
      - Perfect viewing on all devices
      - Print-friendly formats
      - Digital-first approach

      ## How to Choose the Right Template
      1. Consider your industry
      2. Match your experience level
      3. Align with company culture
      4. Ensure content readability

      ## Tips for Using Resume-Vita Templates
      - Keep content concise
      - Use consistent formatting
      - Highlight key achievements
      - Update regularly

      Start creating your professional resume today with Resume-Vita's free templates!
    `
  },
  'share-your-resume': {
    slug: 'share-your-resume',
    title: 'Stand Out with Resume-Vita\'s Public URL Feature',
    date: 'January 20, 2024',
    readTime: '3 min read',
    content: `
      Resume-Vita's public URL feature revolutionizes how you share your professional profile. Learn how this powerful tool can enhance your job search and networking efforts.

      ## The Power of Public URLs
      ### 1. Easy Sharing
      - One click to share your resume
      - Professional, customizable links
      - Always up-to-date content

      ### 2. Track Your Impact
      - View counts
      - Visitor analytics
      - Engagement metrics

      ### 3. Professional Presence
      - Branded URLs
      - Mobile-friendly viewing
      - Multiple format support

      ## Best Practices for Sharing
      1. Customize your URL
      2. Keep content updated
      3. Share strategically
      4. Monitor analytics

      ## Privacy and Control
      - Choose what to share
      - Control access settings
      - Update anytime

      Make your resume accessible and professional with Resume-Vita's public URL feature!
    `
  },
  'open-source-resume-builder': {
    slug: 'open-source-resume-builder',
    title: 'Why We Made Resume-Vita Free and Open Source',
    date: 'January 15, 2024',
    readTime: '6 min read',
    content: `
      Resume-Vita is committed to making professional resume creation accessible to everyone. Our open-source approach ensures transparency, community involvement, and continuous improvement.

      ## Our Open Source Philosophy
      ### 1. Accessibility
      - Free for everyone
      - No hidden costs
      - Premium features included

      ### 2. Community-Driven
      - Contributions welcome
      - Feature requests
      - Bug reporting and fixes

      ### 3. Transparency
      - Open codebase
      - Clear documentation
      - Regular updates

      ## Benefits of Open Source
      1. Continuous improvement
      2. Security through transparency
      3. Community support
      4. Feature-rich platform

      ## How to Contribute
      - GitHub repository
      - Documentation
      - Feature development
      - Bug fixes

      Join us in making resume creation better for everyone!
    `
  }
};

interface Props {
  params: {
    slug: string;
  };
}

export default function BlogPost({ params }: Props) {
  const post = blogPosts[params.slug];

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link 
        href="/blog"
        className="text-blue-600 hover:text-blue-800 mb-8 inline-block"
      >
        ← Back to Blog
      </Link>
      
      <article className="prose lg:prose-xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-500">
            <time dateTime={post.date}>{post.date}</time>
            <span className="mx-2">•</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        <div className="mt-8">
          {post.content.split('\n').map((paragraph, index) => {
            if (paragraph.trim().startsWith('##')) {
              return (
                <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                  {paragraph.replace('##', '').trim()}
                </h2>
              );
            }
            if (paragraph.trim().startsWith('###')) {
              return (
                <h3 key={index} className="text-xl font-bold mt-6 mb-3">
                  {paragraph.replace('###', '').trim()}
                </h3>
              );
            }
            if (paragraph.trim().startsWith('-')) {
              return (
                <li key={index} className="ml-4">
                  {paragraph.replace('-', '').trim()}
                </li>
              );
            }
            if (paragraph.trim()) {
              return <p key={index}>{paragraph.trim()}</p>;
            }
            return null;
          })}
        </div>
      </article>
    </div>
  );
}
