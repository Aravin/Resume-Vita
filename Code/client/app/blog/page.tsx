import Link from 'next/link';
import { Metadata } from 'next';
import { FaArrowRight, FaBookOpen, FaClock, FaHandSparkles } from 'react-icons/fa';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: "Blog - ResumeVita.com",
  description: "Expert insights on resume building, job searching, and career development. Learn how to create professional resumes and advance your career.",
};

// Force dynamic rendering to prevent build-time issues
export const dynamic = 'force-dynamic';

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
}

const blogPosts: BlogPost[] = [
  {
    slug: 'ats-optimized-resume',
    title: 'Mastering ATS: How Resume-Vita Helps You Pass Applicant Tracking Systems',
    description: 'Learn how Resume-Vita\'s advanced ATS optimization features help your resume get noticed by hiring managers. Our platform analyzes your resume against job descriptions and provides actionable feedback to improve your chances.',
    date: 'January 28, 2024',
    readTime: '5 min read'
  },
  {
    slug: 'professional-resume-templates',
    title: 'Create Professional Resumes in Minutes with Resume-Vita',
    description: 'Discover how Resume-Vita\'s intuitive interface and professionally designed templates help you create stunning resumes quickly. With our platform, you can focus on content while we handle the formatting.',
    date: 'January 25, 2024',
    readTime: '4 min read'
  },
  {
    slug: 'share-your-resume',
    title: 'Stand Out with Resume-Vita\'s Public URL Feature',
    description: 'Explore how Resume-Vita\'s public URL feature makes sharing your resume easier than ever. Get a professional, customizable link to share with recruiters and track who views your resume.',
    date: 'January 20, 2024',
    readTime: '3 min read'
  },
  {
    slug: 'open-source-resume-builder',
    title: 'Why We Made Resume-Vita Free and Open Source',
    description: 'Our commitment to making professional resume creation accessible to everyone. Learn about Resume-Vita\'s open-source journey and how you can contribute to making job searching easier for millions.',
    date: 'January 15, 2024',
    readTime: '6 min read'
  }
];

export default function BlogPage() {
  const featuredPost = blogPosts[0];
  const latestPosts = blogPosts.slice(1);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
      <section className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-gradient-to-br from-emerald-500/10 via-card to-card px-6 py-12 shadow-sm md:px-10 md:py-16 dark:from-emerald-400/10 dark:via-card/90 dark:to-card/80">
        <div className="absolute inset-0 opacity-70">
          <div className="absolute left-0 top-0 h-36 w-36 rounded-full bg-primary/12 blur-3xl md:h-52 md:w-52" />
          <div className="absolute bottom-0 right-0 h-44 w-44 rounded-full bg-cyan-500/10 blur-3xl md:h-60 md:w-60 dark:bg-cyan-400/10" />
        </div>

        <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <FaHandSparkles className="h-3.5 w-3.5" />
              <span>Resume tips and career guidance</span>
            </div>
            <h1 className="text-4xl font-bold leading-tight text-foreground sm:text-5xl md:text-6xl">
              Blog articles that help you write better resumes and search smarter.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
              Practical notes on ATS optimization, templates, public sharing, and the decisions behind Resume Vita. Everything stays focused on getting applications out faster.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link href={`/blog/${featuredPost.slug}`} className={cn(buttonVariants({ size: 'lg' }))}>
                Read Featured Post
                <FaArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <div className="inline-flex items-center gap-3 rounded-2xl border border-border/70 bg-background/80 px-4 py-3 text-sm text-muted-foreground backdrop-blur-sm dark:bg-background/40">
                <FaBookOpen className="h-4 w-4 text-primary" />
                <span>{blogPosts.length} posts live</span>
              </div>
            </div>
          </div>

          <div className="rounded-[1.75rem] border border-border/70 bg-card/90 p-6 shadow-lg dark:bg-card/75">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Featured</p>
            <h2 className="mt-3 text-2xl font-semibold leading-tight text-foreground">
              {featuredPost.title}
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {featuredPost.description}
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
              <time dateTime={featuredPost.date}>{featuredPost.date}</time>
              <span className="text-border">•</span>
              <span className="inline-flex items-center gap-2">
                <FaClock className="h-3.5 w-3.5" />
                {featuredPost.readTime}
              </span>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-12 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-foreground">Latest posts</h2>
          <p className="mt-2 text-base text-muted-foreground">
            Short, practical reads for improving resumes and the surrounding workflow.
          </p>
        </div>
        <div className="hidden rounded-full border border-border/70 bg-muted/50 px-4 py-2 text-sm text-muted-foreground md:block">
          Updated regularly
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {latestPosts.map((post) => (
          <Link 
            href={`/blog/${post.slug}`} 
            key={post.slug}
            className="group block"
          >
            <article className="flex h-full flex-col rounded-[1.5rem] border border-border/70 bg-card/90 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-card/75">
              <div className="mb-4 flex items-center text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-primary">
                  <FaBookOpen className="h-3 w-3" />
                  Article
                </span>
              </div>
              <div className="flex items-center text-sm text-muted-foreground mb-3">
                  <time dateTime={post.date}>{post.date}</time>
                  <span className="mx-2 text-border">•</span>
                  <span className="inline-flex items-center gap-2">
                    <FaClock className="h-3 w-3" />
                    {post.readTime}
                  </span>
              </div>
              <h3 className="mb-3 text-2xl font-semibold leading-tight text-foreground transition-colors duration-300 group-hover:text-primary">
                {post.title}
              </h3>
              <p className="flex-1 text-sm leading-7 text-muted-foreground sm:text-base">
                {post.description}
              </p>
              <div className="mt-6 inline-flex items-center text-sm font-medium text-primary group-hover:text-primary/80">
                Read article
                <FaArrowRight className="ml-2 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
