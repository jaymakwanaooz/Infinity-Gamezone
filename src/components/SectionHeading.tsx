"use client";

import { motion } from "framer-motion";

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: "left" | "center";
}

export default function SectionHeading({ title, subtitle, align = "center" }: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${align === "center" ? "text-center" : "text-left"}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="inline-block"
      >
        <span className="text-neon-cyan font-mono text-xs tracking-[0.3em] uppercase mb-4 block">
          {subtitle || "Level Up"}
        </span>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase italic">
          {title}
        </h2>
        <div className={`h-1 w-24 bg-gradient-to-r from-neon-cyan to-neon-purple mt-4 ${align === "center" ? "mx-auto" : ""}`} />
      </motion.div>
    </div>
  );
}
