"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import SectionHeading from "@/components/SectionHeading";
import { Trophy, Calendar, Users, DollarSign, ArrowRight, MousePointer2 } from "lucide-react";
import Image from "next/image";

const tournaments = [
  {
    title: "Valorant Open S4",
    image: "https://images.unsplash.com/photo-1614613535308-eb5fbd3d2c17?q=80&w=2070&auto=format&fit=crop",
    date: "April 15, 2024",
    prize: "₹50,000",
    teams: "16 / 32 Slots",
    status: "Registration Open",
    color: "neon-cyan",
  },
  {
    title: "CS2 Competitive League",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop",
    date: "May 02, 2024",
    prize: "₹25,000",
    teams: "8 / 16 Slots",
    status: "Early Bird",
    color: "neon-purple",
  },
  {
    title: "League Masters 2024",
    image: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?q=80&w=1870&auto=format&fit=crop",
    date: "June 10, 2024",
    prize: "₹75,000",
    teams: "2 / 16 Slots",
    status: "Nearly Full",
    color: "neon-green",
  },
];

const pastWinners = [
  { name: "Team Velocity", game: "Valorant S3", prize: "₹40,000", year: "2023" },
  { name: "Apex Predators", game: "CS:GO Winter", prize: "₹20,000", year: "2023" },
  { name: "Silent Assassins", game: "Dota 2 Masters", prize: "₹60,000", year: "2022" },
];

export default function TournamentsPage() {
  return (
    <div className="min-h-screen bg-gaming-bg">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionHeading 
          title="Battle Arena" 
          subtitle="Compete for Glory"
        />

        {/* Active Tournaments Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {tournaments.map((tournament, index) => (
            <motion.div
              key={tournament.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group glass-panel rounded-3xl overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 flex flex-col sm:flex-row h-full"
            >
              <div className="relative w-full sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                <Image
                  src={tournament.image}
                  alt={tournament.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                   <span className={`px-3 py-1 rounded bg-black/80 text-[10px] font-bold text-white uppercase tracking-widest border border-white/10`}>
                      {tournament.status}
                   </span>
                </div>
              </div>

              <div className="p-8 sm:w-3/5 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-black text-white italic mb-6 uppercase tracking-tighter">{tournament.title}</h3>
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <Calendar className={`w-4 h-4 text-${tournament.color}`} />
                      <span>{tournament.date}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <DollarSign className={`w-4 h-4 text-${tournament.color}`} />
                      <span className="font-bold text-white">Prize Pool: {tournament.prize}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-400">
                      <Users className={`w-4 h-4 text-${tournament.color}`} />
                      <span>{tournament.teams}</span>
                    </div>
                  </div>
                </div>

                <button className={`w-full py-3 rounded-lg font-black text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center space-x-2 border bg-white/5 text-white border-white/10 hover:bg-white hover:text-black hover:scale-105 active:scale-95`}>
                  <span>REGISTER NOW</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
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
    </div>
  );
}
