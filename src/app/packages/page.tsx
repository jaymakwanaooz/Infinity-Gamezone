"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import { Check, Zap, Crown, User, Coffee, ShieldCheck, X, CreditCard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

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
  {
    name: "Casual Drop-In",
    price: "₹69",
    duration: "Per Hour",
    description: "Get in, play a quick match, get out.",
    color: "gray-400",
    features: [
      "GTX 1660 / RTX 3050",
      "1080p 75Hz Monitor",
      "Standard Peripherals",
      "Walk-in availability",
    ],
    cta: "Play Now",
  },
  {
    name: "Streamer Pod",
    price: "₹299",
    duration: "Per Hour",
    description: "Soundproof streaming setup with pre-configured OBS & lighting.",
    color: "neon-green",
    features: [
      "Dual PC Setup",
      "Elgato Stream Deck",
      "Shure SM7B Mic",
      "Ring Light & Key Lights",
      "Soundproof Glass",
    ],
    cta: "Book Pod",
  },
  {
    name: "Night Warrior",
    price: "₹349",
    duration: "Full Night",
    description: "The ultimate overnight grinding session from 11 PM to 7 AM.",
    color: "orange-500",
    features: [
      "Access to Elite Tier PCs",
      "Free Energy Drink",
      "Late Night Eatery Access",
      "Dedicated Night Staff",
    ],
    cta: "Book Night Pass",
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
  const { isLoggedIn, login } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");
  const [error, setError] = useState("");

  const handlePackageClick = (pkg: any) => {
    setSelectedPackage(pkg);
    if (!isLoggedIn) {
      setShowAuthModal(true);
    } else {
      setShowCheckoutModal(true);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      0: { value: string };
      1: { value: string };
    };
    const user = target[0].value;
    const pass = target[1].value;

    if (user === "user" && pass === "user") {
      setError("");
      login(user);
      setShowAuthModal(false);
      setShowCheckoutModal(true);
    } else {
      setError("No user found or wrong password");
    }
  };

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

              <button 
                onClick={() => handlePackageClick(pkg)}
                className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all duration-300 ${
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

        {/* Modals */}
        <AnimatePresence>
          {showAuthModal && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="glass-panel p-8 rounded-2xl border border-neon-cyan/50 max-w-sm w-full glow-cyan shadow-xl relative"
              >
                <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
                <h3 className="text-2xl font-black mb-2 text-white uppercase tracking-wider">Access Terminal</h3>
                <p className="text-gray-400 text-sm mb-4">Login or sign up to secure your battle pass.</p>
                {error && <p className="text-red-500 text-sm mb-4 bg-red-500/10 py-2 px-3 border border-red-500/30 rounded">{error}</p>}
                <form onSubmit={handleLogin} className="space-y-4">
                  <input type="text" placeholder="Username" defaultValue="user" required className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors" />
                  <input type="password" placeholder="Password" defaultValue="user" required className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors" />
                  <button type="submit" className="w-full mt-2 py-3 bg-neon-cyan text-black font-black tracking-widest text-sm rounded-xl flex justify-center items-center hover:bg-white hover:glow-cyan transition-colors">
                    AUTHENTICATE
                  </button>
                </form>
              </motion.div>
            </motion.div>
          )}

          {showCheckoutModal && selectedPackage && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
                className="glass-panel p-8 rounded-2xl border border-neon-purple/50 max-w-md w-full glow-purple shadow-xl relative"
              >
                <button onClick={() => setShowCheckoutModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                  <X className="w-6 h-6" />
                </button>
                <h3 className="text-2xl font-black mb-2 text-white uppercase tracking-wider">Checkout Details</h3>
                <p className="text-gray-400 text-sm border-b border-white/10 pb-4 mb-6">Review your selected package and confirm your payment.</p>
                
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-8">
                   <div className="flex justify-between items-start mb-4">
                     <div>
                       <h4 className="text-xl font-bold text-white tracking-widest uppercase">{selectedPackage.name}</h4>
                       <p className="text-gray-400 text-sm">{selectedPackage.duration}</p>
                     </div>
                     <span className="text-3xl font-black text-neon-cyan drop-shadow-[0_0_8px_rgba(0,243,255,0.4)]">{selectedPackage.price}</span>
                   </div>
                   <ul className="space-y-2 mt-4 pt-4 border-t border-white/10">
                     {selectedPackage.features.slice(0, 3).map((f: string) => (
                       <li key={f} className="flex items-start text-sm text-gray-300">
                         <Check className="w-4 h-4 mr-2 mt-0.5 shrink-0 text-neon-green" /> {f}
                       </li>
                     ))}
                     {selectedPackage.features.length > 3 && (
                       <li className="text-sm text-gray-500 italic pl-6">+ More premium benefits</li>
                     )}
                   </ul>
                </div>
                
                <div className="space-y-6 mb-8">
                  <div className="flex items-center justify-between border-b border-white/10 pb-4">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Payment Source</h4>
                    <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
                      <button 
                        onClick={() => setPaymentMethod("card")}
                        className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${paymentMethod === 'card' ? 'bg-neon-purple text-white glow-purple' : 'text-gray-500 hover:text-gray-300'}`}
                      >
                        Card
                      </button>
                      <button 
                        onClick={() => setPaymentMethod("upi")}
                        className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${paymentMethod === 'upi' ? 'bg-neon-purple text-white glow-purple' : 'text-gray-500 hover:text-gray-300'}`}
                      >
                        UPI
                      </button>
                    </div>
                  </div>

                  {paymentMethod === "card" ? (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <input type="text" placeholder="Enter Name" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-purple transition-colors" />
                      <div className="relative">
                        <input type="text" placeholder="Card Number" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-neon-purple transition-colors" />
                        <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      </div>
                      <div className="flex gap-4">
                        <input type="text" placeholder="Expiry Date" className="w-1/2 bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-neon-purple transition-colors" />
                        <input type="text" placeholder="CVV" className="w-1/2 bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-neon-purple transition-colors" />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <input type="text" placeholder="Enter Name" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-purple transition-colors" />
                      <div className="relative">
                        <input type="text" placeholder="Enter UPI ID" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-neon-purple transition-colors" />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-neon-purple tracking-widest border border-neon-purple/30 px-1.5 py-0.5 rounded">UPI ID</div>
                      </div>
                      <div className="p-4 rounded-xl bg-neon-purple/5 border border-neon-purple/10 flex items-start space-x-3">
                        <ShieldCheck className="w-5 h-5 text-neon-purple shrink-0" />
                        <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-tight">
                          Please ensure you have your UPI app open on your mobile device to approve the request after hitting confirm.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex space-x-4">
                  <button onClick={() => setShowCheckoutModal(false)} className="px-6 py-3 border border-white/20 rounded-xl font-bold text-white hover:bg-white/5 transition-colors">
                    Cancel
                  </button>
                  <button onClick={() => { alert('Purchase Successful! Redirecting to Dashboard...'); setShowCheckoutModal(false); }} className="flex-1 py-3 bg-neon-purple text-white font-black text-sm tracking-widest rounded-xl flex justify-center items-center hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(192,38,211,0.5)] space-x-2">
                    <CreditCard className="w-5 h-5 mr-2" /> <span>CONFIRM PAYMENT</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
