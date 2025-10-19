/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 's.gravatar.com',
      },
      {
        protocol: 'https',
        hostname: 'resume-vita.s3.ap-south-1.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'resume-vita-bucket.s3.ap-south-2.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 's3.ap-south-2.amazonaws.com',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
}
