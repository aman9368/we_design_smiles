"use client";

import React from "react";
import dynamic from "next/dynamic";
import Navigation from "@/components/Navigation";
import ServicesSection from "@/components/ServicesSection";
import AboutSection from "@/components/AboutSection";
import LocationSection from "@/components/LocationSection";
import BookingForm from "@/components/BookingForm";

// Performance Optimization: Dynamic Client-side Lazy Loading for Video Scrubbing Sections
const HeroVideoSection = dynamic(() => import("@/components/HeroVideoSection"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-4">
      <div className="w-10 h-10 border-4 border-sky-500/20 border-t-sky-500 rounded-full animate-spin" />
      <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold">
        Loading Reception Walkthrough...
      </span>
    </div>
  ),
});

const ResultsVideoSection = dynamic(() => import("@/components/ResultsVideoSection"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-4">
      <div className="w-10 h-10 border-4 border-teal-500/20 border-t-teal-500 rounded-full animate-spin" />
      <span className="text-xs uppercase tracking-widest text-teal-400 font-semibold">
        Loading Results Gallery...
      </span>
    </div>
  ),
});

const VideoSection3 = dynamic(() => import("@/components/VideoSection3"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-slate-950 flex flex-col items-center justify-center text-slate-400 gap-4">
      <div className="w-10 h-10 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
      <span className="text-xs uppercase tracking-widest text-cyan-400 font-semibold">
        Loading Clinic Continuity Tour...
      </span>
    </div>
  ),
});

export default function Home() {
  const sectionIds = ["home", "videos", "gallery", "about", "services", "appointment"];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-[#06b6d4] selection:text-slate-950">
      {/* Sticky Header / Navigation Component */}
      <Navigation sections={sectionIds} />

      <main className="flex-1 pt-20">
        {/* ========================================================================= */}
        {/* 1. HERO VIDEO SECTION 1: RECEPTION TO DOCTOR'S CHAIR WALKTHROUGH           */}
        {/* ========================================================================= */}
        <section id="home" className="relative scroll-mt-20">
          <HeroVideoSection
            videoFramePath="/videos/video_1_frames/ezgif-frame-%d.png"
            totalFrames={40}
            overlayTitle="We Design Smiles - Professional Dental Care"
            overlayDescription="Your journey to perfect smiles starts here."
          />
        </section>

        {/* Section Divider 1: Ambient Bridge */}
        <div id="videos" className="relative z-30 py-8 px-4 sm:px-6 lg:px-8 bg-slate-900 border-y border-slate-800 shadow-2xl scroll-mt-20">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 rounded-full bg-[#06b6d4] animate-ping" />
              <p className="text-xs sm:text-sm font-semibold text-slate-200 tracking-wide">
                <span className="text-[#06b6d4] font-bold">NEXT UP:</span> Explore patient smile transformations captured chair-side
              </p>
            </div>
            <div className="flex items-center gap-6 divide-x divide-slate-800 text-xs text-slate-400 font-medium">
              <span className="pl-0 text-slate-300">100% Digital Workflow</span>
              <span className="pl-6 text-slate-300">Custom Shade Matching</span>
              <span className="pl-6 text-[#06b6d4] font-semibold">10-Year Craftsmanship Warranty</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. HERO VIDEO SECTION 2: RESULTS GALLERY & BEFORE/AFTER EXHIBITION        */}
        {/* ========================================================================= */}
        <section id="gallery" className="relative scroll-mt-20">
          <ResultsVideoSection
            videoFramePath="/videos/video_2_frames/ezgif-frame-%d.png"
            totalFrames={40}
            overlayTitle="See Our Smile Transformations - Before & After Results"
            overlayDescription="Join hundreds of satisfied patients who achieved their dream smiles."
          />
        </section>

        {/* Section Divider 2: Ambient Bridge */}
        <div className="relative z-30 py-8 px-4 sm:px-6 lg:px-8 bg-slate-900 border-y border-slate-800 shadow-2xl">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <span className="flex h-3 w-3 rounded-full bg-cyan-400 animate-ping" />
              <p className="text-xs sm:text-sm font-semibold text-slate-200 tracking-wide">
                <span className="text-cyan-400 font-bold">PATIENT EXPERIENCE:</span> Architectural walkthrough of our anxiety-free clinic design
              </p>
            </div>
            <div className="flex items-center gap-6 divide-x divide-slate-800 text-xs text-slate-400 font-medium">
              <span className="pl-0 text-slate-300">Acoustic Soundproofing</span>
              <span className="pl-6 text-slate-300">HEPA-Filtered Pure Air</span>
              <span className="pl-6 text-cyan-400 font-semibold">Biophilic Design</span>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. HERO VIDEO SECTION 3: CLINIC CONTINUITY & ARCHITECTURAL COMFORT        */}
        {/* ========================================================================= */}
        <section id="continuity" className="relative scroll-mt-20">
          <VideoSection3
            videoFramePath="/videos/video_3_frames/ezgif-frame-%d.png"
            totalFrames={40}
            overlayTitle="Professional Clinic Design - Built for Your Comfort"
            overlayDescription="Every space designed for your peace of mind."
          />
        </section>

        {/* ========================================================================= */}
        {/* 4. SERVICES & TREATMENTS MENU SECTION                                     */}
        {/* ========================================================================= */}
        <section id="services" className="bg-white border-y border-slate-200/80 scroll-mt-20">
          <ServicesSection />
        </section>

        {/* ========================================================================= */}
        {/* 5. ABOUT US & DOCTOR CREDENTIALS SECTION                                  */}
        {/* ========================================================================= */}
        <section id="about" className="scroll-mt-20">
          <AboutSection />
        </section>

        {/* ========================================================================= */}
        {/* 6. CLINIC LOCATION & GOOGLE MAPS SECTION                                  */}
        {/* ========================================================================= */}
        <section id="location" className="bg-slate-100/60 border-b border-slate-200 scroll-mt-20">
          <LocationSection />
        </section>

        {/* ========================================================================= */}
        {/* 7. APPOINTMENT BOOKING FORM SECTION                                       */}
        {/* ========================================================================= */}
        <section id="appointment" className="py-16 bg-slate-900 scroll-mt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <BookingForm />
          </div>
        </section>
      </main>

      {/* ========================================================================= */}
      {/* 8. LUXURY MEDICAL CLINIC FOOTER                                           */}
      {/* ========================================================================= */}
      <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#06b6d4] to-teal-400 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-cyan-500/20">
                S
              </div>
              <span className="font-extrabold tracking-wider text-white text-lg">
                WE DESIGN <span className="text-[#06b6d4]">SMILES</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              World-class center for cosmetic prosthodontics, digital smile architecture, and guided dental implantology. Designed for calm, engineered for perfection.
            </p>
            <div className="flex gap-4 text-slate-400 text-sm">
              <span className="hover:text-white transition-colors cursor-pointer">Instagram</span>
              <span>•</span>
              <span className="hover:text-white transition-colors cursor-pointer">LinkedIn</span>
              <span>•</span>
              <span className="hover:text-white transition-colors cursor-pointer">Google Verified ★ 4.9</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-4">
              Specialties
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#services" className="hover:text-[#06b6d4] transition-colors">Porcelain Veneers</a></li>
              <li><a href="#services" className="hover:text-[#06b6d4] transition-colors">All-on-4 Implants</a></li>
              <li><a href="#services" className="hover:text-[#06b6d4] transition-colors">Invisalign Clear Aligners</a></li>
              <li><a href="#services" className="hover:text-[#06b6d4] transition-colors">Laser Smile Whitening</a></li>
              <li><a href="#services" className="hover:text-[#06b6d4] transition-colors">Full Mouth Reconstruction</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-4">
              Patient Care
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li><a href="#home" className="hover:text-[#06b6d4] transition-colors">Virtual Clinic Tour</a></li>
              <li><a href="#gallery" className="hover:text-[#06b6d4] transition-colors">Before & After Gallery</a></li>
              <li><a href="#about" className="hover:text-[#06b6d4] transition-colors">Our Doctors & Philosophy</a></li>
              <li><a href="#location" className="hover:text-[#06b6d4] transition-colors">Valet Parking & Directions</a></li>
              <li><a href="#appointment" className="hover:text-[#06b6d4] transition-colors">Book 3D Smile Consultation</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-4">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs text-slate-400">
              <p className="text-white font-bold text-sm">(415) 555-SMILE</p>
              <p>care@wedesignsmiles.com</p>
              <p className="pt-2 text-slate-500">450 Sutter St, Suite 1400<br />San Francisco, CA 94108</p>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 WE DESIGN SMILES Dental Care. All rights reserved. HIPAA & ADA Compliant Facility.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Terms of Care</a>
            <a href="#" className="hover:text-slate-300 transition-colors">Patient Portal</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
