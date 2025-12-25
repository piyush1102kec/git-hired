"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useState } from "react";

interface JsonEditorProps {
    defaultValue: string;
    onChange: (value: string) => void;
    errors?: string[];
}

export function JsonEditor({ defaultValue, onChange, errors }: JsonEditorProps) {
    return (
        <div className="h-full w-full flex flex-col items-stretch">
            <Editor
                height="100%"
                defaultLanguage="json"
                defaultValue={defaultValue}
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
                    theme: "vs-dark"
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
                }}
            />
            {errors && errors.length > 0 && (
                <div className="bg-red-50 text-red-600 p-2 text-xs border-t border-red-200 max-h-32 overflow-auto">
                    <strong>Validation Errors:</strong>
                    <ul className="list-disc pl-4 mt-1">
                        {errors.map((err, i) => (
                            <li key={i}>{err}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
