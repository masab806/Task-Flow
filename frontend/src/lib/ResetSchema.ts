import z from "zod";

export const ResetPasswordSchema = z.object({
    email: z.email(),
    otp: z.string().min(1, "Required!"),
    password: z.string().min(5, "Minimum Length 5 Characters!")
})