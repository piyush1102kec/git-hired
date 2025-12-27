"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";
import { ResumeJsonSchema } from "@/lib/resume-json-schema";

interface JsonEditorProps {
    defaultValue: string;
    onChange: (value: string) => void;
    errors?: { path: string; message: string }[];
}

export function JsonEditor({ defaultValue, onChange, errors }: JsonEditorProps) {
    return (
        <div className="h-full w-full flex flex-col items-stretch">
            <Editor
                height="100%"
                defaultLanguage="json"
                value={defaultValue}
                path="resume.json"
                theme="vs-dark"
                onChange={(value) => onChange(value || "")}
                options={{
                    minimap: { enabled: false },
                    formatOnPaste: true,
                    formatOnType: true,
                    scrollBeyondLastLine: false,
                    fontSize: 14,
                    fontFamily: "'Geist Mono', monospace",
                    padding: { top: 16, bottom: 16 },
                    renderLineHighlight: 'none',
                    stickyScroll: { enabled: false },
                    // Transparent background support
                    theme: "glass-dark",
                    tabSize: 2,
                }}
                onMount={(editor, monaco) => {
                    // Define a custom theme that's transparent
                    monaco.editor.defineTheme('glass-dark', {
                        base: 'vs-dark',
                        inherit: true,
                        rules: [],
                        colors: {
                            'editor.background': '#00000000', // Transparent
                        }
                    });
                    monaco.editor.setTheme('glass-dark');

                    // Configure JSON Schema validation & Autocomplete
                    monaco.languages.json.jsonDefaults.setDiagnosticsOptions({
                        validate: true,
                        enableSchemaRequest: false,
                        schemas: [ResumeJsonSchema]
                    });
                }}
            />
            {/* Custom error display (kept as summary, while Monaco handles inline squigglies) */}
            {errors && errors.length > 0 && (
                <div className="flex-none bg-red-900/20 border-t border-red-500/20 max-h-40 overflow-auto custom-scrollbar">
                    <div className="px-4 py-2 bg-red-500/10 flex items-center justify-between sticky top-0 backdrop-blur-sm">
                        <span className="text-xs font-bold text-red-400 uppercase tracking-wider flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></div>
                            Validation Issues ({errors.length})
                        </span>
                    </div>
                    <div className="p-2 space-y-1">
                        {errors.map((err, i) => (
                            <div key={i} className="group flex items-start gap-2 p-2 rounded hover:bg-red-500/10 transition-colors text-xs font-mono text-red-300">
                                <span className="font-semibold text-red-400 shrink-0">{err.path}:</span>
                                <span className="text-white/70">{err.message}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
