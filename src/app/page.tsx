"use client";

import Link from "next/link";
import { templates, templateIds } from "@/templates/registry";
import { defaultResume } from "@/lib/defaults";

export default function Home() {
  return (
    <main className="min-h-screen p-8 bg-gray-50 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Resume Builder</h1>
          <p className="text-lg text-gray-600">Select a template to get started. Purely config-driven.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {templateIds.map((id) => {
            const t = templates[id];
            const Component = t.component;

            // Prepare preview data - render specific template but keep data same
            const previewData = { ...defaultResume, meta: { ...defaultResume.meta, template: id } };

            return (
              <Link href={`./editor?template=${t.id}`} key={id} className="block group">
                <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 bg-white hover:border-blue-400 flex flex-col h-full">

                  {/* Preview Container - Scaled View */}
                  <div className="relative aspect-[210/297] bg-gray-100 overflow-hidden border-b border-gray-100 group-hover:opacity-100 transition-opacity">
                    {/* 
                          Scale Wrapper: A4 (210mm) is ~794px wide.
                          We need to scale it down to fit the card width.
                          Grid layout changes card width, so we need responsive scaling.
                          - Default (1 col): Wide crd -> scale 0.45
                          - md (2 cols): ~350px -> scale 0.4
                          - lg (3 cols): ~320px -> scale 0.35
                          - xl (4 cols): ~290px -> scale 0.33
                      */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[210mm] h-[297mm] origin-top transform scale-[0.33] sm:scale-[0.45] md:scale-[0.4] lg:scale-[0.35] xl:scale-[0.33] pointer-events-none select-none bg-white shadow-sm">
                      <Component data={previewData as any} isStatic={true} />
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-end bg-white relative z-10">
                    <h2 className="text-lg font-bold text-gray-800 group-hover:text-blue-600 mb-1">{t.name}</h2>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{t.description}</p>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </main>
  );
}
