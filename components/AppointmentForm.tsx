"use client";

import React, { useState } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  preferredTime: string;
  treatment: string;
  notes: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  preferredDate?: string;
  preferredTime?: string;
  treatment?: string;
}

export default function AppointmentForm() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    treatment: "Aesthetic Porcelain Veneers",
    notes: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [confirmationCode, setConfirmationCode] = useState<string>("");

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your full legal name.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters long.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Please enter your phone number.";
    } else if (!/^[\d\s()+-]{7,20}$/.test(formData.phone.trim())) {
      newErrors.phone = "Please enter a valid contact telephone number.";
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = "Please choose a preferred appointment date.";
    }

    if (!formData.preferredTime) {
      newErrors.preferredTime = "Please select a preferred consultation time window.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate clinical dispatch & booking confirmation
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      const randomId = "WDS-" + Math.floor(100000 + Math.random() * 900000);
      setConfirmationCode(randomId);
    }, 1000);
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      preferredDate: "",
      preferredTime: "",
      treatment: "Aesthetic Porcelain Veneers",
      notes: "",
    });
    setErrors({});
    setIsSuccess(false);
    setConfirmationCode("");
  };

  return (
    <section id="appointment" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950 text-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-sky-400 font-semibold text-xs uppercase tracking-widest bg-sky-950/60 px-3.5 py-1.5 rounded-full border border-sky-800/60">
            Priority Scheduling Desk
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mt-3">
            Book Your Comprehensive Smile Consultation
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Includes high-definition 3D intraoral digital scans, aesthetic smile simulation, and custom clinical roadmap.
          </p>
        </div>

        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-xl">
          {isSuccess ? (
            <div className="text-center py-10 space-y-6 animate-in fade-in zoom-in-95 duration-300">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 text-3xl font-bold flex items-center justify-center mx-auto ring-8 ring-emerald-500/10">
                ✓
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
                  Appointment Request Confirmed
                </span>
                <h3 className="text-2xl font-bold text-white mt-1">
                  Thank You, {formData.name}!
                </h3>
                <p className="text-slate-300 text-sm max-w-md mx-auto mt-2">
                  Our patient care concierge has received your request for <strong>{formData.treatment}</strong> on <strong>{formData.preferredDate}</strong> at <strong>{formData.preferredTime}</strong>.
                </p>
              </div>

              <div className="inline-block p-4 rounded-2xl bg-slate-800/80 border border-slate-700 font-mono text-sm text-slate-300">
                Confirmation ID: <span className="text-sky-400 font-bold">{confirmationCode}</span>
              </div>

              <p className="text-xs text-slate-400">
                A confirmation SMS and calendar invite has been dispatched to <strong>{formData.phone}</strong> and <strong>{formData.email}</strong>.
              </p>

              <button
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold transition-colors"
              >
                Schedule Another Visit
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Full Legal Name <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Jessica Sterling"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-800/90 border text-white placeholder-slate-500 text-sm focus:outline-none transition-all ${
                      errors.name
                        ? "border-rose-500 ring-2 ring-rose-500/20"
                        : "border-slate-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-rose-400 text-xs mt-1.5 font-medium">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Email Address <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="jessica@example.com"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-800/90 border text-white placeholder-slate-500 text-sm focus:outline-none transition-all ${
                      errors.email
                        ? "border-rose-500 ring-2 ring-rose-500/20"
                        : "border-slate-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-rose-400 text-xs mt-1.5 font-medium">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Contact Phone (SMS Confirmation) <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(415) 555-0192"
                    className={`w-full px-4 py-3 rounded-xl bg-slate-800/90 border text-white placeholder-slate-500 text-sm focus:outline-none transition-all ${
                      errors.phone
                        ? "border-rose-500 ring-2 ring-rose-500/20"
                        : "border-slate-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-rose-400 text-xs mt-1.5 font-medium">{errors.phone}</p>
                  )}
                </div>

                {/* Treatment Selection */}
                <div>
                  <label htmlFor="treatment" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Primary Dental Interest
                  </label>
                  <select
                    id="treatment"
                    name="treatment"
                    value={formData.treatment}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all cursor-pointer"
                  >
                    <option value="Aesthetic Porcelain Veneers">Aesthetic Porcelain Veneers</option>
                    <option value="Guided Dental Implants">Guided Dental Implants (Single/All-on-4)</option>
                    <option value="Invisalign & Clear Aligners">Invisalign & Clear Aligners</option>
                    <option value="Laser Smile Whitening">Laser In-Office Teeth Whitening</option>
                    <option value="Full Mouth Smile Rehabilitation">Full Mouth Smile Rehabilitation</option>
                    <option value="General Preventive & Cleaning">General Preventive Care & Hygiene</option>
                  </select>
                </div>

                {/* Preferred Date */}
                <div>
                  <label htmlFor="preferredDate" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Preferred Visit Date <span className="text-rose-400">*</span>
                  </label>
                  <input
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-800/90 border text-white text-sm focus:outline-none transition-all ${
                      errors.preferredDate
                        ? "border-rose-500 ring-2 ring-rose-500/20"
                        : "border-slate-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    }`}
                  />
                  {errors.preferredDate && (
                    <p className="text-rose-400 text-xs mt-1.5 font-medium">{errors.preferredDate}</p>
                  )}
                </div>

                {/* Preferred Time */}
                <div>
                  <label htmlFor="preferredTime" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                    Preferred Time Slot <span className="text-rose-400">*</span>
                  </label>
                  <select
                    id="preferredTime"
                    name="preferredTime"
                    value={formData.preferredTime}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl bg-slate-800/90 border text-white text-sm focus:outline-none transition-all cursor-pointer ${
                      errors.preferredTime
                        ? "border-rose-500 ring-2 ring-rose-500/20"
                        : "border-slate-700 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20"
                    }`}
                  >
                    <option value="">Select Preferred Time</option>
                    <option value="Morning (8:00 AM - 11:00 AM)">Morning (8:00 AM - 11:00 AM)</option>
                    <option value="Midday (11:00 AM - 2:00 PM)">Midday (11:00 AM - 2:00 PM)</option>
                    <option value="Afternoon (2:00 PM - 5:00 PM)">Afternoon (2:00 PM - 5:00 PM)</option>
                    <option value="Evening (5:00 PM - 6:30 PM)">Evening (5:00 PM - 6:30 PM)</option>
                  </select>
                  {errors.preferredTime && (
                    <p className="text-rose-400 text-xs mt-1.5 font-medium">{errors.preferredTime}</p>
                  )}
                </div>
              </div>

              {/* Special Notes & Dental Anxiety */}
              <div>
                <label htmlFor="notes" className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                  Special Notes or Dental Anxiety Accommodations (Optional)
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Let us know if you'd like nitrous sedation, noise-canceling headphones, or have specific medical sensitivities..."
                  className="w-full px-4 py-3 rounded-xl bg-slate-800/90 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 transition-all resize-none"
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-sky-500 via-teal-500 to-cyan-400 hover:from-sky-400 hover:to-cyan-300 text-slate-950 font-extrabold text-sm sm:text-base tracking-wide shadow-xl shadow-sky-500/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Confirming Clinical Availability...</span>
                    </>
                  ) : (
                    <span>Request My Consultation & 3D Scan →</span>
                  )}
                </button>
              </div>

              <div className="flex items-center justify-center gap-6 text-[11px] text-slate-400 text-center">
                <span>🔒 HIPAA Compliant & Secure</span>
                <span>•</span>
                <span>Zero Cancellation Fees</span>
                <span>•</span>
                <span>No Referral Required</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
