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
3. Configure the following settings in your Auth0 Dashboard:

   **For Development:**
   - **Allowed Callback URLs**: `http://localhost:3000/auth/callback`
   - **Allowed Logout URLs**: `http://localhost:3000`
   - **Allowed Web Origins**: `http://localhost:3000`

   **For Production:**
   - **Allowed Callback URLs**: `https://yourdomain.com/auth/callback`
   - **Allowed Logout URLs**: `https://yourdomain.com`
   - **Allowed Web Origins**: `https://yourdomain.com`

   **Important:** Make sure the callback URL matches exactly what's configured in your code (`/auth/callback`). The redirect URI is constructed as: `{AUTH0_BASE_URL}/auth/callback`

4. Copy the Domain, Client ID, and Client Secret to your `.env.local` file
5. Generate a secret for `AUTH0_SECRET` using: `openssl rand -hex 32`

**Note:** If you're using social connections (like LinkedIn), make sure the callback URLs are also added in the social connection settings in Auth0.

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
- 🛡️ Comprehensive error handling with detailed logging and user-friendly error pages

## Error Handling

The application includes comprehensive error handling to improve user experience and help with debugging:

### Error Pages

- **404 Page** (`/app/not-found.tsx`) - Displays when a page is not found
- **500 Page** (`/app/500/page.tsx`) - Displays for server errors
- **Error Boundary** (`/app/error.tsx`) - Catches client-side errors
- **Global Error Boundary** (`/app/global-error.tsx`) - Catches critical errors

All error pages include:
- Clear error messages
- Links to report issues on GitHub (with pre-filled error details)
- Links to get help on Discord
- Options to retry or navigate home

### Error Tracking

Errors are automatically logged with detailed context including:
- Error message and stack trace
- HTTP status codes
- Request paths
- User context (when available)
- Timestamps

Error logging is implemented in:
- `utils/errorTracking.ts` - Core error tracking utilities
- API routes - Backend error logging
- Custom hooks (`useFetch`, `useSignedUrl`) - Frontend error logging

### Reporting Issues

When users encounter errors, they can:
1. **Report on GitHub** - Click the "Report Issue on GitHub" button which opens a new issue with pre-filled error details
2. **Get Help on Discord** - Join the Discord community for support

### Error Display Component

The `ErrorDisplay` component (`/components/common/ErrorDisplay.tsx`) provides a reusable way to display errors consistently across the application with GitHub and Discord support links.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Auth0 Next.js SDK](https://github.com/auth0/nextjs-auth0) - Auth0 integration documentation

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Make sure to add all environment variables in your Vercel project settings before deploying.

## License

This project is open source and available under the MIT License.

