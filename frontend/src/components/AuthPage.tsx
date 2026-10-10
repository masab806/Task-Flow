import { useEffect, useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, Eye, EyeOff, GitBranch, LockKeyhole, Mail } from 'lucide-react'
import type { SignupData } from '../lib/types.d.ts'
import { Select } from '@base-ui/react/select'
import { Button } from '@base-ui/react/button'

type AuthMode = 'login' | 'signup'
type SignupStep = 'account' | 'organization'


const FEATURES = [
  'One clear view of every project',
  'Fast, focused workflows for your team',
  'Built for momentum, not busywork',
]

const TEAM_SIZES = ['Just me', '2–10', '11–50', '51–200', '201–1,000', '1,000+']
const ROLES = ['Founder / Executive', 'Engineering', 'Product', 'Design', 'Operations', 'Other']

const INPUT_BASE =
  'h-11 w-full rounded-lg border border-slate-200 bg-white text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100'

const SIGNUP_ROLES = ["Founder", "Employee"]

const INITIAL_DATA: SignupData = {
  name: '',
  email: '',
  password: '',
  organizationName: '',
  teamSize: '',
  role: '',
}


function Logo({ variant }: { variant: 'light' | 'dark' }) {
  const isLight = variant === 'light'
  return (
    <span className="flex items-center gap-2 text-lg font-bold tracking-tight">
      <span
        className={`flex size-8 items-center justify-center rounded-xl text-sm font-bold ${isLight ? 'bg-white text-blue-600' : 'bg-blue-600 text-white'
          }`}
      >
        T
      </span>
      TaskFlow
    </span>
  )
}

export function AuthPage({
  mode,
  onSubmit,
}: {
  mode: AuthMode
  onSubmit?: (data: SignupData) => void
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [step, setStep] = useState<SignupStep>('organization')
  const [data, setData] = useState<SignupData>(INITIAL_DATA)

  const isSignup = mode === 'signup'
  const isOrgStep = isSignup && step === 'organization' && data.role === "founder"

  // Always start a fresh flow when switching between login and signup
  useEffect(() => {
    setStep('account')
    setShowPassword(false)
  }, [mode])

  const update = (field: keyof SignupData) => (value: string) =>
    setData((current) => ({ ...current, [field]: value }))

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (isSignup && step === 'account' && data.role === "founder") {
      setStep('organization')
      return
    }

    onSubmit?.(data)
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

  return (
    <main className="min-h-screen bg-[#f7f8fa] text-slate-950">
      <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">
        {/* Brand panel */}
        <section className="hidden overflow-hidden bg-blue-600 p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
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

          <p className="text-xs text-blue-200">© 2026 TaskFlow, Inc. All rights reserved.</p>
        </section>

        {/* Form panel */}
        <section className="flex items-center justify-center p-6 sm:p-10">
          <div className="w-full max-w-[410px]">
            <div className="mb-10 lg:hidden">
              <Logo variant="dark" />
            </div>

            <div className="mb-8">
              {isSignup ? (
                <div className="mb-5 flex items-center gap-3">
                  <div className="flex flex-1 gap-1.5">
                    <span className="h-1 flex-1 rounded-full bg-blue-600" />
                    <span
                      className={`h-1 flex-1 rounded-full transition ${isOrgStep ? 'bg-blue-600' : 'bg-slate-200'
                        }`}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-400">
                    Step {data.role === "founder" && isOrgStep ? 2 : 1} of 2
                  </span>
                </div>
              ) : null}
              <p className="text-sm font-semibold text-blue-600">Welcome to TaskFlow</p>
              <h2 className="mt-2 text-3xl font-bold tracking-tight">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>
            </div>

            {!isOrgStep && (
              <>
                <button
                  type="button"
                  className="flex h-11 w-full items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  <GitBranch className="size-4" />
                  Continue with GitHub
                </button>

                <div className="my-6 flex items-center gap-3 text-xs text-slate-400">
                  <span className="h-px flex-1 bg-slate-200" />
                  OR
                  <span className="h-px flex-1 bg-slate-200" />
                </div>
              </>
            )}

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              {!isOrgStep && (
                <>
                  {isSignup && (
                    <label className="text-sm font-medium text-slate-700">
                      Full name
                      <input
                        name="name"
                        autoComplete="name"
                        placeholder="Alex Morgan"
                        required
                        value={data.name}
                        onChange={(event) => update('name')(event.target.value)}
                        className={`${INPUT_BASE} mt-2 px-3.5`}
                      />
                    </label>
                  )}

                  <label className="text-sm font-medium text-slate-700">
                    Work email
                    <div className="relative mt-2">
                      <Mail className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                      <input
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="you@company.com"
                        required
                        value={data.email}
                        onChange={(event) => update('email')(event.target.value)}
                        className={`${INPUT_BASE} pl-10 pr-3.5`}
                      />
                    </div>
                  </label>

                  {!isOrgStep && (
                    <>
                      {isSignup && (
                        <div className="text-sm font-medium text-slate-700">
                          <span className="mb-2 block">Role</span>
                          <div className="grid grid-cols-2 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-1.5">
                          
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <label className="text-sm font-medium text-slate-700">
                    Password
                    <div className="relative mt-2">
                      <LockKeyhole className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                      <input
                        name="password"
                        type={showPassword ? 'text' : 'password'}
                        autoComplete={isSignup ? 'new-password' : 'current-password'}
                        placeholder={isSignup ? 'At least 8 characters' : 'Enter your password'}
                        required
                        minLength={isSignup ? 8 : undefined}
                        value={data.password}
                        onChange={(event) => update('password')(event.target.value)}
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
                      name="organizationName"
                      autoComplete="organization"
                      placeholder="Acme Inc."
                      required
                      autoFocus
                      value={data.organizationName}
                      onChange={(event) => update('organizationName')(event.target.value)}
                      className={`${INPUT_BASE} mt-2 px-3.5`}
                    />
                  </label>

                  <label className="text-sm font-medium text-slate-700">
                    Team size
                    <select
                      name="teamSize"
                      required
                      value={data.teamSize}
                      onChange={(event) => update('teamSize')(event.target.value)}
                      className={`${INPUT_BASE} mt-2 px-3 ${data.teamSize ? '' : 'text-slate-400'}`}
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
                  </label>

                  <label className="text-sm font-medium text-slate-700">
                    Your role
                    <select
                      name="role"
                      required
                      value={data.role}
                      onChange={(event) => update('role')(event.target.value)}
                      className={`${INPUT_BASE} mt-2 px-3 ${data.role ? '' : 'text-slate-400'}`}
                    >
                      <option value="" disabled>
                        Select your role
                      </option>
                      {ROLES.map((role) => (
                        <option key={role} value={role} className="text-slate-950">
                          {role}
                        </option>
                      ))}
                    </select>
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
                  className="flex h-11 p-1 flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
                >
                  {isSignup ? (isOrgStep ? 'Create account' : 'Continue') : 'Sign in'}
                  <ArrowRight className="size-4" />
                </button>
              </div>
            </form>

            {!isOrgStep && (
              <p className="mt-7 text-center text-sm text-slate-500">
                {isSignup ? 'Already have an account?' : 'New to TaskFlow?'}{' '}
                <Link
                  to={isSignup ? '/login' : '/signup'}
                  className="font-semibold text-blue-600 hover:text-blue-700"
                >
                  {isSignup ? 'Sign in' : 'Create an account'}
                </Link>
              </p>
            )}

            <p className="mt-8 text-center text-[11px] leading-5 text-slate-400">
              By continuing, you agree to TaskFlow&apos;s{' '}
              <Link to="#" className="underline underline-offset-2">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link to="#" className="underline underline-offset-2">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default AuthPage