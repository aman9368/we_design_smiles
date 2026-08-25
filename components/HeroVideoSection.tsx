"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";

export interface HeroVideoSectionProps {
  videoFramePath?: string;
  totalFrames?: number;
  overlayTitle?: string;
  overlayDescription?: string;
  className?: string;
}

export default function HeroVideoSection({
  videoFramePath = "/videos/video_1_frames/ezgif-frame-%d.png",
  totalFrames = 40,
  overlayTitle = "We Design Smiles - Professional Dental Care",
  overlayDescription = "Your journey to perfect smiles starts here.",
  className = "",
}: HeroVideoSectionProps) {
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

  // 2. Procedural Fallback Renderer for Dental Clinic Walkthrough
  const drawProceduralClinicFrame = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) => {
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#0e1a24");
      bgGrad.addColorStop(0.5, "#152433");
      bgGrad.addColorStop(1, "#0a131c");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.48;

      ctx.save();
      const floorGrad = ctx.createLinearGradient(0, cy, 0, height);
      floorGrad.addColorStop(0, "rgba(30, 48, 64, 0.4)");
      floorGrad.addColorStop(1, "rgba(220, 235, 245, 0.15)");
      ctx.fillStyle = floorGrad;
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(width, height);
      ctx.lineTo(cx + width * 0.35, cy);
      ctx.lineTo(cx - width * 0.35, cy);
      ctx.closePath();
      ctx.fill();

      const lightGrad = ctx.createLinearGradient(0, 0, 0, cy);
      lightGrad.addColorStop(0, "rgba(230, 245, 255, 0.2)");
      lightGrad.addColorStop(1, "rgba(20, 35, 50, 0)");
      ctx.fillStyle = lightGrad;
      ctx.fillRect(0, 0, width, cy);

      ctx.strokeStyle = "rgba(125, 195, 245, 0.12)";
      ctx.lineWidth = 1.5;
      const numLines = 14;
      const offset = (progress * 120) % (width / numLines);
      for (let i = -numLines; i <= numLines * 2; i++) {
        const startX = i * (width / numLines) + offset;
        ctx.beginPath();
        ctx.moveTo(startX, height);
        ctx.lineTo(cx + (startX - cx) * 0.15, cy);
        ctx.stroke();
      }

      if (progress < 0.4) {
        const stageProg = progress / 0.4;
        const scale = 1 + stageProg * 0.4;
        const fade = 1 - Math.max(0, (progress - 0.28) / 0.12);

        ctx.globalAlpha = Math.max(0, fade);
        const deskW = width * 0.48 * scale;
        const deskH = height * 0.22 * scale;
        const deskX = cx - deskW / 2;
        const deskY = height * 0.58 + stageProg * height * 0.15;

        const deskGlow = ctx.createLinearGradient(deskX, deskY, deskX + deskW, deskY + deskH);
        deskGlow.addColorStop(0, "#00c2cb");
        deskGlow.addColorStop(0.5, "#0284c7");
        deskGlow.addColorStop(1, "#38bdf8");

        ctx.fillStyle = "rgba(15, 28, 40, 0.85)";
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(deskX, deskY, deskW, deskH, 16);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = deskGlow;
        ctx.fillRect(deskX + 20, deskY + deskH - 12, deskW - 40, 4);

        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.font = `600 ${Math.max(16, Math.floor(width * 0.024 * (1 - stageProg * 0.3)))}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("WE DESIGN SMILES", cx, cy - height * 0.15 - stageProg * 40);

        ctx.fillStyle = "rgba(56, 189, 248, 0.8)";
        ctx.font = `400 ${Math.max(11, Math.floor(width * 0.012))}px sans-serif`;
        ctx.fillText("RECEPTION & CONSULTATION LOUNGE", cx, cy - height * 0.09 - stageProg * 35);
      }

      if (progress >= 0.25 && progress < 0.75) {
        const stageProg = (progress - 0.25) / 0.5;
        const fadeIn = Math.min(1, (progress - 0.25) / 0.1);
        const fadeOut = Math.max(0, 1 - (progress - 0.65) / 0.1);
        ctx.globalAlpha = Math.min(fadeIn, fadeOut);

        const corridorWidth = width * (0.35 + stageProg * 0.45);

        const leftGrad = ctx.createLinearGradient(cx - corridorWidth, 0, cx - corridorWidth * 0.5, 0);
        leftGrad.addColorStop(0, "rgba(56, 189, 248, 0.25)");
        leftGrad.addColorStop(1, "rgba(56, 189, 248, 0.02)");
        ctx.fillStyle = leftGrad;
        ctx.fillRect(0, cy * 0.3, cx - corridorWidth * 0.5, height * 0.65);

        const rightGrad = ctx.createLinearGradient(cx + corridorWidth * 0.5, 0, cx + corridorWidth, 0);
        rightGrad.addColorStop(0, "rgba(56, 189, 248, 0.02)");
        rightGrad.addColorStop(1, "rgba(56, 189, 248, 0.25)");
        ctx.fillStyle = rightGrad;
        ctx.fillRect(cx + corridorWidth * 0.5, cy * 0.3, width, height * 0.65);

        ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
        ctx.font = `500 ${Math.max(14, Math.floor(width * 0.018))}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("SUITE 01 • ADVANCED ORAL CARE & IMPLANTOLOGY", cx, cy - height * 0.12);
      }

      if (progress >= 0.6) {
        const stageProg = (progress - 0.6) / 0.4;
        const fadeIn = Math.min(1, (progress - 0.6) / 0.12);
        ctx.globalAlpha = fadeIn;

        const chairX = cx;
        const chairY = height * 0.45 + (1 - stageProg) * 30;
        const chairScale = 0.85 + stageProg * 0.45;

        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(chairX - 80 * chairScale, chairY - 140 * chairScale, 35 * chairScale, 0, Math.PI * 2);
        ctx.stroke();

        const lightCone = ctx.createRadialGradient(
          chairX - 80 * chairScale,
          chairY - 140 * chairScale,
          10,
          chairX - 80 * chairScale,
          chairY,
          220 * chairScale
        );
        lightCone.addColorStop(0, "rgba(255, 255, 255, 0.35)");
        lightCone.addColorStop(0.4, "rgba(56, 189, 248, 0.15)");
        lightCone.addColorStop(1, "rgba(56, 189, 248, 0)");
        ctx.fillStyle = lightCone;
        ctx.beginPath();
        ctx.moveTo(chairX - 80 * chairScale, chairY - 140 * chairScale);
        ctx.lineTo(chairX - 220 * chairScale, chairY + 120 * chairScale);
        ctx.lineTo(chairX + 80 * chairScale, chairY + 120 * chairScale);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "#1e293b";
        ctx.strokeStyle = "#0284c7";
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.roundRect(chairX - 35 * chairScale, chairY - 60 * chairScale, 70 * chairScale, 35 * chairScale, 8);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.roundRect(chairX - 55 * chairScale, chairY - 20 * chairScale, 110 * chairScale, 90 * chairScale, 12);
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.roundRect(chairX - 70 * chairScale, chairY + 75 * chairScale, 140 * chairScale, 80 * chairScale, 12);
        ctx.fill();
        ctx.stroke();

        const monitorX = chairX + 130 * chairScale;
        const monitorY = chairY - 50 * chairScale;
        ctx.fillStyle = "#0f172a";
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(monitorX, monitorY, 80 * chairScale, 55 * chairScale, 6);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#38bdf8";
        ctx.font = `600 ${Math.max(8, Math.floor(10 * chairScale))}px sans-serif`;
        ctx.fillText("3D SCAN ACTIVE", monitorX + 40 * chairScale, monitorY + 20 * chairScale);

        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.font = `600 ${Math.max(15, Math.floor(width * 0.02))}px sans-serif`;
        ctx.fillText("DOCTOR'S EXAMINATION & TREATMENT SUITE", cx, cy - height * 0.28);
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
      drawProceduralClinicFrame(ctx, width, height, currentProgress);
    }

    if (videoRef.current && videoRef.current.duration) {
      const targetTime = currentProgress * videoRef.current.duration;
      if (Math.abs(videoRef.current.currentTime - targetTime) > 0.03) {
        videoRef.current.currentTime = targetTime;
      }
    }

    renderedFrameRef.current = currentTarget;
  }, [totalFrames, drawProceduralClinicFrame]);

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

  // 6. Scroll scrubbing listener attached to scroll container
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
      aria-label="Clinic Walkthrough Video Experience"
      className={`relative w-full h-[280vh] bg-slate-950 ${className}`}
    >
      {/* Sticky Viewport Container */}
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

          {/* Frame Scrubbing Progress HUD & Walkthrough Stages */}
          <div className="absolute top-6 left-6 z-20 flex items-center gap-3 bg-slate-900/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-sky-500/20 text-xs font-medium text-sky-200">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
            </span>
            <span>
              {scrollProgress < 0.35
                ? "1. Reception Lounge"
                : scrollProgress < 0.7
                ? "2. Sterilization Corridor"
                : "3. Treatment Suite"}
            </span>
            <span className="text-slate-400">|</span>
            <span className="font-mono text-slate-300">
              {String(currentFrame + 1).padStart(2, "0")}/{totalFrames}
            </span>
          </div>

          {/* Progress Bar Top Track */}
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-800/40 z-20">
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-teal-400 to-cyan-300 transition-all duration-75"
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
                Cinematic Walkthrough
              </span>
              <h1 className="text-slate-950 font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-4xl tracking-tight leading-tight drop-shadow-sm">
                {overlayTitle}
              </h1>
              <p className="mt-1 text-slate-800 text-xs sm:text-sm md:text-base font-medium drop-shadow-sm">
                {overlayDescription}
              </p>
            </div>

            {/* Subtle Interactive Scroll Guide / Arrow */}
            <button
              onClick={scrollToNext}
              aria-label="Scroll to explore clinic services"
              className="group flex flex-col items-center justify-center gap-1.5 py-2 px-4 rounded-xl bg-white/80 hover:bg-white text-slate-800 shadow-md backdrop-blur-sm border border-slate-200/80 transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-slate-700 group-hover:text-sky-600 transition-colors uppercase">
                {scrollProgress > 0.9 ? "Explore More" : "Scroll to Scrub"}
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
        </div>
      </div>
    </section>
  );
}
