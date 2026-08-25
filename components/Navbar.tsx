"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Clinic Tour", href: "#tour" },
    { name: "Before & After", href: "#results" },
    { name: "Clinic Design", href: "#continuity" },
    { name: "Services", href: "#services" },
    { name: "About Us", href: "#about" },
    { name: "Location & Map", href: "#location" },
  ];

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/90 backdrop-blur-lg border-b border-slate-800 shadow-xl shadow-slate-950/40"
          : "bg-slate-950/75 backdrop-blur-md border-b border-slate-800/80"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500 via-cyan-400 to-teal-400 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-sky-500/25 group-hover:scale-105 transition-transform">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-wider text-white text-base sm:text-lg leading-tight group-hover:text-sky-300 transition-colors">
              WE DESIGN SMILES
            </span>
            <span className="text-[10px] sm:text-[11px] text-sky-400 font-semibold uppercase tracking-widest">
              Center for Aesthetic & Implant Dentistry
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-slate-300">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-sky-400 transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-sky-400 hover:after:w-full after:transition-all"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right CTA & Emergency Hotline */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href="tel:4155557645"
            className="hidden xl:flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>(415) 555-SMILE</span>
          </a>
          <Link
            href="#appointment"
            className="px-5 py-2.5 text-xs sm:text-sm font-semibold rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 hover:from-sky-400 hover:to-teal-400 text-white shadow-lg shadow-sky-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            Book Consultation
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center gap-2 lg:hidden">
          <Link
            href="#appointment"
            className="sm:hidden px-3 py-1.5 text-xs font-bold rounded-lg bg-sky-500 text-white"
          >
            Book
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-6 py-6 space-y-4 backdrop-blur-xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-medium text-slate-200 hover:text-sky-400 py-2 border-b border-slate-900 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>
          <div className="pt-2 flex flex-col gap-3">
            <Link
              href="#appointment"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 text-sm font-bold rounded-xl bg-gradient-to-r from-sky-500 to-teal-500 text-white shadow-md"
            >
              Book My Consultation
            </Link>
            <a
              href="tel:4155557645"
              className="text-center py-2 text-xs font-semibold text-slate-400 hover:text-sky-400 transition-colors"
            >
              📞 Direct Line: (415) 555-SMILE
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
