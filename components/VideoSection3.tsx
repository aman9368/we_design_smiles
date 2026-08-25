"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import VideoOverlay from "./VideoOverlay";

export interface VideoSection3Props {
  videoFramePath?: string;
  totalFrames?: number;
  overlayTitle?: string;
  overlayDescription?: string;
  className?: string;
}

export function VideoSection3({
  videoFramePath = "/videos/video_3_frames/ezgif-frame-%d.png",
  totalFrames = 40,
  overlayTitle = "Professional Clinic Design - Built for Your Comfort",
  overlayDescription = "Every space designed for your peace of mind.",
  className = "",
}: VideoSection3Props) {
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

  // 1. Intersection Observer for Lazy Loading
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

  // 2. Procedural Fallback Renderer for Continuity Walkthrough
  const drawProceduralContinuityFrame = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number, progress: number) => {
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, "#0a1622");
      bgGrad.addColorStop(0.5, "#122334");
      bgGrad.addColorStop(1, "#071018");
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height * 0.48;

      ctx.save();
      const floorGrad = ctx.createLinearGradient(0, cy, 0, height);
      floorGrad.addColorStop(0, "rgba(25, 45, 65, 0.4)");
      floorGrad.addColorStop(1, "rgba(220, 240, 255, 0.15)");
      ctx.fillStyle = floorGrad;
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(width, height);
      ctx.lineTo(cx + width * 0.38, cy);
      ctx.lineTo(cx - width * 0.38, cy);
      ctx.closePath();
      ctx.fill();

      const ceilingGrad = ctx.createLinearGradient(0, 0, 0, cy);
      ceilingGrad.addColorStop(0, "rgba(220, 245, 255, 0.2)");
      ceilingGrad.addColorStop(1, "rgba(10, 20, 30, 0)");
      ctx.fillStyle = ceilingGrad;
      ctx.fillRect(0, 0, width, cy);

      ctx.strokeStyle = "rgba(56, 189, 248, 0.12)";
      ctx.lineWidth = 1.5;
      const numLines = 14;
      const offset = (progress * 110) % (width / numLines);
      for (let i = -numLines; i <= numLines * 2; i++) {
        const startX = i * (width / numLines) + offset;
        ctx.beginPath();
        ctx.moveTo(startX, height);
        ctx.lineTo(cx + (startX - cx) * 0.18, cy);
        ctx.stroke();
      }

      if (progress < 0.42) {
        const stageProg = progress / 0.42;
        const fade = 1 - Math.max(0, (progress - 0.28) / 0.14);
        ctx.globalAlpha = Math.max(0, fade);

        const loungeX = cx;
        const loungeY = height * 0.58 + stageProg * 40;
        const loungeScale = 1 + stageProg * 0.35;

        ctx.fillStyle = "rgba(15, 28, 42, 0.9)";
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(
          loungeX - 160 * loungeScale,
          loungeY,
          320 * loungeScale,
          75 * loungeScale,
          24
        );
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "rgba(16, 185, 129, 0.7)";
        ctx.beginPath();
        ctx.arc(loungeX - 190 * loungeScale, loungeY + 20 * loungeScale, 20 * loungeScale, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx.font = `600 ${Math.max(15, Math.floor(width * 0.02))}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("SERENE PRIVATE PATIENT ARRIVAL", cx, cy - height * 0.2);

        ctx.fillStyle = "rgba(56, 189, 248, 0.85)";
        ctx.font = `400 ${Math.max(11, Math.floor(width * 0.012))}px sans-serif`;
        ctx.fillText("Zero Waiting Time • Calming Biophilic Interior", cx, cy - height * 0.13);
      }

      if (progress >= 0.28 && progress < 0.75) {
        const stageProg = (progress - 0.28) / 0.47;
        const fadeIn = Math.min(1, (progress - 0.28) / 0.1);
        const fadeOut = Math.max(0, 1 - (progress - 0.65) / 0.1);
        ctx.globalAlpha = Math.min(fadeIn, fadeOut);

        const corridorW = width * (0.34 + stageProg * 0.42);

        for (let side of [-1, 1]) {
          const panelX = cx + side * corridorW * 0.68;
          const panelW = width * 0.15;
          const panelH = height * 0.28;
          const panelY = cy - panelH * 0.4;

          ctx.fillStyle = "rgba(15, 30, 48, 0.85)";
          ctx.strokeStyle = "rgba(56, 189, 248, 0.4)";
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.roundRect(panelX - panelW / 2, panelY, panelW, panelH, 8);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = "#38bdf8";
          ctx.fillRect(panelX - panelW / 2 + 10, panelY + 12, panelW - 20, 3);

          ctx.fillStyle = "#ffffff";
          ctx.font = `500 ${Math.max(10, Math.floor(width * 0.01))}px sans-serif`;
          ctx.textAlign = "center";
          ctx.fillText(side === -1 ? "SUITE 02 READY" : "AIR HEPA PURIFIED", panelX, panelY + panelH * 0.55);
        }

        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.font = `600 ${Math.max(15, Math.floor(width * 0.02))}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("ACTIVE CLINICAL WORKFLOW", cx, cy - height * 0.24);
      }

      if (progress >= 0.58) {
        const stageProg = (progress - 0.58) / 0.42;
        const fadeIn = Math.min(1, (progress - 0.58) / 0.12);
        ctx.globalAlpha = fadeIn;

        const islandX = cx;
        const islandY = cy + 30 + (1 - stageProg) * 20;
        const islandScale = 0.9 + stageProg * 0.25;

        ctx.fillStyle = "#0f172a";
        ctx.strokeStyle = "#38bdf8";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(
          islandX - 140 * islandScale,
          islandY,
          280 * islandScale,
          90 * islandScale,
          16
        );
        ctx.fill();
        ctx.stroke();

        const hubGrad = ctx.createRadialGradient(islandX, islandY + 30, 5, islandX, islandY + 30, 80 * islandScale);
        hubGrad.addColorStop(0, "rgba(56, 189, 248, 0.45)");
        hubGrad.addColorStop(0.7, "rgba(20, 184, 166, 0.2)");
        hubGrad.addColorStop(1, "rgba(15, 23, 42, 0)");
        ctx.fillStyle = hubGrad;
        ctx.beginPath();
        ctx.arc(islandX, islandY + 30, 80 * islandScale, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#ffffff";
        ctx.font = `bold ${Math.max(11, Math.floor(13 * islandScale))}px sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("PATIENT 3D SIMULATION ACTIVE", islandX, islandY + 35);

        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.font = `600 ${Math.max(15, Math.floor(width * 0.02))}px sans-serif`;
        ctx.fillText("COLLABORATIVE DOCTOR-PATIENT SUITE", cx, cy - height * 0.24);
      }

      ctx.restore();
    },
    []
  );

  // 3. Smooth Canvas Render Loop with RequestAnimationFrame
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
      drawProceduralContinuityFrame(ctx, width, height, currentProgress);
    }

    if (videoRef.current && videoRef.current.duration) {
      const targetTime = currentProgress * videoRef.current.duration;
      if (Math.abs(videoRef.current.currentTime - targetTime) > 0.03) {
        videoRef.current.currentTime = targetTime;
      }
    }

    renderedFrameRef.current = currentTarget;
  }, [totalFrames, drawProceduralContinuityFrame]);

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

  // 5. Setup Resize Observer
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

  // 6. Scroll scrubbing listener
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
      aria-label="Clinic Continuity & Architectural Walkthrough"
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

          {/* Frame Scrubbing Progress HUD & Walkthrough Stages - Responsive for Mobile */}
          <div className="absolute top-3 left-3 sm:top-6 sm:left-6 z-20 flex items-center gap-2 sm:gap-3 bg-slate-900/80 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full border border-sky-500/20 text-[10px] sm:text-xs font-medium text-sky-200 shadow-md">
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-cyan-500"></span>
            </span>
            <span className="truncate max-w-[130px] sm:max-w-none">
              {scrollProgress < 0.38
                ? "Serene Arrival"
                : scrollProgress < 0.72
                ? "Clinic Flow"
                : "Interactive Suite"}
            </span>
            <span className="text-slate-500">|</span>
            <span className="font-mono text-slate-300">
              {String(currentFrame + 1).padStart(2, "0")}/{totalFrames}
            </span>
          </div>

          {/* Progress Bar Top Track */}
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-800/40 z-20">
            <div
              className="h-full bg-gradient-to-r from-sky-400 via-teal-400 to-indigo-400 transition-all duration-75"
              style={{ width: `${Math.max(1, scrollProgress * 100)}%` }}
            />
          </div>

          {/* Reusable VideoOverlay Child Component */}
          <VideoOverlay
            title={overlayTitle}
            description={overlayDescription}
            categoryBadge="Architectural Continuity Tour"
            actionText={scrollProgress > 0.9 ? "Explore Clinic" : "Scroll to Scrub"}
            onActionClick={scrollToNext}
          />
        </div>
      </div>
    </section>
  );
}

export { VideoOverlay };
export default VideoSection3;
