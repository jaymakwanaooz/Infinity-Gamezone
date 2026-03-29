"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import SectionHeading from "./SectionHeading";
import { Check, ArrowRight } from "lucide-react";

const miniPackages = [
  {
    name: "Classic",
    price: "₹99",
    duration: "Per Hour",
    features: ["Standard PC", "144Hz Monitor", "Gaming Mouse/Keyboard"],
    link: "/packages",
    color: "white",
  },
  {
    name: "Elite",
    price: "₹149",
    duration: "Per Hour",
    features: ["High-End PC (RTX 3080/4070)", "240Hz Monitor", "Pro Peripherals"],
    link: "/packages",
    color: "neon-cyan",
    popular: true,
  },
  {
    name: "VIP Booth",
    price: "₹499",
    duration: "Per Hour",
    features: ["Private Cabin", "RTX 4090", "500Hz Monitor", "Complimentary Drink"],
    link: "/packages",
    color: "neon-purple",
  },
];

export default function PricingSnippet() {
  return (
    <section className="py-24 bg-gaming-bg/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading 
          title="Battle Passes" 
          subtitle="Membership Plans"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {miniPackages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`relative group glass-panel rounded-2xl p-8 border-t-4 transition-all duration-300 hover:-translate-y-2 ${
                pkg.popular ? "border-neon-cyan shadow-xl shadow-neon-cyan/10" : "border-white/20"
              }`}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 bg-neon-cyan text-black text-[10px] font-bold px-3 py-1 rounded-full">
                  MOST POPULAR
                </div>
              )}
              
              <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{pkg.name}</h3>
              <div className="flex items-baseline space-x-1 mb-6">
                <span className={`text-4xl font-black ${pkg.color === 'neon-cyan' ? 'text-neon-cyan' : pkg.color === 'neon-purple' ? 'text-neon-purple' : 'text-white'}`}>
                    {pkg.price}
                </span>
                <span className="text-gray-500 text-sm font-medium">{pkg.duration}</span>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center space-x-3 text-sm text-gray-400">
                    <Check className={`w-4 h-4 flex-shrink-0 ${pkg.color === 'neon-cyan' ? 'text-neon-cyan' : pkg.color === 'neon-purple' ? 'text-neon-purple' : 'text-neon-green'}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={pkg.link}
                className={`w-full py-3 rounded-lg font-bold text-sm transition-all duration-300 flex items-center justify-center space-x-2 border ${
                  pkg.popular 
                    ? "bg-neon-cyan text-black hover:glow-cyan" 
                    : "bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20"
                }`}
              >
                <span>Select Plan</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
