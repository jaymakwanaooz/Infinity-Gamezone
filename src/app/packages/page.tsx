"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import { Check, Zap, Crown, User, Coffee, ShieldCheck } from "lucide-react";

const packages = [
  {
    name: "Standard",
    price: "₹99",
    duration: "Per Hour",
    description: "Perfect for casual gaming and social play.",
    color: "blue-500",
    features: [
      "RTX 3060 / 3070 Builds",
      "144Hz IPS Monitor",
      "Full Library Access",
      "Discord Access",
      "Soft Drinks Available",
    ],
    cta: "Start Playing",
  },
  {
    name: "Pro Elite",
    price: "₹149",
    duration: "Per Hour",
    description: "Built for eSports pros and competitive grinders.",
    color: "neon-cyan",
    popular: true,
    features: [
      "RTX 4080 Super Builds",
      "240Hz / 360Hz Monitors",
      "Zowie / Razer Peripherals",
      "Zero-Latency Network",
      "Priority Support",
      "Pro Coaching Access",
    ],
    cta: "Join the Elite",
  },
  {
    name: "VIP Suite",
    price: "₹499",
    duration: "Per Hour",
    description: "Exclusive private gaming experience with premium service.",
    color: "neon-purple",
    features: [
      "Private Soundproof Booth",
      "RTX 4090 Monster PC",
      "500Hz Alienware Monitor",
      "Herman Miller Seating",
      "Free Gourmet Coffee & Snacks",
      "Dedicated Staff Assistant",
    ],
    cta: "Book the Suite",
  },
];

const memberships = [
  {
    title: "Night Owl Pass",
    time: "10 PM - 8 AM",
    price: "₹599",
    benefits: ["Unlimited PC access", "Free Red Bull", "20% off Food"],
    icon: <Zap className="w-5 h-5 text-neon-cyan" />,
  },
  {
    title: "Pro Member",
    time: "Monthly",
    price: "₹2,999",
    benefits: ["50 Hours + 10 Bonus", "Tournament Entry Discounts", "Personal Peripheral Locker"],
    icon: <Crown className="w-5 h-5 text-neon-purple" />,
  },
];

export default function PackagesPage() {
  return (
    <div className="min-h-screen bg-gaming-bg">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading 
          title="Battle Passes" 
          subtitle="Simple Pricing, Unfair Advantage"
        />

        {/* Hourly Packages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative glass-panel rounded-3xl p-10 border transition-all duration-500 hover:scale-[1.02] ${
                pkg.popular 
                  ? "border-neon-cyan/50 shadow-2xl shadow-neon-cyan/10" 
                  : "border-white/5 hover:border-white/20"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-neon-cyan text-black text-xs font-black px-6 py-2 rounded-full uppercase tracking-widest glow-cyan">
                  Recommended
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-black text-white italic mb-2 uppercase tracking-tight">{pkg.name}</h3>
                <p className="text-gray-400 text-sm">{pkg.description}</p>
              </div>

              <div className="flex items-baseline space-x-2 mb-10">
                <span className={`text-6xl font-black tracking-tighter ${pkg.popular ? 'text-neon-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.4)]' : 'text-white'}`}>
                  {pkg.price}
                </span>
                <span className="text-gray-500 font-mono text-sm">{pkg.duration}</span>
              </div>

              <ul className="space-y-4 mb-12">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-start space-x-3 text-sm text-gray-300">
                    <Check className={`w-5 h-5 shrink-0 ${pkg.popular ? 'text-neon-cyan' : 'text-neon-purple'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 ${
                pkg.popular 
                  ? "bg-neon-cyan text-black hover:bg-white hover:glow-cyan" 
                  : "bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20"
              }`}>
                {pkg.cta}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Bulk Memberships */}
        <div className="mt-32">
           <div className="flex items-center space-x-4 mb-12">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
              <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter px-4">Membership Tiers</h2>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {memberships.map((membership, i) => (
                <motion.div
                  key={membership.title}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="glass-panel p-8 rounded-2xl flex flex-col sm:flex-row items-center sm:items-start justify-between gap-8 border-l-4 border-neon-purple/50"
                >
                  <div className="space-y-4 text-center sm:text-left">
                    <div className="flex items-center justify-center sm:justify-start space-x-3">
                      <div className="p-2 rounded-lg bg-neon-purple/10 border border-neon-purple/20">
                        {membership.icon}
                      </div>
                      <h4 className="text-xl font-bold text-white uppercase">{membership.title}</h4>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                       {membership.benefits.map(b => (
                         <span key={b} className="text-[10px] font-mono uppercase px-2 py-1 bg-white/5 border border-white/10 text-gray-400 rounded">
                           {b}
                         </span>
                       ))}
                    </div>
                  </div>
                  <div className="flex flex-col items-center sm:items-end justify-center">
                    <span className="text-sm font-mono text-neon-purple mb-1">{membership.time}</span>
                    <span className="text-3xl font-black text-white">{membership.price}</span>
                  </div>
                </motion.div>
              ))}
           </div>
        </div>

        {/* Global Features Table */}
        <section className="mt-32 p-12 glass-panel rounded-3xl border border-white/5 relative overflow-hidden text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-cyan/5 rounded-full blur-3xl pointer-events-none" />
            <h3 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4">The Infinity Guarantee</h3>
            <p className="text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
              Every system is overclocked, every keyboard is mechanical, and every connection is high-speed fiber. 
              No compromises on your performance.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
               {[
                 { icon: <Zap className="w-5 h-5" />, label: "Gigabit Fiber" },
                 { icon: <User className="w-5 h-5" />, label: "Pro Coaching" },
                 { icon: <Coffee className="w-5 h-5" />, label: "Gamer Snacks" },
                 { icon: <ShieldCheck className="w-5 h-5" />, label: "secure storage" }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center space-y-3">
                   <div className="p-3 rounded-full bg-white/5 text-neon-cyan border border-white/10 tracking-widest">
                     {item.icon}
                   </div>
                   <span className="text-xs font-black uppercase text-gray-500 tracking-widest">{item.label}</span>
                 </div>
               ))}
            </div>
        </section>
      </main>
    </div>
  );
}
