import { z } from "zod";

// Template IDs
export const TemplateIdSchema = z.enum([
    "modern-1", "modern-2", "classic-1", "ats-1",
    "creative-1", "minimal-1", "tech-1", "executive-1",
    "academic-1", "compact-1"
]);

export type TemplateId = z.infer<typeof TemplateIdSchema>;

export const ResumeThemeSchema = z.object({
    background: z.string().default("#ffffff"),
    text: z.string().default("#000000"),
    primary: z.string().default("#000000"), // For headers, links
    font: z.enum(["sans", "serif", "mono"]).default("sans"),
    spacing: z.enum(["compact", "normal", "spacious"]).default("normal"),
});

// Meta Information
export const ResumeMetaSchema = z.object({
    template: TemplateIdSchema,
    language: z.string().default("en"),
    theme: ResumeThemeSchema.default({
        background: "#ffffff",
        text: "#000000",
        primary: "#000000",
        font: "sans",
        spacing: "normal",
    }),
});

// Layout Configuration
export const ResumeLayoutSchema = z.object({
    type: z.enum(["single-column", "two-column"]),
    columns: z.object({
        left: z.string().optional(), // e.g. "30%"
        right: z.string().optional(), // e.g. "70%"
    }).optional(),
});

// Section Types
export const SectionTypeSchema = z.enum([
    "header", "summary", "experience", "education", "projects", "skills",
    "certifications", "languages", "interests", "references", "volunteering",
    "custom-list", "custom-text"
]);

// Section Configuration (Ordering & Visibility)
export const ResumeSectionSchema = z.object({
    id: z.string(),
    type: SectionTypeSchema,
    column: z.enum(["left", "right", "main", "sidebar"]).optional(),
    order: z.number(),
    visible: z.boolean().default(true),
    title: z.string().optional(), // Override default title
});

// Data Schemas
export const ExperienceItemSchema = z.object({
    company: z.string(),
    position: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    current: z.boolean().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    highlights: z.array(z.string()).optional(),
    visible: z.boolean().default(true), // Added for granular control
});

export const EducationItemSchema = z.object({
    institution: z.string(),
    degree: z.string(),
    startDate: z.string(),
    endDate: z.string().optional(),
    location: z.string().optional(),
    description: z.string().optional(),
    visible: z.boolean().default(true),
});

export const ProjectItemSchema = z.object({
    name: z.string(),
    description: z.string(),
    url: z.string().optional(),
    technologies: z.array(z.string()).optional(),
    highlights: z.array(z.string()).optional(),
    visible: z.boolean().default(true),
});

export const CertificationItemSchema = z.object({
    name: z.string(),
    issuer: z.string(),
    year: z.string().optional(),
    url: z.string().optional()
});

export const LanguageItemSchema = z.object({
    name: z.string(),
    level: z.string(), // Native, Fluent, etc.
});

export const ReferenceItemSchema = z.object({
    name: z.string(),
    position: z.string().optional(),
    company: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
});

export const SkillCategorySchema = z.object({
    name: z.string().optional(),
    items: z.array(z.string())
});

export const ResumeDataSchema = z.object({
    name: z.string(),
    title: z.string().optional(),
    avatar: z.string().optional(),
    summary: z.string().optional(),
    email: z.string().email().optional().or(z.literal("")),
    phone: z.string().optional(),
    location: z.string().optional(),
    website: z.string().url().optional().or(z.literal("")),
    social: z.array(z.object({
        network: z.string(),
        username: z.string(),
        url: z.string().url()
    })).optional(),

    experience: z.array(ExperienceItemSchema).optional(),
    education: z.array(EducationItemSchema).optional(),
    projects: z.array(ProjectItemSchema).optional(),

    certifications: z.array(CertificationItemSchema).optional(),
    languages: z.array(LanguageItemSchema).optional(),
    interests: z.array(z.string()).optional(), // Simple string list
    references: z.array(ReferenceItemSchema).optional(),

    skills: z.union([
        z.array(z.string()),
        z.array(SkillCategorySchema)
    ]).optional(),

    custom: z.record(z.string(), z.any()).optional(),
});

// Root Schema
export const ResumeSchema = z.object({
    meta: ResumeMetaSchema,
    layout: ResumeLayoutSchema,
    sections: z.array(ResumeSectionSchema),
    data: ResumeDataSchema,
});

export type Resume = z.infer<typeof ResumeSchema>;
export type ResumeSection = z.infer<typeof ResumeSectionSchema>;
export type ResumeMeta = z.infer<typeof ResumeMetaSchema>;
export type ResumeData = z.infer<typeof ResumeDataSchema>;
