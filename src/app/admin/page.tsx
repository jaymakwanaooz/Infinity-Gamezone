"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Gamepad2, 
  Wallet, 
  Activity, 
  ShieldAlert, 
  Settings, 
  TrendingUp,
  ServerCrash
} from "lucide-react";

// Mock Data
const SYSTEM_STATS = [
  { label: "Active Users", value: "24,591", change: "+12%", trend: "up", icon: Users, color: "neon-cyan" },
  { label: "Monthly Revenue", value: "$142,850", change: "+8.5%", trend: "up", icon: Wallet, color: "neon-green" },
  { label: "Live Tournaments", value: "8", change: "Stable", trend: "neutral", icon: Gamepad2, color: "neon-purple" },
  { label: "System Load", value: "42%", change: "-5%", trend: "down", icon: Activity, color: "neon-cyan" },
];

const RECENT_ACTIVITY = [
  { id: "LOG-001", user: "Alex Mercer", action: "Tournament Created", detail: "CS2 Pro League", date: "2 mins ago", status: "Success" },
  { id: "LOG-002", user: "System", action: "Server Scaling", detail: "Added 5 nodes", date: "15 mins ago", status: "Success" },
  { id: "LOG-003", user: "Jane Doe", action: "Large Withdrawal", detail: "$5,000 via Stripe", date: "1 hour ago", status: "Pending Review" },
  { id: "LOG-004", user: "Admin", action: "Settings Update", detail: "Modified KYC Rules", date: "3 hours ago", status: "Success" },
  { id: "LOG-005", user: "Unknown", action: "Failed Login", detail: "Multiple attempts (IP flagged)", date: "5 hours ago", status: "Blocked" },
];

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin") {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gaming-bg p-4">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 rounded-2xl border border-neon-purple/30 max-w-md w-full glow-purple relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-neon-purple/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10 text-center mb-8">
            <ShieldAlert className="w-12 h-12 text-neon-purple mx-auto mb-4 text-glow-purple" />
            <h2 className="text-2xl font-black text-white tracking-widest">ADMIN <span className="text-neon-purple">ACCESS</span></h2>
            <p className="text-gray-400 text-sm mt-2">Enter your credentials to continue</p>
          </div>
          <form onSubmit={handleLogin} className="relative z-10 space-y-4">
            <div>
              <input 
                type="password" 
                placeholder="Secure Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full bg-black/40 border ${error ? 'border-red-500' : 'border-white/10 focus:border-neon-purple/50'} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 ${error ? 'focus:ring-red-500' : 'focus:ring-neon-purple/50'} transition-all`}
              />
              {error && <p className="text-red-500 text-xs mt-2 font-medium">Incorrect credentials.</p>}
            </div>
            <button 
              type="submit"
              className="w-full bg-neon-purple/20 border border-neon-purple text-white font-bold py-3 rounded-lg hover:bg-neon-purple hover:text-black transition-all duration-300 glow-purple"
            >
              AUTHENTICATE
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-10 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10 min-h-screen">
      {/* Header section with Global System Status */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-gaming-border">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
        >
          <h1 className="text-4xl font-black tracking-wider text-white flex items-center gap-3">
            <ShieldAlert className="w-10 h-10 text-neon-purple text-glow-purple" />
            ADMIN <span className="text-neon-purple text-glow-purple">OVERSIGHT</span>
          </h1>
          <p className="text-gray-400 mt-2 font-medium">Global platform metrics, user management, and system integrity.</p>
        </motion.div>
        
        {/* Animated Server Status Ledger */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-panel p-5 rounded-2xl border border-neon-purple/30 flex items-center space-x-6 min-w-[280px]"
        >
          <div className="bg-neon-purple/20 p-4 rounded-full glow-purple">
            <ServerCrash className="w-8 h-8 text-neon-purple" />
          </div>
          <div>
            <p className="text-sm text-neon-purple/80 font-bold tracking-widest uppercase mb-1">Network Status</p>
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green"></span>
              </span>
              <span className="text-xl font-mono font-black text-white">All Systems Operational</span>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SYSTEM_STATS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`glass-panel p-6 rounded-2xl border border-${stat.color}/20 hover:border-${stat.color}/50 transition-colors group relative overflow-hidden`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-${stat.color}/20`}></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div className={`bg-${stat.color}/10 p-3 rounded-xl ring-1 ring-${stat.color}/30 glow-${stat.color.split("-")[1]}`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}`} />
              </div>
              <span className={`flex items-center gap-1 text-sm font-bold ${
                stat.trend === "up" ? "text-neon-green" : 
                stat.trend === "down" ? "text-red-400" : "text-gray-400"
              }`}>
                {stat.trend === "up" && <TrendingUp className="w-4 h-4" />}
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-400 font-medium mb-1 relative z-10">{stat.label}</h3>
            <p className="text-3xl font-black text-white relative z-10">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Quick Admin Actions Panel */}
        <div className="col-span-1 space-y-4">
          <h2 className="text-xl font-bold text-white mb-4">Command Center</h2>
          
          <button className="w-full group relative flex items-center justify-between p-6 bg-neon-purple/10 border border-neon-purple/30 rounded-xl hover:bg-neon-purple/20 transition-all glow-purple">
            <div className="flex items-center space-x-4">
              <Users className="w-6 h-6 text-neon-purple group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <span className="font-bold text-lg block text-white">Manage Users</span>
                <span className="text-sm text-neon-purple/70">Ban, Role updates, Flags</span>
              </div>
            </div>
          </button>

          <button className="w-full group flex items-center justify-between p-6 glass-panel border border-neon-cyan/20 rounded-xl hover:border-neon-cyan/50 hover:bg-neon-cyan/5 transition-all">
            <div className="flex items-center space-x-4">
              <Gamepad2 className="w-6 h-6 text-neon-cyan group-hover:scale-110 transition-transform" />
              <div className="text-left">
                <span className="font-bold text-lg block text-white">Tournament Control</span>
                <span className="text-sm text-gray-400">Create, Pause, End events</span>
              </div>
            </div>
          </button>
          
          <button className="w-full group flex items-center justify-between p-6 glass-panel border border-white/5 rounded-xl hover:border-white/20 transition-all">
            <div className="flex items-center space-x-4">
              <Settings className="w-6 h-6 text-gray-400 group-hover:text-white group-hover:rotate-90 transition-all duration-300" />
              <div className="text-left">
                <span className="font-bold text-lg block text-gray-300 group-hover:text-white">Platform Settings</span>
                <span className="text-sm text-gray-500">Configure global limits</span>
              </div>
            </div>
          </button>
        </div>

        {/* System Activity Table */}
        <div className="col-span-1 lg:col-span-2">
          <div className="glass-panel rounded-2xl border border-gaming-border p-6 h-full flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center space-x-2">
                <Activity className="w-5 h-5 text-neon-cyan" />
                <span>Global System Audit</span>
              </h2>
              <button className="text-sm text-neon-cyan hover:text-white transition-colors border-b border-neon-cyan/30 hover:border-white">
                View All Logs
              </button>
            </div>
            
            <div className="overflow-x-auto rounded-lg border border-white/5 bg-black/20 flex-1">
              <table className="w-full min-w-[700px] text-left text-sm whitespace-nowrap">
                <thead className="bg-white/5 text-gray-400 border-b border-white/10 uppercase font-mono text-xs">
                  <tr>
                    <th className="px-6 py-4 font-semibold tracking-wider">Log ID</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">User / Agent</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Action</th>
                    <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
                    <th className="px-6 py-4 font-semibold tracking-wider text-right">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 bg-transparent">
                  {RECENT_ACTIVITY.map((log, idx) => (
                    <motion.tr 
                      key={log.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="hover:bg-white/5 transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-4 font-mono text-gray-500 group-hover:text-neon-cyan transition-colors">{log.id}</td>
                      <td className="px-6 py-4 font-medium text-white">{log.user}</td>
                      <td className="px-6 py-4">
                        <span className="block text-gray-300">{log.action}</span>
                        <span className="text-xs text-gray-500">{log.detail}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                          log.status === "Success" ? "bg-neon-green/10 text-neon-green border-neon-green/20" :
                          log.status === "Blocked" ? "bg-red-500/10 text-red-500 border-red-500/20" :
                          "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                        }`}>
                          {log.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-500 text-xs">{log.date}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
