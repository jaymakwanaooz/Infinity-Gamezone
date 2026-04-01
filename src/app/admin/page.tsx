"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Users, 
  Gamepad2, 
  Wallet, 
  Activity, 
  ShieldAlert, 
  Settings, 
  TrendingUp,
  ServerCrash,
  Radio,
  Ban,
  CheckCircle,
  Edit,
  FastForward,
  Save,
  Bell,
  X,
  PlusCircle,
  Pause,
  Play,
  Trash2,
  Trophy,
  Swords,
  ChevronRight,
  ShieldX,
  Clock,
  ChevronDown
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

const INITIAL_USERS = [
  { id: "U-1001", name: "Alex Mercer", email: "alex.mercer@gmail.com", isOnline: true, lastActive: "Just now", isBlocked: false, role: "User" },
  { id: "U-1002", name: "Jane Doe", email: "j.doe88@hotmail.com", isOnline: false, lastActive: "2 hours ago", isBlocked: false, role: "User" },
  { id: "U-1003", name: "ToxicSlayer", email: "tslayerx@yahoo.com", isOnline: true, lastActive: "5 mins ago", isBlocked: true, role: "User" },
  { id: "U-1004", name: "Admin", email: "admin@infinitygz.com", isOnline: true, lastActive: "Just now", isBlocked: false, role: "Admin" },
];

const INITIAL_TOURNAMENTS = [
  { 
    id: "T-201", 
    eventName: "CS2 Pro League", 
    gameName: "Counter-Strike 2", 
    status: "Ongoing", 
    stage: "Group Stage", 
    participants: 128,
    brackets: {
      quarter: ["Team Liquid", "Astralis", "G2 Esports", "FaZe Clan", "Natus Vincere", "Vitality", "MOUZ", "ENCE"],
      semi: ["Astralis", "G2 Esports"],
      final: ["G2 Esports"],
      winner: null
    }
  },
  { 
    id: "T-202", 
    eventName: "Valorant Open Season 3", 
    gameName: "Valorant", 
    status: "Upcoming", 
    stage: "Registrations", 
    participants: 64,
    brackets: {
      quarter: [],
      semi: [],
      final: [],
      winner: null
    }
  },
  { 
    id: "T-203", 
    eventName: "Apex Legends Showdown", 
    gameName: "Apex Legends", 
    status: "Ongoing", 
    stage: "Quarter Finals", 
    participants: 32,
    brackets: {
      quarter: ["NRG", "TSM", "Alliance", "DarkZero", "Optic", "Furia", "Complexity", "Fnatic"],
      semi: ["TSM", "Alliance", "Optic", "Fnatic"],
      final: ["TSM", "Optic"],
      winner: null
    }
  },
];

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [activeTab, setActiveTab] = useState("audit");
  const [users, setUsers] = useState(INITIAL_USERS);
  const [tournaments, setTournaments] = useState(INITIAL_TOURNAMENTS);
  
  // News Form State
  const [newsForm, setNewsForm] = useState({ title: "", message: "", category: "NEW EVENT" });
  const [newsSuccess, setNewsSuccess] = useState(false);

  // Modal State
  const [selectedTournament, setSelectedTournament] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isManageModalOpen, setIsManageModalOpen] = useState(false);
  const [isCatDropdownOpen, setIsCatDropdownOpen] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "admin") {
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  // User Actions
  const toggleBlock = (userId: string) => {
    setUsers(users.map(u => u.id === userId ? { ...u, isBlocked: !u.isBlocked } : u));
  };

  // Tournament Actions
  const handleEditTournament = (updated: any) => {
    setTournaments(tournaments.map(t => t.id === updated.id ? updated : t));
    setIsEditModalOpen(false);
  };

  const handleForwardStage = (tourneyId: string) => {
    setTournaments(tournaments.map(t => {
      if (t.id !== tourneyId) return t;
      let newStage = t.stage;
      if (t.stage === "Group Stage" || t.stage === "Registrations") newStage = "Quarter Finals";
      else if (t.stage === "Quarter Finals") newStage = "Semi Finals";
      else if (t.stage === "Semi Finals") newStage = "Finals";
      else if (t.stage === "Finals") newStage = "Completed";
      
      const newStatus = newStage === "Completed" ? "Completed" : t.status;
      return { ...t, stage: newStage, status: newStatus };
    }));
  };

  const updateTournamentStatus = (tourneyId: string, newStatus: string) => {
      setTournaments(tournaments.map(t => {
          if(t.id !== tourneyId) return t;
          return { ...t, status: newStatus };
      }));
      if (selectedTournament && selectedTournament.id === tourneyId) {
        setSelectedTournament({ ...selectedTournament, status: newStatus });
      }
  }

  const updateBrackets = (tourneyId: string, updatedBrackets: any) => {
    setTournaments(tournaments.map(t => 
      t.id === tourneyId ? { ...t, brackets: updatedBrackets } : t
    ));
    if (selectedTournament && selectedTournament.id === tourneyId) {
      setSelectedTournament({ ...selectedTournament, brackets: updatedBrackets });
    }
  };

  // News Actions
  const sendNewsAlert = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlert = {
      id: Date.now().toString(),
      title: newsForm.title,
      message: newsForm.message,
      category: newsForm.category,
      timestamp: new Date().toISOString()
    };
    
    // Save to localStorage so Navbar can pick it up
    const existing = JSON.parse(localStorage.getItem('infinity_alerts') || '[]');
    localStorage.setItem('infinity_alerts', JSON.stringify([newAlert, ...existing]));
    
    // Optional: Dispatch a custom event to notify components currently mounted (like Navbar)
    window.dispatchEvent(new Event('storage'));

    setNewsSuccess(true);
    setNewsForm({ title: "", message: "", category: "NEW EVENT" });
    setTimeout(() => setNewsSuccess(false), 3000);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gaming-bg p-4 text-white">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-panel p-8 rounded-2xl border border-neon-purple/30 max-w-md w-full glow-purple relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-40 h-40 bg-neon-purple/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <div className="relative z-10 text-center mb-8">
            <ShieldAlert className="w-12 h-12 text-neon-purple mx-auto mb-4 text-glow-purple" />
            <h2 className="text-2xl font-black tracking-widest text-white">ADMIN <span className="text-neon-purple">ACCESS</span></h2>
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

  // --- Modal Components ---

  const Modal = ({ isOpen, onClose, title, children, maxWidth = "max-w-xl" }: any) => (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-2xl"
          />
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className={`bg-[#0c0c0f] w-full ${maxWidth} border border-white/10 rounded-2xl relative z-10 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh]`}
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02] shrink-0">
              <h3 className="text-xl font-bold text-white tracking-wider flex items-center gap-3">
                {title}
              </h3>
              <button 
                onClick={onClose}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-8 overflow-y-auto custom-scrollbar bg-black/40">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  const EditDetailsModal = ({ tourney, onSave, onClose }: any) => {
    const [formData, setFormData] = useState({ ...tourney });

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Tournament Name</label>
            <input 
              type="text" 
              value={formData.eventName}
              onChange={(e) => setFormData({...formData, eventName: e.target.value})}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Game Name</label>
            <input 
              type="text" 
              value={formData.gameName}
              onChange={(e) => setFormData({...formData, gameName: e.target.value})}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Prize Pool ($)</label>
            <input 
              type="text" 
              defaultValue="5,000"
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan/50"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Participants Limit</label>
            <input 
              type="number" 
              value={formData.participants}
              onChange={(e) => setFormData({...formData, participants: parseInt(e.target.value)})}
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-neon-cyan/50"
            />
          </div>
        </div>
        <div className="pt-6 flex justify-end gap-4">
          <button onClick={onClose} className="px-6 py-2 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all">Cancel</button>
          <button 
            onClick={() => onSave(formData)}
            className="px-6 py-2 rounded-xl bg-neon-cyan/20 border border-neon-cyan text-neon-cyan font-bold hover:bg-neon-cyan hover:text-black transition-all glow-cyan"
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  };

  const ManageTournamentModal = ({ tourney, onForward, onUpdateStatus, onUpdateBrackets, onClose }: any) => {
    const stages = ["quarter", "semi", "final"];
    const [actionParticipant, setActionParticipant] = useState<{name: string, stage: string} | null>(null);

    const statuses = [
      { id: "Ongoing", color: "neon-green", icon: Play },
      { id: "Paused", color: "neon-purple", icon: Pause },
      { id: "Postponed", color: "yellow-500", icon: Clock },
      { id: "Finished", color: "neon-cyan", icon: CheckCircle },
    ];

    const promoteParticipant = (name: string, currentStage: string) => {
      const nextStageIndex = stages.indexOf(currentStage) + 1;
      if (nextStageIndex < stages.length) {
        const nextStage = stages[nextStageIndex];
        const newBrackets = { ...tourney.brackets };
        if (!newBrackets[nextStage].includes(name)) {
          newBrackets[nextStage] = [...newBrackets[nextStage], name];
          onUpdateBrackets(tourney.id, newBrackets);
        }
      } else if (currentStage === "final") {
        const newBrackets = { ...tourney.brackets, winner: name };
        onUpdateBrackets(tourney.id, newBrackets);
      }
      setActionParticipant(null);
    };

    const disqualifyParticipant = (name: string, currentStage: string) => {
      const newBrackets = { ...tourney.brackets };
      newBrackets[currentStage] = newBrackets[currentStage].filter((p: string) => p !== name);
      onUpdateBrackets(tourney.id, newBrackets);
      setActionParticipant(null);
    };

    return (
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="glass-panel p-6 border border-white/10 rounded-2xl">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">Stage Management</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-black/30 p-4 rounded-xl">
                <div>
                  <p className="text-sm text-gray-400">Current Stage</p>
                  <p className="text-lg font-black text-white uppercase">{tourney.stage}</p>
                </div>
                <FastForward className="w-6 h-6 text-neon-cyan" />
              </div>
              <button 
                disabled={tourney.status === "Completed"}
                onClick={() => onForward(tourney.id)}
                className="w-full py-3 bg-neon-cyan/20 border border-neon-cyan text-neon-cyan font-bold rounded-xl hover:bg-neon-cyan hover:text-black transition-all disabled:opacity-50 disabled:grayscale"
              >
                Forward to Next Stage
              </button>
            </div>
          </div>

          <div className="glass-panel p-6 border border-white/10 rounded-2xl">
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mb-4">Integrity Control</p>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {statuses.map((status) => {
                  const Icon = status.icon;
                  const isActive = tourney.status === status.id;
                  return (
                    <button
                      key={status.id}
                      onClick={() => onUpdateStatus(tourney.id, status.id)}
                      className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${
                        isActive 
                          ? `bg-${status.color}/20 border-${status.color} text-${status.color} glow-${status.color.split("-")[1] || status.color.split("-")[0]}`
                          : 'bg-black/20 border-white/5 text-gray-500 hover:border-white/20 hover:text-gray-300'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-black uppercase tracking-tight">{status.id}</span>
                    </button>
                  );
                })}
              </div>
              <div className="flex items-center justify-between bg-black/30 p-3 rounded-xl border border-white/5">
                <p className="text-[10px] text-gray-500 font-bold uppercase">Current Selection</p>
                <div className="flex items-center gap-2">
                  <span className={`w-1.5 h-1.5 rounded-full animate-pulse bg-${statuses.find(s => s.id === tourney.status)?.color || 'white'}`}></span>
                  <p className="text-xs font-black text-white uppercase">{tourney.status}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Brackets Management */}
        <div className="space-y-8 pt-6 border-t border-white/5">
          <div className="flex items-center justify-between px-1">
             <h4 className="text-xl font-black text-white flex items-center gap-3">
               <Trophy className="w-6 h-6 text-neon-cyan" />
               LIVE BRACKET <span className="text-neon-cyan">MANAGEMENT</span>
             </h4>
             <p className="text-xs text-gray-500 font-mono italic">Click participants to manage</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Quarter Finals */}
            <div className="bg-black/20 rounded-3xl p-5 border border-white/5 space-y-4">
               <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Quarter Finals</span>
                 <span className="text-xs font-mono text-neon-cyan">{tourney.brackets.quarter.length}/8</span>
               </div>
               <div className="space-y-2">
                 {tourney.brackets.quarter.length > 0 ? (
                   tourney.brackets.quarter.map((name: string) => (
                      <motion.div 
                        key={name} 
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActionParticipant({ name, stage: "quarter" })}
                        className={`p-3 rounded-lg border border-white/5 bg-white/5 flex items-center justify-between cursor-pointer hover:bg-neon-cyan/10 hover:border-neon-cyan/30 transition-all ${tourney.brackets.semi.includes(name) ? 'opacity-40 grayscale-0 border-neon-green/30 bg-neon-green/5' : ''}`}
                      >
                         <span className="text-xs font-bold text-white tracking-wide">{name}</span>
                         {tourney.brackets.semi.includes(name) && <CheckCircle className="w-3.5 h-3.5 text-neon-green" />}
                      </motion.div>
                   ))
                 ) : <p className="text-center py-8 text-gray-600 text-xs italic">Awaiting selection...</p>}
               </div>
            </div>

            {/* Semi Finals */}
            <div className="bg-black/20 rounded-3xl p-5 border border-white/5 space-y-4">
               <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Semi Finals</span>
                 <span className="text-xs font-mono text-neon-purple">{tourney.brackets.semi.length}/4</span>
               </div>
               <div className="space-y-2">
                 {tourney.brackets.semi.length > 0 ? (
                   tourney.brackets.semi.map((name: string) => (
                      <motion.div 
                        key={name} 
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActionParticipant({ name, stage: "semi" })}
                        className={`p-3 rounded-lg border border-white/5 bg-white/5 flex items-center justify-between cursor-pointer hover:bg-neon-purple/10 hover:border-neon-purple/30 transition-all ${tourney.brackets.final.includes(name) ? 'opacity-40 border-neon-green/30 bg-neon-green/5' : ''}`}
                      >
                         <span className="text-xs font-bold text-white tracking-wide">{name}</span>
                         {tourney.brackets.final.includes(name) && <CheckCircle className="w-3.5 h-3.5 text-neon-green" />}
                      </motion.div>
                   ))
                 ) : <p className="text-center py-8 text-gray-600 text-xs italic">Awaiting quarter finals...</p>}
               </div>
            </div>

            {/* Finals */}
            <div className="bg-gradient-to-br from-neon-cyan/5 to-neon-purple/10 rounded-3xl p-5 border border-white/10 space-y-4">
               <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Grand Finals</span>
                 <span className="text-xs font-mono text-neon-green">{tourney.brackets.final.length}/2</span>
               </div>
               <div className="space-y-2">
                 {tourney.brackets.final.length > 0 ? (
                   tourney.brackets.final.map((name: string) => (
                      <motion.div 
                        key={name} 
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setActionParticipant({ name, stage: "final" })}
                        className={`p-3 rounded-lg border border-white/10 bg-white/10 flex items-center justify-between cursor-pointer hover:bg-white/20 transition-all ${tourney.brackets.winner === name ? 'border-neon-green bg-neon-green/10 shadow-[0_0_15px_rgba(57,255,20,0.2)]' : ''}`}
                      >
                         <span className="text-xs font-bold text-white tracking-wide">{name}</span>
                         {tourney.brackets.winner === name && <Trophy className="w-3.5 h-3.5 text-neon-green" />}
                      </motion.div>
                   ))
                 ) : <p className="text-center py-8 text-gray-600 text-xs italic">Road to Finals...</p>}
               </div>
               
               {tourney.brackets.winner && (
                  <div className="mt-4 p-4 rounded-xl bg-neon-green/20 border border-neon-green flex flex-col items-center text-center">
                    <Trophy className="w-8 h-8 text-neon-green mb-2 glow-green" />
                    <p className="text-[8px] font-black uppercase tracking-widest text-neon-green mb-1">Champion</p>
                    <p className="text-lg font-black text-white italic tracking-tighter uppercase">{tourney.brackets.winner}</p>
                  </div>
               )}
            </div>
            
            {/* Action Popup overlay when participant is selected */}
            <AnimatePresence>
               {actionParticipant && (
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9, y: 10 }}
                   animate={{ opacity: 1, scale: 1, y: 0 }}
                   exit={{ opacity: 0, scale: 0.9, y: 10 }}
                   className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm rounded-3xl"
                 >
                    <div className="glass-panel p-8 border border-white/20 rounded-2xl shadow-2xl space-y-6 text-center max-w-xs w-full">
                       <div>
                          <p className="text-xs text-gray-400 uppercase font-black tracking-widest mb-1">Manage Participant</p>
                          <h5 className="text-xl font-black text-white italic tracking-tight">{actionParticipant.name}</h5>
                       </div>
                       
                       <div className="grid grid-cols-1 gap-3">
                          <button 
                            onClick={() => promoteParticipant(actionParticipant.name, actionParticipant.stage)}
                            className="flex items-center justify-center gap-2 w-full py-3 bg-neon-green/10 border border-neon-green/30 text-neon-green font-bold rounded-xl hover:bg-neon-green hover:text-black transition-all"
                          >
                             <FastForward className="w-4 h-4" /> 
                             {actionParticipant.stage === "final" ? "DECLARE WINNER" : "PROMOTE TO NEXT STAGE"}
                          </button>
                          
                          <button 
                            onClick={() => disqualifyParticipant(actionParticipant.name, actionParticipant.stage)}
                            className="flex items-center justify-center gap-2 w-full py-3 bg-red-500/10 border border-red-500/30 text-red-500 font-bold rounded-xl hover:bg-red-500 hover:text-white transition-all"
                          >
                             <ShieldX className="w-4 h-4" /> DISQUALIFY PLAYER
                          </button>
                          
                          <button 
                            onClick={() => setActionParticipant(null)}
                            className="w-full py-2 text-gray-500 text-xs font-bold uppercase tracking-widest hover:text-white transition-colors"
                          >
                             Dismiss
                          </button>
                       </div>
                    </div>
                 </motion.div>
               )}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-end gap-4 pt-6 border-t border-white/5 mt-auto">
          <button 
            onClick={onClose} 
            className="px-6 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition-all uppercase tracking-widest font-black text-[10px]"
          >
            Cancel
          </button>
          <button 
            onClick={onClose} 
            className="px-8 py-2.5 rounded-xl bg-neon-cyan/20 border border-neon-cyan text-neon-cyan font-black uppercase tracking-widest text-[10px] hover:bg-neon-cyan hover:text-black transition-all glow-cyan"
          >
            Save Changes
          </button>
        </div>
      </div>
    );
  };

  // --- Render Functions for Tabs ---

  const renderAuditTab = () => (
    <div className="glass-panel rounded-2xl border border-gaming-border p-6 h-full flex flex-col text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center space-x-2">
          <Activity className="w-5 h-5 text-neon-cyan" />
          <span>Global System Audit</span>
        </h2>
        <button className="text-sm text-neon-cyan hover:text-white transition-colors border-b border-neon-cyan/30 hover:border-white uppercase tracking-widest font-bold">
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
  );

  const renderUsersTab = () => (
    <div className="glass-panel rounded-2xl border border-gaming-border p-6 h-full flex flex-col text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center space-x-2">
          <Users className="w-5 h-5 text-neon-purple" />
          <span>User Management</span>
        </h2>
      </div>
      
      <div className="overflow-x-auto rounded-lg border border-white/5 bg-black/20 flex-1">
        <table className="w-full min-w-[700px] text-left text-sm whitespace-nowrap">
          <thead className="bg-white/5 text-gray-400 border-b border-white/10 uppercase font-mono text-xs">
            <tr>
              <th className="px-6 py-4 font-semibold tracking-wider">User</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Role</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Status</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Last Active</th>
              <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-transparent">
            {users.map((user, idx) => (
              <motion.tr 
                key={user.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className={`hover:bg-white/5 transition-colors group ${user.isBlocked ? 'opacity-50 grayscale' : ''}`}
              >
                <td className="px-6 py-4">
                  <span className="block text-white font-medium">{user.name}</span>
                  <span className="text-xs text-gray-500">{user.email}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-300 font-mono text-xs">{user.role}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <span className={`relative flex h-2.5 w-2.5`}>
                      {user.isOnline && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>}
                      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${user.isOnline ? 'bg-neon-green' : 'bg-gray-500'}`}></span>
                    </span>
                    <span className="text-gray-300 font-medium">{user.isOnline ? "Online" : "Offline"}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-500 font-mono text-xs">{user.lastActive}</td>
                <td className="px-6 py-4 text-right">
                  {user.role !== "Admin" && (
                    <button 
                      onClick={() => toggleBlock(user.id)}
                      className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all shadow-lg ${
                        user.isBlocked 
                          ? 'border-neon-green/30 text-neon-green hover:bg-neon-green/10 hover:shadow-neon-green/20' 
                          : 'border-red-500/30 text-red-500 hover:bg-red-500/10 hover:shadow-red-500/20'
                      }`}
                    >
                      {user.isBlocked ? "UNBLOCK" : "BLOCK"}
                    </button>
                  )}
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTournamentsTab = () => (
    <div className="glass-panel rounded-2xl border border-gaming-border p-6 h-full flex flex-col text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold flex items-center space-x-2">
          <Gamepad2 className="w-5 h-5 text-neon-cyan" />
          <span>Tournament Control</span>
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-neon-cyan/20 border border-neon-cyan/50 text-neon-cyan rounded-xl text-xs font-bold hover:bg-neon-cyan hover:text-black transition-all">
            <PlusCircle className="w-4 h-4" /> Create New Event
        </button>
      </div>
      
      <div className="overflow-x-auto rounded-lg border border-white/5 bg-black/20 flex-1">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-white/5 text-gray-400 border-b border-white/10 uppercase font-mono text-xs">
            <tr>
              <th className="px-6 py-4 font-semibold tracking-wider">Tournament Name</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Game</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Status / Stage</th>
              <th className="px-6 py-4 font-semibold tracking-wider">Participants</th>
              <th className="px-6 py-4 font-semibold tracking-wider text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 bg-transparent">
            {tournaments.map((t, idx) => (
              <motion.tr 
                key={t.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="hover:bg-white/5 transition-colors group"
              >
                <td className="px-6 py-4 font-medium text-white">{t.eventName}</td>
                <td className="px-6 py-4 text-gray-300">{t.gameName}</td>
                <td className="px-6 py-4">
                  <span className={`block font-bold ${
                      t.status === 'Ongoing' ? 'text-neon-cyan' : 
                      t.status === 'Completed' ? 'text-neon-green' : 
                      t.status === 'Paused' ? 'text-neon-purple' : 'text-neon-purple'
                    }`}>{t.status}</span>
                  <span className="text-xs text-gray-400 font-mono">{t.stage}</span>
                </td>
                <td className="px-6 py-4 text-gray-300 font-mono">{t.participants} <span className="text-gray-500 text-xs">reg.</span></td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <button 
                      onClick={() => {
                        setSelectedTournament(t);
                        setIsEditModalOpen(true);
                      }}
                      className="px-3 py-2 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all flex items-center gap-2 text-xs font-bold"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit Details
                    </button>
                    
                    <button 
                      onClick={() => {
                        setSelectedTournament(t);
                        setIsManageModalOpen(true);
                      }}
                      className="px-3 py-2 rounded-xl bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan hover:bg-neon-cyan hover:text-black transition-all flex items-center gap-2 text-xs font-bold shadow-lg shadow-neon-cyan/10"
                    >
                      <Settings className="w-3.5 h-3.5" /> Manage
                    </button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderNewsTab = () => {
    const categories = [
      { id: "NEW EVENT", color: "neon-purple", label: "NEW EVENT" },
      { id: "NEW TOURNAMENT", color: "neon-cyan", label: "NEW TOURNAMENT" },
      { id: "SYSTEM UPGRADE", color: "neon-green", label: "SYSTEM UPGRADE" },
      { id: "IMPORTANT", color: "red-500", label: "IMPORTANT" },
    ];

    return (
      <div className="glass-panel rounded-2xl border border-gaming-border p-6 h-full flex flex-col text-white">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
          <h2 className="text-xl font-black flex items-center space-x-3">
            <Radio className="w-5 h-5 text-neon-green animate-pulse" />
            <span className="tracking-[0.1em]">BROADCAST <span className="text-neon-green">CENTER</span></span>
          </h2>
          <div className="flex items-center gap-2 px-3 py-1 bg-neon-green/10 rounded-full border border-neon-green/20">
            <span className="w-1.5 h-1.5 bg-neon-green rounded-full"></span>
            <span className="text-[10px] font-black text-neon-green uppercase tracking-widest leading-none">Global Sync Active</span>
          </div>
        </div>
        
        <div className="flex-1 bg-black/20 rounded-xl border border-white/5 p-6 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/5 rounded-full blur-[100px] -mr-32 -mt-32 pointer-events-none"></div>
          
          <form onSubmit={sendNewsAlert} className="max-w-xl mx-auto space-y-8 relative z-10">
            <div className="space-y-6">
              {/* Custom Category Dropdown */}
              <div className="space-y-2 relative">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1 ml-1">Message Protocol</label>
                <div 
                  onClick={() => setIsCatDropdownOpen(!isCatDropdownOpen)}
                  className={`w-full bg-black/40 border rounded-xl px-4 py-4 flex items-center justify-between cursor-pointer transition-all duration-300 ${
                    isCatDropdownOpen ? 'border-neon-green/50 ring-1 ring-neon-green/20' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full bg-${categories.find(c => c.id === newsForm.category)?.color || 'neon-green'}`}></span>
                    <span className="text-sm font-bold tracking-wider">{newsForm.category}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isCatDropdownOpen ? 'rotate-180 text-neon-green' : ''}`} />
                </div>

                <AnimatePresence>
                  {isCatDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      className="absolute left-0 right-0 top-full mt-2 z-50 bg-[#121216] border border-white/10 rounded-xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.5)]"
                    >
                      {categories.map((cat) => (
                        <div 
                          key={cat.id}
                          onClick={() => {
                            setNewsForm({...newsForm, category: cat.id});
                            setIsCatDropdownOpen(false);
                          }}
                          className={`px-4 py-4 hover:bg-white/5 cursor-pointer flex items-center justify-between group transition-colors ${
                            newsForm.category === cat.id ? 'bg-white/[0.03]' : ''
                          }`}
                        >
                          <div className="flex items-center gap-3">
                             <span className={`w-2 h-2 rounded-full bg-${cat.color} group-hover:scale-125 transition-transform`}></span>
                             <span className={`text-xs font-bold tracking-widest ${newsForm.category === cat.id ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>
                               {cat.label}
                             </span>
                          </div>
                          {newsForm.category === cat.id && <CheckCircle className="w-4 h-4 text-neon-green" />}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1 ml-1">Alert Headline</label>
                <div className="relative group">
                  <input 
                    type="text" 
                    required
                    maxLength={30}
                    placeholder="e.g. SERVER MAINTENANCE INITIATED"
                    value={newsForm.title}
                    onChange={(e) => setNewsForm({...newsForm, title: e.target.value})}
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-neon-green/50 placeholder:text-gray-700 font-bold tracking-tight transition-all"
                  />
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] font-mono text-gray-600">
                    {newsForm.title.length}/30
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-1 ml-1">Directive Details</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="System message content to be relayed to all active node terminals..."
                  value={newsForm.message}
                  onChange={(e) => setNewsForm({...newsForm, message: e.target.value})}
                  className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-neon-green/50 resize-none placeholder:text-gray-700 text-sm leading-relaxed transition-all"
                ></textarea>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center justify-between pt-8 gap-6 border-t border-white/5">
              <motion.div 
                  initial={false}
                  animate={{ opacity: newsSuccess ? 1 : 0, x: newsSuccess ? 0 : -10 }}
                  className="text-neon-green text-[10px] flex items-center gap-2 font-black uppercase tracking-widest bg-neon-green/10 px-4 py-2 rounded-full border border-neon-green/20"
              >
                <CheckCircle className="w-3 h-3" /> Broadcast Locked & Synced
              </motion.div>
              <button 
                type="submit"
                disabled={!newsForm.title || !newsForm.message}
                className="w-full sm:w-auto px-10 py-4 bg-neon-green/20 border border-neon-green text-neon-green font-black rounded-xl hover:bg-neon-green hover:text-black transition-all flex items-center justify-center gap-3 shadow-2xl shadow-neon-green/20 tracking-[0.2em] text-xs disabled:opacity-30 disabled:grayscale disabled:pointer-events-none group"
              >
                <Bell className="w-4 h-4 group-hover:animate-bounce" /> X-SYNC BROADCAST
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-12 relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10 min-h-screen text-white">
      {/* Header section with Global System Status */}
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-white/5">
        <motion.div 
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="space-y-2"
        >
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-white flex items-center gap-4">
            <ShieldAlert className="w-12 h-12 text-neon-purple text-glow-purple" />
            ADMIN <span className="text-neon-purple text-glow-purple">OVERSIGHT</span>
          </h1>
          <p className="text-gray-400 font-medium tracking-wide">Global platform telemetry, user control, and system integrity command deck.</p>
        </motion.div>
        
        {/* Animated Server Status Ledger */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="glass-panel p-6 rounded-2xl border border-neon-purple/30 flex items-center space-x-6 min-w-[320px] shadow-2xl shadow-neon-purple/5"
        >
          <div className="bg-neon-purple/20 p-5 rounded-2xl glow-purple animate-pulse">
            <ServerCrash className="w-8 h-8 text-neon-purple" />
          </div>
          <div>
            <p className="text-xs text-neon-purple/80 font-black tracking-[0.2em] uppercase mb-1">Network Stability</p>
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-neon-green"></span>
              </span>
              <span className="text-xl font-mono font-black text-white">SYSTEMS NOMINAL</span>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SYSTEM_STATS.map((stat, idx) => (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`glass-panel p-8 rounded-2xl border border-${stat.color}/20 hover:border-${stat.color}/50 transition-all group relative overflow-hidden flex-1 cursor-default hover:-translate-y-1`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${stat.color}/5 rounded-full blur-3xl -mr-16 -mt-16 transition-all group-hover:bg-${stat.color}/20`}></div>
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div className={`bg-${stat.color}/10 p-4 rounded-xl ring-1 ring-${stat.color}/30 glow-${stat.color.split("-")[1]}`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}`} />
              </div>
              <span className={`flex items-center gap-1.5 text-sm font-bold bg-black/40 px-3 py-1 rounded-full border border-white/5 ${
                stat.trend === "up" ? "text-neon-green" : 
                stat.trend === "down" ? "text-red-400" : "text-gray-400"
              }`}>
                {stat.trend === "up" && <TrendingUp className="w-4 h-4" />}
                {stat.change}
              </span>
            </div>
            <h3 className="text-gray-500 font-bold text-xs uppercase tracking-[0.1em] mb-1 relative z-10">{stat.label}</h3>
            <p className="text-3xl font-black text-white relative z-10 tracking-tight">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        
        {/* Quick Admin Actions Panel */}
        <div className="col-span-1 space-y-4">
          <h2 className="text-xs font-black text-gray-500 uppercase tracking-[0.2em] mb-6 px-1">Command Hub</h2>
          
          <button 
            onClick={() => setActiveTab("users")}
            className={`w-full group relative flex items-center justify-between p-6 rounded-2xl transition-all border shadow-xl ${
              activeTab === "users" 
                ? "bg-neon-purple/20 border-neon-purple glow-purple translate-x-2" 
                : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10 mt-2"
            }`}
          >
            <div className="flex items-center space-x-5">
              <Users className={`w-6 h-6 transition-transform ${activeTab === 'users' ? 'text-neon-purple scale-110' : 'text-gray-500 group-hover:text-neon-purple group-hover:scale-110'}`} />
              <div className="text-left">
                <span className={`font-black text-lg block ${activeTab === 'users' ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>USERS</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Management</span>
              </div>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab("tournaments")}
            className={`w-full group flex items-center justify-between p-6 rounded-2xl transition-all border shadow-xl ${
              activeTab === "tournaments" 
                ? "bg-neon-cyan/20 border-neon-cyan glow-cyan translate-x-2" 
                : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
            }`}
          >
            <div className="flex items-center space-x-5">
              <Gamepad2 className={`w-6 h-6 transition-transform ${activeTab === 'tournaments' ? 'text-neon-cyan scale-110' : 'text-gray-500 group-hover:text-neon-cyan group-hover:scale-110'}`} />
              <div className="text-left">
                <span className={`font-black text-lg block ${activeTab === 'tournaments' ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>EVENTS</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Control</span>
              </div>
            </div>
          </button>

          <button 
            onClick={() => setActiveTab("news")}
            className={`w-full group flex items-center justify-between p-6 rounded-2xl transition-all border shadow-xl ${
              activeTab === "news" 
                ? "bg-neon-green/20 border-neon-green glow-green translate-x-2" 
                : "bg-white/5 border-white/10 hover:border-white/20 hover:bg-white/10"
            }`}
          >
            <div className="flex items-center space-x-5">
              <Radio className={`w-6 h-6 transition-transform ${activeTab === 'news' ? 'text-neon-green scale-110' : 'text-gray-500 group-hover:text-neon-green group-hover:scale-110'}`} />
              <div className="text-left">
                <span className={`font-black text-lg block ${activeTab === 'news' ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>NEWS</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Broadcaster</span>
              </div>
            </div>
          </button>
          
          <button 
            onClick={() => setActiveTab("audit")}
            className={`w-full group flex items-center justify-between p-6 rounded-2xl transition-all border shadow-xl ${
              activeTab === "audit" 
                ? "bg-white/15 border-white/40 translate-x-2" 
                : "bg-black/20 border-white/5 hover:border-white/20 hover:bg-white/5"
            }`}
          >
            <div className="flex items-center space-x-5">
              <Activity className="w-6 h-6 text-gray-500 group-hover:text-white transition-all duration-300" />
              <div className="text-left">
                <span className={`font-black text-lg block ${activeTab === 'audit' ? 'text-white' : 'text-gray-400 group-hover:text-white'}`}>AUDIT</span>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Logs</span>
              </div>
            </div>
          </button>
        </div>

        {/* Dynamic Content Panel */}
        <div className="col-span-1 lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full"
            >
              {activeTab === "audit" && renderAuditTab()}
              {activeTab === "users" && renderUsersTab()}
              {activeTab === "tournaments" && renderTournamentsTab()}
              {activeTab === "news" && renderNewsTab()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* --- Global Modals --- */}
      
      {/* Edit Modal */}
      <Modal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
        title={
          <div className="flex items-center gap-3">
            <Edit className="w-6 h-6 text-neon-cyan" />
            <span>EDIT <span className="text-neon-cyan">TOURNAMENT</span></span>
          </div>
        }
      >
        {selectedTournament && (
          <EditDetailsModal 
            tourney={selectedTournament} 
            onSave={handleEditTournament} 
            onClose={() => setIsEditModalOpen(false)} 
          />
        )}
      </Modal>

      {/* Manage Modal - WITH CUSTOM MAX WIDTH */}
      <Modal 
        isOpen={isManageModalOpen} 
        onClose={() => setIsManageModalOpen(false)} 
        maxWidth="max-w-6xl"
        title={
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-neon-cyan" />
            <span>MANAGE <span className="text-neon-cyan">TOURNAMENT</span></span>
          </div>
        }
      >
        {selectedTournament && (
          <ManageTournamentModal 
            tourney={selectedTournament} 
            onForward={handleForwardStage} 
            onUpdateStatus={updateTournamentStatus}
            onUpdateBrackets={updateBrackets}
            onClose={() => setIsManageModalOpen(false)} 
          />
        )}
      </Modal>
    </div>
  );
}
