"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";

export interface NavItem {
  name: string;
  href: string;
  id: string;
}

export interface NavigationProps {
  sections?: string[];
  className?: string;
}

const defaultNavItems: NavItem[] = [
  { name: "Home", href: "#home", id: "home" },
  { name: "Videos", href: "#videos", id: "videos" },
  { name: "Gallery", href: "#gallery", id: "gallery" },
  { name: "About Us", href: "#about", id: "about" },
  { name: "Services", href: "#services", id: "services" },
];

export function Navigation({
  sections = ["home", "videos", "gallery", "about", "services", "appointment"],
  className = "",
}: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [activeSection, setActiveSection] = useState<string>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Track active section and navbar background opacity on scroll
  useEffect(() => {
    const handleScroll = () => {
      // 1. Sticky background styling threshold
      setIsScrolled(window.scrollY > 15);

      // 2. Determine active section based on scroll position
      const scrollPosition = window.scrollY + 120; // Offset for navbar height

      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sections]);

  // Smooth scroll handler
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
      e.preventDefault();
      setMobileMenuOpen(false);

      if (targetId === "home") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveSection("home");
        return;
      }

      const element = document.getElementById(targetId);
      if (element) {
        const navHeight = 80;
        const targetPosition = element.getBoundingClientRect().top + window.pageYOffset - navHeight;
        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
        setActiveSection(targetId);
      }
    },
    []
  );

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/85 backdrop-blur-md border-b border-slate-800 shadow-xl shadow-black/20"
          : "bg-slate-950/70 backdrop-blur-sm border-b border-slate-800/60 shadow-md"
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Clinic Logo / Branding with Teal Accent (#06b6d4) */}
        <Link
          href="#home"
          onClick={(e) => handleNavClick(e, "home")}
          className="flex items-center gap-3.5 group cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#06b6d4] via-teal-400 to-sky-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            S
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold tracking-wider text-white text-base sm:text-lg leading-tight group-hover:text-[#06b6d4] transition-colors">
              WE DESIGN <span className="text-[#06b6d4]">SMILES</span>
            </span>
            <span className="text-[10px] sm:text-[11px] text-[#06b6d4] font-semibold uppercase tracking-widest">
              Center for Aesthetic & Implant Dentistry
            </span>
          </div>
        </Link>

        {/* Desktop Horizontal Menu */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          {defaultNavItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative py-1.5 transition-all duration-200 ${
                  isActive
                    ? "text-[#06b6d4] font-bold"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                {item.name}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#06b6d4] rounded-full shadow-sm shadow-cyan-500/50 animate-in fade-in duration-200" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Teal CTA Button */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="#appointment"
            onClick={(e) => handleNavClick(e, "appointment")}
            className="px-5 py-2.5 rounded-xl bg-[#06b6d4] hover:bg-cyan-400 text-slate-950 font-extrabold text-sm tracking-wide shadow-lg shadow-cyan-500/25 hover:shadow-cyan-400/40 transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            Book Appointment
          </Link>
        </div>

        {/* Mobile Hamburger Menu Toggle Button */}
        <div className="flex items-center gap-3 lg:hidden">
          <Link
            href="#appointment"
            onClick={(e) => handleNavClick(e, "appointment")}
            className="sm:hidden px-3.5 py-1.5 text-xs font-bold rounded-lg bg-[#06b6d4] text-slate-950 shadow-sm"
          >
            Book
          </Link>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-[#06b6d4] hover:bg-slate-800 transition-colors focus:outline-none focus:ring-2 focus:ring-[#06b6d4]/50"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Vertical Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-950/95 border-b border-slate-800 px-6 py-6 space-y-4 backdrop-blur-2xl shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col space-y-1">
            {defaultNavItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.id)}
                  className={`flex items-center justify-between py-3 px-3 rounded-lg text-base transition-colors ${
                    isActive
                      ? "text-[#06b6d4] font-bold bg-cyan-950/40 border-l-4 border-[#06b6d4]"
                      : "text-slate-200 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <span>{item.name}</span>
                  {isActive && <span className="text-xs text-[#06b6d4]">●</span>}
                </Link>
              );
            })}
          </nav>

          <div className="pt-2 border-t border-slate-900 flex flex-col gap-3">
            <Link
              href="#appointment"
              onClick={(e) => handleNavClick(e, "appointment")}
              className="w-full text-center py-3.5 text-sm font-extrabold rounded-xl bg-[#06b6d4] hover:bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25 transition-all"
            >
              Book Appointment
            </Link>
            <a
              href="tel:4155557645"
              className="text-center py-1 text-xs font-semibold text-slate-400 hover:text-[#06b6d4] transition-colors"
            >
              📞 Direct Line: (415) 555-SMILE
            </a>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navigation;
