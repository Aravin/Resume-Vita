import Link from 'next/link';

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
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Resume-Vita Blog
        </h1>
        <p className="text-xl text-gray-600">
          Expert insights on resume building, job searching, and career development
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <Link 
            href={`/blog/${post.slug}`} 
            key={post.slug}
            className="block group"
          >
            <article className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-2">
                  <time dateTime={post.date}>{post.date}</time>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                </div>
                <h2 className="text-xl font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                  {post.title}
                </h2>
                <p className="text-gray-600">
                  {post.description}
                </p>
                <div className="mt-4 text-blue-600 group-hover:text-blue-700">
                  Read more →
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
