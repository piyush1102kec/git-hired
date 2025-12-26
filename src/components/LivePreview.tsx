"use client";

import { Resume } from "@/lib/resume-schema";
import { getTemplate } from "@/templates/registry";

interface LivePreviewProps {
    data: Resume;
    isExporting?: boolean;
}

const PageSeparators = () => (
    <div className="absolute inset-0 pointer-events-none z-50 overflow-hidden" style={{ height: '100%' }}>
        {Array.from({ length: 5 }).map((_, i) => (
            <div
                key={i}
                className="absolute w-full flex flex-col items-center justify-center group"
                style={{ top: `${(i + 1) * 297}mm`, transform: 'translateY(-50%)' }}
            >
                {/* Visual "Cut" Line */}
                <div className="w-full h-4 bg-gray-800/80 backdrop-blur-sm border-y border-white/20 flex items-center justify-center overflow-hidden">
                    <div className="w-full h-full opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #000 0, #000 10px, transparent 10px, transparent 20px)' }}></div>
                </div>

                {/* Page Labels */}
                <div className="absolute right-2 -top-6 text-[10px] font-bold text-gray-500 bg-white/90 px-2 py-0.5 rounded shadow-sm">
                    Page {i + 1} End
                </div>
                <div className="absolute right-2 -bottom-6 text-[10px] font-bold text-blue-500 bg-white/90 px-2 py-0.5 rounded shadow-sm">
                    Page {i + 2} Start
                </div>
            </div>
        ))}
    </div>
);

export function LivePreview({ data, isExporting = false }: LivePreviewProps) {
    const TemplateConfig = getTemplate(data.meta.template);
    const TemplateComponent = TemplateConfig.component;

    return (
        /* 
           The ID is crucial for html2pdf to find the content.
        */
        <div
            id="resume-preview-content"
            className="w-[210mm] min-h-[297mm] bg-white text-black relative shadow-2xl transition-all duration-200"
            style={{
                boxShadow: isExporting ? 'none' : '0 25px 50px -12px rgb(0 0 0 / 0.25)'
            }}
        >
            {!isExporting && <PageSeparators />}
            <TemplateComponent data={data} />
        </div>
    );
}
