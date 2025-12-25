"use client";

import { motion } from "framer-motion"
import { ArrowRight, Code, Command, Terminal, Zap } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  // Code snippet options
  const snippets = [
    `{
  "name": "Alex Dev",
  "role": "Senior Engineer",
  "skills": ["React", "TypeScript", "Rust"]
}`,
    `interface Resume {
  experience: Experience[];
  projects: Project[];
  render(): PDF;
}`,
    `const career = new CareerBuilder({
  strategy: "config-first",
  result: "hired"
});`
  ]

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-white/20 overflow-hidden font-sans">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>
      </div>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center">

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-1.5 px-3 py-1 mb-8 text-xs font-medium text-blue-300 bg-blue-500/10 rounded-full border border-blue-500/20"
        >
          <Terminal size={12} />
          <span>v2.0 Open Access</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent"
        >
          Resume as Code.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-xl text-lg text-white/50 mb-10 leading-relaxed"
        >
          The developer-first resume builder. Typed, validated, and version controlled.
          Stop fighting formatting—start configuring your career.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-full max-w-sm"
        >
          <Link href="/dashboard" className="block relative group">
            <div className="absolute -inset-1 blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl"></div>
            <div className="relative flex items-center justify-center gap-3 px-8 py-4 bg-neutral-900 border border-white/10 rounded-xl shadow-2xl hover:bg-neutral-800 transition">
              <span className="font-semibold text-lg text-white">Let's Get Started</span>
              <ArrowRight size={20} className="text-white" />
            </div>
          </Link>
        </motion.div>

        <p className="mt-8 text-xs text-white/30">
          Open Source • Local First • Export to PDF
        </p>

        {/* Floating Code Snippets (Decorative) */}
        <CodeFloatingSnippet
          code={snippets[0]}
          className="hidden lg:block absolute top-1/4 left-10 text-xs"
          delay={0.5}
          x={-50}
        />
        <CodeFloatingSnippet
          code={snippets[1]}
          className="hidden lg:block absolute bottom-1/4 right-10 text-xs text-right"
          delay={0.7}
          x={50}
        />
      </main>

      {/* Footer / Features Grid */}
      <footer className="relative z-10 border-t border-white/5 bg-black/50 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <Feature
            icon={<Code size={20} />}
            title="JSON Schema"
            desc="Type-safe configuration for your professional profile."
          />
          <Feature
            icon={<Zap size={20} />}
            title="Live Preview"
            desc="Instant rendering with 10+ premium templates."
          />
          <Feature
            icon={<Command size={20} />}
            title="Privacy First"
            desc="Data stays in your browser until you export."
          />
        </div>
      </footer>
    </div>
  )
}

function CodeFloatingSnippet({ code, className, delay, x }: { code: string, className?: string, delay: number, x: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x, y: 20 }}
      animate={{ opacity: 0.6, x: 0, y: 0 }}
      transition={{ duration: 0.8, delay }}
      className={`font-mono bg-white/5 border border-white/10 p-4 rounded-lg backdrop-blur-sm select-none ${className}`}
    >
      <pre className="text-blue-200">
        <code>{code}</code>
      </pre>
    </motion.div>
  )
}

function Feature({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex flex-col gap-3 p-4 rounded-lg hover:bg-white/5 transition duration-300">
      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white">
        {icon}
      </div>
      <h3 className="font-semibold text-white">{title}</h3>
      <p className="text-sm text-white/50">{desc}</p>
    </div>
  )
}
