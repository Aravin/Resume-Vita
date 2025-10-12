"use client";

import { useState } from "react";
import { FaExclamationTriangle, FaTimes } from "react-icons/fa";

export default function Banner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="bg-warning text-warning-content py-3 px-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FaExclamationTriangle className="text-lg flex-shrink-0" />
          <div className="text-sm md:text-base">
            <strong>Backend Maintenance:</strong> We&apos;re currently experiencing backend issues. 
            Some features may be temporarily unavailable. We&apos;re working to restore full functionality soon.
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="btn btn-ghost btn-sm text-warning-content hover:bg-warning-content/20 flex-shrink-0"
          aria-label="Dismiss banner"
        >
          <FaTimes />
        </button>
      </div>
    </div>
  );
}
