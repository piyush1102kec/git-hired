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
            message: err.message
        }));

        return {
            isValid: false,
            errors,
        };
    }
}

export interface ValidationError {
    path: string;
    message: string;
}

