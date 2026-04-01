"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Gamepad2, Menu, X, User, Bell, ChevronDown, CheckCircle } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<any[]>([]);
  const pathname = usePathname();
  const notificationRef = useRef<HTMLDivElement>(null);
  const bellRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        notificationRef.current && 
        !notificationRef.current.contains(event.target as Node) &&
        bellRef.current &&
        !bellRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    // Notifications initialization
    const DEFAULT_NOTIFICATIONS = [
      { id: "1", category: "NEW TOURNAMENT", title: "NEW TOURNAMENT", message: "Valorant Open Season 3 registrations are live!" },
      { id: "2", category: "NEW EVENT", title: "NEW EVENT", message: "Meet & Greet with ShivFPS this Saturday at Orion Complex." },
      { id: "3", category: "SYSTEM UPGRADE", title: "SYSTEM UPGRADE", message: "VIP Rooms A & B have been upgraded with new 360Hz monitors." }
    ];

    const loadNotifications = () => {
      const stored = localStorage.getItem('infinity_alerts');
      if (stored && JSON.parse(stored).length > 0) {
        setNotifications(JSON.parse(stored));
      } else {
        setNotifications(DEFAULT_NOTIFICATIONS);
        localStorage.setItem('infinity_alerts', JSON.stringify(DEFAULT_NOTIFICATIONS));
      }
    };

    loadNotifications();

    const handleStorageChange = () => {
      loadNotifications();
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Packages", href: "/packages" },
    { name: "Tournaments", href: "/tournaments" },
    { name: "Leaderboard", href: "/leaderboard" },
    { name: "Contact", href: "/contact" },
  ];

  if (pathname === '/admin') return null;

  return (
    <motion.header
      key={pathname}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "glass-panel border-b-gaming-border" : "bg-transparent border-b-transparent"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <Gamepad2 className="w-8 h-8 text-neon-cyan group-hover:drop-shadow-[0_0_12px_rgba(0,243,255,0.8)] transition-all duration-300" />
            <span className="text-2xl font-bold tracking-wider text-white">
              INFINITY<span className="text-neon-cyan text-glow-cyan">GZ</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm tracking-wide font-medium transition-colors duration-200 hover:text-neon-cyan ${
                    isActive ? "text-neon-cyan" : "text-gray-300"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* CTA / Profile / Notifications */}
          <div className="hidden md:flex items-center space-x-4 relative">
            <button 
              ref={bellRef}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2.5 rounded-full border border-gaming-border text-gray-300 hover:text-white hover:border-neon-cyan transition-all duration-300 hover:glow-cyan flex items-center justify-center"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-neon-cyan rounded-full animate-pulse shadow-[0_0_8px_rgba(0,243,255,0.8)]"></span>
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div 
                  ref={notificationRef}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-4 w-96 bg-[#0c0c0f] border border-white/10 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] z-[60] backdrop-blur-xl"
                >
                  <div className="p-5 border-b border-white/5 bg-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-neon-cyan" />
                      <h3 className="text-white font-black text-xs tracking-[0.2em] uppercase">Notifications</h3>
                    </div>
                    {notifications.length > 0 && (
                      <span className="text-[10px] font-bold text-neon-cyan bg-neon-cyan/10 px-2 py-0.5 rounded-full border border-neon-cyan/20">
                        {notifications.length} NEW
                      </span>
                    )}
                  </div>
                  <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
                    {notifications.length === 0 ? (
                      <div className="p-10 text-center">
                        <Bell className="w-8 h-8 text-white/10 mx-auto mb-3" />
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest">No active alerts</p>
                      </div>
                    ) : (
                      notifications.map((notif: any, i: number) => {
                        const colorClass = 
                          notif.category === "NEW TOURNAMENT" ? "text-neon-cyan" :
                          notif.category === "IMPORTANT" || notif.category === "ALERT" ? "text-red-500" :
                          notif.category === "SYSTEM UPGRADE" ? "text-neon-green" :
                          "text-neon-purple";
                          
                        return (
                          <motion.div 
                            key={notif.id || i} 
                            whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
                            className="p-5 border-b border-white/5 cursor-pointer transition-all relative group"
                          >
                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-transparent group-hover:bg-neon-cyan transition-all" />
                            <div className="flex flex-col gap-1">
                               <div className="flex items-center justify-between">
                                  <p className={`text-[10px] ${colorClass} font-black tracking-[0.1em] uppercase`}>{notif.category}</p>
                                  <span className="text-[9px] text-gray-600 font-mono">JUST NOW</span>
                               </div>
                               <p className="text-sm text-white font-bold leading-tight">{notif.title || notif.message.slice(0, 20) + "..."}</p>
                               <p className="text-xs text-gray-400 font-medium leading-relaxed">{notif.message}</p>
                            </div>
                          </motion.div>
                        );
                      })
                    )}
                  </div>
                  <div className="p-4 bg-black/40 border-t border-white/5 text-center">
                    <button className="text-[10px] font-black text-gray-500 hover:text-white uppercase tracking-widest transition-colors">
                      Mark all as read
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <Link
              href="/dashboard"
              className="flex items-center space-x-2 px-5 py-2.5 rounded-full border border-gaming-border hover:border-neon-cyan text-sm font-medium transition-all duration-300 hover:glow-cyan"
            >
              <User className="w-4 h-4" />
              <span>Dashboard</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden glass-panel border-t border-gaming-border"
        >
          <div className="px-4 pt-2 pb-6 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-neon-cyan hover:bg-gaming-accent rounded-md"
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 flex items-center space-x-2 px-3 py-2 text-base font-medium text-white bg-neon-cyan/10 border border-neon-cyan/30 rounded-md hover:bg-neon-cyan/20"
            >
              <User className="w-5 h-5 text-neon-cyan" />
              <span>User Dashboard</span>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
