import { ResumeSchema, Resume } from "./resume-schema";
import { z } from "zod";

export interface ValidationResult {
    isValid: boolean;
    data?: Resume;
    errors?: string[];
}

export function validateResume(json: unknown): ValidationResult {
    const result = ResumeSchema.safeParse(json);

    if (result.success) {
        return {
            isValid: true,
            data: result.data,
        };
    } else {
        // Format Zod errors into readable strings
        const errors = result.error.issues.map((err) => {
            const path = err.path.join(".");
            return `${path}: ${err.message}`;
        });

        return {
            isValid: false,
            errors,
        };
    }
}
