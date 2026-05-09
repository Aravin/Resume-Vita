import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { FaArrowLeft, FaBookOpen, FaClock } from 'react-icons/fa';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

type ContentBlock =
  | { type: 'heading2'; text: string }
  | { type: 'heading3'; text: string }
  | { type: 'paragraph'; text: string }
  | { type: 'list'; items: string[]; ordered: boolean };

function parseContent(content: string): ContentBlock[] {
  const lines = content
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const blocks: ContentBlock[] = [];
  let listBuffer: string[] = [];
  let ordered = false;

  const flushList = () => {
    if (listBuffer.length > 0) {
      blocks.push({ type: 'list', items: listBuffer, ordered });
      listBuffer = [];
      ordered = false;
    }
  };

  for (const line of lines) {
    if (line.startsWith('## ')) {
      flushList();
      blocks.push({ type: 'heading2', text: line.replace('## ', '').trim() });
      continue;
    }

    if (line.startsWith('### ')) {
      flushList();
      blocks.push({ type: 'heading3', text: line.replace('### ', '').trim() });
      continue;
    }

    if (line.startsWith('- ')) {
      if (listBuffer.length === 0) {
        ordered = false;
      }
      listBuffer.push(line.replace('- ', '').trim());
      continue;
    }

    if (/^\d+\.\s/.test(line)) {
      if (listBuffer.length === 0) {
        ordered = true;
      }
      listBuffer.push(line.replace(/^\d+\.\s/, '').trim());
      continue;
    }

    flushList();
    blocks.push({ type: 'paragraph', text: line });
  }

  flushList();

  return blocks;
}

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts[slug];
  
  if (!post) {
    return {
      title: "Post Not Found - ResumeVita.com",
    };
  }
  
  return {
    title: `${post.title} - ResumeVita.com Blog`,
    description: post.content.substring(0, 160) + "...",
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts[slug];

  if (!post) {
    notFound();
  }

  const contentBlocks = parseContent(post.content);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <Link
        href="/blog"
        className={cn(buttonVariants({ variant: 'ghost' }), 'mb-8 inline-flex px-0 text-primary hover:bg-transparent hover:text-primary/80')}
      >
        <FaArrowLeft className="mr-2 h-4 w-4" />
        Back to Blog
      </Link>

      <article className="overflow-hidden rounded-[2rem] border border-border/70 bg-card/90 shadow-sm dark:bg-card/80">
        <header className="border-b border-border/70 bg-gradient-to-br from-emerald-500/10 via-card to-card px-6 py-10 md:px-10 md:py-12 dark:from-emerald-400/10 dark:via-card/90 dark:to-card/80">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
            <FaBookOpen className="h-3.5 w-3.5" />
            <span>Resume Vita Blog</span>
          </div>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight text-foreground md:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <time dateTime={post.date}>{post.date}</time>
            <span className="text-border">•</span>
            <span className="inline-flex items-center gap-2">
              <FaClock className="h-3.5 w-3.5" />
              {post.readTime}
            </span>
          </div>
        </header>

        <div className="px-6 py-10 md:px-10 md:py-12">
          <div className="mx-auto max-w-3xl space-y-6">
            {contentBlocks.map((block, index) => {
              if (block.type === 'heading2') {
                return (
                  <h2 key={index} className="pt-4 text-2xl font-bold text-foreground md:text-3xl">
                    {block.text}
                  </h2>
                );
              }

              if (block.type === 'heading3') {
                return (
                  <h3 key={index} className="pt-2 text-xl font-semibold text-foreground md:text-2xl">
                    {block.text}
                  </h3>
                );
              }

              if (block.type === 'list') {
                const ListTag = block.ordered ? 'ol' : 'ul';

                return (
                  <ListTag
                    key={index}
                    className={cn(
                      'space-y-3 pl-6 text-base leading-8 text-muted-foreground',
                      block.ordered ? 'list-decimal' : 'list-disc'
                    )}
                  >
                    {block.items.map((item, itemIndex) => (
                      <li key={`${index}-${itemIndex}`}>{item}</li>
                    ))}
                  </ListTag>
                );
              }

              return (
                <p key={index} className="text-base leading-8 text-muted-foreground md:text-lg">
                  {block.text}
                </p>
              );
            })}
          </div>
        </div>
      </article>
    </div>
  );
}
