"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { ChevronRight, ChevronDown } from "lucide-react";

const allGames = [
  {
    title: "Valorant",
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop",
    category: "FPS",
  },
  {
    title: "Counter-Strike 2",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    category: "FPS",
  },
  {
    title: "League of Legends",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1870&auto=format&fit=crop",
    category: "MOBA",
  },
  {
    title: "Dota 2",
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop",
    category: "MOBA",
  },
  {
    title: "EA Sports FC 24",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    category: "Sports",
  },
  {
    title: "Overwatch 2",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop",
    category: "Hero Shooter",
  },
  {
    title: "God of War",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    category: "Action",
  },
  {
    title: "Tekken 8",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=800&auto=format&fit=crop",
    category: "Fighting",
  },
  {
    title: "Mortal Kombat 1",
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop",
    category: "Fighting",
  },
  {
    title: "Starfield",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2070&auto=format&fit=crop",
    category: "RPG",
  },
  {
    title: "Cyberpunk 2077",
    image: "https://images.unsplash.com/photo-1605898835373-05f14958c83a?q=80&w=1870&auto=format&fit=crop",
    category: "Action RPG",
  },
  {
    title: "Apex Legends",
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=800&auto=format&fit=crop",
    category: "Hero Shooter",
  },
];

export default function FeaturedGames() {
  const [expanded, setExpanded] = useState(false);
  const displayedGames = expanded ? allGames : allGames.slice(0, 6);
 
  return (
    <section className="py-24 bg-gaming-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Top Titles" 
          subtitle="Ready to Play"
          align="left"
        />
 
        <motion.div 
          layout
          transition={{
            layout: { type: "spring", stiffness: 200, damping: 25 }
          }}
          className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {displayedGames.map((game, index) => (
              <motion.div
                key={game.title}
                layout
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transition: { 
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: (index % 6) * 0.05 
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.8, 
                  y: 20,
                  transition: { duration: 0.2 }
                }}
                className="group relative aspect-[3/4] rounded-lg overflow-hidden border border-white/10 hover:border-neon-cyan transition-colors"
                whileHover={{ y: -5 }}
              >
                <Image
                  src={game.image}
                  alt={game.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gaming-bg via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-[10px] text-neon-cyan font-mono uppercase tracking-widest">{game.category}</span>
                  <h4 className="text-sm font-bold text-white uppercase mt-1 tracking-tight">{game.title}</h4>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        <div className="mt-12 text-center lg:text-left">
           <motion.button 
             onClick={() => setExpanded(!expanded)}
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className={`inline-flex items-center space-x-2 transition-all text-sm font-black uppercase tracking-widest px-4 py-2 rounded-lg border ${
               expanded 
                 ? 'text-neon-cyan border-neon-cyan/50 bg-neon-cyan/5 glow-cyan' 
                 : 'text-gray-400 border-white/10 hover:text-white hover:border-white/20'
             }`}
           >
             <span>{expanded ? 'SHOW LESS' : 'SEE ALL GAMES'}</span>
             <motion.div
               animate={{ rotate: expanded ? 180 : 0 }}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
             >
               <ChevronDown className="w-4 h-4" />
             </motion.div>
           </motion.button>
        </div>
      </div>
    </section>
  );
}
