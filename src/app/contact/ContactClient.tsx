'use client';

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import {
  FiMail, FiMessageSquare, FiUser, FiSend,
  FiCheckCircle, FiAlertCircle,
} from "react-icons/fi";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { ContactHero } from "@/components/sections/ContactHero";
import { ContactChannels } from "@/components/sections/ContactChannels";
import GlobalHeading from "@/components/ui/GlobalHeading";

// ─── Animations ─────────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
});

const topics = [
  "Bug Report",
  "Feature Request",
  "General Question",
  "Partnership / Collab",
  "Other",
];

type FormState = "idle" | "submitting" | "success" | "error";

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function ContactPage() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [topic, setTopic]     = useState(topics[0]);
  const [message, setMessage] = useState("");
  const [formState, setFormState] = useState<FormState>("idle");

  const isValid = name.trim().length > 0 && /\S+@\S+\.\S+/.test(email) && message.trim().length > 10;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isValid) return;
    setFormState("submitting");

    // Hardcoded EmailJS credentials
    const serviceId = "service_g5mqmp8";
    const templateId = "template_iebjnvk";
    const publicKey = "AW2-7X763_6SdXMzD";

    try {
      const templateParams = {
        from_name: name,
        from_email: email,
        topic: topic,
        message: message,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      toast.success("Message sent successfully.");
      setFormState("success");
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send message. Please try again.");
      setFormState("error");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden transition-colors duration-300">

      {/* Ambient background orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand)_8%,transparent)_0%,transparent_65%)] blur-[40px]" />
        <div className="absolute bottom-[5%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--brand)_8%,transparent)_0%,transparent_65%)] blur-[40px]" />
      </div>

      <div className="relative z-10 pb-8 py-4">
        <ContactHero />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-20">

        <ContactChannels />

        {/* ── Divider ── */}
        <section className="mb-12 sm:mb-16">
          <GlobalHeading
            as="h2"
            badge="Or send a message"
            title="Drop us a line."
            titleHighlight="a line."
            size="md"
            alignment="center"
            className="py-0 mb-8"
          />

        {/* ── Contact  ── */}
        <motion.div
          id="contact-form"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto"
        >
          {formState === "success" ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-center py-16 px-8 rounded-3xl bg-gradient-to-br from-indigo-50 to-indigo-50 dark:from-indigo-950/30 dark:to-indigo-950/30 border border-indigo-100 dark:border-indigo-500/10"
            >
              <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-500/10 flex items-center justify-center mx-auto mb-5">
                <FiCheckCircle size={32} className="text-indigo-500" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                Message sent!
              </h2>
              <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-sm mx-auto mb-8">
                Thanks for reaching out. We'll get back to you at <strong className="text-slate-700 dark:text-slate-300">{email}</strong> within 1–2 business days.
              </p>
              <button
                onClick={() => {
                  setName(""); setEmail(""); setMessage(""); setTopic(topics[0]); setFormState("idle");
                }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold transition-colors duration-200 cursor-pointer"
              >
                Send another
              </button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="space-y-6 rounded-3xl border border-slate-200 bg-white p-5 dark:border-white/5 dark:bg-slate-900/40 sm:p-8"
            >
              {/* Name + Email row */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FiUser size={11} /> Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 text-sm font-medium outline-none focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                    <FiMail size={11} /> Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="support@averagegradecalculator.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 text-sm font-medium outline-none focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Topic */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FiMessageSquare size={11} /> Topic
                </label>
                <div className="flex flex-wrap gap-2">
                  {topics.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTopic(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold tracking-wide transition-all duration-200 cursor-pointer border ${
                        topic === t
                          ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20"
                          : "bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-white/10 hover:border-indigo-300 dark:hover:border-indigo-500/30"
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <FiMessageSquare size={11} /> Message
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what's on your mind…"
                  required
                  rows={5}
                  maxLength={1000}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50/60 dark:bg-white/5 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 text-sm font-medium outline-none focus:border-indigo-400 dark:focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200 resize-none"
                />
                <p className="text-[11px] text-slate-400 dark:text-slate-600 text-right">
                  {message.length} / 1000
                </p>
              </div>

              {/* Error state */}
              {formState === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm font-medium"
                >
                  <FiAlertCircle size={15} className="shrink-0" />
                  Something went wrong. Please try again or email us directly.
                </motion.div>
              )}

              {/* Submit */}
              <div className="flex items-center justify-end pt-2">
                <motion.button
                  type="submit"
                  disabled={!isValid || formState === "submitting"}
                  whileHover={isValid ? { scale: 1.02 } : {}}
                  whileTap={isValid ? { scale: 0.98 } : {}}
                  className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 cursor-pointer shadow-lg ${
                    isValid
                      ? "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20"
                      : "bg-slate-100 dark:bg-white/5 text-slate-400 dark:text-slate-600 cursor-not-allowed shadow-none"
                  }`}
                >
                  {formState === "submitting" ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      <FiSend size={14} />
                      Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>
        </section>
        </div>

      </div>

      <div className="relative z-10 px-4 sm:px-6 pb-6 sm:pb-8 lg:pb-10">
        <ContactCTA />
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation: none !important; transition: none !important; }
        }
      `}</style>
    </div>
  );
}
