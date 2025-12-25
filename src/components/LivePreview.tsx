"use client";

import { Resume } from "@/lib/resume-schema";
import { getTemplate } from "@/templates/registry";
import { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";

interface LivePreviewProps {
    data: Resume;
}

export function LivePreview({ data }: LivePreviewProps) {
    const TemplateConfig = getTemplate(data.meta.template);
    const TemplateComponent = TemplateConfig.component;
    const [scale, setScale] = useState(0.8);

    return (
        <div className="h-full flex flex-col">
            {/* Toolbar */}
            <div className="h-12 border-b border-white/10 bg-[#0a0a0a] flex items-center justify-between px-4 text-sm flex-none z-10">
                <span className="font-semibold text-white/50">A4 Preview</span>
                <div className="flex items-center gap-2 text-white/70">
                    <button onClick={() => setScale(s => Math.max(0.3, s - 0.1))} className="p-1 hover:bg-white/10 rounded transition-colors">
                        <ZoomOut size={16} />
                    </button>
                    <span className="w-12 text-center text-white/90">{Math.round(scale * 100)}%</span>
                    <button onClick={() => setScale(s => Math.min(1.5, s + 0.1))} className="p-1 hover:bg-white/10 rounded transition-colors">
                        <ZoomIn size={16} />
                    </button>
                </div>
            </div>

            {/* Scrollable Container */}
            <div className="flex-1 bg-[#050505] overflow-auto relative">
                {/* 
              We use a min-sized flex container to support centering + scrolling.
              'm-auto' on the child ensures it stays centered without clipping left/top 
              when the content overflows the view.
           */}
                <div
                    className="flex items-start justify-center min-w-full min-h-full p-12" // Increased padding as requested
                >
                    <div
                        style={{
                            transform: `scale(${scale})`,
                            transformOrigin: "top center",
                            // Reserve space equal to the scaled size to prevent scroll clipping
                            // This logic is simplified; usually 'margin: auto' handles the flow 
                            marginBottom: `${(297 * scale) - 297}mm`
                        }}
                        className="bg-white shadow-xl min-w-[210mm] min-h-[297mm] transition-transform duration-200 ease-out"
                    >
                        {/* 
                            This inner wrapper has the ID and NO transform.
                            html2pdf will capture this element at its natural 100% scale (A4 size).
                        */}
                        <div id="resume-preview-content">
                            <TemplateComponent data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
