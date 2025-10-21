// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

// Initialize Google Analytics
export const initGoogleAnalytics = (measurementId: string) => {
  if (typeof window === 'undefined') return;

  // Initialize dataLayer
  window.dataLayer = window.dataLayer || [];
  
  // Define gtag function
  window.gtag = function(...args: any[]) {
    window.dataLayer.push(args);
  };

  // Initialize GA
  window.gtag('js', new Date());
  window.gtag('config', measurementId);
};

// Track page views
export const trackPageView = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS!, {
      page_path: url,
    });
  }
};

// Track custom events
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, parameters);
  }
};

// Track user login
export const trackLogin = (method: string) => {
  trackEvent('login', { method });
};

// Track user logout
export const trackLogout = () => {
  trackEvent('logout');
};

// Track PDF download
export const trackPDFDownload = (source: string) => {
  trackEvent('file_download', {
    file_name: 'resume.pdf',
    file_type: 'pdf',
    source: source, // 'dashboard' or 'preview'
  });
};
