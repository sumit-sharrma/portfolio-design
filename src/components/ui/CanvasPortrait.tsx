"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CanvasPortraitProps {
  width?: number;
  height?: number;
  className?: string;
  src?: string;
}

export function CanvasPortrait({
  width = 220,
  height = 272,
  className,
  src = "/portrait.png",
}: CanvasPortraitProps) {
  const wrapperRef: React.RefObject<HTMLDivElement | null> = React.useRef(null);
  const canvasRef: React.RefObject<HTMLCanvasElement | null> = React.useRef(null);
  const imgRef: React.RefObject<HTMLImageElement | null> = React.useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const animationRef = React.useRef<number | null>(null);

  // Source canvas dimensions (from sergzorin.com)
  const SOURCE_WIDTH = 1000;
  const SOURCE_HEIGHT = 748;
  // Visible portrait crop area in source
  const CROP_X = 240;
  const CROP_Y = 44;
  const CROP_WIDTH = 475;
  const CROP_HEIGHT = 588;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    imgRef.current = img;

    // Use a local const to satisfy TypeScript
    const canvasEl = canvas;

    img.onload = () => {
      setLoaded(true);
      setImageError(false);
      drawFrame();
    };

    img.onerror = () => {
      setImageError(true);
      drawFallback(ctx);
    };

    function drawFallback(ctx: CanvasRenderingContext2D) {
      const dpr = window.devicePixelRatio || 1;
      canvasEl.width = width * dpr;
      canvasEl.height = height * dpr;
      canvasEl.style.width = `${width}px`;
      canvasEl.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      ctx.fillStyle = "var(--color-paper)";
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = "var(--color-ink-2)";
      ctx.globalAlpha = 0.15;
      ctx.beginPath();
      ctx.ellipse(width / 2, height * 0.35, width * 0.35, height * 0.3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;

      ctx.fillStyle = "var(--color-ink-2)";
      ctx.beginPath();
      ctx.arc(width * 0.35, height * 0.3, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(width * 0.65, height * 0.3, 8, 0, Math.PI * 2);
      ctx.fill();
    }

    function drawFrame() {
      const canvas = canvasRef.current;
      const img = imgRef.current;
      if (!canvas || !img || !loaded) return;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const canvasEl = canvas;

      const dpr = window.devicePixelRatio || 1;
      canvasEl.width = width * dpr;
      canvasEl.height = height * dpr;
      canvasEl.style.width = `${width}px`;
      canvasEl.style.height = `${height}px`;
      ctx.scale(dpr, dpr);

      ctx.clearRect(0, 0, width, height);

      const maxOffsetX = (SOURCE_WIDTH - CROP_WIDTH) / 2;
      const maxOffsetY = (SOURCE_HEIGHT - CROP_HEIGHT) / 2;

      const offsetX = mousePos.x * maxOffsetX * 0.3;
      const offsetY = mousePos.y * maxOffsetY * 0.3;

      const sx = CROP_X - CROP_WIDTH / 2 + offsetX;
      const sy = CROP_Y - CROP_HEIGHT * 0.15 + offsetY;

      ctx.drawImage(img, sx, sy, CROP_WIDTH, CROP_HEIGHT, 0, 0, width, height);

      animationRef.current = requestAnimationFrame(drawFrame);
    }

    animationRef.current = requestAnimationFrame(drawFrame);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [width, height, src, loaded]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      setMousePos({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };

    const handleMouseLeave = () => {
      setMousePos({ x: 0, y: 0 });
    };

    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = wrapper.getBoundingClientRect();
      const x = (touch.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (touch.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      setMousePos({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };

    const handleTouchEnd = () => {
      setMousePos({ x: 0, y: 0 });
    };

    wrapper.addEventListener("touchmove", handleTouchMove, { passive: false });
    wrapper.addEventListener("touchend", handleTouchEnd);

    return () => {
      wrapper.removeEventListener("touchmove", handleTouchMove);
      wrapper.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <div className="portrait-slot flex justify-center" style={{ paddingBottom: "30px" }}>
      <div
        ref={wrapperRef}
        className={cn("head-turn relative overflow-visible touch-none select-none", className)}
        style={{
          width: `${width}px`,
          height: `${height}px`,
          maxWidth: `${width}px`,
          aspectRatio: "475/588",
          cursor: "pointer",
          userSelect: "none",
          WebkitUserSelect: "none",
        }}
        aria-hidden="true"
        role="img"
        aria-label="Interactive portrait - move mouse to shift perspective"
      >
        <canvas
          ref={canvasRef}
          width={1000}
          height={748}
          style={{
            position: "absolute",
            zIndex: 1,
            display: "block",
            width: "210.526%",
            height: "127.211%",
            left: "-50.526%",
            top: "-7.483%",
          }}
        />
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse, color-mix(in srgb, var(--color-ink-2) 12%, transparent), transparent 70%)",
            filter: "blur(26px)",
            inset: "18% 20%",
          }}
        />
      </div>
    </div>
  );
}