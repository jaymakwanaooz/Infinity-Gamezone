"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-32 pb-20 min-h-screen relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-neon-cyan/5 rounded-full blur-[120px] -z-10"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-neon-purple/5 rounded-full blur-[100px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center p-4 bg-neon-cyan/10 rounded-full mb-6 relative"
          >
            <div className="absolute inset-0 bg-neon-cyan/20 blur-xl rounded-full"></div>
            <MapPin className="w-12 h-12 text-neon-cyan drop-shadow-[0_0_15px_rgba(0,243,255,0.8)] relative z-10" />
          </motion.div>
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-black tracking-widest text-white mb-4 uppercase"
          >
            FIND <span className="text-neon-cyan text-glow-cyan text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan to-blue-500">US</span>
          </motion.h1>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Step into the next dimension of gaming at the InfinityGZ Arena. Reach out to coordinate your next tournament, large booking, or simply to say hi.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Contact Details & Form */}
          <motion.div 
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="space-y-8"
          >
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-neon-cyan/50 transition-all group">
                 <div className="bg-neon-cyan/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:glow-cyan transition-all">
                   <Phone className="w-6 h-6 text-neon-cyan" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Call the Arena</h3>
                 <p className="text-gray-400">+91 99887 76655</p>
                 <p className="text-gray-500 text-sm mt-1">Available 24/7</p>
               </div>
               
               <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-neon-purple/50 transition-all group">
                 <div className="bg-neon-purple/10 w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:glow-purple transition-all">
                   <Mail className="w-6 h-6 text-neon-purple" />
                 </div>
                 <h3 className="text-xl font-bold text-white mb-2">Email Desk</h3>
                 <p className="text-gray-400">support@infinitygz.com</p>
                 <p className="text-gray-500 text-sm mt-1">Response within 2 hours</p>
               </div>
             </div>
             
             <div className="glass-panel p-8 rounded-2xl border border-white/10">
               <h3 className="text-2xl font-bold text-white mb-6">Send a Dispatch</h3>
               <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Op Name</label>
                     <input type="text" placeholder="Ghost" className="w-full bg-black/50 border border-white/10 focus:border-neon-cyan rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-neon-cyan transition-all" />
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Email Signal</label>
                     <input type="email" placeholder="ghost@taskforce.com" className="w-full bg-black/50 border border-white/10 focus:border-neon-cyan rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-neon-cyan transition-all" />
                   </div>
                 </div>
                 <div className="space-y-2">
                   <label className="text-sm font-bold text-gray-400 uppercase tracking-widest">Transmission</label>
                   <textarea rows={4} placeholder="We need to secure VIP Room Beta for tomorrow..." className="w-full bg-black/50 border border-white/10 focus:border-neon-cyan rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-1 focus:ring-neon-cyan transition-all resize-none"></textarea>
                 </div>
                 <button className="w-full flex items-center justify-center space-x-2 bg-neon-cyan text-black font-black py-4 rounded-xl hover:bg-white transition-all duration-300">
                   <span>TRANSMIT MESSAGE</span>
                   <Send className="w-5 h-5" />
                 </button>
               </form>
             </div>
          </motion.div>

          {/* Map and HQ Details */}
          <motion.div 
            initial={{ x: 30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="space-y-8 h-full flex flex-col"
          >
            {/* Interactive Dark Map Mockup / Iframe container */}
            <div className="glass-panel rounded-2xl border border-neon-cyan/30 flex-grow relative overflow-hidden group min-h-[400px]">
               {/* Note: Using a Google Maps iframe embedded to a dark styled map (using standard snazzymaps API style) or generic roadmap with inverted colors via CSS for the MVP */}
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3773.344449019799!2d72.8259461!3d18.9604169!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce3cdaffb8f3%3A0xe21146761356efaf!2sHigh%20St%2C%20Mumbai%20400001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0, filter: 'invert(100%) hue-rotate(180deg) brightness(85%) contrast(105%)' }} 
                 allowFullScreen 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="absolute inset-0 w-full h-full transition-all duration-700 ease-in-out group-hover:scale-105"
               ></iframe>
               
               {/* Overlay for aesthetic */}
               <div className="absolute inset-0 bg-neon-cyan/5 pointer-events-none mix-blend-overlay"></div>
               <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)] pointer-events-none"></div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
               <div className="flex items-start space-x-4">
                 <div className="bg-white/10 p-3 rounded-full mt-1">
                   <Clock className="w-6 h-6 text-white" />
                 </div>
                 <div>
                   <h3 className="font-bold text-white text-lg">Operating Protocol</h3>
                   <p className="text-neon-cyan font-mono font-bold mt-1">24 HOURS / 7 DAYS</p>
                   <p className="text-gray-400 text-sm mt-1 max-w-[200px]">Server maintenance runs weekly on Tuesdays, 04:00 AM.</p>
                 </div>
               </div>
               
               <div className="text-right border-t sm:border-t-0 sm:border-l border-white/10 pt-4 sm:pt-0 sm:pl-6">
                 <h4 className="font-bold text-white uppercase tracking-widest text-sm mb-2">HQ Coordinate</h4>
                 <p className="text-gray-400 text-sm leading-relaxed">Level 4, Orion Complex<br/>High Street<br/>Mumbai, 400001<br/>India</p>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
