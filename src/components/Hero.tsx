"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Parallax background glow using GSAP
    if (!containerRef.current) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const xPos = (clientX / window.innerWidth - 0.5) * 40;
      const yPos = (clientY / window.innerHeight - 0.5) * 40;
      
      gsap.to(".hero-glow", {
        x: xPos,
        y: yPos,
        duration: 2,
        ease: "power2.out",
      });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden bg-gaming-bg pt-20"
    >
      {/* Background Glow Effects */}
      <div className="absolute inset-0 z-0">
        <div className="hero-glow absolute top-[20%] left-[20%] w-[40vw] h-[40vw] bg-neon-cyan/15 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        <div className="hero-glow absolute bottom-[10%] right-[10%] w-[35vw] h-[35vw] bg-neon-purple/15 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
        
        {/* Animated Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_10%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center space-x-2 glass-panel px-4 py-2 rounded-full mb-8 border-neon-green/20"
        >
          <span className="w-2 h-2 rounded-full bg-neon-green glow-green animate-pulse" />
          <span className="text-sm font-mono tracking-wider text-gray-300">SYSTEMS ONLINE • READY TO PLAY</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600 mb-6"
        >
          ENTER THE
          <br />
          <span className="text-neon-cyan text-glow-cyan drop-shadow-2xl selection:text-white">INFINITY</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-2xl mx-auto text-lg md:text-xl text-gray-400 mb-10 font-medium"
        >
          Premium high-end setups. Immersive VR. Competitive eSports tournaments. Your ultimate gaming destination awaits.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
          className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto"
        >
          <Link
            href="/packages"
            className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-black transition-all duration-200 bg-neon-cyan rounded-md overflow-hidden hover:scale-105 active:scale-95 glow-cyan w-full sm:w-auto"
          >
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
            <span className="relative flex items-center gap-2">
              BOOK YOUR SETUP
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          <Link
            href="/tournaments"
            className="glass-panel px-8 py-4 rounded-md font-bold text-white tracking-wide border-t border-white/10 hover:border-neon-purple hover:text-neon-purple hover:glow-purple transition-all duration-300 w-full sm:w-auto"
          >
            JOIN TOURNAMENTS
          </Link>
        </motion.div>
      </div>
      
      {/* Bottom fade out */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gaming-bg to-transparent z-10 pointer-events-none" />
    </section>
  );
}
