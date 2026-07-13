"use client";

import { useEffect, useRef } from "react";

/** Fixed full-viewport backdrop: aurora blobs, grid, and canvas particles. */
export default function Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number; a: number };
    let particles: P[] = [];

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const cap = width < 768 ? 40 : 70;
      const count = Math.min(cap, Math.floor((width * height) / 22000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.4,
        hue: [217, 262, 189][Math.floor(Math.random() * 3)],
        a: Math.random() * 0.5 + 0.15,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${p.a})`;
        ctx.shadowColor = `hsla(${p.hue}, 90%, 60%, 0.8)`;
        ctx.shadowBlur = 6;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    let idleId = 0;
    const start = () => {
      resize();
      window.addEventListener("resize", resize);
      run();
    };
    const run = () => {
      if (reduced) {
        // static single frame
        ctx.clearRect(0, 0, width, height);
        for (const p of particles) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${p.hue}, 90%, 65%, ${p.a})`;
          ctx.fill();
        }
      } else {
        raf = requestAnimationFrame(draw);
      }
    };

    // Defer canvas work off the critical path so hydration settles first
    const hasIdle = typeof window.requestIdleCallback === "function";
    idleId = hasIdle
      ? window.requestIdleCallback(start, { timeout: 1500 })
      : window.setTimeout(start, 300);

    return () => {
      if (hasIdle) window.cancelIdleCallback(idleId);
      else clearTimeout(idleId);
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-0 z-0 overflow-hidden">
      {/* Aurora blobs */}
      <div className="aurora-a absolute -top-[20%] -left-[15%] h-[60vmax] w-[60vmax] rounded-full bg-neon-blue/14 animate-aurora-a" />
      <div className="aurora-b absolute -bottom-[25%] -right-[15%] h-[55vmax] w-[55vmax] rounded-full bg-neon-purple/12 animate-aurora-b" />
      <div className="aurora-c absolute top-[30%] left-[45%] h-[40vmax] w-[40vmax] rounded-full bg-neon-cyan/8 animate-aurora-c" />

      {/* Grid */}
      <div className="bg-grid absolute inset-0" />

      {/* Particles */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* Vignette to anchor content */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(5,7,15,0.8)_100%)]" />
    </div>
  );
}
