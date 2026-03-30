"use client";

import { motion } from "framer-motion";
import { Trophy, Medal, Star, Crosshair, Swords, Target } from "lucide-react";

const LEADERBOARD_DATA = [
  { rank: 1, name: "JettDash", score: 14500, game: "Valorant", winRate: "68%", prevRank: "up", tier: "gold" },
  { rank: 2, name: "S1mple_Clone", score: 14200, game: "CS2", winRate: "64%", prevRank: "same", tier: "silver" },
  { rank: 3, name: "FakerFan", score: 13950, game: "League of Legends", winRate: "61%", prevRank: "down", tier: "bronze" },
  { rank: 4, name: "ApexPred", score: 13100, game: "Apex Legends", winRate: "59%", prevRank: "up", tier: "normal" },
  { rank: 5, name: "PikachuMain", score: 12850, game: "Smash Bros", winRate: "60%", prevRank: "up", tier: "normal" },
  { rank: 6, name: "HeadshotHndr", score: 12400, game: "CS2", winRate: "55%", prevRank: "down", tier: "normal" },
  { rank: 7, name: "HealerDiff", score: 12100, game: "Overwatch 2", winRate: "58%", prevRank: "same", tier: "normal" },
  { rank: 8, name: "BuildGod", score: 11950, game: "Fortnite", winRate: "52%", prevRank: "up", tier: "normal" },
  { rank: 9, name: "TiltedTower", score: 11800, game: "Fortnite", winRate: "51%", prevRank: "down", tier: "normal" },
  { rank: 10, name: "ShadowNinja", score: 11500, game: "Valorant", winRate: "53%", prevRank: "same", tier: "normal" },
];

export default function LeaderboardPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-purple/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center mb-16 relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center p-4 bg-neon-cyan/10 rounded-full mb-6 relative"
          >
            <div className="absolute inset-0 bg-neon-cyan/20 blur-xl rounded-full"></div>
            <Trophy className="w-12 h-12 text-neon-cyan drop-shadow-[0_0_15px_rgba(0,243,255,0.8)] relative z-10" />
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black tracking-widest text-white mb-4 uppercase"
          >
            GLOBAL <span className="text-neon-cyan text-glow-cyan text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-blue-500">RANKINGS</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            The elite players of InfinityGZ. Compete in weekly tournaments to earn Loyalty Points and climb the ladder.
          </motion.p>
        </div>

        {/* Top 3 Podium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end">
          {/* Top 2 - Silver */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="glass-panel border-gray-400/50 p-6 rounded-t-3xl border-t-4 bg-gradient-to-b from-gray-400/10 to-transparent flex flex-col items-center h-[280px] justify-end relative overflow-hidden group order-2 md:order-1"
          >
            <div className="absolute top-0 inset-x-0 h-1bg-gray-400 blur-sm glow-white"></div>
            <div className="bg-gray-700 p-3 rounded-full mb-4 shadow-[0_0_20px_rgba(156,163,175,0.5)]">
              <Medal className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-xl font-black text-white">{LEADERBOARD_DATA[1].name}</h3>
            <p className="text-gray-400 text-sm mb-4">{LEADERBOARD_DATA[1].game}</p>
            <div className="mt-auto pt-4 border-t border-white/10 w-full text-center">
              <span className="text-2xl font-mono font-bold text-gray-300">{LEADERBOARD_DATA[1].score} LP</span>
            </div>
            <span className="absolute top-4 left-4 text-4xl font-black text-gray-400/20">#2</span>
          </motion.div>

          {/* Top 1 - Gold */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="glass-panel border-yellow-400/50 p-6 rounded-t-3xl border-t-4 bg-gradient-to-b from-yellow-400/10 to-transparent flex flex-col items-center h-[320px] justify-end relative overflow-hidden group order-1 md:order-2 shadow-[0_-10px_40px_rgba(250,204,21,0.15)]"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-yellow-400 blur-md glow-yellow"></div>
            <div className="bg-yellow-600 p-4 rounded-full mb-4 shadow-[0_0_30px_rgba(250,204,21,0.6)] animate-pulse">
              <Trophy className="w-10 h-10 text-yellow-300" />
            </div>
            <h3 className="text-2xl font-black text-white text-shadow-sm">{LEADERBOARD_DATA[0].name}</h3>
            <p className="text-yellow-200/70 text-sm mb-4">{LEADERBOARD_DATA[0].game}</p>
            <div className="mt-auto pt-4 border-t border-yellow-400/20 w-full text-center">
              <span className="text-3xl font-mono font-black text-yellow-400 text-glow-yellow">{LEADERBOARD_DATA[0].score} LP</span>
            </div>
            <span className="absolute top-4 right-4 text-5xl font-black text-yellow-400/20">#1</span>
          </motion.div>

          {/* Top 3 - Bronze */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="glass-panel border-orange-700/50 p-6 rounded-t-3xl border-t-4 bg-gradient-to-b from-orange-700/10 to-transparent flex flex-col items-center h-[260px] justify-end relative overflow-hidden group order-3 md:order-3"
          >
            <div className="absolute top-0 inset-x-0 h-1 bg-orange-700 blur-sm glow-orange"></div>
            <div className="bg-orange-900 p-3 rounded-full mb-4 shadow-[0_0_20px_rgba(194,65,12,0.5)]">
               <Star className="w-7 h-7 text-orange-400" />
            </div>
            <h3 className="text-lg font-black text-white">{LEADERBOARD_DATA[2].name}</h3>
            <p className="text-gray-400 text-sm mb-4">{LEADERBOARD_DATA[2].game}</p>
            <div className="mt-auto pt-4 border-t border-white/10 w-full text-center">
              <span className="text-xl font-mono font-bold text-orange-400">{LEADERBOARD_DATA[2].score} LP</span>
            </div>
            <span className="absolute top-4 right-4 text-4xl font-black text-orange-700/30">#3</span>
          </motion.div>
        </div>

        {/* Regular Leaderboard Table */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="glass-panel rounded-2xl border border-gaming-border overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead className="bg-white/5 text-gray-400 uppercase font-mono text-xs tracking-wider border-b border-white/10">
                <tr>
                  <th className="px-6 py-5 font-semibold text-center w-20">Rank</th>
                  <th className="px-6 py-5 font-semibold">Player</th>
                  <th className="px-6 py-5 font-semibold">Main Discipline</th>
                  <th className="px-6 py-5 font-semibold text-center">Win Rate</th>
                  <th className="px-6 py-5 font-semibold text-right">Loyalty Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {LEADERBOARD_DATA.slice(3).map((player, idx) => (
                  <motion.tr 
                    key={player.rank}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + (idx * 0.05) }}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-6 py-4 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 border border-white/10 text-gray-400 font-mono font-bold group-hover:bg-neon-cyan/20 group-hover:text-neon-cyan group-hover:border-neon-cyan/50 transition-all">
                        {player.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-bold text-white text-lg">{player.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center text-gray-400 group-hover:text-white transition-colors">
                        {player.game.includes('Shooter') || player.game.includes('CS') || player.game.includes('Valorant') ? <Crosshair className="w-4 h-4 mr-2 text-neon-cyan" /> :
                         player.game.includes('Smash') || player.game.includes('Fighter') ? <Swords className="w-4 h-4 mr-2 text-red-400" /> :
                         <Target className="w-4 h-4 mr-2 text-neon-purple" />}
                        {player.game}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center space-x-2">
                        <div className="w-16 bg-white/10 rounded-full h-1.5 hidden sm:block">
                           <div className="bg-neon-cyan h-1.5 rounded-full" style={{ width: player.winRate }}></div>
                        </div>
                        <span className="text-gray-300 font-medium">{player.winRate}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span className="font-mono font-bold text-neon-cyan group-hover:text-glow-cyan transition-all text-lg">
                        {player.score.toLocaleString()}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
