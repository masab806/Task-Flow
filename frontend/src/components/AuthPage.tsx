import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronDown,
  Eye,
  EyeOff,
  Loader,
  LockKeyhole,
  Mail,
} from 'lucide-react'
import { Button } from '@base-ui/react/button'
import { Controller, useForm } from 'react-hook-form'
import type { Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ACCOUNT_STEP_FIELDS,
  loginSchema,
  signupSchema,
  toSignupPayload,
  type AuthFormValues,
} from '../lib/AuthSchema'
import Logo from './Logo'
import { FieldError } from '../lib/helpers'
import AuthService from '../services/AuthService'
import toast from 'react-hot-toast'
import { isAxiosError } from 'axios'
import { useAuthStore } from '../stores/AuthStore'

type AuthMode = 'login' | 'signup'
type SignupStep = 'account' | 'organization'

const FEATURES = [
  'One clear view of every project',
  'Fast, focused workflows for your team',
  'Built for momentum, not busywork',
]

const TEAM_SIZES = ['Just me', '2–10', '11–50', '51–200', '201–1,000', '1,000+']

// Founder step 2 options
const FOUNDER_ROLES = ['Founder / Executive', 'Engineering', 'Product', 'Design', 'Operations', 'Other']

// Employee designation options
const EMPLOYEE_ROLES = ['Supervisor', 'Engineer', 'Designer', 'Product Manager', 'QA Engineer', 'Other']

const SIGNUP_ROLES = [
  { value: 'founder', label: 'Founder' },
  { value: 'employee', label: 'Employee' },
] as const

const INPUT_BASE =
  'h-11 w-full rounded-lg border border-slate-200 bg-white text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 aria-invalid:border-red-400 aria-invalid:focus:ring-red-100'

const DEFAULT_VALUES: Partial<AuthFormValues> = {
  name: '',
  email: '',
  password: '',
  organizationName: '',
  teamSize: '',
  jobRole: '',
}

export function AuthPage({
  mode,
  onSubmit,
}: {
  mode: AuthMode
  onSubmit?: (data: AuthFormValues) => void
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState<SignupStep>('account')
  const navigate = useNavigate()

  const isSignup = mode === 'signup'

  const { login, isLoading } = useAuthStore()

  const {
    register,
    control,
    watch,
    reset,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(
      isSignup ? signupSchema : loginSchema,
    ) as unknown as Resolver<AuthFormValues>,
    defaultValues: DEFAULT_VALUES,
    mode: 'onTouched',
  })

  const role = watch('role')
  const teamSize = watch('teamSize')
  const jobRole = watch('jobRole')

  const isFounder = isSignup && role === 'founder'
  const isEmployee = isSignup && role === 'employee'
  const isOrgStep = isFounder && step === 'organization'
  const totalSteps = isFounder ? 2 : 1
  const isBusy = isSubmitting || isLoading

  useEffect(() => {
    reset(DEFAULT_VALUES)
    setStep('account')
    setShowPassword(false)
  }, [mode, reset])

  useEffect(() => {
    if (!isFounder) setStep('account')
  }, [isFounder])

  // Founders and employees use different option lists for jobRole,
  // so clear it when the role changes to avoid a stale, invalid value.
  useEffect(() => {
    setValue('jobRole', '')
  }, [role, setValue])

  const onValid = async (values: AuthFormValues) => {
    const uiPayload: AuthFormValues =
      values.role === 'founder' ? values : { ...values, teamSize: '' }

    try {
      if (!isSignup) {
        const result: any = await login({
          email: values.email,
          password: values.password,
        })

        if (result?.success) {
          toast.success('Welcome back!')
          navigate('/dashboard')
        }
      } else {
        await AuthService.RegisterUser(toSignupPayload(values))
        toast.success('Account created successfully!')
      }

      onSubmit?.(uiPayload)
    } catch (error) {
      const message = isAxiosError(error)
        ? error.response?.data?.message ??
          error.response?.data?.title ??
          'Something went wrong. Please try again.'
        : 'Unexpected error. Please try again.'

      toast.error(message)
    }
  }

  const onFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (isFounder && step === 'account') {
      event.preventDefault()
      const valid = await trigger([...ACCOUNT_STEP_FIELDS])
      if (valid) setStep('organization')
      return
    }

    await handleSubmit(onValid)(event)
  }

  const title = isOrgStep
    ? 'Set up your organization'
    : isSignup
      ? 'Create your workspace'
      : 'Welcome back'

  const subtitle = isOrgStep
    ? 'Tell us a bit about your team so we can get your workspace ready.'
    : isSignup
      ? "Start organizing your team's best work today."
      : 'Sign in to pick up where you left off.'

  const submitLabel = !isSignup ? 'Sign in' : isFounder && !isOrgStep ? 'Continue' : 'Sign up'

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden overflow-hidden bg-blue-600 p-10 text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-between lg:self-start xl:p-16">
          <div>
            <Link to="/">
              <Logo variant="light" />
            </Link>

            <div className="mt-28 max-w-lg">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">
                Your team&apos;s command center
              </p>
              <h1 className="mt-5 text-5xl font-bold leading-[1.08] tracking-[-0.04em]">
                Make progress visible.
              </h1>
              <p className="mt-6 max-w-md text-lg leading-8 text-blue-100">
                Plan projects, align your team, and move work forward without losing the thread.
              </p>

              <div className="mt-10 flex flex-col gap-4 text-sm text-blue-50">
                {FEATURES.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="flex size-5 items-center justify-center rounded-full bg-blue-500">
                      <Check className="size-3" />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Form panel */}
        <section className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-[410px]">
            <div className="mb-10 lg:hidden">
              <Logo variant="dark" />
            </div>

            <div className="mb-4">
              {isSignup ? (
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex flex-1 gap-1.5">
                    <span className="h-1 flex-1 rounded-full bg-blue-600" />
                    {isFounder && (
                      <span
                        className={`h-1 flex-1 rounded-full transition ${
                          isOrgStep ? 'bg-blue-600' : 'bg-slate-200'
                        }`}
                      />
                    )}
                  </div>

                  <span className="text-xs font-medium text-slate-400">
                    Step {isOrgStep ? 2 : 1} of {totalSteps}
                  </span>
                </div>
              ) : null}
              <p className="text-sm font-semibold text-blue-600">Welcome to TaskFlow</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
            </div>

            <form className="flex flex-col gap-4" onSubmit={onFormSubmit} noValidate>
              {!isOrgStep && (
                <>
                  {isSignup && (
                    <label className="text-sm font-medium text-slate-700">
                      Full name
                      <input
                        autoComplete="name"
                        placeholder="Your Name"
                        aria-invalid={!!errors.name}
                        {...register('name')}
                        className={`${INPUT_BASE} mt-2 px-3.5`}
                      />
                      <FieldError message={errors.name?.message} />
                    </label>
                  )}

                  <label className="text-sm font-medium text-slate-700">
                    Work email
                    <div className="relative mt-2">
                      <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        aria-invalid={!!errors.email}
                        {...register('email')}
                        className={`${INPUT_BASE} pl-10 pr-3.5`}
                      />
                    </div>
                    <FieldError message={errors.email?.message} />
                  </label>

                  {isSignup && (
                    <div className="text-sm font-medium text-slate-700">
                      <span className="mb-2 block">Role</span>
                      <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                          <div className="grid grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5">
                            {SIGNUP_ROLES.map((option) => {
                              const isSelected = field.value === option.value

                              return (
                                <Button
                                  key={option.value}
                                  type="button"
                                  aria-pressed={isSelected}
                                  onClick={() => {
                                    field.onChange(option.value)
                                    field.onBlur()
                                  }}
                                  className={`cursor-pointer rounded-lg p-2 transition-colors ${
                                    isSelected
                                      ? 'bg-blue-600 text-white'
                                      : 'hover:bg-blue-500 hover:text-white'
                                  }`}
                                >
                                  {option.label}
                                </Button>
                              )
                            })}
                          </div>
                        )}
                      />
                      <FieldError message={errors.role?.message} />
                    </div>
                  )}

                  {isEmployee && (
                    <>
                      <label className="text-sm font-medium text-slate-700">
                        Organization name
                        <div className="relative mt-2">
                          <Building2 className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            autoComplete="organization"
                            placeholder="Acme Inc."
                            aria-invalid={!!errors.organizationName}
                            {...register('organizationName')}
                            className={`${INPUT_BASE} pl-10 pr-3.5`}
                          />
                        </div>
                        <FieldError message={errors.organizationName?.message} />
                      </label>

                      <label className="text-sm font-medium text-slate-700">
                        Designation
                        <div className="relative mt-2">
                          <BriefcaseBusiness className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                          <select
                            aria-invalid={!!errors.jobRole}
                            {...register('jobRole')}
                            className={`${INPUT_BASE} appearance-none bg-white pl-10 pr-10 ${
                              jobRole ? 'text-slate-900' : 'text-slate-400'
                            }`}
                          >
                            <option value="" disabled>
                              Select your designation
                            </option>
                            {EMPLOYEE_ROLES.map((item) => (
                              <option key={item} value={item} className="text-slate-900">
                                {item}
                              </option>
                            ))}
                          </select>
                          <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                        </div>
                        <FieldError message={errors.jobRole?.message} />
                      </label>
                    </>
                  )}

                  <label className="text-sm font-medium text-slate-700">
                    Password
                    <div className="relative mt-2">
                      <LockKeyhole className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        autoComplete={isSignup ? 'new-password' : 'current-password'}
                        placeholder={isSignup ? 'At least 8 characters' : 'Enter your password'}
                        aria-invalid={!!errors.password}
                        {...register('password')}
                        className={`${INPUT_BASE} pl-10 pr-10`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((value) => !value)}
                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                        aria-label={showPassword ? 'Hide password' : 'Show password'}
                      >
                        {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                      </button>
                    </div>
                    <FieldError message={errors.password?.message} />
                  </label>

                  {!isSignup && (
                    <div className="-mt-1 flex justify-end">
                      <Link
                        to="#"
                        className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Forgot password?
                      </Link>
                    </div>
                  )}
                </>
              )}

              {isOrgStep && (
                <>
                  <label className="text-sm font-medium text-slate-700">
                    Organization name
                    <input
                      autoComplete="organization"
                      placeholder="Acme Inc."
                      autoFocus
                      aria-invalid={!!errors.organizationName}
                      {...register('organizationName')}
                      className={`${INPUT_BASE} mt-2 px-3.5`}
                    />
                    <FieldError message={errors.organizationName?.message} />
                  </label>

                  <label className="text-sm font-medium text-slate-700">
                    Team size
                    <select
                      aria-invalid={!!errors.teamSize}
                      {...register('teamSize')}
                      className={`${INPUT_BASE} mt-2 px-3 ${teamSize ? '' : 'text-slate-400'}`}
                    >
                      <option value="" disabled>
                        Select team size
                      </option>
                      {TEAM_SIZES.map((size) => (
                        <option key={size} value={size} className="text-slate-950">
                          {size}
                        </option>
                      ))}
                    </select>
                    <FieldError message={errors.teamSize?.message} />
                  </label>

                  <label className="text-sm font-medium text-slate-700">
                    Your role
                    <select
                      aria-invalid={!!errors.jobRole}
                      {...register('jobRole')}
                      className={`${INPUT_BASE} mt-2 px-3 ${jobRole ? '' : 'text-slate-400'}`}
                    >
                      <option value="" disabled>
                        Select your role
                      </option>
                      {FOUNDER_ROLES.map((item) => (
                        <option key={item} value={item} className="text-slate-950">
                          {item}
                        </option>
                      ))}
                    </select>
                    <FieldError message={errors.jobRole?.message} />
                  </label>
                </>
              )}

              <div className={`mt-2 flex gap-3 ${isOrgStep ? '' : 'flex-col'}`}>
                {isOrgStep && (
                  <button
                    type="button"
                    onClick={() => setStep('account')}
                    className="flex h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    <ArrowLeft className="size-4" />
                    Back
                  </button>
                )}
                <button
                  type="submit"
                  disabled={isBusy}
                  className="flex h-11 flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60"
                >
                  {isBusy ? (
                    <Loader className="size-4 animate-spin" />
                  ) : (
                    <>
                      {submitLabel}
                      <ArrowRight className="size-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {!isOrgStep && (
              <p className="mt-6 text-center text-sm text-slate-500">
                {isSignup ? 'Already have an account?' : 'New to TaskFlow?'}{' '}
                <Link
                  to={isSignup ? '/' : '/signin'}
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  {isSignup ? 'Sign in' : 'Create an account'}
                </Link>
              </p>
            )}
          </div>
        </section>
      </div>
    </main>
  )
}

export default AuthPage