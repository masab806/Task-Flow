import { z } from 'zod'

const email = z
  .string()
  .trim()
  .min(1, 'Enter your work email')
  .email('Enter a valid email address')


export const loginSchema = z.object({
  email,
  password: z.string().min(1, 'Enter your password'),
})


export const signupSchema = z
  .object({
    name: z.string().trim().min(2, 'Enter your full name'),
    email,
    password: z
      .string()
      .min(8, 'Use at least 8 characters')
      .regex(/[A-Za-z]/, 'Include at least one letter')
      .regex(/\d/, 'Include at least one number'),
    role: z.enum(['founder', 'employee'], { message: 'Choose a role' }),

    organizationName: z.string().trim().min(2, "Enter Your Organization Name"),
    teamSize: z.string(),
    jobRole: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.role !== 'founder') return

    if (data.organizationName.length < 2) {
      ctx.addIssue({
        code: 'custom',
        path: ['organizationName'],
        message: 'Enter your organization name',
      })
    }
    if (!data.teamSize) {
      ctx.addIssue({
        code: 'custom',
        path: ['teamSize'],
        message: 'Select your team size',
      })
    }
    if (!data.jobRole) {
      ctx.addIssue({
        code: 'custom',
        path: ['jobRole'],
        message: 'Select your role',
      })
    }
  })


export type LoginData = z.infer<typeof loginSchema>
export type SignupData = z.infer<typeof signupSchema>

export type AuthFormValues = SignupData

export const ACCOUNT_STEP_FIELDS = ['name', 'email', 'password', 'role'] as const