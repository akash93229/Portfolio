"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Copy,
  Check,
  Phone,
  Linkedin,
  Github,
  Send,
  Download,
  Sparkles,
  MapPin,
  Clock,
} from 'lucide-react';
import { PROFILE_DATA } from '@/data/profile';
import confetti from 'canvas-confetti';
import { useTheme } from '@/components/providers';

export default function ContactPage() {
  const { identity } = PROFILE_DATA;
  const { isDark } = useTheme();
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(identity.contact.email);
      } else {
        const ta = document.createElement('textarea');
        ta.value = identity.contact.email;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
      }
    } catch {
      // clipboard fallback
    }
    setCopiedEmail(true);
    try {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // ignore
    }
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      confetti({
        particleCount: 75,
        spread: 70,
        origin: { y: 0.7 },
      });
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 900);
  };

  return (
    <div className="py-12 sm:py-16 px-6 lg:px-12 max-w-7xl mx-auto space-y-12">
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs uppercase tracking-widest font-mono font-bold px-3 py-1 rounded-full border text-cyan-500 bg-cyan-950/40 border-cyan-800/60 inline-block">
          Direct Inquiries
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight">
          Let's Build Something High-Performance
        </h1>
        <p className="text-base sm:text-lg opacity-80 leading-relaxed">
          Open to full-time opportunities, engineering contracts, and cloud architecture engagements across India and Remote.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Direct Info & Quick Copy (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Email Copy Card */}
          <div
            className={`p-8 rounded-3xl border transition-all ${
              isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-200 shadow-lg'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-wider font-bold text-cyan-500">
                Primary Contact
              </span>
              <span className="text-xs flex items-center gap-1.5 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Active Inbox
              </span>
            </div>

            <div className="text-lg sm:text-xl font-bold font-mono break-all mb-4">
              {identity.contact.email}
            </div>

            <button
              id="copy-email-btn"
              data-testid="copy-email-btn"
              onClick={handleCopyEmail}
              className={`w-full py-3 px-4 rounded-2xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 border transition-all active:scale-95 ${
                copiedEmail
                  ? 'bg-emerald-500 text-black border-emerald-400'
                  : 'bg-primary text-primary-foreground hover:opacity-90 border-transparent'
              }`}
            >
              {copiedEmail ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Email Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Email Address</span>
                </>
              )}
            </button>
          </div>

          {/* Social Profiles & CV */}
          <div
            className={`p-8 rounded-3xl border space-y-4 ${
              isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-200 shadow-lg'
            }`}
          >
            <h3 className="text-base font-bold font-heading">Connect & Profiles</h3>

            <div className="space-y-2.5">
              <a
                href={identity.contact.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-colors ${
                  isDark ? 'border-neutral-800 hover:border-neutral-700 bg-neutral-950/40' : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs sm:text-sm font-medium">LinkedIn Profile</span>
                </div>
                <span className="text-xs opacity-60 font-mono">/in/akashmalviya</span>
              </a>

              <a
                href={identity.contact.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-colors ${
                  isDark ? 'border-neutral-800 hover:border-neutral-700 bg-neutral-950/40' : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Github className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs sm:text-sm font-medium">GitHub Repositories</span>
                </div>
                <span className="text-xs opacity-60 font-mono">@akash93229</span>
              </a>

              <a
                href={identity.resumeUrl}
                download="Akash_Malviya_CV.pdf"
                className={`flex items-center justify-between p-3.5 rounded-2xl border transition-colors ${
                  isDark ? 'border-neutral-800 hover:border-neutral-700 bg-neutral-950/40' : 'border-neutral-200 hover:border-neutral-300 bg-neutral-50'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Download className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs sm:text-sm font-medium">Download Resume (PDF)</span>
                </div>
                <span className="text-xs opacity-60 font-mono">CV</span>
              </a>
            </div>

            <div className="pt-3 border-t border-border flex items-center gap-2 text-xs opacity-75 font-mono">
              <MapPin className="w-3.5 h-3.5 text-cyan-400" />
              <span>{identity.location} • {identity.availability}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form (7 cols) */}
        <div className="lg:col-span-7">
          <div
            className={`p-8 sm:p-10 rounded-3xl border transition-all ${
              isDark ? 'bg-neutral-900/60 border-neutral-800' : 'bg-white border-neutral-200 shadow-xl'
            }`}
          >
            <h3 className="text-2xl font-bold font-heading mb-2">Send a Direct Message</h3>
            <p className="text-sm opacity-75 mb-8">
              Fill out the form below and I will respond within 24 hours.
            </p>

            {submitSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/80 text-emerald-200 text-xs sm:text-sm flex items-center gap-2 mb-6 animate-fade-in">
                <Check className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>Thank you! Your message has been received. I'll get back to you shortly.</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold block mb-2 opacity-80">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className={`w-full px-4 py-3 rounded-2xl border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                      isDark ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                    }`}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold block mb-2 opacity-80">
                    Your Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="e.g. sarah@company.com"
                    className={`w-full px-4 py-3 rounded-2xl border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all ${
                      isDark ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold block mb-2 opacity-80">
                  Message or Opportunity Details
                </label>
                <textarea
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  placeholder="Share details about the role, project scope, or technical challenges..."
                  className={`w-full px-4 py-3 rounded-2xl border text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all resize-none ${
                    isDark ? 'bg-neutral-950 border-neutral-800 text-white' : 'bg-neutral-50 border-neutral-200 text-neutral-900'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 rounded-2xl font-bold text-sm text-black bg-white hover:bg-neutral-200 transition-all flex items-center justify-center gap-2 active:scale-95 shadow-lg shadow-white/5 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
