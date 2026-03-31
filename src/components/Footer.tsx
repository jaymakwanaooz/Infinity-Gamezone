"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gamepad2, Play, Camera, Send, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const pathname = usePathname();

  if (pathname === '/admin') return null;

  return (
    <footer className="bg-gaming-bg pt-24 pb-12 border-t border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2 group">
              <Gamepad2 className="w-8 h-8 text-neon-cyan group-hover:drop-shadow-[0_0_12px_rgba(0,243,255,0.8)] transition-all duration-300" />
              <span className="text-2xl font-bold tracking-wider text-white">
                INFINITY<span className="text-neon-cyan text-glow-cyan">GZ</span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed text-sm max-w-xs">
              Experience gaming like never before in our premium arena with high-end setups, VR, and eSports events.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Send, label: "Twitter" },
                { icon: Camera, label: "Instagram" },
                { icon: Play, label: "Youtube" }
              ].map((social, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-neon-cyan hover:text-neon-cyan transition-all duration-300 group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 group-hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.5)]" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm italic">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'Packages', 'Tournaments', 'Leaderboard', 'Contact'].map((link) => (
                <li key={link}>
                  <Link
                    href={link === 'Home' ? '/' : `/${link.toLowerCase()}`}
                    className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 text-sm flex items-center"
                  >
                    <span className="w-1 h-1 bg-neon-cyan/20 rounded-full mr-3" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm italic">Connect</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-gray-400">
                <MapPin className="w-5 h-5 text-neon-cyan shrink-0" />
                <span>Level 4, Orion Complex, High Street, Mumbai, 400001</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <Phone className="w-5 h-5 text-neon-cyan shrink-0" />
                <span>+91 99887 76655</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-400">
                <Mail className="w-5 h-5 text-neon-cyan shrink-0" />
                <span>support@infinitygz.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-6">
            <h4 className="text-white font-bold uppercase tracking-widest text-sm italic">Newsletter</h4>
            <p className="text-gray-400 text-sm leading-relaxed">Join the squad and stay updated with upcoming tournaments.</p>
            <div className="flex bg-white/5 border border-white/10 rounded-lg p-1 group-within:border-neon-cyan/50 transition-all duration-300">
              <input
                type="email"
                placeholder="Your Email"
                className="bg-transparent border-none focus:outline-none focus:ring-0 text-sm px-3 py-2 text-white w-full"
              />
              <button className="bg-neon-cyan text-black text-xs font-bold px-4 py-2 rounded-md hover:bg-white transition-all duration-300">
                JOIN
              </button>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-[10px] text-gray-500 font-mono tracking-wider uppercase">System Stable: 99.9% Uptime</span>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-xs font-medium">
            &copy; {currentYear} INFINITYGZ PLATFORM. ALL RIGHTS RESERVED.
          </p>
          <div className="flex space-x-8">
            <a href="#" className="text-gray-500 hover:text-white text-xs transition-colors italic">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-white text-xs transition-colors italic">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
