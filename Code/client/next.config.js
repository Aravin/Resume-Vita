/** @type {import('next').NextConfig} */
module.exports = {
  swcMinify: true,
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'lh3.googleusercontent.com', 's.gravatar.com', 'resume-vita.s3.ap-south-1.amazonaws.com'],
  },
  compiler: {
    styledComponents: true,
  },
}
