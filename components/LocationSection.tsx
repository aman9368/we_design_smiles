"use client";

import React from "react";

export default function LocationSection() {
  return (
    <section id="location" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-teal-700 text-xs font-bold uppercase tracking-widest mb-4">
          <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
          San Francisco Flagship Clinic
        </div>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
          Convenient Downtown Location & Hours
        </h2>
        <p className="mt-4 text-slate-600 text-base sm:text-lg">
          Located in the heart of Union Square medical district with dedicated valet parking and direct transit access.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Google Maps Responsive 16:9 Embed */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-100">
            <iframe
              title="WE DESIGN SMILES Clinic Location Google Maps"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.084773822184!2d-122.41031382343825!3d37.78917831139414!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808e001859c7%3A0x6b1076b4a3952d76!2s450%20Sutter%20St%2C%20San%20Francisco%2C%20CA%2094108!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white border border-slate-200/80 shadow-sm text-xs text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>Complimentary Valet Parking</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>2 Blocks from Montgomery BART</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>ADA Wheelchair Accessible</span>
            </div>
          </div>
        </div>

        {/* Contact Info & Hours Details */}
        <div className="lg:col-span-5 space-y-6">
          {/* Address & Direct Lines */}
          <div className="p-8 rounded-3xl bg-white border border-slate-200/80 shadow-lg space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-600">
                Clinic Address
              </span>
              <h3 className="text-xl font-bold text-slate-900 mt-1">
                450 Sutter St, Suite 1400
              </h3>
              <p className="text-slate-600 text-sm mt-0.5">
                San Francisco, CA 94108 (Union Square Medical Bldg)
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Appointments
                </span>
                <p className="text-base font-bold text-slate-900 mt-0.5">
                  <a href="tel:4155557645" className="hover:text-sky-600 transition-colors">
                    (415) 555-SMILE
                  </a>
                </p>
                <p className="text-[11px] text-slate-500">(415) 555-7645</p>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Email Desk
                </span>
                <p className="text-sm font-bold text-slate-900 mt-0.5 truncate">
                  <a href="mailto:care@wedesignsmiles.com" className="hover:text-sky-600 transition-colors">
                    care@wedesignsmiles.com
                  </a>
                </p>
                <p className="text-[11px] text-slate-500">2-Hour Response Time</p>
              </div>
            </div>

            {/* Operating Hours Table */}
            <div className="pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Weekly Operating Hours
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-bold border border-emerald-200">
                  ● Open Today
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-700 py-1 border-b border-slate-50">
                  <span className="font-semibold">Monday – Thursday</span>
                  <span className="font-mono text-slate-900">7:30 AM – 6:30 PM</span>
                </div>
                <div className="flex justify-between text-slate-700 py-1 border-b border-slate-50">
                  <span className="font-semibold">Friday</span>
                  <span className="font-mono text-slate-900">8:00 AM – 5:00 PM</span>
                </div>
                <div className="flex justify-between text-slate-700 py-1 border-b border-slate-50">
                  <span className="font-semibold">Saturday</span>
                  <span className="font-mono text-slate-900">9:00 AM – 3:00 PM</span>
                </div>
                <div className="flex justify-between text-slate-400 py-1">
                  <span className="font-medium">Sunday</span>
                  <span className="font-mono text-amber-600 font-semibold">Emergency on Call</span>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=450+Sutter+St,+San+Francisco,+CA+94108"
              target="_blank"
              rel="noopener noreferrer"
              className="block text-center w-full py-3 rounded-xl bg-slate-900 hover:bg-sky-600 text-white font-bold text-xs transition-colors shadow-md"
            >
              Open in Google Maps App →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
