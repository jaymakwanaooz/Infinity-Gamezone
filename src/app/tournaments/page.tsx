"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import { Trophy, Calendar, Users, DollarSign, ArrowRight, MousePointer2, X, Swords, ChevronDown, Info, MapPin, Clock } from "lucide-react";
import Image from "next/image";

const tournaments = [
  {
    title: "Valorant Open S4",
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop",
    date: "April 15, 2024",
    prize: "₹50,000",
    teams: "16 / 32 Slots",
    status: "Registration Open",
    category: "upcoming",
    color: "neon-cyan",
    format: "5v5 • Single Elimination • BO3 Finals",
    schedule: "Check-in: 10:00 AM • Matches Start: 11:00 AM",
    venue: "InfinityGZ Arena — Hall A",
    description: "The biggest Valorant event of the season. Assemble your squad and fight through 5 rounds to claim the championship title and the ₹50,000 prize pool.",
    rules: ["Teams must check in 1 hour before start", "All players must use InfinityGZ PCs", "Coaching allowed between maps only", "Toxic behavior = instant DQ"],
    requirements: "Minimum Rank: Gold 2 or above",
  },
  {
    title: "CS2 Pro Division",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    date: "March 28 - April 05",
    prize: "₹1,00,000",
    teams: "8 Teams Left",
    status: "Live Now",
    category: "ongoing",
    color: "neon-purple",
    format: "5v5 • Double Elimination",
    schedule: "Matches Daily from 4:00 PM",
    venue: "InfinityGZ Arena — Main Stage",
    description: "The professional CS2 circuit is live! Watch the best teams in the region battle it out for the massive 1 Lakh prize pool.",
    rules: ["Official Tournament Rules apply", "Standard Map Pool", "BO3 Series"],
    requirements: "Invite Only",
  },
  {
    title: "Tekken 8 Clash",
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop",
    date: "March 31, 2024",
    prize: "₹15,000",
    teams: "Ongoing",
    status: "In Progress",
    category: "ongoing",
    color: "neon-green",
    format: "1v1 • Double Elimination",
    schedule: "Starts 2:00 PM Today",
    venue: "InfinityGZ Console Lounge",
    description: "The first major Tekken 8 LAN at InfinityGZ. High stakes, high intensity fighting game action.",
    rules: ["All matches BO3 until Finals", "Finals BO5", "Blind pick enabled"],
    requirements: "Open to all",
  },
  {
    title: "CS2 Competitive League",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    date: "May 02, 2024",
    prize: "₹25,000",
    teams: "8 / 16 Slots",
    status: "Early Bird",
    category: "upcoming",
    color: "neon-purple",
    format: "5v5 • Round Robin Groups → Playoffs",
    schedule: "Check-in: 12:00 PM • Matches Start: 1:00 PM",
    venue: "InfinityGZ Arena — Hall B",
    description: "A premier CS2 league featuring round-robin group stages followed by a knockout bracket. Early bird registrations get a 20% discount on entry fees.",
    rules: ["VAC-banned accounts not allowed", "All matches are MR12", "Overtime: MR3", "Map veto system in use"],
    requirements: "Open to all ranks",
  },
  {
    title: "Dota 2 Winter Cup",
    image: "https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=2070&auto=format&fit=crop",
    date: "Feb 10 - Feb 12",
    prize: "₹40,000",
    teams: "Completed",
    status: "Finished",
    category: "finished",
    color: "neon-cyan",
    format: "5v5 • Single Elimination",
    schedule: "3 Day Event",
    venue: "Online / InfinityGZ Finals",
    description: "The annual Winter Cup concluded with a spectacular finale between Team Velocity and Shadow Walkers.",
    rules: ["Valve standard rules", "Captain's Mode", "No coaching during matches"],
    requirements: "Registered Teams",
  },
  {
    title: "League Masters 2024",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1870&auto=format&fit=crop",
    date: "June 10, 2024",
    prize: "₹75,000",
    teams: "2 / 16 Slots",
    status: "Nearly Full",
    category: "upcoming",
    color: "neon-green",
    format: "5v5 • Double Elimination • BO5 Grand Finals",
    schedule: "Day 1: Groups (10 AM) • Day 2: Playoffs (12 PM)",
    venue: "InfinityGZ Arena — Main Stage",
    description: "The ultimate League of Legends showdown. A two-day spectacle with a massive ₹75,000 prize pool, live casting, and audience seating. Only 2 slots remain!",
    rules: ["2-day event — attendance both days mandatory", "Subs allowed (max 2 per team)", "Draft mode: Tournament Draft", "No third-party overlays"],
    requirements: "Minimum Rank: Platinum 4 or above",
  },
];

const pastWinners = [
  { name: "Team Velocity", game: "Valorant S3", prize: "₹40,000", year: "2023" },
  { name: "Apex Predators", game: "CS:GO Winter", prize: "₹20,000", year: "2023" },
  { name: "Silent Assassins", game: "Dota 2 Masters", prize: "₹60,000", year: "2022" },
];

export default function TournamentsPage() {
  const [activeCategory, setActiveCategory] = useState("upcoming");
  const [showRegModal, setShowRegModal] = useState(false);
  const [showScoresModal, setShowScoresModal] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<string | null>(null);
  const [selectedScoresTournament, setSelectedScoresTournament] = useState<typeof tournaments[0] | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [teamSize, setTeamSize] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [infoTournament, setInfoTournament] = useState<typeof tournaments[0] | null>(null);

  const GAMERTAGS = [
    "ViperScale", "NeonGhost", "SniperKing", "AlphaOmega", "Zenith", "QuantumLink",
    "ShadowStrike", "FireHawk", "VoidWalker", "Cipher77", "RogueOne", "CyberPulse",
    "TitanPrime", "GlitchMatrix", "BoltRunner", "EchoWave", "NovaStrike", "PixelBeast"
  ];

  const generateBracket = () => {
    // Shuffle and pick 8 tags
    const shuffled = [...GAMERTAGS].sort(() => 0.5 - Math.random());
    return {
      quarter: shuffled.slice(0, 8),
      semi: shuffled.slice(0, 4), // Placeholder winners
      final: shuffled.slice(0, 2),
      winner: shuffled[0]
    };
  };

  const handleViewScores = (tournament: typeof tournaments[0]) => {
    setSelectedScoresTournament(tournament);
    setShowScoresModal(true);
  };

  const TEAM_OPTIONS = [
    { value: "1", label: "Solo" },
    { value: "2", label: "Duo" },
    { value: "3", label: "Trio" },
    { value: "5", label: "5v5" },
  ];

  const handleRegister = (title: string) => {
    setSelectedTournament(title);
    setSubmitted(false);
    setTeamSize("");
    setDropdownOpen(false);
    setShowRegModal(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gaming-bg">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading 
          title="Battle Arena" 
          subtitle="Compete for Glory"
        />

        {/* Tab Switcher */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {[
            { id: "ongoing", label: "Ongoing", icon: <Clock className="w-4 h-4" /> },
            { id: "upcoming", label: "Upcoming", icon: <Calendar className="w-4 h-4" /> },
            { id: "finished", label: "Finished", icon: <Trophy className="w-4 h-4" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center space-x-2 border ${
                activeCategory === tab.id 
                  ? "bg-white text-black border-white glow-white scale-105" 
                  : "bg-white/5 text-gray-400 border-white/10 hover:border-white/30 hover:text-white"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {activeCategory === tab.id && (
                <motion.span 
                  layoutId="activeTab"
                  className="w-1.5 h-1.5 rounded-full bg-neon-cyan"
                />
              )}
            </button>
          ))}
        </div>

        {/* Active Tournaments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24 min-h-[400px]">
          <AnimatePresence mode="wait">
            {tournaments
              .filter(t => t.category === activeCategory)
              .map((tournament, index) => (
                <motion.div
                  key={tournament.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="group glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col sm:flex-row h-full"
                >
                  <div className="relative w-full sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                    <Image
                      src={tournament.image}
                      alt={tournament.title}
                      fill
                      className={`object-cover transition-transform duration-700 group-hover:scale-110 ${tournament.category === 'finished' ? 'grayscale opacity-60' : ''}`}
                    />
                    <div className="absolute top-4 left-4">
                       <span className={`px-3 py-1 rounded bg-black/80 text-[10px] font-bold text-white uppercase tracking-widest border border-white/10`}>
                          {tournament.status}
                       </span>
                    </div>
                  </div>

                  <div className="p-8 sm:w-3/5 flex flex-col justify-between">
                    <div>
                      <h3 className={`text-2xl font-black italic mb-6 uppercase tracking-tighter ${tournament.category === 'finished' ? 'text-gray-500' : 'text-white'}`}>{tournament.title}</h3>
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center space-x-3 text-sm text-gray-400">
                          <Calendar className={`w-4 h-4 text-${tournament.color}`} />
                          <span>{tournament.date}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-gray-400">
                          <DollarSign className={`w-4 h-4 text-${tournament.color}`} />
                          <span className={`${tournament.category === 'finished' ? 'text-gray-500' : 'font-bold text-white'}`}>Prize Pool: {tournament.prize}</span>
                        </div>
                        <div className="flex items-center space-x-3 text-sm text-gray-400">
                          <Users className={`w-4 h-4 text-${tournament.color}`} />
                          <span>{tournament.teams}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button 
                        onClick={() => { setInfoTournament(tournament); setShowInfoModal(true); }}
                        className="py-3 px-4 rounded-lg font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center border bg-white/5 text-white border-white/10 hover:border-neon-cyan hover:text-neon-cyan hover:scale-105 active:scale-95"
                      >
                        <Info className="w-4 h-4" />
                      </button>
                      
                      {tournament.category === 'upcoming' ? (
                        <button 
                          onClick={() => handleRegister(tournament.title)}
                          className="flex-1 py-3 rounded-lg font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 border bg-white/5 text-white border-white/10 hover:bg-white hover:text-black hover:scale-105 active:scale-95"
                        >
                          <span>REGISTER NOW</span>
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleViewScores(tournament)}
                          className={`flex-1 py-3 rounded-lg font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 border border-white/10 ${
                            tournament.category === 'ongoing' 
                              ? 'bg-neon-cyan/10 text-neon-cyan hover:bg-neon-cyan hover:text-black hover:glow-cyan' 
                              : 'bg-white/5 text-gray-300 hover:bg-white hover:text-black'
                          } hover:scale-105 active:scale-95`}
                        >
                          <span>{tournament.category === 'ongoing' ? 'VIEW LIVE SCORES' : 'VIEW BRACKETS'}</span>
                          <Trophy className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
          </AnimatePresence>
          {tournaments.filter(t => t.category === activeCategory).length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="col-span-full py-20 text-center glass-panel rounded-3xl border-dashed border-2 border-white/5"
            >
              <Trophy className="w-12 h-12 text-gray-700 mx-auto mb-4" />
              <h3 className="text-xl font-black text-white/20 uppercase italic">No {activeCategory} tournaments found</h3>
            </motion.div>
          )}
        </div>

        {/* Global Stats */}
        <section className="py-16 grid grid-cols-1 sm:grid-cols-3 gap-8 mb-32">
           {[
             { label: "Total Prize Paid", value: "₹5L+", icon: <DollarSign className="w-5 h-5" /> },
             { label: "Active Players", value: "2,500+", icon: <Users className="w-5 h-5" /> },
             { label: "Monthly Events", value: "4-5", icon: <Trophy className="w-5 h-5" /> }
           ].map((stat, i) => (
             <div key={i} className="glass-panel p-8 rounded-2xl text-center border-b-2 border-white/5 hover:border-neon-cyan transition-colors">
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4 text-neon-cyan">
                   {stat.icon}
                </div>
                <h4 className="text-3xl font-black text-white italic mb-1 uppercase tracking-tighter">{stat.value}</h4>
                <p className="text-xs font-mono uppercase text-gray-500 tracking-widest">{stat.label}</p>
             </div>
           ))}
        </section>

        {/* Past Winners Table */}
        <section className="space-y-12">
           <div className="text-center">
              <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter">Wall of Fame</h2>
              <p className="text-gray-500 text-sm mt-3 font-medium">History is written by the victors.</p>
           </div>

           <div className="glass-panel rounded-3xl overflow-hidden border border-white/5">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-8 py-5 text-xs font-black uppercase text-gray-400 tracking-widest">Year</th>
                      <th className="px-8 py-5 text-xs font-black uppercase text-gray-400 tracking-widest">Winning Team</th>
                      <th className="px-8 py-5 text-xs font-black uppercase text-gray-400 tracking-widest">Tournament</th>
                      <th className="px-8 py-5 text-xs font-black uppercase text-gray-400 tracking-widest text-right">Prize</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {pastWinners.map((winner, i) => (
                      <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-8 py-6 text-sm font-mono text-gray-500">{winner.year}</td>
                        <td className="px-8 py-6">
                           <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-neon-cyan/20 to-neon-purple/20 border border-white/10 flex items-center justify-center">
                                 <Trophy className="w-4 h-4 text-neon-cyan" />
                              </div>
                              <span className="text-white font-bold">{winner.name}</span>
                           </div>
                        </td>
                        <td className="px-8 py-6 text-sm text-gray-400">{winner.game}</td>
                        <td className="px-8 py-6 text-sm font-black text-white text-right italic uppercase">{winner.prize}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>
        </section>

        {/* CTA */}
        <section className="mt-32 glass-panel p-16 rounded-[40px] text-center border-neon-cyan/20 group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-neon-cyan/5 via-transparent to-neon-purple/5 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-black text-white italic uppercase tracking-tighter mb-8 leading-none">
                READY TO <br /> <span className="text-neon-cyan text-glow-cyan">DROP IN?</span>
              </h2>
              <p className="text-gray-400 text-lg mb-12 max-w-xl mx-auto font-medium">
                 Join our community of 2,000+ competitive gamers. <br /> New tournaments every Sunday.
              </p>
              <button className="bg-neon-cyan text-black px-12 py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:glow-cyan transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center space-x-3 mx-auto">
                 <span>ENTER DISCORD</span>
                 <MousePointer2 className="w-5 h-5" />
              </button>
            </div>
        </section>
      </main>

      {/* Info/Details Modal */}
      <AnimatePresence>
        {showInfoModal && infoTournament && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="glass-panel p-8 rounded-2xl border border-white/10 max-w-lg w-full shadow-xl relative max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setShowInfoModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="mb-6 pb-5 border-b border-white/10">
                <span className={`inline-block px-3 py-1 rounded text-[10px] font-bold uppercase tracking-widest mb-3 bg-${infoTournament.color}/20 text-${infoTournament.color} border border-${infoTournament.color}/30`}>
                  {infoTournament.status}
                </span>
                <h3 className="text-2xl font-black text-white uppercase tracking-wider italic">{infoTournament.title}</h3>
                <p className="text-gray-400 text-sm mt-2">{infoTournament.description}</p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="flex items-center space-x-2 text-gray-400 mb-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Date</span>
                  </div>
                  <p className="text-white font-bold text-sm">{infoTournament.date}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="flex items-center space-x-2 text-gray-400 mb-1">
                    <DollarSign className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Prize Pool</span>
                  </div>
                  <p className="text-neon-cyan font-black text-sm">{infoTournament.prize}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="flex items-center space-x-2 text-gray-400 mb-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Venue</span>
                  </div>
                  <p className="text-white font-bold text-sm">{infoTournament.venue}</p>
                </div>
                <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="flex items-center space-x-2 text-gray-400 mb-1">
                    <Users className="w-3.5 h-3.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Slots</span>
                  </div>
                  <p className="text-white font-bold text-sm">{infoTournament.teams}</p>
                </div>
              </div>

              {/* Format & Schedule */}
              <div className="space-y-3 mb-6">
                <div className="flex items-start space-x-3">
                  <Swords className="w-4 h-4 text-neon-purple mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Format</p>
                    <p className="text-white text-sm font-medium">{infoTournament.format}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-neon-green mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Schedule</p>
                    <p className="text-white text-sm font-medium">{infoTournament.schedule}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Trophy className="w-4 h-4 text-neon-cyan mt-0.5 shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-0.5">Requirements</p>
                    <p className="text-white text-sm font-medium">{infoTournament.requirements}</p>
                  </div>
                </div>
              </div>

              {/* Rules */}
              <div className="mb-8">
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Rules</p>
                <ul className="space-y-2">
                  {infoTournament.rules.map((rule, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-300">
                      <span className="w-5 h-5 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-bold text-gray-500 mr-3 mt-0.5 shrink-0">{i + 1}</span>
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <button
                onClick={() => { setShowInfoModal(false); handleRegister(infoTournament.title); }}
                className="w-full py-3 bg-white text-black font-black text-sm tracking-widest rounded-xl flex justify-center items-center hover:bg-neon-cyan transition-colors space-x-2"
              >
                <span>REGISTER FOR THIS TOURNAMENT</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Registration Modal */}
      <AnimatePresence>
        {showRegModal && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="glass-panel p-8 rounded-2xl border border-neon-cyan/50 max-w-md w-full glow-cyan shadow-xl relative max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setShowRegModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                <X className="w-6 h-6" />
              </button>

              {!submitted ? (
                <>
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-neon-cyan/20 p-2 rounded-lg">
                      <Swords className="w-5 h-5 text-neon-cyan" />
                    </div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-wider">Register</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-6 pb-4 border-b border-white/10">
                    Registering for <span className="text-neon-cyan font-bold">{selectedTournament}</span>
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Team Name *</label>
                      <input type="text" placeholder="e.g. Shadow Wolves" required className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Captain Name *</label>
                      <input type="text" placeholder="Your in-game name" required className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Email *</label>
                      <input type="email" placeholder="captain@team.gg" required className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors" />
                    </div>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Phone</label>
                        <input type="tel" placeholder="+91 9876543210" className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors" />
                      </div>
                      <div className="w-32 relative">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Team Size</label>
                        <button
                          type="button"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                          className={`w-full bg-black/50 border rounded-lg px-4 py-3 text-left flex items-center justify-between transition-colors ${
                            dropdownOpen ? 'border-neon-cyan' : 'border-white/10 hover:border-white/30'
                          }`}
                        >
                          <span className={teamSize ? 'text-white font-medium' : 'text-gray-500'}>
                            {teamSize ? TEAM_OPTIONS.find(o => o.value === teamSize)?.label : 'Select'}
                          </span>
                          <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-neon-cyan' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {dropdownOpen && (
                            <motion.div
                              initial={{ opacity: 0, y: -4, scaleY: 0.95 }}
                              animate={{ opacity: 1, y: 0, scaleY: 1 }}
                              exit={{ opacity: 0, y: -4, scaleY: 0.95 }}
                              transition={{ duration: 0.15 }}
                              className="absolute z-50 top-[calc(100%+4px)] left-0 w-full bg-black/90 backdrop-blur-xl border border-neon-cyan/30 rounded-lg overflow-hidden shadow-[0_8px_32px_rgba(0,243,255,0.15)]"
                            >
                              {TEAM_OPTIONS.map((option) => (
                                <button
                                  key={option.value}
                                  type="button"
                                  onClick={() => { setTeamSize(option.value); setDropdownOpen(false); }}
                                  className={`w-full px-4 py-2.5 text-left text-sm font-bold uppercase tracking-wider transition-all duration-150 flex items-center justify-between ${
                                    teamSize === option.value 
                                      ? 'bg-neon-cyan/20 text-neon-cyan' 
                                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                  }`}
                                >
                                  <span>{option.label}</span>
                                  {teamSize === option.value && <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan" />}
                                </button>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 block">Message</label>
                      <textarea placeholder="Anything we should know?" rows={3} className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-neon-cyan transition-colors resize-none" />
                    </div>

                    <button type="submit" className="w-full mt-2 py-3 bg-neon-cyan text-black font-black tracking-widest text-sm rounded-xl flex justify-center items-center hover:bg-white hover:glow-cyan transition-colors space-x-2">
                      <Swords className="w-4 h-4" />
                      <span>SUBMIT REGISTRATION</span>
                    </button>
                  </form>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-neon-green/20 border border-neon-green/30 flex items-center justify-center mx-auto mb-6">
                    <Trophy className="w-8 h-8 text-neon-green" />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-wider mb-2">You&apos;re In!</h3>
                  <p className="text-gray-400 text-sm mb-6">
                    Your registration for <span className="text-neon-cyan font-bold">{selectedTournament}</span> has been submitted.
                    We&apos;ll send confirmation to your email.
                  </p>
                  <button
                    onClick={() => setShowRegModal(false)}
                    className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl font-bold text-white hover:bg-white/10 transition-colors"
                  >
                    CLOSE
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Brackets / Scores Modal */}
      <AnimatePresence>
        {showScoresModal && selectedScoresTournament && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}
              className="glass-panel p-8 md:p-12 rounded-[40px] border border-white/10 max-w-5xl w-full relative max-h-[90vh] overflow-y-auto"
            >
              <button onClick={() => setShowScoresModal(false)} className="absolute top-8 right-8 text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full">
                <X className="w-6 h-6" />
              </button>

              <div className="text-center mb-16">
                 <div className={`inline-block px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-4 
                   ${selectedScoresTournament.category === 'ongoing' ? 'bg-neon-cyan/20 text-neon-cyan border border-neon-cyan/30' : 'bg-white/10 text-gray-400 border border-white/10'}`}>
                   {selectedScoresTournament.category === 'ongoing' ? 'LIVE TOURNAMENT' : 'FINAL RESULTS'}
                 </div>
                 <h2 className="text-4xl md:text-5xl font-black text-white italic uppercase tracking-tighter">{selectedScoresTournament.title} Brackets</h2>
              </div>

              {/* Bracket Tree Visual */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center justify-center relative">
                 {/* Quarter Finals */}
                 <div className="space-y-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-8 border-b border-white/5 pb-2">Quarter Finals</h4>
                    {generateBracket().quarter.map((tag, i) => (
                      <div key={i} className={`p-4 rounded-xl border flex justify-between items-center bg-white/5 ${i % 2 === 0 ? 'border-l-4 border-l-neon-cyan' : 'border-white/5 opacity-80'}`}>
                         <span className="text-sm font-bold text-white tracking-wide">{tag}</span>
                         <span className="text-[10px] font-mono text-gray-500">{Math.floor(Math.random() * 10) + 1}</span>
                      </div>
                    ))}
                 </div>

                 {/* Semi Finals */}
                 <div className="space-y-12">
                 <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-8 border-b border-white/5 pb-2">Semi Finals</h4>
                    {generateBracket().semi.map((tag, i) => (
                      <div key={i} className={`p-5 rounded-xl border flex justify-between items-center bg-white/10 ${i === 0 ? 'border-neon-purple shadow-[0_0_20px_rgba(180,0,255,0.1)]' : 'border-white/10'}`}>
                         <span className="text-sm font-bold text-white tracking-wide">{tag}</span>
                         <span className={`px-2 py-0.5 rounded text-[8px] font-black ${i === 0 ? 'bg-neon-purple text-white' : 'bg-white/20 text-gray-300'}`}>
                            {i === 0 ? 'WINNER' : 'ELIMINATED'}
                         </span>
                      </div>
                    ))}
                 </div>

                 {/* Finals */}
                 <div className="flex flex-col items-center justify-center py-12 px-8 rounded-3xl bg-gradient-to-br from-neon-cyan/5 to-neon-purple/5 border border-white/10">
                    <Trophy className="w-16 h-16 text-neon-cyan mb-6 drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]" />
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-4">Ultimate Grand Champion</h4>
                    <div className="text-3xl font-black text-white italic uppercase tracking-tighter mb-2 glow-white">
                       {generateBracket().winner}
                    </div>
                    <div className="text-neon-cyan font-mono text-sm uppercase tracking-widest font-black">
                       Winner • {selectedScoresTournament.prize}
                    </div>
                    
                    {selectedScoresTournament.category === 'ongoing' && (
                       <div className="mt-8 px-4 py-2 bg-neon-cyan text-black text-[10px] font-black uppercase tracking-widest animate-pulse">
                          Match In Progress
                       </div>
                    )}
                 </div>
              </div>

              <div className="mt-16 pt-8 border-t border-white/5 text-center">
                 <p className="text-gray-500 text-xs font-medium italic">Updates live every 5 minutes • Standard ESports Rulebook applied</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
