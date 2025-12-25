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
        <div className="flex flex-col h-screen overflow-hidden font-sans">
            {/* Header */}
            <header className="flex-none h-16 border-b flex items-center justify-between px-6 bg-white shadow-sm z-10 print:hidden">
                <div className="flex items-center gap-4">
                    <Link href="/" className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors">
                        <ArrowLeft size={20} />
                        <span className="font-medium">Back to Templates</span>
                    </Link>
                    <div className="h-6 w-px bg-gray-200"></div>
                    <h1 className="font-bold text-lg text-gray-800">Editor</h1>
                </div>

                <div className="flex items-center gap-4">
                    <div className={clsx("flex items-center gap-2 text-sm px-3 py-1.5 rounded-full border", isValid ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700")}>
                        {isValid ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                        <span className="font-medium">{isValid ? "Valid Configuration" : "Invalid Configuration"}</span>
                    </div>

                    <button
                        onClick={handleDownload}
                        className="flex items-center gap-2 px-5 py-2.5 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all font-medium"
                        disabled={!isValid || isDownloading}
                    >
                        <Download size={18} />
                        {isDownloading ? "Generating..." : "Download PDF"}
                    </button>
                </div>
            </header>

            <div className="flex-1 flex overflow-hidden">
                {/* Left Panel: JSON Editor */}
                <div className="w-1/2 border-r flex flex-col bg-white print:hidden">
                    <div className="flex-none px-4 py-3 bg-gray-50 border-b flex justify-between items-center">
                        <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">JSON Configuration</span>
                    </div>
                    <div className="flex-1 relative">
                        <JsonEditor
                            defaultValue={jsonString}
                            onChange={handleJsonChange}
                            errors={errors}
                        />
                    </div>
                </div>

                {/* Right Panel: Preview */}
                <div className="w-1/2 bg-gray-100 flex flex-col print:w-full">
                    <div className="flex-none px-4 py-3 bg-gray-50 border-b flex justify-between items-center print:hidden">
                        <span className="text-sm font-semibold text-gray-700 uppercase tracking-wider">Live Preview</span>
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
