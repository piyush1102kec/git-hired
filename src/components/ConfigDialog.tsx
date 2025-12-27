"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { defaultResume } from "@/lib/defaults";

interface ConfigDialogProps {
    isOpen: boolean;
    onClose: () => void;
    sectionSnippet?: any; // Context-aware snippet
}

export function ConfigDialog({ isOpen, onClose, sectionSnippet }: ConfigDialogProps) {
    const [copied, setCopied] = useState(false);
    const [mounted, setMounted] = useState(false);

    // Determine what to show: specific snippet or full default
    const dataToShow = sectionSnippet || defaultResume;
    const jsonString = JSON.stringify(dataToShow, null, 2);
    const isPartial = !!sectionSnippet;

    useEffect(() => {
        setMounted(true);
    }, [isOpen]);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(jsonString);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[9999]"
                    />

                    {/* Dialog */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-2xl max-h-[85vh] bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl z-[10000] overflow-hidden flex flex-col"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0a0a0a]">
                            <div>
                                <h2 className="text-lg font-semibold text-white">
                                    {isPartial ? "Example Snippet" : "Full Configuration"}
                                </h2>
                                <p className="text-sm text-white/40">
                                    {isPartial
                                        ? "Here is how this section should look like:"
                                        : "Reference this JSON structure for your resume"}
                                </p>
                            </div>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-white transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-auto p-6 bg-[#050505]">
                            <div className="relative group">
                                <pre className="text-xs font-mono text-blue-300/90 whitespace-pre-wrap break-all">
                                    {jsonString}
                                </pre>

                                <button
                                    onClick={handleCopy}
                                    className="absolute top-2 right-2 p-2 bg-white/10 hover:bg-white/20 rounded-md text-white/60 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                                    title="Copy to clipboard"
                                >
                                    {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                </button>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 border-t border-white/10 bg-[#0a0a0a] flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="px-4 py-2 text-sm text-white/60 hover:text-white transition-colors"
                            >
                                Close
                            </button>
                            <button
                                onClick={handleCopy}
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                            >
                                {copied ? <Check size={16} /> : <Copy size={16} />}
                                {copied ? "Copied!" : "Copy JSON"}
                            </button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>,
        document.body
    );
}
