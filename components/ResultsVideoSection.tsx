"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

export interface ResultsVideoSectionProps {
  videoFramePath?: string;
  totalFrames?: number;
  overlayTitle?: string;
  overlayDescription?: string;
  className?: string;
}

export default function ResultsVideoSection({
  videoFramePath = "/videos/video_2_frames/ezgif-frame-%d.png",
  totalFrames = 40,
  overlayTitle = "See Our Smile Transformations - Before & After Results",
  overlayDescription = "Join hundreds of satisfied patients who achieved their dream smiles.",
  className = "",
}: ResultsVideoSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [currentFrame, setCurrentFrame] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [loadedFramesCount, setLoadedFramesCount] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const imagesRef = useRef<HTMLImageElement[]>([]);
  const targetFrameRef = useRef<number>(0);
  const renderedFrameRef = useRef<number>(-1);
  const animFrameIdRef = useRef<number | null>(null);

  // 1. Intersection Observer for Lazy Loading and Performance Optimization
  useEffect(() => {
    const target = containerRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        root: null,
        rootMargin: "200px 0px",
        threshold: 0,
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);

  // 2. Procedural Fallback Renderer for Treatment Chair -> Results Wall Transition
  const drawProceduralResultsFrame = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) => {
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#08131d");
      bgGrad.addColorStop(0.5, "#0f202e");
      bgGrad.addColorStop(1, "#060d14");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.48;

      ctx.save();
      const floorGrad = ctx.createLinearGradient(0, cy, 0, height);
      floorGrad.addColorStop(0, "rgba(20, 38, 55, 0.4)");
      floorGrad.addColorStop(1, "rgba(230, 245, 255, 0.12)");
      ctx.fillStyle = floorGrad;
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(width, height);
      ctx.lineTo(cx + width * 0.4, cy);
      ctx.lineTo(cx - width * 0.4, cy);
      ctx.closePath();
      ctx.fill();

      const ceilingGrad = ctx.createLinearGradient(0, 0, 0, cy);
      ceilingGrad.addColorStop(0, "rgba(200, 240, 255, 0.18)");
      ceilingGrad.addColorStop(1, "rgba(10, 20, 30, 0)");
      ctx.fillStyle = ceilingGrad;
      ctx.fillRect(0, 0, width, cy);

      ctx.strokeStyle = "rgba(56, 189, 248, 0.1)";
      ctx.lineWidth = 1.5;
      const numLines = 14;
      const offset = (progress * 100) % (width / numLines);
      for (let i = -numLines; i <= numLines * 2; i++) {
        const startX = i * (width / numLines) + offset;
        ctx.beginPath();
        ctx.moveTo(startX, height);
        ctx.lineTo(cx + (startX - cx) * 0.2, cy);
        ctx.stroke();
      }

      if (progress < 0.4) {
        const stageProg = progress / 0.4;
        const fade = 1 - Math.max(0, (progress - 0.26) / 0.14);
        ctx.globalAlpha = Math.max(0, fade);

        const chairX = cx - stageProg * width * 0.3;
        const chairY = cy + 20 + stageProg * 60;
        const chairScale = 1 - stageProg * 0.4;

        ctx.fillStyle = "#1e293b";
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2;

        ctx.beginPath();
        ctx.roundRect(chairX - 35 * chairScale, chairY - 50 * chairScale, 70 * chairScale, 30 * chairScale, 6);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.roundRect(chairX - 50 * chairScale, chairY - 15 * chairScale, 100 * chairScale, 80 * chairScale, 10);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.font = `600 ${Math.max(15, Math.floor(width * 0.02))}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("COMPLETING CLINICAL PROCEDURE", cx, cy - height * 0.22);
      }

      if (progress >= 0.25 && progress < 0.75) {
        const stageProg = (progress - 0.25) / 0.5;
        const fadeIn = Math.min(1, (progress - 0.25) / 0.1);
        const fadeOut = Math.max(0, 1 - (progress - 0.65) / 0.1);
        ctx.globalAlpha = Math.min(fadeIn, fadeOut);

        const corridorWidth = width * (0.32 + stageProg * 0.4);

        for (let side of [-1, 1]) {
          const wallX = cx + side * corridorWidth * 0.7;
          const frameW = width * 0.14;
          const frameH = height * 0.32;
          const frameY = cy - frameH * 0.45;

          const frameGrad = ctx.createLinearGradient(wallX - frameW / 2, 0, wallX + frameW / 2, 0);
          frameGrad.addColorStop(0, "rgba(56, 189, 248, 0.2)");
          frameGrad.addColorStop(1, "rgba(14, 165, 233, 0.05)");

          ctx.fillStyle = frameGrad;
          ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(wallX - frameW / 2, frameY, frameW, frameH, 8);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
          ctx.font = `500 ${Math.max(10, Math.floor(width * 0.01))}px sans-serif`;
          ctx.textAlign = "center";
          ctx.fillText(side === -1 ? "CASE STUDY A" : "CASE STUDY B", wallX, frameY + frameH * 0.5);
        }

        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.font = `600 ${Math.max(15, Math.floor(width * 0.02))}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("ENTERING SMILE TRANSFORMATIONS GALLERY", cx, cy - height * 0.24);
      }

      if (progress >= 0.55) {
        const stageProg = (progress - 0.55) / 0.45;
        const fadeIn = Math.min(1, (progress - 0.55) / 0.12);
        ctx.globalAlpha = fadeIn;

        const wallY = cy - height * 0.12;
        const numCards = 3;
        const cardW = Math.min(320, width * 0.26);
        const cardH = cardW * 0.95;
        const spacing = cardW + Math.min(32, width * 0.03);
        const startX = cx - ((numCards - 1) * spacing) / 2;

        const cases = [
          { title: "Full Porcelain Veneers", time: "2 Visits", tag: "Before & After", rating: "★★★★★" },
          { title: "All-on-4 Dental Implants", time: "Same Day", tag: "Before & After", rating: "★★★★★" },
          { title: "Invisible Aligner & Whitening", time: "6 Months", tag: "Before & After", rating: "★★★★★" },
        ];

        cases.forEach((item, idx) => {
          const cardX = startX + idx * spacing;
          const cardScale = 0.9 + stageProg * 0.1;
          const lift = (1 - stageProg) * 30 * (idx % 2 === 0 ? 1 : -1);

          ctx.save();
          ctx.translate(cardX, wallY + lift);
          ctx.scale(cardScale, cardScale);

          const cardGrad = ctx.createLinearGradient(-cardW / 2, -cardH / 2, cardW / 2, cardH / 2);
          cardGrad.addColorStop(0, "rgba(15, 30, 48, 0.92)");
          cardGrad.addColorStop(1, "rgba(10, 20, 32, 0.96)");

          ctx.fillStyle = cardGrad;
          ctx.strokeStyle = idx === 1 ? "#38bdf8" : "rgba(56, 189, 248, 0.4)";
          ctx.lineWidth = idx === 1 ? 2.5 : 1.5;
          ctx.beginPath();
          ctx.roundRect(-cardW / 2, -cardH / 2, cardW, cardH, 16);
          ctx.fill();
          ctx.stroke();

          const boxW = cardW - 24;
          const boxH = cardH * 0.52;
          const boxX = -boxW / 2;
          const boxY = -cardH / 2 + 16;

          ctx.fillStyle = "#1e293b";
          ctx.beginPath();
          ctx.roundRect(boxX, boxY, boxW / 2, boxH, [10, 0, 0, 10]);
          ctx.fill();

          ctx.fillStyle = "rgba(248, 113, 113, 0.9)";
          ctx.font = "bold 10px sans-serif";
          ctx.textAlign = "center";
          ctx.fillText("BEFORE", boxX + boxW * 0.25, boxY + boxH * 0.4);

          ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
          ctx.beginPath();
          ctx.arc(boxX + boxW * 0.25, boxY + boxH * 0.65, 12, 0, Math.PI);
          ctx.fill();

          const afterGrad = ctx.createLinearGradient(boxX + boxW / 2, boxY, boxX + boxW, boxY + boxH);
          afterGrad.addColorStop(0, "#0369a1");
          afterGrad.addColorStop(1, "#0284c7");
          ctx.fillStyle = afterGrad;
          ctx.beginPath();
          ctx.roundRect(boxX + boxW / 2, boxY, boxW / 2, boxH, [0, 10, 10, 0]);
          ctx.fill();

          ctx.fillStyle = "rgba(56, 255, 200, 0.95)";
          ctx.font = "bold 10px sans-serif";
          ctx.fillText("AFTER", boxX + boxW * 0.75, boxY + boxH * 0.4);

          ctx.fillStyle = "#ffffff";
          ctx.beginPath();
          ctx.arc(boxX + boxW * 0.75, boxY + boxH * 0.62, 14, 0, Math.PI);
          ctx.fill();

          ctx.strokeStyle = "rgba(255, 255, 255, 0.6)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(boxX + boxW / 2, boxY);
          ctx.lineTo(boxX + boxW / 2, boxY + boxH);
          ctx.stroke();

          ctx.fillStyle = "#ffffff";
          ctx.font = `600 ${Math.max(12, Math.floor(cardW * 0.048))}px sans-serif`;
          ctx.textAlign = "left";
          ctx.fillText(item.title, -cardW / 2 + 16, boxY + boxH + 24);

          ctx.fillStyle = "rgba(56, 189, 248, 0.9)";
          ctx.font = "500 11px sans-serif";
          ctx.fillText(`Duration: ${item.time}`, -cardW / 2 + 16, boxY + boxH + 42);

          ctx.fillStyle = "#fbbf24";
          ctx.textAlign = "right";
          ctx.font = "12px sans-serif";
          ctx.fillText(item.rating, cardW / 2 - 16, boxY + boxH + 42);

          ctx.restore();
        });

        ctx.fillStyle = "rgba(56, 189, 248, 0.95)";
        ctx.font = `600 ${Math.max(12, Math.floor(width * 0.012))}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("CLINICAL SMILE GALLERY • VERIFIED PATIENT OUTCOMES", cx, wallY - cardH * 0.65);
      }

      ctx.restore();
    },
    []
  );

  // 3. Smooth Canvas Render Loop with RequestAnimationFrame (Interpolated Scrubbing)
  const renderCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    const currentTarget = targetFrameRef.current;
    const currentProgress = currentTarget / (totalFrames - 1 || 1);

    const targetImage = imagesRef.current[currentTarget];
    const hasValidImage = targetImage && targetImage.complete && targetImage.naturalWidth > 0;

    if (hasValidImage) {
      ctx.clearRect(0, 0, width, height);
      const imgRatio = targetImage.naturalWidth / targetImage.naturalHeight;
      const canvasRatio = width / height;
      let drawW = width;
      let drawH = height;
      let drawX = 0;
      let drawY = 0;

      if (canvasRatio > imgRatio) {
        drawH = width / imgRatio;
        drawY = (height - drawH) / 2;
      } else {
        drawW = height * imgRatio;
        drawX = (width - drawW) / 2;
      }

      ctx.drawImage(targetImage, drawX, drawY, drawW, drawH);
    } else {
      drawProceduralResultsFrame(ctx, width, height, currentProgress);
    }

    if (videoRef.current && videoRef.current.duration) {
      const targetTime = currentProgress * videoRef.current.duration;
      if (Math.abs(videoRef.current.currentTime - targetTime) > 0.03) {
        videoRef.current.currentTime = targetTime;
      }
    }

    renderedFrameRef.current = currentTarget;
  }, [totalFrames, drawProceduralResultsFrame]);

  // 4. Preload Frames when visible
  useEffect(() => {
    if (!isVisible) return;

    let isMounted = true;
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const isPattern = videoFramePath.includes("%d");

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      const frameIndex = i + 1;
      const formattedUrl = isPattern
        ? videoFramePath.replace("%d", String(frameIndex).padStart(3, "0"))
        : `${videoFramePath}?frame=${frameIndex}`;

      img.src = formattedUrl;
      img.onload = () => {
        if (!isMounted) return;
        loadedCount++;
        setLoadedFramesCount(loadedCount);
        if (loadedCount === 1 || loadedCount >= Math.min(5, totalFrames)) {
          setIsLoaded(true);
          renderCanvas();
        }
      };
      img.onerror = () => {
        if (!isMounted) return;
        loadedCount++;
        setLoadedFramesCount(loadedCount);
        if (loadedCount >= Math.min(5, totalFrames)) {
          setIsLoaded(true);
          renderCanvas();
        }
      };
      loadedImages.push(img);
    }

    imagesRef.current = loadedImages;

    return () => {
      isMounted = false;
    };
  }, [isVisible, videoFramePath, totalFrames, renderCanvas]);

  // 5. Setup Resize Observer for Canvas Resolution
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      renderCanvas();
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [renderCanvas]);

  // 6. Scroll scrubbing listener attached to container
  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableDistance = container.offsetHeight - windowHeight;

      if (totalScrollableDistance <= 0) return;

      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / totalScrollableDistance));

      setScrollProgress(progress);

      const frameIndex = Math.min(
        totalFrames - 1,
        Math.max(0, Math.floor(progress * totalFrames))
      );

      targetFrameRef.current = frameIndex;
      setCurrentFrame(frameIndex);

      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      animFrameIdRef.current = requestAnimationFrame(renderCanvas);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
    };
  }, [isVisible, totalFrames, renderCanvas]);

  const scrollToNext = () => {
    if (containerRef.current) {
      const nextPos = containerRef.current.offsetTop + containerRef.current.offsetHeight;
      window.scrollTo({ top: nextPos, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={containerRef}
      aria-label="Smile Transformations & Results Video Experience"
      className={`relative w-full h-[280vh] bg-slate-950 ${className}`}
    >
      {/* Pinned Sticky Viewport Container */}
      <div
        ref={stickyRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-slate-950"
      >
        {/* Full-width 16:9 Aspect Ratio Video/Canvas Wrapper */}
        <div className="relative w-full aspect-video max-h-screen flex items-center justify-center overflow-hidden shadow-2xl">
          {/* Main Rendering Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-full object-cover block"
            aria-hidden="true"
          />

          {/* Optional HTML5 Video element */}
          <video
            ref={videoRef}
            muted
            playsInline
            preload="metadata"
            className="hidden"
          />

          {/* Frame Scrubbing Progress HUD & Gallery Stages */}
          <div className="absolute top-6 left-6 z-20 flex items-center gap-3 bg-slate-900/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-sky-500/20 text-xs font-medium text-sky-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
            </span>
            <span>
              {scrollProgress < 0.35
                ? "1. Chair-Side Final Finish"
                : scrollProgress < 0.7
                ? "2. Gallery Transition"
                : "3. Smile Transformation Wall"}
            </span>
            <span className="text-slate-400">|</span>
            <span className="font-mono text-slate-300">
              {String(currentFrame + 1).padStart(2, "0")}/{totalFrames}
            </span>
          </div>

          {/* Top Progress Bar Track */}
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-800/40 z-20">
            <div
              className="h-full bg-gradient-to-r from-teal-400 via-sky-400 to-emerald-300 transition-all duration-75"
              style={{ width: `${Math.max(1, scrollProgress * 100)}%` }}
            />
          </div>

          {/* Bottom 15% White Gradient Overlay with High Readability & Contrast */}
          <div className="absolute bottom-0 inset-x-0 h-[28%] md:h-[22%] lg:h-[18%] bg-gradient-to-t from-white/85 via-white/70 to-transparent pointer-events-none z-10" />

          {/* Text Overlay & Interactive Indicator Area */}
          <div className="absolute bottom-0 inset-x-0 z-20 px-6 py-4 sm:px-10 sm:py-6 md:px-16 md:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left pointer-events-auto">
            {/* Title & Description Overlay */}
            <div className="max-w-2xl">
              <span className="inline-block text-sky-800 text-xs md:text-sm font-semibold tracking-wider uppercase mb-1 drop-shadow-sm">
                Patient Results Gallery
              </span>
              <h2 className="text-slate-950 font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight leading-tight drop-shadow-sm">
                {overlayTitle}
              </h2>
              <p className="mt-1 text-slate-800 text-xs sm:text-sm md:text-base font-medium drop-shadow-sm">
                {overlayDescription}
              </p>
            </div>

            {/* Subtle Interactive Scroll Guide / Action Button */}
            <button
              onClick={scrollToNext}
              aria-label="Scroll to view patient testimonials"
              className="group flex flex-col items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-white/80 hover:bg-white text-slate-800 shadow-md backdrop-blur-sm border border-slate-200/80 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-slate-700 group-hover:text-teal-600 transition-colors uppercase">
                {scrollProgress > 0.9 ? "View Reviews" : "Scroll Gallery"}
              </span>
              <div className="relative w-5 h-5 flex items-center justify-center text-teal-600 animate-bounce">
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
        </div>
      </div>
    </section>
  );
}
