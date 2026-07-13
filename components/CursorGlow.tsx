"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/** Soft radial glow + dot that trails the pointer. Desktop (fine pointer) only. */
export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const reduced = useReducedMotion();

  const mx = useMotionValue(-400);
  const my = useMotionValue(-400);
  const glowX = useSpring(mx, { damping: 30, stiffness: 200, mass: 0.6 });
  const glowY = useSpring(my, { damping: 30, stiffness: 200, mass: 0.6 });
  const dotX = useSpring(mx, { damping: 40, stiffness: 900, mass: 0.2 });
  const dotY = useSpring(my, { damping: 40, stiffness: 900, mass: 0.2 });

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);
    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [mx, my]);

  if (!enabled || reduced) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[3] h-[520px] w-[520px] rounded-full"
        style={{
          x: glowX,
          y: glowY,
          translateX: "-50%",
          translateY: "-50%",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.09) 0%, rgba(139,92,246,0.05) 40%, transparent 70%)",
        }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed z-[90] h-2 w-2 rounded-full bg-neon-cyan/80 shadow-[0_0_12px_rgba(6,182,212,0.9)]"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
