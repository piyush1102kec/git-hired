"use client";

import { ResumeTheme } from "@/lib/resume-schema";
import { Palette, Type, LayoutGrid, Check } from "lucide-react";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";

interface ThemeCustomizerProps {
    theme: ResumeTheme;
    onChange: (theme: ResumeTheme) => void;
}

export function ThemeCustomizer({ theme, onChange }: ThemeCustomizerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close on click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const colors = [
        "#000000", // Black
        "#2563eb", // Blue
        "#dc2626", // Red
        "#16a34a", // Green
        "#9333ea", // Purple
        "#ea580c", // Orange
        "#0891b2", // Cyan
        "#be185d", // Pink
    ];

    const updateTheme = (key: keyof ResumeTheme, value: string) => {
        onChange({ ...theme, [key]: value });
    };

    return (
        <div className="relative" ref={containerRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md hover:bg-white/10 transition-colors text-xs font-medium ${isOpen ? 'bg-white/10 text-white' : 'text-white/70'}`}
            >
                <Palette size={14} />
                Theme
            </button>

            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
                    {/* Primary Color */}
                    <div className="mb-4">
                        <label className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3 block">Primary Color</label>
                        <div className="grid grid-cols-8 gap-2">
                            {colors.map((color) => (
                                <button
                                    key={color}
                                    onClick={() => updateTheme("primary", color)}
                                    className="w-6 h-6 rounded-full flex items-center justify-center transition-transform hover:scale-110 border border-white/10"
                                    style={{ backgroundColor: color }}
                                >
                                    {theme.primary === color && <Check size={12} className="text-white" />}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-white/5 my-4"></div>

                    {/* Font Family */}
                    <div className="mb-4">
                        <label className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3 block flex items-center gap-2">
                            <Type size={12} /> Typography
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {(["sans", "serif", "mono"] as const).map((font) => (
                                <button
                                    key={font}
                                    onClick={() => updateTheme("font", font)}
                                    className={clsx(
                                        "px-2 py-1.5 rounded text-xs border transition-all",
                                        theme.font === font
                                            ? "bg-blue-500/20 border-blue-500 text-blue-400"
                                            : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                                    )}
                                >
                                    <span style={{ fontFamily: font === 'mono' ? 'monospace' : font === 'serif' ? 'serif' : 'sans-serif' }}>
                                        {font.charAt(0).toUpperCase() + font.slice(1)}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Spacing */}
                    <div>
                        <label className="text-xs font-bold text-white/50 uppercase tracking-wider mb-3 block flex items-center gap-2">
                            <LayoutGrid size={12} /> Density
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {(["compact", "normal", "spacious"] as const).map((spacing) => (
                                <button
                                    key={spacing}
                                    onClick={() => updateTheme("spacing", spacing)}
                                    className={clsx(
                                        "px-2 py-1.5 rounded text-xs border transition-all",
                                        theme.spacing === spacing
                                            ? "bg-blue-500/20 border-blue-500 text-blue-400"
                                            : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                                    )}
                                >
                                    {spacing.charAt(0).toUpperCase() + spacing.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
