/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'lh3.googleusercontent.com',
      's.gravatar.com',
      'resume-vita.s3.ap-south-1.amazonaws.com',
      'resume-vita-bucket.s3.ap-south-2.amazonaws.com',
      's3.ap-south-2.amazonaws.com'
    ],
  },
  compiler: {
    styledComponents: true,
  },
}
