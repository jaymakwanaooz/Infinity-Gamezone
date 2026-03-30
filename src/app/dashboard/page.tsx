"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, History, Trophy, CreditCard, ChevronRight, X, Clock, Star, Gamepad2 } from "lucide-react";

const HISTORY_DATA = [
  { id: "TX1204", date: "Oct 24, 2026", type: "Top-up +500", amount: "+500 C", status: "Completed" },
  { id: "TX1203", date: "Oct 22, 2026", type: "Tournament: CS2 Open", amount: "-150 C", status: "Completed" },
  { id: "TX1202", date: "Oct 18, 2026", type: "Day Pass Bundle", amount: "-300 C", status: "Completed" },
];

export default function Dashboard() {
  const [credits, setCredits] = useState(1450);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [amount, setAmount] = useState(500);

  const handleTopup = () => {
    setCredits((prev) => prev + amount);
    setShowTopUpModal(false);
  };

  return (
    <div className="space-y-10 relative">
      {/* Header & Ledger */}
      {/* Header & Stats Grid */}
      <header className="space-y-6 pb-6 border-b border-gaming-border">
        <div>
          <h1 className="text-4xl font-black tracking-wider text-white">
            USER <span className="text-neon-cyan text-glow-cyan">COMMAND</span>
          </h1>
          <p className="text-gray-400 mt-2 font-medium">Review your progression, stats, and top up your credits.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Animated Credit Ledger */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-panel p-5 rounded-2xl border border-neon-cyan/30 flex items-center space-x-4 group hover:border-neon-cyan/60 transition-colors"
          >
            <div className="bg-neon-cyan/20 p-3 rounded-xl glow-cyan group-hover:bg-neon-cyan/30 transition-colors">
              <Coins className="w-6 h-6 text-neon-cyan" />
            </div>
            <div>
              <p className="text-xs text-neon-cyan/80 font-bold tracking-widest uppercase mb-1">Balance</p>
              <motion.div 
                key={credits}
                initial={{ scale: 1.2, color: "#fff" }}
                animate={{ scale: 1, color: "#fff" }}
                className="text-2xl font-mono font-black text-white"
              >
                C {credits.toLocaleString()}
              </motion.div>
            </div>
          </motion.div>

          {/* Loyalty Points */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-panel p-5 rounded-2xl border border-neon-purple/30 flex flex-col justify-center space-y-2 group hover:border-neon-purple/60 transition-colors"
          >
            <div className="flex items-center space-x-3">
              <div className="bg-neon-purple/20 p-2 rounded-lg glow-purple">
                <Star className="w-5 h-5 text-neon-purple mt-0.5" />
              </div>
              <div>
                <p className="text-xs text-neon-purple/80 font-bold tracking-widest uppercase">Loyalty Points</p>
                <div className="text-lg font-mono font-black text-white">4,250 <span className="text-xs font-sans text-gray-400 font-medium ml-1">/ 5,000 (Silver)</span></div>
              </div>
            </div>
            <div className="w-full bg-white/10 rounded-full h-1.5 mt-2">
               <div className="bg-neon-purple h-1.5 rounded-full glow-purple transition-all duration-1000" style={{ width: '85%' }}></div>
            </div>
          </motion.div>

          {/* Time Played */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="glass-panel p-5 rounded-2xl border border-neon-green/30 flex items-center space-x-4 group hover:border-neon-green/60 transition-colors"
          >
            <div className="bg-neon-green/20 p-3 rounded-xl glow-green group-hover:bg-neon-green/30 transition-colors">
              <Clock className="w-6 h-6 text-neon-green" />
            </div>
            <div>
              <p className="text-xs text-neon-green/80 font-bold tracking-widest uppercase mb-1">Time Played</p>
              <div className="text-2xl font-mono font-black text-white">142<span className="text-sm font-sans text-gray-400 ml-1">Hrs</span></div>
            </div>
          </motion.div>

          {/* Favorite Games */}
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-panel p-5 rounded-2xl border border-white/10 flex items-center space-x-4 group hover:border-white/30 transition-colors"
          >
            <div className="bg-white/5 p-3 rounded-xl group-hover:bg-white/10 transition-colors">
              <Gamepad2 className="w-6 h-6 text-gray-300" />
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold tracking-widest uppercase mb-1">Top Games</p>
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-white border border-white/5">CS2</span>
                <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-white border border-white/5">VAL</span>
                <span className="text-xs font-bold bg-white/10 px-2 py-1 rounded text-white border border-white/5">RL</span>
              </div>
            </div>
          </motion.div>

        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Actions Panel */}
        <div className="col-span-1 space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
          
          <button 
            onClick={() => setShowTopUpModal(true)}
            className="w-full group relative flex items-center justify-between p-6 bg-neon-cyan/10 border border-neon-cyan/30 rounded-xl hover:bg-neon-cyan/20 transition-all glow-cyan"
          >
            <div className="flex items-center space-x-4">
              <CreditCard className="w-6 h-6 text-neon-cyan group-hover:scale-110 transition-transform" />
              <span className="font-bold text-lg">Top-up Credits</span>
            </div>
            <ChevronRight className="w-5 h-5 text-neon-cyan" />
          </button>

          <button className="w-full group flex items-center justify-between p-6 glass-panel rounded-xl hover:border-neon-purple hover:bg-neon-purple/5 transition-all">
            <div className="flex items-center space-x-4">
              <Trophy className="w-6 h-6 text-gray-400 group-hover:text-neon-purple group-hover:scale-110 transition-all" />
              <span className="font-bold text-lg text-gray-300 group-hover:text-white">Active Tournaments</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-neon-purple" />
          </button>
        </div>

        {/* History Table */}
        <div className="col-span-1 lg:col-span-2">
          <div className="glass-panel rounded-2xl border border-gaming-border p-6 h-full">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center space-x-2">
                <History className="w-5 h-5 text-neon-cyan" />
                <span>Purchase History</span>
              </h2>
            </div>
            
            <div className="overflow-x-auto rounded-lg border border-white/5 bg-black/20">
              <table className="w-full min-w-[600px] text-left text-sm whitespace-nowrap">
                <thead className="bg-white/5 text-gray-400 border-b border-white/10 uppercase font-mono text-xs">
                  <tr>
                    <th className="px-6 py-4 font-semibold tracking-wider">Transaction</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Amount</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-transparent">
                  {HISTORY_DATA.map((tx) => (
                    <motion.tr 
                      key={tx.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-white/5 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-white">{tx.type}</td>
                      <td className="px-6 py-4 text-gray-400">{tx.date}</td>
                      <td className={`px-6 py-4 font-mono font-bold ${tx.amount.startsWith('+') ? 'text-neon-green' : 'text-gray-300'}`}>
                        {tx.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center space-x-2 px-2.5 py-0.5 rounded-full text-xs font-medium bg-neon-green/10 text-neon-green border border-neon-green/20">
                          {tx.status}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Top-up Modal */}
      <AnimatePresence>
        {showTopUpModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="glass-panel p-8 rounded-2xl border border-neon-cyan/50 max-w-sm w-full glow-cyan shadow-xl relative"
            >
              <button 
                onClick={() => setShowTopUpModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
              
              <h3 className="text-2xl font-black mb-2 text-white">QUICK TOP-UP</h3>
              <p className="text-gray-400 text-sm mb-6 pb-4 border-b border-white/10">Select an amount to recharge your account credits instantly via Stripe.</p>
              
              <div className="space-y-3 mb-8">
                {[100, 500, 1000, 5000].map((val) => (
                  <button
                    key={val}
                    onClick={() => setAmount(val)}
                    className={`w-full py-3 rounded-lg font-mono font-bold border transition-all ${
                      amount === val 
                        ? "bg-neon-cyan text-black border-neon-cyan glow-cyan" 
                        : "bg-black/40 text-gray-300 border-white/10 hover:border-neon-cyan/50"
                    }`}
                  >
                    + {val} Credits
                  </button>
                ))}
              </div>
              
              <button 
                onClick={handleTopup}
                className="w-full py-4 bg-white text-black font-black text-lg rounded-xl flex justify-center items-center hover:bg-gray-200 transition-colors"
              >
                PAY WITH STRIPE
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
