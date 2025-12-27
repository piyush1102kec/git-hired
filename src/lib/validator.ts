import { ResumeSchema, Resume } from "./resume-schema";
import { z } from "zod";

export interface ValidationResult {
    isValid: boolean;
    data?: Resume;
    errors?: ValidationError[];
}

export function validateResume(json: unknown): ValidationResult {
    const result = ResumeSchema.safeParse(json);

    if (result.success) {
        return {
            isValid: true,
            data: result.data,
        };
    } else {
        // Format Zod errors into readable objects
        const errors = result.error.issues.map((err) => ({
            path: err.path.join("."),
            message: getFriendlyMessage(err, err.path)
        }));

        return {
            isValid: false,
            errors,
        };
    }
}

// Helper to get friendly messages (typed looser to avoid strict TS issues with Zod unions)
function getFriendlyMessage(issue: z.ZodIssue, path: any[]): string {
    const field = path.length > 0 ? String(path[path.length - 1]) : "Field";
    const err = issue as any; // Bypass strict discriminated union checks that are failing

    // Narrowing for invalid_type
    if (err.code === "invalid_type") {
        const expected = err.expected;
        const received = err.received;

        if (expected === "object" && received === "string") {
            if (path.includes("projects")) {
                return `Projects must be objects, not strings. Try this: { "name": "Project Name", "description": "..." }`;
            }
            if (path.includes("experience")) {
                return `Experience entries must be objects. Try: { "company": "Company Name", "position": "..." }`;
            }
            if (path.includes("education")) {
                return `Education entries must be objects. Try: { "institution": "School Name", "degree": "..." }`;
            }
            if (path.includes("social")) {
                return `Social links must be objects. Try: { "network": "LinkedIn", "username": "..." }`;
            }
            return `Expected an object { ... }, but received a text string.`;
        }

        if (received === "undefined") {
            return `The '${field}' field is required.`;
        }
    }

    // Narrowing for invalid_enum_value
    if (err.code === "invalid_enum_value") {
        const options = err.options?.join(", ") || "";
        return `Invalid value. Allowed options: ${options}`;
    }

    return issue.message;
}

export interface ValidationError {
    path: string;
    message: string;
}

