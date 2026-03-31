"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const gamePosters = [
  // ── LEFT SIDE ──
  // Top-left outer
  {
    src: "/images/poster_scifi.png",
    alt: "Stellar Siege",
    style: {
      top: "12%",
      left: "1%",
      width: "clamp(120px, 13vw, 220px)",
      transform: "rotate(-7deg)",
    },
    delay: 0,
  },
  // Top-left inner
  {
    src: "/images/poster_mecha.png",
    alt: "Iron Titans",
    style: {
      top: "15%",
      left: "16%",
      width: "clamp(110px, 12vw, 200px)",
      transform: "rotate(5deg)",
    },
    delay: 0.4,
  },
  // Mid-left
  {
    src: "/images/poster_fantasy.png",
    alt: "Dragon's Reign",
    style: {
      top: "42%",
      left: "0%",
      width: "clamp(115px, 12.5vw, 210px)",
      transform: "rotate(-4deg)",
    },
    delay: 0.15,
  },
  // Bottom-left outer
  {
    src: "/images/poster_battle.png",
    alt: "Warfront",
    style: {
      bottom: "2%",
      left: "1%",
      width: "clamp(120px, 13vw, 220px)",
      transform: "rotate(5deg)",
    },
    delay: 0.3,
  },
  // Bottom-left inner
  {
    src: "/images/poster_samurai.png",
    alt: "Blade of Honor",
    style: {
      bottom: "4%",
      left: "16%",
      width: "clamp(110px, 12vw, 200px)",
      transform: "rotate(-8deg)",
    },
    delay: 0.55,
  },

  // ── RIGHT SIDE ──
  // Top-right outer
  {
    src: "/images/poster_racing.png",
    alt: "Velocity X",
    style: {
      top: "12%",
      right: "1%",
      width: "clamp(120px, 13vw, 220px)",
      transform: "rotate(8deg)",
    },
    delay: 0.1,
  },
  // Top-right inner
  {
    src: "/images/poster_space.png",
    alt: "Nebula Frontier",
    style: {
      top: "15%",
      right: "16%",
      width: "clamp(110px, 12vw, 200px)",
      transform: "rotate(-5deg)",
    },
    delay: 0.5,
  },
  // Mid-right
  {
    src: "/images/poster_cyber.png",
    alt: "Shadow Protocol",
    style: {
      top: "42%",
      right: "0%",
      width: "clamp(115px, 12.5vw, 210px)",
      transform: "rotate(5deg)",
    },
    delay: 0.25,
  },
  // Bottom-right outer
  {
    src: "/images/poster_horror.png",
    alt: "Dead Awakening",
    style: {
      bottom: "2%",
      right: "1%",
      width: "clamp(120px, 13vw, 220px)",
      transform: "rotate(-6deg)",
    },
    delay: 0.35,
  },
  // Bottom-right inner
  {
    src: "/images/poster_sports.png",
    alt: "Apex League",
    style: {
      bottom: "4%",
      right: "16%",
      width: "clamp(110px, 12vw, 200px)",
      transform: "rotate(7deg)",
    },
    delay: 0.65,
  },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
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

      // Subtle parallax on posters
      gsap.to(".game-poster", {
        x: xPos * 0.25,
        y: yPos * 0.25,
        duration: 2.5,
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

      {/* Floating Game Posters - Behind Text */}
      <div className="absolute inset-0 z-[1] pointer-events-none">
        {gamePosters.map((poster, i) => (
          <motion.div
            key={poster.alt}
            className="game-poster absolute"
            style={{
              ...poster.style,
              aspectRatio: "3/4",
            }}
            initial={{ opacity: 0, scale: 0.7 }}
            whileInView={{ opacity: 0.85, scale: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 1,
              delay: 0.4 + poster.delay,
              ease: "easeOut",
            }}
          >
            <motion.div
              animate={{
                y: [0, i % 2 === 0 ? -10 : 10, 0],
                rotateZ: [0, i % 2 === 0 ? 1.5 : -1.5, 0],
              }}
              transition={{
                duration: 5 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="relative w-full h-full"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.6)] border border-white/[0.08]">
                <Image
                  src={poster.src}
                  alt={poster.alt}
                  fill
                  sizes="(max-width: 768px) 35vw, 20vw"
                  className="object-cover"
                  priority={i < 2}
                />
                {/* Light tint overlay */}
                <div className="absolute inset-0 bg-gaming-bg/30" />
                {/* Subtle neon edge glow */}
                <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-neon-cyan/10" />
              </div>
            </motion.div>
          </motion.div>
        ))}

        {/* Center vignette to ensure text pops */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_42%_48%_at_50%_45%,rgba(9,9,11,0.97)_0%,rgba(9,9,11,0.65)_55%,transparent_100%)]" />
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
