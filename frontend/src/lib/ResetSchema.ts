import z from "zod"

export const ResetPasswordSchema = z
    .object({
        email: z.string().email("Enter a valid email"),
        otp: z.string().length(4, "Enter the 4-digit code"),
        password: z.string().min(8, "At least 8 characters"),
        confirmPassword: z.string().min(1, "Confirm your password"),
    })
    .refine((d) => d.password === d.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    })