# Resume Vita - Free & Open Source Resume Generator

This is a [Next.js](https://nextjs.org/) project for generating professional resumes with PDF export, ATS optimization, and public sharing capabilities.

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Auth0 account and application
- AWS S3 bucket (for storing resume PDFs and images)
- Backend API endpoint (for resume data storage)

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
# or
yarn install
```

2. Create a `.env.local` file in the root directory with the following environment variables:

### Environment Variables

Create a `.env.local` file with the following required variables:

#### Auth0 Configuration (Required)

```env
# Auth0 Domain (e.g., your-tenant.auth0.com)
AUTH0_DOMAIN=your-tenant.auth0.com

# Auth0 Application Client ID
AUTH0_CLIENT_ID=your_client_id_here

# Auth0 Application Client Secret
AUTH0_CLIENT_SECRET=your_client_secret_here

# A 32-byte, hex-encoded secret for encrypting cookies
# Generate one using: openssl rand -hex 32
AUTH0_SECRET=your_32_byte_hex_secret_here

# Base URL of your application
# For local development: http://localhost:3000
# For production: https://yourdomain.com
AUTH0_BASE_URL=http://localhost:3000
# OR use APP_BASE_URL (both work, APP_BASE_URL takes precedence)
APP_BASE_URL=http://localhost:3000
```

#### Backend API Configuration (Required)

```env
# Backend API endpoint for resume data
NEXT_PUBLIC_BACKEND_API_ENDPOINT=https://your-backend-api.com
```

#### AWS S3 Configuration (Required)

```env
# AWS Access Key ID
AWS_ACCESS_KEY_ID=your_aws_access_key_id

# AWS Secret Access Key
AWS_SECRET_ACCESS_KEY=your_aws_secret_access_key

# AWS S3 Region (default: ap-south-2)
AWS_S3_REGION=ap-south-2

# AWS S3 Bucket Name
AWS_S3_BUCKET=your-bucket-name

# Public S3 Bucket URL (for accessing resume images/PDFs)
NEXT_PUBLIC_S3_BUCKET=https://your-bucket-name.s3.region.amazonaws.com
```

#### Google Analytics (Optional)

```env
# Google Analytics Tracking ID
NEXT_PUBLIC_GOOGLE_ANALYTICS=G-XXXXXXXXXX
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Building for Production

```bash
npm run build
npm start
# or
yarn build
yarn start
```

## Auth0 Setup

1. Create an Auth0 account at [auth0.com](https://auth0.com)
2. Create a new Application (Regular Web Application)
3. Configure the following settings:
   - **Allowed Callback URLs**: `http://localhost:3000/api/auth/callback` (for development)
   - **Allowed Logout URLs**: `http://localhost:3000` (for development)
   - **Allowed Web Origins**: `http://localhost:3000` (for development)
4. Copy the Domain, Client ID, and Client Secret to your `.env.local` file
5. Generate a secret for `AUTH0_SECRET` using: `openssl rand -hex 32`

For production, update the callback, logout, and web origins URLs to your production domain.

## Project Structure

- `/app` - Next.js App Router pages and API routes
- `/components` - React components
- `/hooks` - Custom React hooks
- `/utils` - Utility functions
- `/styles` - Global styles

## Features

- 🔐 Authentication with Auth0
- 📄 Resume creation and editing
- 📥 PDF export
- 🔗 Public resume sharing
- 🎯 ATS (Applicant Tracking System) optimization
- 📊 ATS score analysis
- 🎨 Multiple resume templates

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Auth0 Next.js SDK](https://github.com/auth0/nextjs-auth0) - Auth0 integration documentation

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Make sure to add all environment variables in your Vercel project settings before deploying.

## License

This project is open source and available under the MIT License.

