
import { TemplateConfig } from "./types";
import {
    Modern1, Modern2, Modern3,
    Classic1,
    Ats1,
    Creative1,
    Minimal1,
    Tech1,
    Executive1,
    Academic1,
    Compact1,
    Profile1
} from "./definitions";

export const templates: Record<string, TemplateConfig> = {
    "modern-1": { id: "modern-1", name: "Modern 1", description: "Clean and contemporary", thumbnail: "/templates/modern-1.png", component: Modern1 },
    "modern-2": { id: "modern-2", name: "Modern 2", description: "Bold headers and clear sections", thumbnail: "/templates/modern-2.png", component: Modern2 },
    "modern-3": { id: "modern-3", name: "Modern 3", description: "Grid layout with dark header", thumbnail: "/templates/modern-3.png", component: Modern3 },
    "classic-1": { id: "classic-1", name: "Classic 1", description: "Traditional layout for professionals", thumbnail: "/templates/classic-1.png", component: Classic1 },
    "ats-1": { id: "ats-1", name: "ATS Friendly", description: "Parser-optimized layout", thumbnail: "/templates/ats-1.png", component: Ats1 },
    "creative-1": { id: "creative-1", name: "Creative", description: "Showcase your personality", thumbnail: "/templates/creative-1.png", component: Creative1 },
    "minimal-1": { id: "minimal-1", name: "Minimal", description: "Less is more", thumbnail: "/templates/minimal-1.png", component: Minimal1 },
    "tech-1": { id: "tech-1", name: "Tech", description: "Highlight skills and projects", thumbnail: "/templates/tech-1.png", component: Tech1 },
    "executive-1": { id: "executive-1", name: "Executive", description: "Senior level professional layout", thumbnail: "/templates/executive-1.png", component: Executive1 },
    "academic-1": { id: "academic-1", name: "Academic", description: "CV style for researchers", thumbnail: "/templates/academic-1.png", component: Academic1 },
    "compact-1": { id: "compact-1", name: "Compact", description: "Fit more on one page", thumbnail: "/templates/compact-1.png", component: Compact1 },
    "profile-1": { id: "profile-1", name: "Profile 1", description: "Layout with profile picture", thumbnail: "/templates/profile-1.png", component: Profile1 },
};

export function getTemplate(id: string) {
    return templates[id] || templates["modern-1"];
}

export const templateIds = Object.keys(templates);
