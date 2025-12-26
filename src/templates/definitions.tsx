import { ResumeTemplateProps } from "./types";
import { ResumeSection, ResumeData } from "@/lib/resume-schema";
import clsx from "clsx";
import { Github, Linkedin, Globe, Link as LinkIcon, Twitter } from "lucide-react";

const SocialLinks = ({ data, className, iconSize = 14, isStatic = false }: { data: ResumeData, className?: string, iconSize?: number, isStatic?: boolean }) => {
    if (!data.social || data.social.length === 0) return null;

    const getIcon = (network: string) => {
        const lower = network.toLowerCase();
        if (lower.includes("github")) return <Github size={iconSize} />;
        if (lower.includes("linkedin")) return <Linkedin size={iconSize} />;
        if (lower.includes("twitter") || lower.includes("x")) return <Twitter size={iconSize} />;
        if (lower.includes("portfolio") || lower.includes("web")) return <Globe size={iconSize} />;
        return <LinkIcon size={iconSize} />;
    };

    return (
        <div className={clsx("flex flex-wrap gap-3", className)}>
            {data.social.map((s, i) => (
                isStatic ? (
                    <span key={i} className="flex items-center gap-1 opacity-75">
                        {getIcon(s.network)}
                        <span>{s.username}</span>
                    </span>
                ) : (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline print:no-underline">
                        {getIcon(s.network)}
                        <span>{s.username}</span>
                    </a>
                )
            ))}
        </div>
    );
};

// Helper to render sections dynamically
const SectionRenderer = ({ section, data, theme }: { section: ResumeSection; data: ResumeData, theme: any }) => {
    const { id, type, title } = section;
    if (!section.visible) return null;

    const sectionTitle = title || id.charAt(0).toUpperCase() + id.slice(1);
    const primaryColor = theme.primary || "#000000";

    switch (type) {
        case "summary":
            return data.summary ? (
                <div className="mb-6 break-inside-avoid">
                    {title && <h3 className="font-bold border-b mb-2" style={{ color: primaryColor, borderColor: primaryColor }}>{sectionTitle}</h3>}
                    <p className="whitespace-pre-wrap leading-relaxed">{data.summary}</p>
                </div>
            ) : null;

        case "experience":
            return data.experience && data.experience.length > 0 ? (
                <div className="mb-6 break-inside-avoid">
                    <h3 className="font-bold border-b mb-4 uppercase tracking-wider text-sm" style={{ color: primaryColor, borderColor: primaryColor }}>{sectionTitle}</h3>
                    <div className="space-y-4">
                        {data.experience.map((exp, i) => (
                            <div key={i} className="mb-4">
                                <div className="flex justify-between items-baseline font-bold">
                                    <span className="text-lg">{exp.position}</span>
                                </div>
                                <div className="flex justify-between items-center text-sm mb-2 opacity-90">
                                    <span>{exp.company} &bull; {exp.location}</span>
                                    <span>{exp.startDate} - {exp.current ? "Present" : exp.endDate}</span>
                                </div>
                                <p className="text-sm leading-relaxed whitespace-pre-wrap">{exp.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null;

        case "education":
            return data.education && data.education.length > 0 ? (
                <div className="mb-6 break-inside-avoid">
                    <h3 className="font-bold border-b mb-4 uppercase tracking-wider text-sm" style={{ color: primaryColor, borderColor: primaryColor }}>{sectionTitle}</h3>
                    <div className="space-y-4">
                        {data.education.map((edu, i) => (
                            <div key={i}>
                                <div className="font-bold text-lg">{edu.degree}</div>
                                <div className="flex justify-between items-center text-sm">
                                    <span>{edu.institution}, {edu.location}</span>
                                    <span>{edu.startDate}{edu.endDate ? ` - ${edu.endDate}` : ""}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null;

        case "skills":
            return data.skills && data.skills.length > 0 ? (
                <div className="mb-6 break-inside-avoid">
                    <h3 className="font-bold border-b mb-3 uppercase tracking-wider text-sm" style={{ color: primaryColor, borderColor: primaryColor }}>{sectionTitle}</h3>
                    <div className="text-sm leading-relaxed">
                        {Array.isArray(data.skills) && typeof data.skills[0] === 'string'
                            ? (data.skills as string[]).join(", ")
                            : "Complex skills layout not yet implemented"}
                    </div>
                </div>
            ) : null;

        case "projects":
            return data.projects && data.projects.length > 0 ? (
                <div className="mb-6 break-inside-avoid">
                    <h3 className="font-bold border-b mb-4 uppercase tracking-wider text-sm" style={{ color: primaryColor, borderColor: primaryColor }}>{sectionTitle}</h3>
                    <div className="space-y-4">
                        {data.projects.filter(p => p.visible !== false).map((project, i) => (
                            <div key={i}>
                                <div className="flex justify-between items-baseline font-bold">
                                    <span>{project.name}</span>
                                    {/* {project.year} - schema update pending for year in projects */}
                                </div>
                                <p className="text-sm leading-relaxed">{project.description}</p>
                                {project.technologies && (
                                    <div className="text-xs opacity-75 mt-1">
                                        {project.technologies.join(" • ")}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            ) : null;

        case "certifications":
            return data.certifications && data.certifications.length > 0 ? (
                <div className="mb-6 break-inside-avoid">
                    <h3 className="font-bold border-b mb-3 uppercase tracking-wider text-sm" style={{ color: primaryColor, borderColor: primaryColor }}>{sectionTitle}</h3>
                    <ul className="space-y-2 text-sm">
                        {data.certifications.map((cert, i) => (
                            <li key={i} className="flex justify-between">
                                <span className="font-semibold">{cert.name}</span>
                                <span className="opacity-75">{cert.issuer} {cert.year ? `(${cert.year})` : ""}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null;

        case "languages":
            return data.languages && data.languages.length > 0 ? (
                <div className="mb-6 break-inside-avoid">
                    <h3 className="font-bold border-b mb-3 uppercase tracking-wider text-sm" style={{ color: primaryColor, borderColor: primaryColor }}>{sectionTitle}</h3>
                    <ul className="grid grid-cols-2 gap-2 text-sm">
                        {data.languages.map((lang, i) => (
                            <li key={i} className="flex justify-between">
                                <span className="font-medium">{lang.name}</span>
                                <span className="opacity-75 text-xs">{lang.level}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null;

        case "interests":
            return data.interests && data.interests.length > 0 ? (
                <div className="mb-6 break-inside-avoid">
                    <h3 className="font-bold border-b mb-3 uppercase tracking-wider text-sm" style={{ color: primaryColor, borderColor: primaryColor }}>{sectionTitle}</h3>
                    <div className="text-sm">
                        {data.interests.join(", ")}
                    </div>
                </div>
            ) : null;

        case "references":
            return data.references && data.references.length > 0 ? (
                <div className="mb-6 break-inside-avoid">
                    <h3 className="font-bold border-b mb-3 uppercase tracking-wider text-sm" style={{ color: primaryColor, borderColor: primaryColor }}>{sectionTitle}</h3>
                    <div className="grid grid-cols-1 gap-2 text-sm">
                        {data.references.map((ref, i) => (
                            <div key={i}>
                                <div className="font-semibold">{ref.name}</div>
                                {ref.company && <div className="text-xs opacity-75">{ref.position ? `${ref.position} at ` : ""}{ref.company}</div>}
                                {ref.email && <div className="text-xs opacity-75">{ref.email}</div>}
                            </div>
                        ))}
                    </div>
                </div>
            ) : null;

        default:
            return null;
    }
};


// 1. Modern 1: Centered Header, Clean Layout
export const Modern1 = ({ data, isStatic }: ResumeTemplateProps) => {
    const theme = data.meta.theme || {};
    const { background, text, font, spacing } = theme;
    const fontClass = font === "serif" ? "font-serif" : font === "mono" ? "font-mono" : "font-sans";
    const spacingClass = spacing === "compact" ? "p-8 gap-4" : spacing === "spacious" ? "p-16 gap-8" : "p-12 gap-6";

    return (
        <div className={clsx("min-h-[1000px] shadow-sm", fontClass)} style={{ backgroundColor: background, color: text }}>
            <div className={clsx("h-full", spacingClass)}>
                <header className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold mb-2 uppercase">{data.data.name}</h1>
                    <div className="text-sm opacity-80 flex flex-wrap justify-center gap-x-4 gap-y-1">
                        <span>{data.data.email}</span>
                        {data.data.phone && <span> &bull; {data.data.phone}</span>}
                        {data.data.location && <span> &bull; {data.data.location}</span>}
                    </div>
                    {/* Social Links for Modern 1 */}
                    <div className="flex justify-center mt-3">
                        <SocialLinks data={data.data} className="opacity-80 text-sm" isStatic={isStatic} />
                    </div>
                </header>
                {data.sections.sort((a, b) => a.order - b.order).map((section) => (
                    <SectionRenderer key={section.id} section={section} data={data.data} theme={theme} />
                ))}
            </div>
        </div>
    );
};

// 2. Minimal 1: Left Aligned, Bold Divider
export const Minimal1 = ({ data, isStatic }: ResumeTemplateProps) => {
    const theme = data.meta.theme || {};
    const { background, text, font, spacing, primary } = theme;
    const fontClass = font === "serif" ? "font-serif" : font === "mono" ? "font-mono" : "font-sans";
    const spacingClass = spacing === "compact" ? "p-8" : spacing === "spacious" ? "p-16" : "p-10";

    return (
        <div className={clsx("min-h-[1000px] shadow-sm", fontClass)} style={{ backgroundColor: background, color: text }}>
            <div className={clsx("h-full", spacingClass)}>
                <header className="mb-8 pb-4 border-b-4" style={{ borderColor: primary || "#000" }}>
                    <h1 className="text-5xl font-bold mb-4">{data.data.name}</h1>
                    <div className="text-sm space-y-1">
                        <div>{data.data.email}</div>
                        <div>{data.data.phone}</div>
                        <div>{data.data.location}</div>
                    </div>
                    <div className="mt-4">
                        <SocialLinks data={data.data} className="text-sm opacity-80" isStatic={isStatic} />
                    </div>
                    {data.data.summary && <div className="mt-4 pt-4 border-t text-sm leading-relaxed max-w-2xl font-medium opacity-90">{data.data.summary}</div>}
                </header>
                <div className="grid grid-cols-1 gap-8">
                    {data.sections.sort((a, b) => a.order - b.order).filter(s => s.type !== 'summary').map((section) => (
                        <SectionRenderer key={section.id} section={section} data={data.data} theme={theme} />
                    ))}
                </div>
            </div>
        </div>
    );
};

// 3. Modern 2: Two Column, Colorful Header
export const Modern2 = ({ data, isStatic }: ResumeTemplateProps) => {
    const theme = data.meta.theme || {};
    const { background, text, font, spacing, primary } = theme;
    const fontClass = font === "serif" ? "font-serif" : font === "mono" ? "font-mono" : "font-sans";

    const spacingOuter = spacing === "compact" ? "gap-6 p-6" : spacing === "spacious" ? "gap-12 p-12" : "gap-8 p-8";
    const headerPadding = spacing === "compact" ? "p-8" : spacing === "spacious" ? "p-16" : "p-12";

    return (
        <div className={clsx("min-h-[1000px] shadow-sm flex flex-col", fontClass)} style={{ backgroundColor: background, color: text }}>
            <header className={clsx("text-white", headerPadding)} style={{ backgroundColor: primary || "#2563eb" }}>
                <h1 className="text-4xl font-bold mb-2">{data.data.name}</h1>
                <p className="text-lg opacity-90">{data.data.title}</p>
                <div className="flex gap-4 text-sm mt-4 opacity-80">
                    <span>{data.data.email}</span>
                    <span>{data.data.phone}</span>
                    <span>{data.data.location}</span>
                </div>
                <div className="mt-4 text-white/90">
                    <SocialLinks data={data.data} className="text-sm" isStatic={isStatic} />
                </div>
            </header>
            <div className={clsx("flex flex-1", spacingOuter)}>
                <main className="w-2/3">
                    {data.sections.filter(s => s.column !== 'sidebar').sort((a, b) => a.order - b.order).map(s => (
                        <SectionRenderer key={s.id} section={s} data={data.data} theme={theme} />
                    ))}
                </main>
                <aside className="w-1/3 border-l pl-8" style={{ borderColor: `${text}20` }}>
                    {data.sections.filter(s => s.column === 'sidebar' || s.type === 'skills').sort((a, b) => a.order - b.order).map(s => (
                        <SectionRenderer key={s.id} section={s} data={data.data} theme={theme} />
                    ))}
                </aside>
            </div>
        </div>
    );
};

// 4. Classic 1: Serif, Traditional
export const Classic1 = ({ data, isStatic }: ResumeTemplateProps) => {
    const theme = data.meta.theme || {};
    const { background, text, spacing } = theme;
    // Enforce serif for classic
    const spacingClass = spacing === "compact" ? "p-8" : spacing === "spacious" ? "p-16" : "p-12";

    return (
        <div className={clsx("min-h-[1000px] shadow-sm font-serif", spacingClass)} style={{ backgroundColor: background, color: text }}>
            <header className="border-b-2 border-black mb-8 pb-4 text-center">
                <h1 className="text-3xl font-bold uppercase tracking-widest mb-4">{data.data.name}</h1>
                <div className="flex justify-center gap-4 text-sm italic">
                    <span>{data.data.email}</span>
                    <span>&bull;</span>
                    <span>{data.data.location}</span>
                </div>
                <div className="flex justify-center mt-4">
                    <SocialLinks data={data.data} className="text-sm italic" isStatic={isStatic} />
                </div>
            </header>
            {data.sections.sort((a, b) => a.order - b.order).map((section) => (
                <SectionRenderer key={section.id} section={section} data={data.data} theme={theme} />
            ))}
        </div>
    );
};

// 5. ATS 1: Plain text, minimal formatting
export const Ats1 = ({ data, isStatic }: ResumeTemplateProps) => {
    const theme = data.meta.theme || {};
    const { background, text } = theme; // Ignore fancy spacing

    return (
        <div className="min-h-[1000px] shadow-sm p-12 font-sans text-sm" style={{ backgroundColor: "#ffffff", color: "#000000" }}>
            <div className="mb-4">
                <h1 className="font-bold text-lg uppercase">{data.data.name}</h1>
                <div>{data.data.email} | {data.data.phone} | {data.data.location}</div>
                <div className="mt-1">
                    <SocialLinks data={data.data} className="text-sm" isStatic={isStatic} />
                </div>
            </div>
            {data.sections.sort((a, b) => a.order - b.order).map((section) => (
                <div key={section.id} className="mb-4">
                    {/* Simplified rendering logic for ATS */}
                    <SectionRenderer section={section} data={data.data} theme={{ ...theme, primary: "#000" }} />
                </div>
            ))}
        </div>
    );
};

// 6. Creative 1: Bold Background
export const Creative1 = ({ data, isStatic }: ResumeTemplateProps) => {
    const theme = data.meta.theme || {};
    const { background, text, font, primary } = theme;
    const fontClass = font === "serif" ? "font-serif" : "font-sans";

    return (
        <div className={clsx("min-h-[1000px] shadow-sm", fontClass)} style={{ backgroundColor: background, color: text }}>
            <div className="bg-gray-900 text-white p-16 mb-8" style={{ backgroundColor: primary || "#111827" }}>
                <h1 className="text-6xl font-black mb-4 tracking-tighter">{data.data.name}</h1>
                <p className="text-2xl font-light opacity-80">{data.data.title}</p>
                <div className="mt-6 text-white/80">
                    <SocialLinks data={data.data} className="text-sm" isStatic={isStatic} />
                </div>
            </div>
            <div className="px-16 pb-16">
                {data.sections.sort((a, b) => a.order - b.order).map((section) => (
                    <SectionRenderer key={section.id} section={section} data={data.data} theme={theme} />
                ))}
            </div>
        </div>
    );
};

// 7. Tech 1: Dark sidebar
export const Tech1 = ({ data, isStatic }: ResumeTemplateProps) => {
    const theme = data.meta.theme || {};
    const { background, text, font, spacing } = theme;
    const fontClass = font === "serif" ? "font-serif" : font === "mono" ? "font-mono" : "font-sans"; // Allow font override even if default is mono
    const spacingClass = spacing === "compact" ? "p-6" : spacing === "spacious" ? "p-12" : "p-8";

    return (
        <div className={clsx("min-h-[1000px] shadow-sm flex", fontClass)} style={{ backgroundColor: background, color: text }}>
            <aside className={clsx("w-1/3 bg-gray-100 border-r", spacingClass, "pt-12")} style={{ borderColor: theme.primary }}>
                <div className="mb-8">
                    <h1 className="text-2xl font-bold mb-2 break-words">{data.data.name}</h1>
                    <div className="text-xs space-y-1 opacity-70">
                        <div>{data.data.email}</div>
                        <div>{data.data.phone}</div>
                        <div>{data.data.location}</div>
                    </div>
                    <div className="mt-4 text-xs opacity-70">
                        <SocialLinks data={data.data} className="flex-col !gap-1" isStatic={isStatic} />
                    </div>
                </div>
                {/* Render Skills in Sidebar */}
                {data.sections.filter(s => s.type === 'skills' || s.id === 'skills').map(s => (
                    <SectionRenderer key={s.id} section={s} data={data.data} theme={theme} />
                ))}
            </aside>
            <main className={clsx("w-2/3", spacingClass, "pt-12")}>
                {data.sections.filter(s => s.type !== 'skills' && s.id !== 'skills').sort((a, b) => a.order - b.order).map(s => (
                    <SectionRenderer key={s.id} section={s} data={data.data} theme={theme} />
                ))}
            </main>
        </div>
    );
};

// 8. Executive 1: Top bar, heavily padded
export const Executive1 = ({ data, isStatic }: ResumeTemplateProps) => {
    const theme = data.meta.theme || {};
    const { background, text, font, spacing, primary } = theme;
    const fontClass = font === "mono" ? "font-mono" : font === "serif" ? "font-serif" : "font-sans";

    // Executive needs distinct padding adjustments
    const paddingX = spacing === "compact" ? "px-8" : spacing === "spacious" ? "px-24" : "px-16";
    const paddingY = spacing === "compact" ? "py-8" : spacing === "spacious" ? "py-16" : "py-12";
    const contentPadding = spacing === "compact" ? "p-8" : spacing === "spacious" ? "p-24" : "p-16";

    return (
        <div className={clsx("min-h-[1000px] shadow-sm flex flex-col", fontClass)} style={{ backgroundColor: background, color: text }}>
            <div className="h-4 w-full" style={{ backgroundColor: primary || "#000" }}></div>
            <header className={clsx("flex justify-between items-end border-b", paddingX, paddingY)}>
                <div>
                    <h1 className="text-4xl font-bold uppercase tracking-widest">{data.data.name}</h1>
                    <p className="text-lg font-light tracking-widest mt-2">{data.data.title}</p>
                </div>
                <div className="text-right text-sm font-medium">
                    <div>{data.data.email}</div>
                    <div>{data.data.location}</div>
                    <div className="mt-2 flex flex-col items-end gap-1">
                        <SocialLinks data={data.data} className="text-xs flex-col items-end !gap-1" isStatic={isStatic} />
                    </div>
                </div>
            </header>
            <div className={contentPadding}>
                {data.sections.sort((a, b) => a.order - b.order).map((section) => (
                    <SectionRenderer key={section.id} section={section} data={data.data} theme={theme} />
                ))}
            </div>
        </div>
    );
};

// 9. Academic 1: Date on left
export const Academic1 = ({ data, isStatic }: ResumeTemplateProps) => {
    const theme = data.meta.theme || {};
    const { background, text, font } = theme;

    return (
        <div className={clsx("min-h-[1000px] shadow-sm p-12", "font-serif")} style={{ backgroundColor: background, color: text }}>
            <header className="border-b pb-8 mb-8">
                <h1 className="text-3xl font-bold">{data.data.name}</h1>
                <p>{data.data.email}</p>
                <div className="mt-2">
                    <SocialLinks data={data.data} className="text-sm" isStatic={isStatic} />
                </div>
            </header>
            {data.sections.sort((a, b) => a.order - b.order).map((section) => (
                <SectionRenderer key={section.id} section={section} data={data.data} theme={theme} />
            ))}
        </div>
    );
};

// 10. Compact: Small text, 2 column
export const Compact1 = ({ data, isStatic }: ResumeTemplateProps) => {
    const theme = data.meta.theme || {};
    const { background, text, font } = theme;

    return (
        <div className={clsx("min-h-[1000px] shadow-sm p-6 text-sm", font === 'serif' ? 'font-serif' : 'font-sans')} style={{ backgroundColor: background, color: text }}>
            <header className="border-b pb-4 mb-4 flex justify-between items-baseline">
                <h1 className="text-2xl font-bold text-blue-900">{data.data.name}</h1>
                <div className="text-xs">{data.data.email} | {data.data.location}</div>
            </header>
            <div className="mb-4">
                <SocialLinks data={data.data} className="text-xs" isStatic={isStatic} />
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    {data.sections.filter((_, i) => i % 2 === 0).map(s => (
                        <SectionRenderer key={s.id} section={s} data={data.data} theme={theme} />
                    ))}
                </div>
                <div>
                    {data.sections.filter((_, i) => i % 2 !== 0).map(s => (
                        <SectionRenderer key={s.id} section={s} data={data.data} theme={theme} />
                    ))}
                </div>
            </div>
        </div>
    );
};


// 11. Profile 1: With Avatar
export const Profile1 = ({ data, isStatic }: ResumeTemplateProps) => {
    const theme = data.meta.theme || {};
    const { background, text, font, primary } = theme;

    return (
        <div className={clsx("min-h-[1000px] shadow-sm flex flex-col p-12", font === 'serif' ? 'font-serif' : 'font-sans')} style={{ backgroundColor: background, color: text }}>
            <header className="flex gap-8 items-center border-b pb-8 mb-8" style={{ borderColor: primary }}>
                {data.data.avatar && (
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 shrink-0" style={{ borderColor: primary }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={data.data.avatar} alt={data.data.name} className="w-full h-full object-cover" />
                    </div>
                )}
                <div>
                    <h1 className="text-4xl font-bold mb-2">{data.data.name}</h1>
                    <p className="text-xl opacity-80 mb-2">{data.data.title}</p>
                    <div className="text-sm opacity-70 flex gap-4">
                        <span>{data.data.email}</span>
                        <span>{data.data.phone}</span>
                        <span>{data.data.location}</span>
                    </div>
                    <div className="mt-4">
                        <SocialLinks data={data.data} className="text-sm opacity-80" isStatic={isStatic} />
                    </div>
                </div>
            </header>
            <div className="flex gap-12">
                <div className="w-2/3">
                    {data.sections.filter(s => s.type !== 'skills').map(s => (
                        <SectionRenderer key={s.id} section={s} data={data.data} theme={theme} />
                    ))}
                </div>
                <div className="w-1/3">
                    {data.sections.filter(s => s.type === 'skills').map(s => (
                        <SectionRenderer key={s.id} section={s} data={data.data} theme={theme} />
                    ))}
                </div>
            </div>
        </div>
    );
};

// 12. Modern 3: Grid Layout
export const Modern3 = ({ data, isStatic }: ResumeTemplateProps) => {
    const theme = data.meta.theme || {};
    const { background, text, font, primary } = theme;

    return (
        <div className={clsx("min-h-[1000px] shadow-sm flex flex-col", font === 'serif' ? 'font-serif' : 'font-sans')} style={{ backgroundColor: background, color: text }}>
            <header className="p-12 text-center text-white" style={{ backgroundColor: primary || "#374151" }}>
                <h1 className="text-4xl font-bold mb-2 tracking-wide uppercase">{data.data.name}</h1>
                <p className="text-lg opacity-80 mb-4">{data.data.title}</p>
                <div className="flex justify-center flex-wrap gap-4 text-sm font-medium opacity-90">
                    <span className="bg-white/10 px-3 py-1 rounded">{data.data.email}</span>
                    <span className="bg-white/10 px-3 py-1 rounded">{data.data.location}</span>
                    <span className="bg-white/10 px-3 py-1 rounded">{data.data.phone}</span>
                </div>
                <div className="flex justify-center mt-6 text-white/90">
                    <SocialLinks data={data.data} className="text-sm" isStatic={isStatic} />
                </div>
            </header>
            <div className="p-12 grid grid-cols-1 gap-12">
                {/* Main Loop */}
                {data.sections.sort((a, b) => a.order - b.order).map(s => (
                    <div key={s.id} className="bg-gray-50 p-6 rounded-lg border border-gray-100 break-inside-avoid">
                        <SectionRenderer section={s} data={data.data} theme={{ ...theme, primary: primary || "#374151" }} />
                    </div>
                ))}
            </div>
        </div>
    );
};
