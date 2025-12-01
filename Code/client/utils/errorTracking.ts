// Error tracking utility for logging errors with detailed information

import { trackEvent } from './gtag';

interface ErrorDetails {
  message: string;
  stack?: string;
  statusCode?: number;
  path?: string;
  userAgent?: string;
  timestamp: string;
  userId?: string;
  errorType?: string;
  additionalInfo?: Record<string, any>;
}

const GITHUB_REPO_URL = 'https://github.com/Aravin/Resume-Vita';
const DISCORD_URL = 'https://discord.gg/ug5aW9FT';

/**
 * Logs error details to console and can be extended to send to error tracking service
 * @param fatal - Set to true for critical errors that break the app (default: false)
 */
export const logError = (error: Error | unknown, context?: {
  statusCode?: number;
  path?: string;
  userId?: string;
  additionalInfo?: Record<string, any>;
  fatal?: boolean;
}) => {
  const errorDetails: ErrorDetails = {
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : undefined,
    statusCode: context?.statusCode,
    path: context?.path || (typeof window !== 'undefined' ? window.location.pathname : undefined),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : undefined,
    timestamp: new Date().toISOString(),
    userId: context?.userId,
    errorType: error instanceof Error ? error.constructor.name : typeof error,
    additionalInfo: context?.additionalInfo,
  };

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.error('Error Details:', errorDetails);
  }

  // Track error in Google Analytics
  if (typeof window !== 'undefined') {
    trackEvent('exception', {
      description: errorDetails.message,
      fatal: context?.fatal || false, // Set to true for critical errors that break the app
      error_type: errorDetails.errorType || 'Unknown',
      status_code: errorDetails.statusCode || 'N/A',
      path: errorDetails.path || 'N/A',
      ...(errorDetails.userId && { user_id: errorDetails.userId }),
    });
  }

  // In production, you can send this to an error tracking service
  // Example: Sentry, LogRocket, etc.
  if (process.env.NODE_ENV === 'production') {
    console.error('Error occurred:', errorDetails);
  }

  return errorDetails;
};

/**
 * Formats error message for display to users
 */
export const formatErrorMessage = (error: Error | unknown, statusCode?: number): string => {
  if (error instanceof Error) {
    // Handle specific error types
    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      return 'Network error: Please check your internet connection and try again.';
    }
    if (error.message.includes('timeout')) {
      return 'Request timeout: The server took too long to respond. Please try again.';
    }
    if (statusCode === 404) {
      return 'The requested resource was not found.';
    }
    if (statusCode === 500) {
      return 'Internal server error: Something went wrong on our end.';
    }
    if (statusCode === 403) {
      return 'Access forbidden: You do not have permission to access this resource.';
    }
    if (statusCode === 401) {
      return 'Unauthorized: Please log in to continue.';
    }
    return error.message || 'An unexpected error occurred.';
  }
  return 'An unexpected error occurred.';
};

/**
 * Gets the GitHub issue URL with pre-filled error details
 */
export const getGitHubIssueUrl = (error: Error | unknown, context?: {
  statusCode?: number;
  path?: string;
}): string => {
  const title = encodeURIComponent(
    `Error: ${error instanceof Error ? error.message : String(error)}`
  );
  const body = encodeURIComponent(`
## Error Details

**Error Message:** ${error instanceof Error ? error.message : String(error)}

**Status Code:** ${context?.statusCode || 'N/A'}

**Path:** ${context?.path || (typeof window !== 'undefined' ? window.location.pathname : 'N/A')}

**Timestamp:** ${new Date().toISOString()}

**User Agent:** ${typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A'}

## Steps to Reproduce
1. 
2. 
3. 

## Expected Behavior


## Actual Behavior


## Additional Context

${error instanceof Error && error.stack ? `\`\`\`\n${error.stack}\n\`\`\`` : ''}
  `);

  return `${GITHUB_REPO_URL}/issues/new?title=${title}&body=${body}`;
};

export { GITHUB_REPO_URL, DISCORD_URL };

