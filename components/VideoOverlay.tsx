"use client";

import React from "react";

export interface VideoOverlayProps {
  title?: string;
  text?: string;
  description?: string;
  categoryBadge?: string;
  actionText?: string;
  onActionClick?: () => void;
  className?: string;
}

export function VideoOverlay({
  title,
  text,
  description = "Every space designed for your peace of mind.",
  categoryBadge = "Clinic Walkthrough",
  actionText = "Scroll to Explore",
  onActionClick,
  className = "",
}: VideoOverlayProps) {
  const displayTitle = title || text || "Professional Clinic Design - Built for Your Comfort";

  return (
    <>
      {/* Bottom White Gradient Layer - Responsive height for mobile */}
      <div
        className="absolute bottom-0 inset-x-0 h-[38%] sm:h-[28%] md:h-[22%] lg:h-[18%] bg-gradient-to-t from-white/95 via-white/80 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* High-Contrast Responsive Typography & Action Button */}
      <div
        className={`absolute bottom-0 inset-x-0 z-20 px-3 py-2.5 sm:px-8 sm:py-5 md:px-12 md:py-6 flex items-end sm:items-center justify-between gap-3 text-left pointer-events-auto ${className}`}
      >
        <div className="max-w-xl sm:max-w-2xl min-w-0 flex-1">
          {categoryBadge && (
            <span className="hidden sm:inline-block text-sky-800 text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-0.5 drop-shadow-sm">
              {categoryBadge}
            </span>
          )}
          <h2 className="text-slate-950 font-extrabold text-xs xs:text-sm sm:text-xl md:text-2xl lg:text-3xl tracking-tight leading-snug drop-shadow-sm line-clamp-2 sm:line-clamp-none">
            {displayTitle}
          </h2>
          <p className="mt-0.5 text-slate-800 text-[10px] xs:text-[11px] sm:text-xs md:text-sm font-medium drop-shadow-sm line-clamp-1 sm:line-clamp-none">
            {description}
          </p>
        </div>

        {/* Responsive Interactive Scroll Guide / Arrow */}
        <button
          onClick={onActionClick}
          aria-label="Navigate to next section"
          className="shrink-0 flex flex-col items-center justify-center gap-0.5 sm:gap-1 py-1.5 px-2 sm:py-2 sm:px-3.5 rounded-lg sm:rounded-xl bg-white/90 hover:bg-white text-slate-800 shadow-md backdrop-blur-sm border border-slate-200/90 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="hidden xs:inline-block text-[9px] sm:text-[11px] font-bold tracking-wider text-slate-700 uppercase">
            {actionText}
          </span>
          <div className="relative w-3.5 h-3.5 sm:w-4 sm:h-4 flex items-center justify-center text-sky-600 animate-bounce">
            <svg
              className="w-3 h-3 sm:w-3.5 sm:h-3.5 transition-transform"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
      </div>
    </>
  );
}

export default VideoOverlay;
