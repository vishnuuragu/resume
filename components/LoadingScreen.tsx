"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { profile } from "@/lib/data";

export default function LoadingScreen() {
  const [done, setDone] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduced ? 50 : 1400);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-void"
          exit={{ opacity: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }}
          aria-hidden
        >
          <div className="relative flex flex-col items-center gap-6">
            <motion.div
              className="relative flex h-24 w-24 items-center justify-center rounded-2xl gradient-border"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="font-display text-3xl font-bold text-gradient">
                {profile.initials}
              </span>
              <div className="absolute inset-0 rounded-2xl bg-neon-purple/10 blur-xl" />
            </motion.div>
            <motion.div
              className="h-[2px] w-40 overflow-hidden rounded-full bg-raised"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className="h-full bg-gradient-to-r from-neon-blue via-neon-purple to-neon-cyan"
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
