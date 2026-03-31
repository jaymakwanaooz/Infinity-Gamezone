"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, History, Trophy, CreditCard, ChevronRight, X, Clock, Star, Gamepad2, UserPlus, Swords, ArrowUpRight, ArrowDownLeft, ShieldCheck, CheckCircle2, XCircle, Activity } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const CREDITS_HISTORY = [
  { id: "CR1204", date: "Oct 24, 2026", type: "Top-up via Stripe", amount: "+500 C", status: "Completed" },
  { id: "CR1203", date: "Oct 22, 2026", type: "Tournament Entry: CS2 Open", amount: "-150 C", status: "Completed" },
  { id: "CR1202", date: "Oct 18, 2026", type: "Day Pass Bundle Purchase", amount: "-300 C", status: "Completed" },
  { id: "CR1201", date: "Oct 10, 2026", type: "Referral Bonus", amount: "+100 C", status: "Completed" },
];

const TOURNAMENT_HISTORY = [
  { id: "TN1001", name: "Valorant Open S3", date: "Sep 15, 2026", placement: "#2", prize: "C 20,000", status: "Finished" },
  { id: "TN1002", name: "CS2 Weekly Cup #8", date: "Aug 28, 2026", placement: "#5", prize: "—", status: "Finished" },
  { id: "TN1003", name: "Valorant Open S4", date: "April 15, 2024", placement: "—", prize: "—", status: "Registered" },
];

const PAYMENT_HISTORY = [
  { id: "PY2001", date: "Oct 24, 2026", method: "Visa •••• 4242", amount: "₹500", type: "Top-up", status: "Success" },
  { id: "PY2002", date: "Oct 01, 2026", method: "UPI — user@paytm", amount: "₹1,200", type: "Night Warrior Pass", status: "Success" },
  { id: "PY2003", date: "Sep 12, 2026", method: "Visa •••• 4242", amount: "₹300", type: "Day Pass", status: "Success" },
  { id: "PY2004", date: "Aug 05, 2026", method: "UPI — user@paytm", amount: "₹2,000", type: "Top-up", status: "Refunded" },
];

const ACTIVITY_DATA = [
  4, 6, 3, 7, 2, 8, 4, 1, 5, 6, 2, 4, 3, 7, 5, 8, 6, 4, 2, 8, 3, 5, 6, 4, 7, 3, 5, 8, 4, 6
];

function ActivityGraph() {
  const points = ACTIVITY_DATA.map((h, i) => `${(i * 30)} ${100 - (h * 10)}`).join(" L ");
  const linePath = `M ${points}`;
  const areaPath = `M ${points} L 870 100 L 0 100 Z`;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="glass-panel p-8 rounded-2xl border border-white/5 space-y-6 overflow-hidden relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      <div className="flex items-center justify-between relative">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-neon-cyan/10 rounded-xl border border-neon-cyan/20">
            <Activity className="w-6 h-6 text-neon-cyan" />
          </div>
          <div>
             <h4 className="text-sm font-black text-white uppercase tracking-widest leading-none mb-1">SYSTEM ACTIVITY TERMINAL</h4>
             <p className="text-[10px] text-gray-500 font-bold uppercase tracking-tight">Active synchronization with gaming node infinity-gz-01</p>
          </div>
        </div>
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex flex-col items-end">
             <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Total Playtime</span>
             <span className="text-sm font-mono font-black text-white">142.5 HRS</span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-black bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/30 px-3 py-1 rounded-full uppercase glow-cyan tracking-widest">LAST 30 DAYS</span>
          </div>
        </div>
      </div>

      <div className="h-48 w-full relative pt-4">
        {/* Y Axis Markers */}
        <div className="absolute inset-x-0 h-full flex flex-col justify-between pointer-events-none text-[8px] font-black text-gray-600 font-mono tracking-tighter select-none uppercase z-10">
          <span className="flex items-center gap-2"><div className="w-4 h-[1px] bg-white/10" /> 8H PEAK</span>
          <span className="flex items-center gap-2"><div className="w-4 h-[1px] bg-white/10" /> 4H MID</span>
          <span className="flex items-center gap-2"><div className="w-4 h-[1px] bg-white/10" /> 0H IDLE</span>
        </div>

        <svg viewBox="0 0 870 100" className="w-full h-full preserve-3d" preserveAspectRatio="none">
          {/* Grid lines */}
          <line x1="0" y1="50" x2="870" y2="50" stroke="white" strokeOpacity="0.03" strokeDasharray="4 4" />
          <line x1="0" y1="0" x2="870" y2="0" stroke="white" strokeOpacity="0.02" />
          
          {/* Vertical separators */}
          {[...Array(6)].map((_, i) => (
             <line key={i} x1={(i+1) * 145} y1="0" x2={(i+1) * 145} y2="100" stroke="white" strokeOpacity="0.02" />
          ))}

          {/* Gradient definitions */}
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#00f3ff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Area Fill */}
          <motion.path
            d={areaPath}
            fill="url(#areaGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 0.8 }}
          />

          {/* Animated Line */}
          <motion.path
            d={linePath}
            fill="none"
            stroke="#00f3ff"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 3, ease: "easeInOut", delay: 0.5 }}
            style={{
              filter: "drop-shadow(0 0 12px rgba(0,243,255,0.8))",
            }}
          />
        </svg>

        {/* X Axis Labels */}
        <div className="flex justify-between items-center mt-4 text-[10px] font-bold text-gray-400 font-mono uppercase tracking-wider select-none border-t border-white/5 pt-3">
          <span>24-09</span>
          <span>29-09</span>
          <span>04-10</span>
          <span>09-10</span>
          <span>14-10</span>
          <span>19-10</span>
          <span>24-10</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative pt-10">
         <div className="bg-black/20 p-4 rounded-xl border border-white/5 group-hover:border-neon-cyan/20 transition-all duration-300">
            <span className="block text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Average Session</span>
            <span className="text-lg font-mono font-black text-white italic">4.8 <span className="text-[10px] text-gray-400 font-sans roman">HRS</span></span>
         </div>
         <div className="bg-black/20 p-4 rounded-xl border border-white/5 group-hover:border-neon-purple/20 transition-all duration-300">
            <span className="block text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Peak Intensity</span>
            <span className="text-lg font-mono font-black text-white italic">8.0 <span className="text-[10px] text-neon-purple drop-shadow-[0_0_5px_rgba(192,38,211,0.5)] font-sans roman">MAX</span></span>
         </div>
         <div className="bg-black/20 p-4 rounded-xl border border-white/5 group-hover:border-neon-green/20 transition-all duration-300">
            <span className="block text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Consistency</span>
            <span className="text-lg font-mono font-black text-white italic">92 <span className="text-[10px] text-neon-green font-sans roman">%</span></span>
         </div>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const { isLoggedIn, username, credits, addCredits, login, logout } = useAuth();
  const [error, setError] = useState("");
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [topupStatus, setTopupStatus] = useState<"idle" | "success" | "error">("idle");
  const [amount, setAmount] = useState(105);
  const [paymentMethod, setPaymentMethod] = useState<"card" | "upi">("card");
  const [historyTab, setHistoryTab] = useState<"credits" | "tournaments" | "payments">("credits");

  const handleTopup = () => {
    addCredits(amount);
    setTopupStatus("success");
  };

  const closeTopUpModal = () => {
    setShowTopUpModal(false);
    setTimeout(() => setTopupStatus("idle"), 300);
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
    } else {
      setError("No user found or wrong password");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      0: { value: string };
      1: { value: string };
      2: { value: string };
    };
    const newUser = target[0].value;
    const pass = target[1].value;
    const confirm = target[2].value;

    if (pass !== confirm) {
      setError("Passwords do not match");
      return;
    }
    setError("");
    login(newUser);
  };

  return (
    <div className="space-y-10 relative">
      {/* Header & Stats Grid */}
      <header className="space-y-6 pb-6 border-b border-gaming-border">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-wider text-white">
              {isLoggedIn ? (
                <>Welcome, <span className="text-neon-cyan text-glow-cyan uppercase">{username || "Gamer"}</span></>
              ) : (
                <>TERMINAL <span className="text-neon-cyan text-glow-cyan uppercase">ACCESS</span></>
              )}
            </h1>
            <p className="text-gray-400 mt-2 font-medium">
              {isLoggedIn 
                ? "Your command center. Track stats, top up credits, and dominate." 
                : "Authenticated access required to manage your gaming profile and credits."}
            </p>
          </div>
          {isLoggedIn && (
            <button
              onClick={logout}
              className="px-6 py-2 bg-red-500/10 text-red-500 border border-red-500/30 font-black rounded-lg uppercase tracking-widest text-xs hover:bg-red-500 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)]"
            >
              LOGOUT
            </button>
          )}
        </div>

        {isLoggedIn && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Animated Credit Ledger (Expanded) */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="glass-panel p-6 rounded-2xl border border-neon-cyan/30 flex items-center justify-between col-span-1 md:col-span-2 group hover:border-neon-cyan/60 transition-all duration-300"
            >
              <div className="flex items-center space-x-5">
                <div className="bg-neon-cyan/20 p-4 rounded-2xl glow-cyan group-hover:bg-neon-cyan/30 transition-colors">
                  <Coins className="w-8 h-8 text-neon-cyan" />
                </div>
                <div>
                  <p className="text-xs text-neon-cyan/80 font-bold tracking-[0.2em] uppercase mb-1">AVAILABLE CREDITS</p>
                  <motion.div
                    key={credits}
                    initial={{ scale: 1.2, color: "#fff" }}
                    animate={{ scale: 1, color: "#fff" }}
                    className="text-4xl font-mono font-black text-white"
                  >
                    C {credits.toLocaleString()}
                  </motion.div>
                </div>
              </div>
              
              <button 
                onClick={() => setShowTopUpModal(true)}
                className="px-8 py-4 bg-neon-cyan text-black font-black text-xs tracking-[0.2em] rounded-xl hover:bg-white hover:shadow-[0_0_25px_rgba(0,243,255,0.5)] transition-all active:scale-95 uppercase"
              >
                TOP-UP CREDITS
              </button>
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
              className="glass-panel p-5 rounded-2xl border border-red-500/30 flex items-center space-x-4 group hover:border-red-500/60 transition-colors"
            >
              <div className="bg-red-500/20 p-3 rounded-xl shadow-[0_0_15px_rgba(239,68,68,0.3)] group-hover:bg-red-500/30 transition-colors">
                <Gamepad2 className="w-6 h-6 text-red-500" />
              </div>
              <div>
                <p className="text-xs text-red-500/80 font-bold tracking-widest uppercase mb-1">Top Games</p>
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold bg-red-500/10 px-2 py-1 rounded text-red-400 border border-red-500/20">CS2</span>
                  <span className="text-xs font-bold bg-red-500/10 px-2 py-1 rounded text-red-400 border border-red-500/20">VAL</span>
                  <span className="text-xs font-bold bg-red-500/10 px-2 py-1 rounded text-red-400 border border-red-500/20">RL</span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </header>

      {isLoggedIn ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions Panel */}
          <div className="col-span-1 space-y-4">
            <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>

            <button
              onClick={() => setHistoryTab("credits")}
              className={`w-full group relative flex items-center justify-between p-6 rounded-xl transition-all ${historyTab === "credits"
                  ? "bg-neon-cyan/10 border border-neon-cyan/30 glow-cyan"
                  : "glass-panel hover:border-neon-cyan/30 hover:bg-neon-cyan/5"
                }`}
            >
              <div className="flex items-center space-x-4">
                <Coins className={`w-6 h-6 group-hover:scale-110 transition-all ${historyTab === "credits" ? "text-neon-cyan" : "text-gray-400 group-hover:text-neon-cyan"}`} />
                <span className={`font-bold text-lg ${historyTab === "credits" ? "text-white" : "text-gray-300 group-hover:text-white"}`}>Credits History</span>
              </div>
              <ChevronRight className={`w-5 h-5 ${historyTab === "credits" ? "text-neon-cyan" : "text-gray-500 group-hover:text-neon-cyan"}`} />
            </button>

            <button
              onClick={() => setHistoryTab("tournaments")}
              className={`w-full group relative flex items-center justify-between p-6 rounded-xl transition-all ${historyTab === "tournaments"
                  ? "bg-neon-purple/10 border border-neon-purple/30 glow-purple"
                  : "glass-panel hover:border-neon-purple/30 hover:bg-neon-purple/5"
                }`}
            >
              <div className="flex items-center space-x-4">
                <Trophy className={`w-6 h-6 group-hover:scale-110 transition-all ${historyTab === "tournaments" ? "text-neon-purple" : "text-gray-400 group-hover:text-neon-purple"}`} />
                <span className={`font-bold text-lg ${historyTab === "tournaments" ? "text-white" : "text-gray-300 group-hover:text-white"}`}>Tournaments</span>
              </div>
              <ChevronRight className={`w-5 h-5 ${historyTab === "tournaments" ? "text-neon-purple" : "text-gray-500 group-hover:text-neon-purple"}`} />
            </button>

            <button
              onClick={() => setHistoryTab("payments")}
              className={`w-full group relative flex items-center justify-between p-6 rounded-xl transition-all ${historyTab === "payments"
                  ? "bg-neon-green/10 border border-neon-green/30 glow-green"
                  : "glass-panel hover:border-neon-green/30 hover:bg-neon-green/5"
                }`}
            >
              <div className="flex items-center space-x-4">
                <CreditCard className={`w-6 h-6 group-hover:scale-110 transition-all ${historyTab === "payments" ? "text-neon-green" : "text-gray-400 group-hover:text-neon-green"}`} />
                <span className={`font-bold text-lg ${historyTab === "payments" ? "text-white" : "text-gray-300 group-hover:text-white"}`}>Payments</span>
              </div>
              <ChevronRight className={`w-5 h-5 ${historyTab === "payments" ? "text-neon-green" : "text-gray-500 group-hover:text-neon-green"}`} />
            </button>
          </div>

          {/* History Tables with Tabs */}
          <div className="col-span-1 lg:col-span-2">
            <div className="glass-panel rounded-2xl border border-gaming-border p-6 h-full">

              <div className="overflow-x-auto rounded-lg border border-white/5 bg-black/20">
                {/* Credits History */}
                {historyTab === "credits" && (
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
                      {CREDITS_HISTORY.map((tx) => (
                        <motion.tr
                          key={tx.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-white/5 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-white">
                            <div className="flex items-center space-x-2">
                              {tx.amount.startsWith('+') ? <ArrowDownLeft className="w-4 h-4 text-neon-green" /> : <ArrowUpRight className="w-4 h-4 text-red-400" />}
                              <span>{tx.type}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-400">{tx.date}</td>
                          <td className={`px-6 py-4 font-mono font-bold ${tx.amount.startsWith('+') ? 'text-neon-green' : 'text-red-400'}`}>
                            {tx.amount}
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-neon-green/10 text-neon-green border border-neon-green/20">
                              {tx.status}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {/* Tournaments History */}
                {historyTab === "tournaments" && (
                  <table className="w-full min-w-[600px] text-left text-sm whitespace-nowrap">
                    <thead className="bg-white/5 text-gray-400 border-b border-white/10 uppercase font-mono text-xs">
                      <tr>
                        <th className="px-6 py-4 font-semibold tracking-wider">Tournament</th>
                        <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                        <th className="px-6 py-4 font-semibold tracking-wider">Placement</th>
                        <th className="px-6 py-4 font-semibold tracking-wider">Prize</th>
                        <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-transparent">
                      {TOURNAMENT_HISTORY.map((t) => (
                        <motion.tr
                          key={t.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-white/5 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-white">
                            <div className="flex items-center space-x-2">
                              <Swords className="w-4 h-4 text-neon-purple" />
                              <span>{t.name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-400">{t.date}</td>
                          <td className="px-6 py-4">
                            <span className={`font-mono font-black ${t.placement === '#2' ? 'text-neon-cyan' : t.placement === '#5' ? 'text-gray-400' : 'text-gray-500'
                              }`}>{t.placement}</span>
                          </td>
                          <td className="px-6 py-4 font-bold text-white">{t.prize}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${t.status === 'Finished'
                                ? 'bg-neon-green/10 text-neon-green border-neon-green/20'
                                : 'bg-neon-cyan/10 text-neon-cyan border-neon-cyan/20'
                              }`}>
                              {t.status}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                )}

                {/* Payments History */}
                {historyTab === "payments" && (
                  <table className="w-full min-w-[600px] text-left text-sm whitespace-nowrap">
                    <thead className="bg-white/5 text-gray-400 border-b border-white/10 uppercase font-mono text-xs">
                      <tr>
                        <th className="px-6 py-4 font-semibold tracking-wider">Description</th>
                        <th className="px-6 py-4 font-semibold tracking-wider">Date</th>
                        <th className="px-6 py-4 font-semibold tracking-wider">Method</th>
                        <th className="px-6 py-4 font-semibold tracking-wider">Amount</th>
                        <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 bg-transparent">
                      {PAYMENT_HISTORY.map((p) => (
                        <motion.tr
                          key={p.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="hover:bg-white/5 transition-colors"
                        >
                          <td className="px-6 py-4 font-medium text-white">
                            <div className="flex items-center space-x-2">
                              <CreditCard className="w-4 h-4 text-neon-cyan" />
                              <span>{p.type}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-gray-400">{p.date}</td>
                          <td className="px-6 py-4 text-gray-300 font-mono text-xs">{p.method}</td>
                          <td className="px-6 py-4 font-mono font-bold text-white">{p.amount}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${p.status === 'Success'
                                ? 'bg-neon-green/10 text-neon-green border-neon-green/20'
                                : 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                              }`}>
                              {p.status}
                            </span>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>

          {/* New Expanded Activity Graph */}
          <div className="col-span-1 lg:col-span-3">
             <ActivityGraph />
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center py-12">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="glass-panel p-10 rounded-3xl border border-neon-cyan/30 max-w-md w-full glow-cyan"
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-neon-cyan/20 rounded-xl flex items-center justify-center glow-cyan shadow-[0_0_15px_rgba(0,243,255,0.4)]">
                <Gamepad2 className="w-6 h-6 text-neon-cyan" />
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Access Terminal</h3>
            </div>
            
            <p className="text-gray-400 text-sm mb-8 leading-relaxed">System authentication required. Please enter your terminal credentials or initialize a new account.</p>

            {/* Login / Register Tabs */}
            <div className="flex mb-8 bg-black/40 rounded-xl p-1.5 border border-white/5">
              <button
                onClick={() => { setError(""); setAuthMode("login"); }}
                className={`flex-1 py-2.5 text-xs font-black uppercase tracking-[0.2em] rounded-lg transition-all duration-300 ${authMode === "login" ? "bg-neon-cyan text-black shadow-[0_0_20px_rgba(0,243,255,0.3)]" : "text-gray-500 hover:text-white"
                  }`}
              >LOGIN</button>
              <button
                onClick={() => { setError(""); setAuthMode("register"); }}
                className={`flex-1 py-2.5 text-xs font-black uppercase tracking-[0.2em] rounded-lg transition-all duration-300 ${authMode === "register" ? "bg-neon-cyan text-black shadow-[0_0_20px_rgba(0,243,255,0.3)]" : "text-gray-500 hover:text-white"
                  }`}
              >REGISTER</button>
            </div>

            {error && <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-red-500 text-[11px] mb-6 bg-red-500/5 py-3 px-4 border border-red-500/20 rounded-lg text-center font-bold tracking-wider uppercase">{error}</motion.div>}

            {authMode === "login" ? (
              <form onSubmit={handleLogin} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Username</label>
                  <input type="text" placeholder="Enter Username" required className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-neon-cyan/50 focus:bg-black/60 transition-all font-mono text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Terminal Password</label>
                  <input type="password" placeholder="••••••••" required className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-neon-cyan/50 focus:bg-black/60 transition-all font-mono text-sm" />
                </div>
                <button type="submit" className="w-full mt-4 py-4 bg-neon-cyan text-black font-black tracking-[0.25em] text-xs rounded-xl flex justify-center items-center hover:bg-white hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] transition-all duration-500 active:scale-[0.98]">
                  AUTHENTICATE SYSTEM
                </button>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Choose Username</label>
                  <input type="text" placeholder="Gamer Tag" required className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-neon-cyan/50 focus:bg-black/60 transition-all font-mono text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Create Access Key</label>
                  <input type="password" placeholder="••••••••" required className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-neon-cyan/50 focus:bg-black/60 transition-all font-mono text-sm" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Verify Access Key</label>
                  <input type="password" placeholder="••••••••" required className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white focus:outline-none focus:border-neon-cyan/50 focus:bg-black/60 transition-all font-mono text-sm" />
                </div>
                <button type="submit" className="w-full mt-4 py-4 bg-white text-black font-black tracking-[0.25em] text-xs rounded-xl flex justify-center items-center hover:bg-neon-cyan hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-500 active:scale-[0.98] space-x-2">
                  <UserPlus className="w-4 h-4" />
                  <span>INITIALIZE ACCOUNT</span>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      )}

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
                onClick={closeTopUpModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              <AnimatePresence mode="wait">
                {topupStatus === "idle" ? (
                  <motion.div
                    key="topup-form"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                  >
                    <h3 className="text-2xl font-black mb-2 text-white uppercase tracking-wider">Top-Up Terminal</h3>
                    <p className="text-gray-400 text-sm mb-6 pb-4 border-b border-white/10">Select a bundle to recharge. Includes bonus credits on higher tiers!</p>

                    <div className="grid grid-cols-1 gap-3 mb-8">
                      {[
                        { c: 105, r: 100 },
                        { c: 210, r: 200 },
                        { c: 530, r: 500 },
                        { c: 1100, r: 1000 },
                      ].map((tier) => (
                        <button
                          key={tier.r}
                          onClick={() => setAmount(tier.c)}
                          className={`flex items-center justify-between px-5 py-4 rounded-xl font-mono font-bold border transition-all ${amount === tier.c
                              ? "bg-neon-cyan text-black border-neon-cyan shadow-[0_0_15px_rgba(0,243,255,0.4)]"
                              : "bg-black/40 text-gray-300 border-white/10 hover:border-neon-cyan/50 hover:bg-black/60"
                            }`}
                        >
                          <div className="flex items-center space-x-3">
                             <Coins className={`w-5 h-5 ${amount === tier.c ? 'text-black' : 'text-neon-cyan'}`} />
                             <span className="text-lg">C {tier.c}</span>
                          </div>
                          <span className={`text-xs uppercase tracking-widest ${amount === tier.c ? 'text-black/60' : 'text-gray-500'}`}>₹{tier.r}</span>
                        </button>
                      ))}
                    </div>

                    <div className="space-y-6 mb-8">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4">
                          <h4 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Select Payment</h4>
                          <div className="flex bg-black/40 p-1 rounded-lg border border-white/5">
                            <button 
                              onClick={() => setPaymentMethod("card")}
                              className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${paymentMethod === 'card' ? 'bg-neon-purple text-white glow-purple' : 'text-gray-400 hover:text-gray-200'}`}
                            >
                              Card
                            </button>
                            <button 
                              onClick={() => setPaymentMethod("upi")}
                              className={`px-4 py-1.5 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${paymentMethod === 'upi' ? 'bg-neon-purple text-white glow-purple' : 'text-gray-400 hover:text-gray-200'}`}
                            >
                              UPI
                            </button>
                          </div>
                        </div>

                        {paymentMethod === "card" ? (
                          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <input type="text" placeholder="Enter Name" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-purple transition-colors text-sm" />
                            <div className="relative">
                              <input type="text" placeholder="Card Number" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-neon-purple transition-colors text-sm" />
                              <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            </div>
                            <div className="flex gap-4">
                              <input type="text" placeholder="MM/YY" className="w-1/2 bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-neon-purple transition-colors text-sm" />
                              <input type="text" placeholder="CVV" className="w-1/2 bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-neon-purple transition-colors text-sm" />
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <input type="text" placeholder="Enter Name" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-purple transition-colors text-sm" />
                            <div className="relative">
                              <input type="text" placeholder="Enter UPI ID" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-neon-purple transition-colors text-sm" />
                              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] font-black text-neon-purple tracking-widest border border-neon-purple/30 px-1 py-0.5 rounded uppercase">Verified</div>
                            </div>
                            <div className="p-4 rounded-xl bg-neon-purple/5 border border-neon-purple/10 flex items-start space-x-3">
                              <ShieldCheck className="w-4 h-4 text-neon-purple shrink-0 mt-0.5" />
                              <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-tight">
                                Approve the request in your UPI app to complete top-up.
                              </p>
                            </div>
                          </div>
                        )}
                    </div>

                    <button
                      onClick={handleTopup}
                      className="w-full py-4 bg-neon-purple text-white font-black text-xs tracking-[0.2em] rounded-xl flex justify-center items-center hover:bg-white hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(192,38,211,0.4)]"
                    >
                      PROCEED TO PAY ₹{
                        amount === 105 ? 100 : 
                        amount === 210 ? 200 : 
                        amount === 530 ? 500 : 
                        amount === 1100 ? 1000 : amount
                      }
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="topup-success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="py-6 text-center space-y-6"
                  >
                    <div className="flex justify-center">
                       <div className="relative">
                          <CheckCircle2 className="w-20 h-20 text-neon-green" />
                          <motion.div 
                            initial={{ scale: 0 }} animate={{ scale: 1.5, opacity: 0 }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute inset-0 rounded-full bg-neon-green/20"
                          />
                       </div>
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-white uppercase tracking-wider mb-2">AUTH SUCCESSFUL</h4>
                      <p className="text-gray-400 text-xs uppercase tracking-widest leading-relaxed">
                        Credits have been synchronized <br/> with your gaming terminal.
                      </p>
                    </div>
                    
                    <div className="bg-black/40 border border-white/10 rounded-xl p-4 flex justify-between items-center">
                       <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Added Amount</span>
                       <span className="text-xl font-mono font-black text-neon-green">C {amount}</span>
                    </div>

                    <button
                      onClick={closeTopUpModal}
                      className="w-full py-4 bg-white text-black font-black text-xs tracking-[0.2em] rounded-xl flex justify-center items-center hover:bg-neon-cyan hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all duration-300"
                    >
                      RETURN TO DASHBOARD
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
