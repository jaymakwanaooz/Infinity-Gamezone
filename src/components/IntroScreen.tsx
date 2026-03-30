"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2 } from "lucide-react";

export default function IntroScreen() {
  const [show, setShow] = useState(true);

  // We only run this on browser load to prevent scrolling issues with Next.js fast refresh
  // But wait, actually setTimeout to hide it is enough.
  useEffect(() => {
    // Lock scroll while intro is playing
    document.body.style.overflow = "hidden";
    
    const timer = setTimeout(() => {
      setShow(false);
      document.body.style.overflow = "";
    }, 2800); // Intro length: 2.8s total
    
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro-screen"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#09090b]"
        >
          {/* Background Ambient Glow */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute w-[500px] h-[500px] bg-neon-cyan/10 rounded-full blur-[100px] pointer-events-none"
          />
          
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
            className="flex flex-col items-center gap-6"
          >
            {/* The Floating Joystick Logo */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-neon-cyan/40 blur-2xl rounded-full"></div>
              <Gamepad2 className="w-24 h-24 text-neon-cyan relative z-10 drop-shadow-[0_0_20px_rgba(0,243,255,1)]" />
            </motion.div>
            
            {/* Logo Text Loading Sequence */}
            <motion.div 
              initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0 0)" }}
              transition={{ duration: 1, delay: 0.8, ease: "anticipate" }}
              className="text-4xl font-black tracking-widest text-white"
            >
              INFINITY<span className="text-neon-cyan text-glow-cyan">GZ</span>
            </motion.div>
            
            {/* Loading Bar */}
            <div className="w-48 h-1 bg-white/10 mt-4 rounded-full overflow-hidden">
               <motion.div 
                 initial={{ width: "0%" }}
                 animate={{ width: "100%" }}
                 transition={{ duration: 1.5, delay: 1, ease: "circInOut" }}
                 className="h-full bg-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.8)] rounded-full"
               />
            </div>
            
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
