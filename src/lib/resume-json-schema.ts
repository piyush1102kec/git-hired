export const ResumeJsonSchema = {
    uri: "http://git-hired/resume-schema.json",
    fileMatch: ["*"],
    schema: {
        type: "object",
        required: ["meta", "layout", "sections", "data"],
        properties: {
            meta: {
                type: "object",
                description: "Configuration for template, theme, and language",
                properties: {
                    template: {
                        type: "string",
                        enum: [
                            "modern-1", "modern-2", "classic-1", "ats-1",
                            "creative-1", "minimal-1", "tech-1", "executive-1",
                            "academic-1", "compact-1"
                        ],
                        description: "The visual template to use for the resume"
                    },
                    language: {
                        type: "string",
                        default: "en",
                        description: "Language code (e.g., 'en', 'es')"
                    },
                    theme: {
                        type: "object",
                        description: "Color and typography settings",
                        properties: {
                            background: { type: "string", description: "Background color hex code" },
                            text: { type: "string", description: "Text color hex code" },
                            primary: { type: "string", description: "Primary accent color hex code" },
                            font: {
                                type: "string",
                                enum: ["sans", "serif", "mono"],
                                description: "Font family style"
                            },
                            spacing: {
                                type: "string",
                                enum: ["compact", "normal", "spacious"],
                                description: "Overall layout spacing"
                            }
                        }
                    }
                }
            },
            layout: {
                type: "object",
                description: "Structural layout configuration",
                properties: {
                    type: {
                        type: "string",
                        enum: ["single-column", "two-column"],
                        description: "Main layout structure"
                    },
                    columns: {
                        type: "object",
                        properties: {
                            left: { type: "string", description: "Width of left column (e.g., '30%')" },
                            right: { type: "string", description: "Width of right column (e.g., '70%')" }
                        }
                    }
                }
            },
            sections: {
                type: "array",
                description: "Ordered list of resume sections",
                items: {
                    type: "object",
                    required: ["id", "type", "order"],
                    properties: {
                        id: { type: "string", description: "Unique identifier for the section" },
                        type: {
                            type: "string",
                            enum: [
                                "header", "summary", "experience", "education", "projects", "skills",
                                "certifications", "languages", "interests", "references", "volunteering",
                                "custom-list", "custom-text"
                            ],
                            description: "Type of content in this section"
                        },
                        column: {
                            type: "string",
                            enum: ["left", "right", "main", "sidebar"],
                            description: "Which column to place this section in (for multi-column layouts)"
                        },
                        order: { type: "integer", description: "Display order (lower numbers appear first)" },
                        visible: { type: "boolean", default: true, description: "Whether this section is valid/rendered" },
                        title: { type: "string", description: "Custom title for the section header" }
                    }
                }
            },
            data: {
                type: "object",
                description: "The actual content of the resume",
                properties: {
                    name: { type: "string" },
                    title: { type: "string" },
                    summary: { type: "string" },
                    email: { type: "string" },
                    phone: { type: "string" },
                    location: { type: "string" },
                    website: { type: "string" },
                    social: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                network: { type: "string" },
                                username: { type: "string" },
                                url: { type: "string" }
                            }
                        }
                    },
                    experience: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                company: { type: "string" },
                                position: { type: "string" },
                                startDate: { type: "string" },
                                endDate: { type: "string" },
                                current: { type: "boolean" },
                                description: { type: "string" },
                                highlights: { type: "array", items: { type: "string" } },
                                visible: { type: "boolean" }
                            }
                        }
                    },
                    education: {
                        type: "array",
                        items: {
                            type: "object",
                            properties: {
                                institution: { type: "string" },
                                degree: { type: "string" },
                                startDate: { type: "string" },
                                endDate: { type: "string" },
                                description: { type: "string" },
                                visible: { type: "boolean" }
                            }
                        }
                    },
                    skills: {
                        anyOf: [
                            { type: "array", items: { type: "string" } },
                            {
                                type: "array",
                                items: {
                                    type: "object",
                                    properties: {
                                        name: { type: "string" },
                                        items: { type: "array", items: { type: "string" } }
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        }
    }
};
