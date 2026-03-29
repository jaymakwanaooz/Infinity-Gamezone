"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Gamepad2, Menu, X, User } from "lucide-react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Packages", href: "/packages" },
    { name: "Tournaments", href: "/tournaments" },
  ];

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

          {/* CTA / Profile */}
          <div className="hidden md:flex items-center space-x-4">
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
