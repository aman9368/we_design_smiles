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
      {/* Bottom 15% White Gradient Layer (85% Opacity) */}
      <div
        className="absolute bottom-0 inset-x-0 h-[28%] md:h-[22%] lg:h-[18%] bg-gradient-to-t from-white/85 via-white/70 to-transparent pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* High-Contrast Responsive Typography & Interaction Area */}
      <div
        className={`absolute bottom-0 inset-x-0 z-20 px-6 py-4 sm:px-10 sm:py-6 md:px-16 md:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left pointer-events-auto ${className}`}
      >
        <div className="max-w-2xl">
          {categoryBadge && (
            <span className="inline-block text-sky-800 text-xs md:text-sm font-semibold tracking-wider uppercase mb-1 drop-shadow-sm">
              {categoryBadge}
            </span>
          )}
          <h2 className="text-slate-950 font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight leading-tight drop-shadow-sm">
            {displayTitle}
          </h2>
          <p className="mt-1 text-slate-800 text-xs sm:text-sm md:text-base font-medium drop-shadow-sm">
            {description}
          </p>
        </div>

        {/* Subtle Interactive Scroll Guide / Arrow Indicator */}
        <button
          onClick={onActionClick}
          aria-label="Navigate to next section"
          className="group flex flex-col items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-white/80 hover:bg-white text-slate-800 shadow-md backdrop-blur-sm border border-slate-200/80 transition-all hover:scale-105 active:scale-95 cursor-pointer"
        >
          <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-slate-700 group-hover:text-sky-600 transition-colors uppercase">
            {actionText}
          </span>
          <div className="relative w-5 h-5 flex items-center justify-center text-sky-600 animate-bounce">
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-y-0.5"
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
