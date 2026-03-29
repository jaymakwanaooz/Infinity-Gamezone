"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeading from "./SectionHeading";
import { Monitor, Gamepad, Eye } from "lucide-react";

const zones = [
  {
    title: "Pro PC Specs",
    description: "RTX 4090, Intel i9-14900K, 64GB DDR5, and 360Hz Zowie monitors for the ultimate competitive edge.",
    image: "/images/pc_setup.png",
    icon: <Monitor className="w-6 h-6 text-neon-cyan" />,
    stats: ["RTX 4090", "360Hz", "i9-14900K"],
    color: "neon-cyan",
  },
  {
    title: "Console Lounge",
    description: "PS5 and Xbox Series X setups with 75\" 4K OLED displays and premium couch seating for groups.",
    image: "/images/console_zone.png",
    icon: <Gamepad className="w-6 h-6 text-neon-purple" />,
    stats: ["PS5 / Xbox", "4K OLED", "75\" Screens"],
    color: "neon-purple",
  },
  {
    title: "VR Arena",
    description: "Fully immersive wireless VR experience with the latest headsets and large scale tracking arena.",
    image: "/images/vr_arena.png",
    icon: <Eye className="w-6 h-6 text-neon-green" />,
    stats: ["Wireless VR", "Full Track", "Immersive"],
    color: "neon-green",
  },
];

export default function GamingZone() {
  return (
    <section className="py-24 bg-gaming-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading 
          title="Battle Stations" 
          subtitle="Precision Engineering"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {zones.map((zone, index) => (
            <motion.div
              key={zone.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group glass-panel rounded-2xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={zone.image}
                  alt={zone.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gaming-bg via-transparent to-transparent opacity-60" />
              </div>

              <div className="p-8">
                <div className="flex items-center space-x-3 mb-4">
                  <div className={`p-2 rounded-lg bg-${zone.color}/10 border border-${zone.color}/20`}>
                    {zone.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-white tracking-tight">{zone.title}</h3>
                </div>
                
                <p className="text-gray-400 mb-8 leading-relaxed">
                  {zone.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {zone.stats.map((stat) => (
                    <span 
                      key={stat}
                      className={`text-[10px] font-mono uppercase tracking-widest px-2 py-1 rounded bg-white/5 border border-white/10 text-gray-300`}
                    >
                      {stat}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none" />
    </section>
  );
}
