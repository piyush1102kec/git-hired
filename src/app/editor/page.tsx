"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { JsonEditor } from "@/components/JsonEditor";
import { LivePreview } from "@/components/LivePreview";
import { defaultResume } from "@/lib/defaults";
import { validateResume, ValidationError } from "@/lib/validator";
import { Resume, ResumeTheme } from "@/lib/resume-schema";
import Link from "next/link";
import { ArrowLeft, Download, AlertCircle, CheckCircle2, ZoomIn, ZoomOut, Maximize, LayoutTemplate, FileJson, Monitor } from "lucide-react";
import clsx from "clsx";
import { templates, templateIds } from "@/templates/registry";
import { ThemeCustomizer } from "@/components/ThemeCustomizer";

function EditorContent() {
    const searchParams = useSearchParams();
    const initialTemplateId = searchParams.get("template") || "modern-1";
    const STORE_KEY = "resume-builder-data-v1";

    const [jsonString, setJsonString] = useState(() => JSON.stringify({
        ...defaultResume,
        meta: { ...defaultResume.meta, template: initialTemplateId }
    }, null, 2));

    const [parsedData, setParsedData] = useState<Resume>(() => {
        const initial = { ...defaultResume, meta: { ...defaultResume.meta, template: initialTemplateId } };
        return initial as Resume;
    });

    const [errors, setErrors] = useState<ValidationError[]>([]);
    const [isValid, setIsValid] = useState(true);
    const [scale, setScale] = useState(0.9);

    // Initial Load
    useEffect(() => {
        const saved = localStorage.getItem(STORE_KEY);
        if (saved) {
            try {
                const json = JSON.parse(saved);
                // Validate loaded data
                const result = validateResume(json);
                if (result.isValid && result.data) {
                    setJsonString(saved);
                    setParsedData(result.data);
                    setIsValid(true);
                }
            } catch (e) {
                console.error("Failed to load saved resume", e);
            }
        }
    }, []);

    // Auto-save
    useEffect(() => {
        if (isValid) {
            localStorage.setItem(STORE_KEY, jsonString);
        }
    }, [jsonString, isValid]);

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
                setErrors(result.errors || []);
            }
        } catch (e) {
            setIsValid(false);
            setErrors([{ path: "Syntax", message: (e as Error).message }]);
        }
    };

    const handleThemeChange = (newTheme: ResumeTheme) => {
        try {
            const currentJson = JSON.parse(jsonString);
            currentJson.meta.theme = newTheme;
            const newJsonString = JSON.stringify(currentJson, null, 2);
            setJsonString(newJsonString);

            // Trigger validation/update manually
            const result = validateResume(currentJson);
            if (result.isValid && result.data) {
                setParsedData(result.data);
                setIsValid(true);
            }
        } catch (e) {
            console.error("Failed to update theme", e);
        }
    };

    const handleTemplateChange = (newTemplateId: string) => {
        try {
            const currentJson = JSON.parse(jsonString);
            currentJson.meta.template = newTemplateId;
            const newJsonString = JSON.stringify(currentJson, null, 2);
            setJsonString(newJsonString);

            // Trigger validation/update manually
            const result = validateResume(currentJson);
            if (result.isValid && result.data) {
                setParsedData(result.data);
                setIsValid(true);
            }
        } catch (e) {
            console.error("Failed to switch template", e);
        }
    };

    const [isDownloading, setIsDownloading] = useState(false);

    const handleDownload = async () => {
        if (!isValid) return;

        setIsDownloading(true);
        // Small delay to allow React to repaint "LivePreview" into "Export Mode" (no gaps)
        await new Promise(resolve => setTimeout(resolve, 200));

        try {
            const html2pdfModule = (await import("html2pdf.js")).default;
            const element = document.getElementById("resume-preview-content");
            if (!element) throw new Error("Preview element not found");

            const opt = {
                margin: 0,
                filename: `${parsedData.data.name || "Resume"}.pdf`,
                image: { type: "jpeg" as const, quality: 0.98 },
                html2canvas: { scale: 2, useCORS: true, letterRendering: true },
                jsPDF: { unit: "mm", format: "a4", orientation: "portrait" as const },
                pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
            };

            await html2pdfModule().set(opt).from(element).save();
        } catch (error) {
            console.error("PDF generation failed:", error);
            alert(`Failed to generate PDF. Error: ${(error as Error).message}`);
        } finally {
            setIsDownloading(false);
        }
    };

    return (
        <div className="flex flex-col h-screen overflow-hidden font-sans bg-[#050505] text-white relative selection:bg-blue-500/30">
            {/* Header */}
            <header className="flex-none h-14 border-b border-white/10 flex items-center justify-between px-4 bg-[#050505] z-20 print:hidden">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 text-white/60 hover:text-white transition-colors">
                        <ArrowLeft size={18} />
                        <span className="font-medium text-sm">Back</span>
                    </Link>
                    <div className="h-4 w-px bg-white/10"></div>
                    <div className="flex items-center gap-2 text-sm font-semibold text-white">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        Editor
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className={clsx("flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-full border transition-colors",
                        isValid ? "bg-green-500/10 border-green-500/20 text-green-400" : "bg-red-500/10 border-red-500/20 text-red-400")}>
                        {isValid ? <CheckCircle2 size={12} /> : <AlertCircle size={12} />}
                        <span className="font-medium uppercase tracking-wide">{isValid ? "Valid" : "Invalid"}</span>
                    </div>

                    <button
                        onClick={async () => {
                            const { AI_PROMPT } = await import("@/lib/ai-prompt");
                            const fullPrompt = `${AI_PROMPT}

CURRENT RESUME JSON:
\`\`\`json
${jsonString}
\`\`\`

USER REQUEST:
[Replace this with your instructions, e.g. "Add a skill section for React and Node.js", or "Fix the typo in the summary"]`;

                            await navigator.clipboard.writeText(fullPrompt);
                            alert("Copied directly to clipboard!\n\n1. System Instructions\n2. Your Current JSON\n3. Placeholder for your request\n\nPaste into ChatGPT/Claude now!");
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-blue-500/10 text-blue-400 text-sm rounded-md hover:bg-blue-500/20 transition-all font-medium border border-blue-500/20"
                    >
                        <span className="text-xs">✨</span>
                        Copy AI Prompt
                    </button>

                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-4 py-1.5 bg-white text-black text-sm rounded-md hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                        disabled={!isValid || isDownloading}
                    >
                        <Download size={14} />
                        {isDownloading ? "Analysing..." : "Export PDF"}
                    </button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel: JSON Editor */}
                <div className="w-1/2 border-r border-white/10 flex flex-col bg-[#050505] relative z-10 print:hidden">
                    <div className="flex-none h-10 px-4 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a]">
                        <div className="flex items-center gap-2 text-xs font-bold text-blue-300 uppercase tracking-widest">
                            <FileJson size={14} />
                            Config.json
                        </div>
                        <span className="text-[10px] text-white/40 font-mono">Schema: v1.0</span>
                    </div>
                    <div className="flex-1 relative min-h-0">
                        <JsonEditor
                            defaultValue={jsonString}
                            onChange={handleJsonChange}
                            errors={errors}
                        />
                    </div>
                </div>

                {/* Right Panel: Preview */}
                <div className="w-1/2 bg-[#0a0a0a] flex flex-col print:w-full relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 z-0 opacity-[0.05] pointer-events-none"
                        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
                    </div>

                    {/* Toolbar */}
                    <div className="flex-none h-10 px-4 border-b border-white/10 flex justify-between items-center bg-[#0a0a0a] relative z-10 print:hidden">
                        <div className="flex items-center gap-2 text-xs font-bold text-white/70 uppercase tracking-widest">
                            <Monitor size={14} />
                            Preview
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Theme Customizer */}
                            <ThemeCustomizer
                                theme={parsedData.meta.theme}
                                onChange={handleThemeChange}
                            />

                            <div className="h-3 w-px bg-white/10"></div>

                            {/* Template Switcher */}
                            <div className="flex items-center gap-2">
                                <LayoutTemplate size={14} className="text-white/40" />
                                <select
                                    className="bg-transparent text-xs text-white border-none outline-none cursor-pointer hover:text-blue-400 transition-colors"
                                    value={parsedData.meta.template}
                                    onChange={(e) => handleTemplateChange(e.target.value)}
                                >
                                    {templateIds.map(id => (
                                        <option key={id} value={id} className="bg-[#0a0a0a] text-white">
                                            {templates[id].name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="h-3 w-px bg-white/10"></div>

                            {/* Zoom Controls */}
                            <div className="flex items-center gap-1">
                                <button onClick={() => setScale(s => Math.max(0.3, s - 0.1))} className="p-1 hover:bg-white/10 rounded text-white/60 hover:text-white transition-colors">
                                    <ZoomOut size={14} />
                                </button>
                                <span className="text-xs text-white/40 font-mono w-8 text-center">{Math.round(scale * 100)}%</span>
                                <button onClick={() => setScale(s => Math.min(1.5, s + 0.1))} className="p-1 hover:bg-white/10 rounded text-white/60 hover:text-white transition-colors">
                                    <ZoomIn size={14} />
                                </button>
                                <button onClick={() => setScale(0.9)} className="p-1 hover:bg-white/10 rounded text-white/60 hover:text-white transition-colors ml-1" title="Reset Zoom">
                                    <Maximize size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Preview Area */}
                    <div className="flex-1 relative overflow-auto custom-scrollbar flex items-start justify-center p-8 z-0">
                        <div
                            style={{
                                transform: `scale(${scale})`,
                                transformOrigin: 'top center',
                                transition: 'transform 0.2s ease-out'
                            }}
                            className="bg-white shadow-[0_0_50px_-12px_rgba(0,0,0,0.5)]"
                        >
                            <LivePreview data={parsedData} isExporting={isDownloading} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function EditorPage() {
    return (
        <Suspense fallback={<div className="flex h-screen items-center justify-center text-white">Loading Environment...</div>}>
            <EditorContent />
        </Suspense>
    );
}
