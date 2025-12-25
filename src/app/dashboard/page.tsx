"use client";

import Link from "next/link";
import { templates, templateIds } from "@/templates/registry";
import { defaultResume } from "@/lib/defaults";
import { motion } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-[#0a0a0a] font-sans text-white overflow-hidden relative">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <header className="text-center mb-16 pt-10 font-mono">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-block text-left bg-[#0f0f0f] border border-white/10 p-6 rounded-xl shadow-2xl backdrop-blur-md">
              <div className="flex gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">
                <span className="text-purple-400">const</span> stack = <span className="text-blue-400">new</span> <span className="text-yellow-300">Career</span>();
              </h1>
              <p className="text-base text-gray-500">
                <span className="text-green-400/50">{'//'}</span> Select a base configuration.<br />
                <span className="text-green-400/50">{'//'}</span> Every pixel is customizable via JSON schema.
              </p>
              <motion.div
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="w-3 h-5 bg-blue-500 mt-2 inline-block"
              />
            </div>
          </motion.div>
        </header>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 pb-20"
        >
          {templateIds.map((id) => {
            const t = templates[id];
            const Component = t.component;

            // Prepare preview data - render specific template but keep data same
            const previewData = { ...defaultResume, meta: { ...defaultResume.meta, template: id } };

            return (
              <motion.div variants={item} key={id}>
                <Link href={`./editor?template=${t.id}`} className="block group h-full">
                  <div className="relative h-full border border-white/10 rounded-2xl overflow-hidden bg-white/5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col">

                    {/* Glass Glare Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                    {/* Preview Container - Scaled View */}
                    <div className="relative aspect-[210/297] bg-[#000] overflow-hidden border-b border-white/5 group-hover:opacity-100 transition-opacity">
                      {/* 
                          scale wrapper logic
                      */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[210mm] h-[297mm] origin-top transform scale-[0.33] sm:scale-[0.45] md:scale-[0.4] lg:scale-[0.35] xl:scale-[0.33] pointer-events-none select-none bg-white shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                        <Component data={previewData as any} isStatic={true} />
                      </div>

                      {/* Overlay on hover to show 'Use Template' */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center backdrop-blur-[1px]">
                        <span className="px-6 py-3 bg-white text-black font-bold rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-xl">
                          Use Template
                        </span>
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-end relative z-10">
                      <h2 className="text-xl font-bold text-white mb-2 group-hover:text-blue-300 transition-colors">{t.name}</h2>
                      <p className="text-sm text-white/40 leading-relaxed">{t.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </main>
  );
}
