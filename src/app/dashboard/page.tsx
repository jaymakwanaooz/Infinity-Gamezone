"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, History, Trophy, CreditCard, ChevronRight, X, Clock, Star, Gamepad2, UserPlus, Swords, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

const CREDITS_HISTORY = [
  { id: "CR1204", date: "Oct 24, 2026", type: "Top-up via Stripe", amount: "+500 C", status: "Completed" },
  { id: "CR1203", date: "Oct 22, 2026", type: "Tournament Entry: CS2 Open", amount: "-150 C", status: "Completed" },
  { id: "CR1202", date: "Oct 18, 2026", type: "Day Pass Bundle Purchase", amount: "-300 C", status: "Completed" },
  { id: "CR1201", date: "Oct 10, 2026", type: "Referral Bonus", amount: "+100 C", status: "Completed" },
];

const TOURNAMENT_HISTORY = [
  { id: "TN1001", name: "Valorant Open S3", date: "Sep 15, 2026", placement: "#2", prize: "₹20,000", status: "Finished" },
  { id: "TN1002", name: "CS2 Weekly Cup #8", date: "Aug 28, 2026", placement: "#5", prize: "—", status: "Finished" },
  { id: "TN1003", name: "Valorant Open S4", date: "April 15, 2024", placement: "—", prize: "—", status: "Registered" },
];

const PAYMENT_HISTORY = [
  { id: "PY2001", date: "Oct 24, 2026", method: "Visa •••• 4242", amount: "₹500", type: "Top-up", status: "Success" },
  { id: "PY2002", date: "Oct 01, 2026", method: "UPI — user@paytm", amount: "₹1,200", type: "Night Warrior Pass", status: "Success" },
  { id: "PY2003", date: "Sep 12, 2026", method: "Visa •••• 4242", amount: "₹300", type: "Day Pass", status: "Success" },
  { id: "PY2004", date: "Aug 05, 2026", method: "UPI — user@paytm", amount: "₹2,000", type: "Top-up", status: "Refunded" },
];

export default function Dashboard() {
  const { isLoggedIn, username, login, logout } = useAuth();
  const [error, setError] = useState("");
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [credits, setCredits] = useState(1450);
  const [showTopUpModal, setShowTopUpModal] = useState(false);
  const [amount, setAmount] = useState(500);
  const [historyTab, setHistoryTab] = useState<"credits" | "tournaments" | "payments">("credits");

  const handleTopup = () => {
    setCredits((prev) => prev + amount);
    setShowTopUpModal(false);
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
                    className={`w-full py-3 rounded-lg font-mono font-bold border transition-all ${amount === val
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
