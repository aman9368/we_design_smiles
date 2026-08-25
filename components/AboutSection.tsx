"use client";

import React from "react";
import Image from "next/image";

interface Doctor {
  name: string;
  role: string;
  credentials: string;
  almaMater: string;
  specialty: string;
  bio: string;
  image: string;
}

const doctors: Doctor[] = [
  {
    name: "Dr. Emily Vance, DDS, MS",
    role: "Clinical Director & Founder",
    credentials: "AACD Accredited Fellow • Board Certified Prosthodontist",
    almaMater: "Harvard School of Dental Medicine",
    specialty: "Aesthetic Porcelain Veneers & Digital Smile Architecture",
    bio: "Over 16 years transforming complex smile aesthetics. Pioneer in minimally invasive facial-driven digital dental modeling.",
    image: "/doctors/dr-emily.jpg",
  },
  {
    name: "Dr. Marcus Lin, DMD, ICOI",
    role: "Chief Oral Surgeon & Implant Specialist",
    credentials: "Diplomate, International Congress of Oral Implantologists",
    almaMater: "UPenn School of Dental Medicine",
    specialty: "Guided All-on-4 Implants & Bone Reconstruction",
    bio: "Specializing in painless computer-guided implant surgery and bone regeneration with over 6,000 successful fixture integrations.",
    image: "/doctors/dr-marcus.jpg",
  },
  {
    name: "Dr. Sophia Chen, DDS",
    role: "Orthodontic & Occlusion Specialist",
    credentials: "Diamond+ Invisalign Provider • Orthodontic Research Fellow",
    almaMater: "Columbia University College of Dental Medicine",
    specialty: "Invisible Orthodontics & Airway-Centric Alignment",
    bio: "Passionate about combining functional airway health with harmonious orthodontic smile symmetry for teens and adults.",
    image: "/doctors/dr-sophia.jpg",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Subtle Background Glow Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Clinic Story & Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-sky-500/30 text-sky-400 text-xs font-bold uppercase tracking-widest">
              Our Story & Philosophy
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              Where Medical Precision Meets <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-teal-300">Artistic Smile Craft</span>
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Founded on the belief that visiting the dentist should be an empowering, calm, and transformative experience, <strong>WE DESIGN SMILES</strong> merges advanced digital robotics with haute couture smile customization.
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              Every operatory is acoustically isolated and air-purified to hospital standards, allowing our multidisciplinary team of dental masters to focus purely on your comfort and long-term oral longevity.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-800">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-sky-400">15,000+</div>
                <div className="text-xs text-slate-400 mt-1">Smiles Designed</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-teal-400">99.8%</div>
                <div className="text-xs text-slate-400 mt-1">Implant Success</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400">4.9 ★</div>
                <div className="text-xs text-slate-400 mt-1">1,200+ Reviews</div>
              </div>
            </div>
          </div>

          {/* Mission & Values Card */}
          <div className="lg:col-span-6 p-8 sm:p-10 rounded-3xl bg-slate-800/80 border border-slate-700/80 shadow-2xl backdrop-blur-md">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center font-black">
                ★
              </span>
              Our 4 Pillars of Patient-Centered Care
            </h3>
            <div className="space-y-5 text-sm">
              <div className="flex gap-4">
                <div className="font-bold text-sky-400 shrink-0">01.</div>
                <div>
                  <h4 className="font-semibold text-white">Anxiety-Free Tranquility</h4>
                  <p className="text-slate-400 text-xs mt-0.5">Custom sedation options, ceiling entertainment, and warm noise-canceling acoustics.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="font-bold text-teal-400 shrink-0">02.</div>
                <div>
                  <h4 className="font-semibold text-white">Digital-First Accuracy</h4>
                  <p className="text-slate-400 text-xs mt-0.5">3D facial scanning and computer-milled zirconia for micro-millimeter precision.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="font-bold text-cyan-400 shrink-0">03.</div>
                <div>
                  <h4 className="font-semibold text-white">Conservative Enamel Preservation</h4>
                  <p className="text-slate-400 text-xs mt-0.5">Minimally invasive dentistry designed to retain your natural tooth structure for life.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="font-bold text-indigo-400 shrink-0">04.</div>
                <div>
                  <h4 className="font-semibold text-white">Transparent & Upfront Pricing</h4>
                  <p className="text-slate-400 text-xs mt-0.5">Detailed customized treatment plans with zero unexpected fees and 0% financing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor & Team Introductions */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Meet Our Board-Certified Dental Masters
            </h3>
            <p className="mt-2 text-slate-400 text-sm">
              Combining world-class training from top dental institutions with gentle, compassionate care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {doctors.map((doc, idx) => (
              <div
                key={doc.name}
                className="group rounded-3xl bg-slate-950/80 border border-slate-800 p-6 flex flex-col justify-between hover:border-sky-500/50 hover:shadow-2xl transition-all duration-300"
              >
                <div>
                  {/* Doctor Avatar / Badge */}
                  <div className="relative w-full aspect-square rounded-2xl bg-gradient-to-tr from-slate-800 to-slate-700 overflow-hidden mb-6 flex items-center justify-center border border-slate-700/60 shadow-inner group-hover:scale-[1.02] transition-transform">
                    {/* Stylized Clinical Monogram Icon Fallback with Next.js Image support */}
                    <div className="text-center p-6">
                      <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-sky-500 to-teal-400 flex items-center justify-center text-white text-3xl font-black shadow-lg mb-3">
                        {doc.name.split(" ")[1][0]}
                      </div>
                      <span className="text-xs uppercase tracking-widest text-sky-300 font-bold">
                        {doc.almaMater}
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-semibold text-sky-400 uppercase tracking-wide">
                    {doc.role}
                  </span>
                  <h4 className="text-lg font-bold text-white mt-1 mb-2 group-hover:text-sky-300 transition-colors">
                    {doc.name}
                  </h4>
                  <div className="text-xs font-medium text-teal-300 mb-3 bg-teal-950/50 px-2.5 py-1 rounded-md border border-teal-800/40 inline-block">
                    {doc.specialty}
                  </div>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    {doc.bio}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono">
                  {doc.credentials}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
