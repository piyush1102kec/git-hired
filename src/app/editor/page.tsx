"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { JsonEditor } from "@/components/JsonEditor";
import { LivePreview } from "@/components/LivePreview";
import { defaultResume } from "@/lib/defaults";
import { validateResume } from "@/lib/validator";
import { Resume } from "@/lib/resume-schema";
import Link from "next/link";
import { ArrowLeft, Download, AlertCircle, CheckCircle2 } from "lucide-react";
import clsx from "clsx";

function EditorContent() {
    const searchParams = useSearchParams();
    const templateId = searchParams.get("template") || "modern-1";

    // Initialize with default resume, overriding the template ID
    // If we wanted local storage persistence, we would load it here.
    const [jsonString, setJsonString] = useState(() => JSON.stringify({
        ...defaultResume,
        meta: { ...defaultResume.meta, template: templateId }
    }, null, 2));

    const [parsedData, setParsedData] = useState<Resume>(() => {
        const initial = { ...defaultResume, meta: { ...defaultResume.meta, template: templateId } };
        // Type assertion since we know default is valid, but good to run validation if dynamic
        return initial as Resume;
    });

    const [errors, setErrors] = useState<string[]>([]);
    const [isValid, setIsValid] = useState(true);

    // Validate on change
    const handleJsonChange = (value: string) => {
        setJsonString(value);
        try {
            const json = JSON.parse(value);
            const result = validateResume(json);

            if (result.isValid && result.data) {
                setParsedData(result.data);
                setIsValid(true);
                setErrors([]);
            } else {
                setIsValid(false);
                setErrors(result.errors || ["Invalid Schema"]);
            }
        } catch (e) {
            setIsValid(false);
            setErrors([(e as Error).message]);
        }
    };

    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        if (!isValid) return;

        setIsDownloading(true);
        try {
            // Dynamic import to support client-side only loading
            // and avoid SSR issues.
            const html2pdfModule = (await import("html2pdf.js")).default;

            const element = document.getElementById("resume-preview-content");
            if (!element) throw new Error("Preview element not found");

            const opt = {
                margin: 0,
                filename: `${parsedData.data.name || "Resume"}.pdf`,
                image: { type: "jpeg" as const, quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" as const }
            };

            // Call the library
            await html2pdfModule().set(opt).from(element).save();

        } catch (error) {
            console.error("PDF generation failed:", error);
            // Show the actual error message to the user for debugging
            alert(`Failed to generate PDF. Error: ${(error as Error).message}`);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden font-sans bg-[#0a0a0a] text-white relative selection:bg-blue-500/30">
            {/* Background Decor for Glass Effect */}
            <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>
            <div className="absolute bottom-[-10%] left-[20%] w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[100px] pointer-events-none"></div>

            {/* Header */}
            <header className="flex-none h-16 border-b border-white/10 flex items-center justify-between px-6 bg-[#0a0a0a] z-10 print:hidden">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                        <ArrowLeft size={20} />
                        <span className="font-medium"></span>
                    </Link>
                    <div className="h-6 w-px bg-white/10"></div>
                    <h1 className="font-bold text-lg text-white">Editor</h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className={clsx("flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border", isValid ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400")}>
                        {isValid ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                        <span className="font-medium">{isValid ? "Valid Configuration" : "Invalid Configuration"}</span>
                    </div>

                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                        disabled={!isValid || isDownloading}
                    >
                        <Download size={18} />
                        {isDownloading ? "Generating..." : "Download PDF"}
                    </button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel: JSON Editor */}
                <div className="w-1/2 border-r border-white/10 flex flex-col bg-white/5 backdrop-blur-xl relative z-10 print:hidden">
                    {/* Subtle gradient background for depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none -z-10"></div>

                    <div className="flex-none px-4 py-3 border-b border-white/10 flex justify-between items-center bg-white/5 backdrop-blur-md">
                        <span className="text-xs font-bold text-blue-300 uppercase tracking-widest flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                            Config.json
                        </span>
                    </div>
                    <div className="flex-1 relative min-h-0">
                        <JsonEditor
                            defaultValue={jsonString}
                            onChange={handleJsonChange}
                            errors={errors}
                        />
                    </div>
                    <div className="flex-none px-4 py-2 border-t border-white/5 text-center bg-[#0a0a0a]">
                        <span className="text-[10px] text-white/20 uppercase tracking-widest font-mono">
                            &copy; {new Date().getFullYear()} Resume Builder
                        </span>
                    </div>
                </div>

                {/* Right Panel: Preview */}
                <div className="w-1/2 bg-[#050505] flex flex-col print:w-full">
                    <div className="flex-none px-4 py-3 bg-[#0a0a0a] border-b border-white/10 flex justify-between items-center print:hidden">
                        <span className="text-sm font-semibold text-white/70 uppercase tracking-wider">Live Preview</span>
                    </div>
                    <div className="flex-1 relative overflow-auto custom-scrollbar">
                        <LivePreview data={parsedData} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function EditorPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center">Loading Editor...</div>}>
            <EditorContent />
        </Suspense>
    );
}
