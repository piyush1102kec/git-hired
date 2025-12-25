import { Resume } from "@/lib/resume-schema";

export interface ResumeTemplateProps {
    data: Resume;
    className?: string; // For preview wrapper styling if needed
    isStatic?: boolean; // If true, disable interactive elements (links) to prevent nesting issues
}

export interface TemplateConfig {
    id: string;
    name: string;
    description: string;
    thumbnail: string; // Path to thumbnail image or component placeholder
    component: React.ComponentType<ResumeTemplateProps>;
}
