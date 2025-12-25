import { Resume } from "./resume-schema";

export const defaultResume: Resume = {
    meta: {
        template: "modern-1",
        language: "en",
        theme: {
            background: "#ffffff",
            text: "#1f2937", // Gray-800
            primary: "#2563eb", // Blue-600
            font: "sans",
            spacing: "normal"
        }
    },
    layout: {
        type: "single-column",
        columns: {
            left: "0%",
            right: "100%",
        },
    },
    sections: [
        { id: "header", type: "header", order: 1, visible: true, column: "main" },
        { id: "summary", type: "summary", order: 2, visible: true, column: "main", title: "" }, // No title for summary
        { id: "education", type: "education", order: 3, visible: true, column: "main" },
        { id: "experience", type: "experience", order: 4, visible: true, column: "main" },
        { id: "skills", type: "skills", order: 5, visible: true, column: "main" }
    ],
    data: {
        name: "Incognito Fox",
        title: "Civil Engineer",
        summary: "Strong civil engineer with 6 years of experience providing support to multiple team members in the office while maintaining accurate records, responding to customer communications and ensuring all construction documents were in compliance with the applicable codes.",
        email: "incognito.fox@domainName.com",
        phone: "(666) 666-6666",
        location: "Little Rock, AR",
        social: [
            { network: "GitHub", username: "incognitofox", url: "https://github.com" },
            { network: "LinkedIn", username: "incognito-fox", url: "https://linkedin.com" },
            { network: "Portfolio", username: "incognitofox.com", url: "https://incognitofox.com" }
        ],
        experience: [
            {
                company: "Citrixs Engineering",
                position: "Civil Engineer",
                location: "Las Vegas, Nevada",
                startDate: "December 2019",
                current: true,
                description: "Performed construction activities on the projects, including surveying, geotech, blueprinting and site investigation. Developed new construction techniques, including a unique method for site excavation design. Conducted problem solving, team building and public outreach to prevent and resolve construction issues. Assisted in the training of 3 new civil engineers.",
                visible: true
            },
            {
                company: "Road Framework",
                position: "Civil Engineer",
                location: "Las Vegas, Nevada",
                startDate: "December 2017",
                endDate: "December 2019",
                description: "Implemented a new stormwater retention plan for the City of Montreal, resulting in the creation of an additional 2000 square meters of land for development. Conceived a new building aesthetic and design for a new school, resulting in the addition of approximately 3000 square meters of usable space. Repaired damaged sidewalks and roads, repaired underground drainage and removed 100% of construction debris from site within 7 days.",
                visible: true
            },
            {
                company: "Project Manager",
                position: "Pear",
                location: "Las Vegas, Nevada",
                startDate: "December 2015",
                endDate: "December 2017",
                description: "Researched, planned and managed the re-design of a large complex website.",
                visible: true
            }
        ],
        education: [
            {
                institution: "Lourdes Western University",
                degree: "Bachelor's Degree in Civil Engineering",
                location: "Las Vegas, Nevada",
                startDate: "2016",
                visible: true
            },
        ],
        projects: [],
        skills: ["AutoCAD", "Civil 3D", "Stormwater Management", "Project Management", "Structural Analysis", "Site Development"],
    },
};
