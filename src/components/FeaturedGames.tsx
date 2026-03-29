"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { ChevronRight } from "lucide-react";

const games = [
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
];

export default function FeaturedGames() {
  return (
    <section className="py-24 bg-gaming-bg relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Top Titles" 
          subtitle="Ready to Play"
          align="left"
        />

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {games.map((game, index) => (
            <motion.div
              key={game.title}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group relative aspect-[3/4] rounded-lg overflow-hidden border border-white/10 hover:border-neon-cyan transition-colors"
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
        </div>
        
        <div className="mt-12 text-center lg:text-left">
           <button className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors text-sm font-medium">
             <span>SEE ALL 50+ GAMES</span>
             <ChevronRight className="w-4 h-4" />
           </button>
        </div>
      </div>
    </section>
  );
}
