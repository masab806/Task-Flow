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

    // Required for both roles (both DTOs need it)
    organizationName: z.string().trim().min(2, 'Enter your organization name'),

    // Founder-only: optional here, enforced in superRefine
    teamSize: z.string().default(''),
    jobRole: z.string().default(''),
  })
  .superRefine((data, ctx) => {
    if (data.role !== 'founder') return

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
export type SignupData = z.input<typeof signupSchema>
export type AuthFormValues = SignupData

export const ACCOUNT_STEP_FIELDS = ['name', 'email', 'password', 'role'] as const

export type FounderSignupPayload = {
  fullName: string
  workEmail: string
  password: string
  organizationName: string
  role: 'founder'
  teamSize: string
  companyDesignation: string
}

export type EmployeeSignupPayload = {
  fullName: string
  workEmail: string
  password: string
  organizationName: string
  role: 'employee'
}

export type SignupPayload = FounderSignupPayload | EmployeeSignupPayload

export const toSignupPayload = (v: AuthFormValues): SignupPayload =>
  v.role === 'founder'
    ? {
        fullName: v.name,
        workEmail: v.email,
        password: v.password,
        organizationName: v.organizationName,
        role: 'founder',
        teamSize: v.teamSize ?? '',
        companyDesignation: v.jobRole ?? '',
      }
    : {
        fullName: v.name,
        workEmail: v.email,
        password: v.password,
        organizationName: v.organizationName,
        role: 'employee',
      }