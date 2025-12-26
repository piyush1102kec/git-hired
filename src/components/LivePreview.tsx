"use client";

import { Resume } from "@/lib/resume-schema";
import { getTemplate } from "@/templates/registry";

interface LivePreviewProps {
    data: Resume;
}

export function LivePreview({ data }: LivePreviewProps) {
    const TemplateConfig = getTemplate(data.meta.template);
    const TemplateComponent = TemplateConfig.component;

    return (
        /* 
           The ID is crucial for html2pdf to find the content.
           The dimensions are fixed to A4 (210mm x 297mm) to ensure 
           WYSIWYG export accuracy.
        */
        <div
            id="resume-preview-content"
            className="w-[210mm] min-h-[297mm] bg-white text-black overflow-hidden relative"
        >
            <TemplateComponent data={data} />
        </div>
    );
}
