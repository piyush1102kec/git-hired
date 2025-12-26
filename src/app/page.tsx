"use client";

import { motion } from "framer-motion";
import { ArrowRight, FileJson, Layers, CheckCircle, Terminal, Cpu } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

import { ConfigDialog } from "@/components/ConfigDialog";

export default function LandingPage() {
  const [mounted, setMounted] = useState(false);
  const [isConfigDialogOpen, setIsConfigDialogOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30 overflow-hidden font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] opacity-50"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] opacity-40"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
      </div>

      {/* Grid Overlay */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
      </div>

      <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-12 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 font-bold text-xl tracking-wide">
          <div className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center">
            <Terminal size={18} strokeWidth={3} />
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">GitHired</span>
        </div>
        <div className="flex items-center gap-6 text-sm font-medium text-white/60">
          <Link href="https://github.com/piyush1102kec/git-hired" target="_blank" className="hover:text-white transition-colors">GitHub</Link>
          <Link href="/dashboard" className="text-white hover:text-blue-400 transition-colors">Templates</Link>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] px-4 text-center mt-[-40px]">

        {/* Animated Badge */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-xs font-medium text-blue-200 mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          v1.0 is now live
        </motion.div>

        {/* Hero Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 max-w-5xl mx-auto leading-[1.1]"
        >
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/40">
            Resume as Code.
          </span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-b from-blue-400 via-blue-500 to-purple-600">
            Version Your Career.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="max-w-2xl text-lg md:text-xl text-white/50 mb-12 leading-relaxed font-light"
        >
          Build, customize, and export professional resumes using a <span className="text-blue-300 font-mono">JSON configuration</span>.
          No drag & drop, no hidden watermarks, complete control.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Link href="/editor" className="w-full sm:w-auto group relative px-8 py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)]">
            Start Editing
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <button
            onClick={() => setIsConfigDialogOpen(true)}
            className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-semibold text-lg hover:bg-white/10 transition-all backdrop-blur-sm"
          >
            View Example Config
          </button>
        </motion.div>

        <ConfigDialog isOpen={isConfigDialogOpen} onClose={() => setIsConfigDialogOpen(false)} />

        {/* Tech Stack Strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-24 pt-5 border-t border-white/40 w-full max-w-4xl"
        >
          <p className="text-sm text-white/20 uppercase tracking-widest mb-6 font-semibold">Powered by Modern Tech</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
            <TechLogo name="Next.js" />
            <TechLogo name="TypeScript" />
            <TechLogo name="React" />
            <TechLogo name="Tailwind" />
            <TechLogo name="Framer" />
          </div>
        </motion.div>
      </main>

      {/* Feature Grid (Below Fold) */}
      <section className="relative z-10 py-32 border-t border-white/5 bg-[#0a0a0a]/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<FileJson size={32} className="text-yellow-400" />}
            title="JSON to PDF"
            desc="Define your entire professional profile in a single, validated JSON schema. We handle the rendering."
          />
          <FeatureCard
            icon={<Layers size={32} className="text-blue-400" />}
            title="Real-time Preview"
            desc="See your changes instantly. Split-pane view with Monaco Editor on the left, live resume on the right."
          />
          <FeatureCard
            icon={<CheckCircle size={32} className="text-green-400" />}
            title="Type-Safe"
            desc="Built with Zod and TypeScript. We catch missing fields and invalid dates before you even hit export."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/5 text-center relative z-10 bg-[#050505]">
        <p className="text-white/20 text-xs uppercase tracking-wider">
          Schema-driven UI • Type-safe Architecture • Design Systems
        </p>
      </footer>
    </div>
  );
}

const techColors: Record<string, string> = {
  "Next.js": "hover:text-white hover:drop-shadow-[0_0_15px_rgba(255,255,255,1)]",
  "TypeScript": "hover:text-[#3178C6] hover:drop-shadow-[0_0_15px_rgba(49,120,198,1)]",
  "React": "hover:text-[#61DAFB] hover:drop-shadow-[0_0_15px_rgba(97,218,251,1)]",
  "Tailwind": "hover:text-[#38B2AC] hover:drop-shadow-[0_0_15px_rgba(56,178,172,1)]",
  "Framer": "hover:text-[#FF0055] hover:drop-shadow-[0_0_15px_rgba(255,0,85,1)]",
};

function TechLogo({ name }: { name: string }) {
  const colorClass = techColors[name] || "hover:text-white";

  return (
    <div className={`flex items-center gap-2 text-white/40 font-semibold transition-all duration-300 cursor-default ${colorClass}`}>
      <div className={`w-2 h-2 rounded-full bg-current shadow-[0_0_10px_currentcolor] opacity-0 group-hover:opacity-100 transition-opacity`}></div>
      {name}
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/[0.07] transition-all group">
      <div className="mb-6 w-14 h-14 rounded-xl bg-[#000] border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
      <p className="text-white/50 leading-relaxed">{desc}</p>
    </div>
  );
}
