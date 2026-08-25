"use client";

import React from "react";
import Link from "next/link";

interface ServiceItem {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  highlight: string;
  timeframe: string;
  popular?: boolean;
}

const services: ServiceItem[] = [
  {
    id: "cosmetic",
    title: "Handcrafted Porcelain Veneers",
    category: "Cosmetic Dentistry",
    description:
      "Ultra-thin, custom-shaded ceramic veneers engineered to correct chips, deep discoloration, gaps, and minor misalignments with minimal enamel removal.",
    icon: "✨",
    highlight: "10-Year Craftsmanship Guarantee",
    timeframe: "2 Visits (7 Days)",
    popular: true,
  },
  {
    id: "implants",
    title: "Guided 3D Dental Implants",
    category: "Implantology",
    description:
      "Precision computer-guided placement of titanium and biocompatible zirconia fixtures. Permanent single tooth, bridge, and full-arch All-on-4 replacements.",
    icon: "🦷",
    highlight: "99.8% Clinical Success Rate",
    timeframe: "Same-Day Provisional",
    popular: true,
  },
  {
    id: "aligners",
    title: "Invisible Orthodontics & Invisalign",
    category: "Orthodontics",
    description:
      "Clear, removable smart-track aligners planned with 3D digital simulation. Straighten teeth discreetly without metal brackets or dietary restrictions.",
    icon: "💎",
    highlight: "Complimentary 3D Outcome Scan",
    timeframe: "4 - 12 Months",
  },
  {
    id: "laser",
    title: "Painless Laser Periodontics",
    category: "Periodontal Care",
    description:
      "Advanced Nd:YAG laser therapy for gum regeneration, bacterial decontamination, and aesthetic gum contouring without scalpels or sutures.",
    icon: "🔬",
    highlight: "Zero Post-Op Downtime",
    timeframe: "1 Visit (45 mins)",
  },
  {
    id: "whitening",
    title: "In-Office Laser Smile Whitening",
    category: "Cosmetic Dentistry",
    description:
      "Medical-grade hydrogen peroxide accelerated by dual-spectrum LED lasers. Safely lifts tough coffee, wine, and age stains up to 8 shades lighter.",
    icon: "⚡",
    highlight: "Anti-Sensitivity Enamel Protection",
    timeframe: "60-Minute Session",
  },
  {
    id: "rehab",
    title: "Full Mouth Smile Rehabilitation",
    category: "Reconstructive",
    description:
      "Comprehensive multi-specialty restoration combining crowns, bridges, bite realignment, and periodontal architecture for worn or damaged dentition.",
    icon: "👑",
    highlight: "Full Function & Aesthetics Restored",
    timeframe: "Personalized Protocol",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200/80 text-sky-700 text-xs font-bold uppercase tracking-widest mb-4">
          <span className="w-2 h-2 rounded-full bg-sky-500 animate-pulse" />
          Clinical Excellence & Specialties
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Comprehensive Dental Services Tailored to Your Smile
        </h2>
        <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed">
          Every treatment is custom-engineered using high-definition 3D intraoral diagnostics, biophilic sedation options, and master ceramist craftsmanship.
        </p>
      </div>

      {/* Grid: 3 columns on desktop, 2 on tablet, 1 on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div
            key={service.id}
            className={`group relative p-8 rounded-3xl bg-white border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between ${
              service.popular
                ? "border-sky-300/80 shadow-lg shadow-sky-500/5 ring-1 ring-sky-400/20"
                : "border-slate-200/80 shadow-sm"
            }`}
          >
            {service.popular && (
              <span className="absolute top-6 right-6 px-3 py-1 rounded-full bg-gradient-to-r from-sky-500 to-teal-500 text-white text-[11px] font-bold tracking-wide shadow-sm">
                Most Requested
              </span>
            )}

            <div>
              <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center text-2xl mb-6 group-hover:bg-gradient-to-tr group-hover:from-sky-500 group-hover:to-teal-400 group-hover:text-white transition-all shadow-inner">
                {service.icon}
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                {service.category}
              </span>
              <h3 className="text-xl font-extrabold text-slate-900 mt-1 mb-3 group-hover:text-sky-600 transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                {service.description}
              </p>
            </div>

            <div className="pt-6 border-t border-slate-100 space-y-3">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Clinical Highlight:</span>
                <span className="text-slate-900 font-bold text-right">{service.highlight}</span>
              </div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
                <span>Treatment Time:</span>
                <span className="text-sky-600 font-bold">{service.timeframe}</span>
              </div>
              <Link
                href="#appointment"
                className="mt-3 block w-full text-center py-2.5 rounded-xl bg-slate-50 group-hover:bg-sky-500 group-hover:text-white text-slate-700 text-xs font-bold transition-all border border-slate-200/80 group-hover:border-transparent"
              >
                Schedule Consultation →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
