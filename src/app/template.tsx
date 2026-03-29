"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  // This explicitly forces Next.js to regenerate component trees and re-fire
  // Framer Motion entry animations on every route navigation (including forward/back caching).
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }} // Useful if AnimatePresence is hooked up route-wide
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
