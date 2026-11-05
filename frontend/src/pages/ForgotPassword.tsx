import { Link, useNavigate } from "react-router-dom"
import Logo from "../components/Logo"
import { ArrowLeft, ArrowRight, Check, Eye, EyeClosed, Mail } from "lucide-react"
import { useState } from "react"
import AuthService from "../services/AuthService"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { ResetPasswordSchema } from "../lib/ResetSchema"
import toast from "react-hot-toast"

type Step = "Email-Step" | "OTP-Step" | "Reset-Password"

const FEATURES = [
    "One clear view of every project",
    "Fast, focused workflows for your team",
    "Built for momentum, not busywork",
]

const INPUT_BASE =
    "h-11 w-full rounded-lg border border-slate-200 bg-white text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 aria-invalid:border-red-400 aria-invalid:focus:ring-red-100"

export default function ForgotPassword() {
    const [step, setStep] = useState<Step>("Email-Step")
    const [otp, setOtp] = useState(["", "", "", ""])
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        trigger,
        setValue,
    } = useForm({
        resolver: zodResolver(ResetPasswordSchema),
    })

    const workEmail = watch("email")
    const navigate = useNavigate()

    const handleFormSubmit = async () => {
        if (loading) return

        try {
            setLoading(true)

            if (step === "Email-Step") {
                const isValid = await trigger("email")
                if (!isValid) return

                await AuthService.GenerateOTP(workEmail)
                setStep("OTP-Step")
            } else if (step === "OTP-Step") {
                const enteredOtp = otp.join("")
                if (enteredOtp.length !== 4) return

                // Give react-hook-form the combined OTP (the 4 boxes are not registered)
                setValue("otp", enteredOtp, { shouldValidate: true })
                setStep("Reset-Password")
            } else if (step === "Reset-Password") {
                // handleSubmit returns a function, so it must be invoked with ()
                await handleSubmit(async (data) => {
                    await AuthService.ResetPassword(data)
                    toast.success("Password Set")
                    navigate("/")
                })()
            }
        } catch (error) {
            console.log("Error", error)
        } finally {
            setLoading(false)
        }
    }

    const handleOtpChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return

        // Functional update so rapid changes never overwrite each other
        setOtp((prev) => {
            const updated = [...prev]
            updated[index] = value
            return updated
        })

        if (value && index < 3) {
            document.getElementById(`otp-${index + 1}`)?.focus()
        }
    }

    const handleOtpKeyDown = (
        e: React.KeyboardEvent<HTMLInputElement>,
        index: number
    ) => {
        if (e.key === "Backspace" && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`)?.focus()
        }
    }

    const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
        const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4)
        if (!pasted) return

        e.preventDefault()
        const updated = ["", "", "", ""]
        pasted.split("").forEach((digit, i) => (updated[i] = digit))
        setOtp(updated)

        document.getElementById(`otp-${Math.min(pasted.length, 3)}`)?.focus()
    }

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

                <div className="p-5">
                    <div className="flex items-center gap-2">
                        <Link to="/">
                            <ArrowLeft />
                        </Link>

                        <p className="font-poppins text-2xl font-semibold">Reset Password</p>
                    </div>

                    <section className="flex min-h-[calc(100vh-80px)] w-full flex-col items-center justify-center px-5">
                        {step === "Email-Step" && (
                            <div className="w-full max-w-[450px]">
                                <div className="mb-6 flex flex-col gap-3">
                                    <p className="font-poppins text-sm font-semibold text-blue-600">
                                        Forgotten Password?
                                    </p>

                                    <h1 className="font-poppins text-3xl font-semibold tracking-tight text-black">
                                        Reset Password
                                    </h1>

                                    <p className="text-sm leading-6 text-slate-500">
                                        Enter your work email and we&apos;ll send you a 4-digit code.
                                    </p>
                                </div>

                                <label className="block text-sm font-medium text-slate-700">
                                    Work email

                                    <div className="relative mt-3">
                                        <Mail className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />

                                        <input
                                            {...register("email")}
                                            type="email"
                                            autoComplete="email"
                                            placeholder="you@company.com"
                                            aria-invalid={!!errors.email}
                                            className={`${INPUT_BASE} pl-12 pr-4`}
                                        />
                                    </div>
                                </label>
                                {errors.email && (
                                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                                )}

                                <div className="flex items-center justify-center">
                                    <button
                                        type="button"
                                        disabled={loading}
                                        onClick={handleFormSubmit}
                                        className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-600 p-3 font-semibold text-white transition-all hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <span>{loading ? "Sending..." : "Send OTP"}</span>
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === "OTP-Step" && (
                            <div className="w-full max-w-[450px]">
                                <div className="mb-6 flex flex-col gap-3">
                                    <p className="font-poppins text-sm font-semibold text-blue-600">
                                        Forgotten Password?
                                    </p>

                                    <h1 className="font-poppins text-3xl font-semibold tracking-tight text-black">
                                        Reset Password
                                    </h1>

                                    <p className="text-sm leading-6 text-slate-500">
                                        We sent a 4-digit code to {workEmail}.
                                    </p>
                                </div>

                                <div className="w-full">
                                    <label className="mb-3 block text-sm font-medium text-slate-700">
                                        Enter 4-digit OTP
                                    </label>

                                    <div className="flex items-center justify-center gap-4">
                                        {otp.map((digit, index) => (
                                            <input
                                                key={index}
                                                id={`otp-${index}`}
                                                type="text"
                                                inputMode="numeric"
                                                autoComplete={index === 0 ? "one-time-code" : "off"}
                                                maxLength={1}
                                                value={digit}
                                                onChange={(e) => handleOtpChange(e.target.value, index)}
                                                onKeyDown={(e) => handleOtpKeyDown(e, index)}
                                                onPaste={handleOtpPaste}
                                                onFocus={(e) => e.target.select()}
                                                className="size-14 rounded-xl border border-slate-200 bg-white text-center text-2xl font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                            />
                                        ))}
                                    </div>
                                    {errors.otp && (
                                        <p className="mt-2 text-sm text-red-600">{errors.otp.message}</p>
                                    )}
                                </div>

                                <div className="mt-6 flex items-center justify-center">
                                    <button
                                        type="button"
                                        disabled={loading || otp.some((digit) => digit === "")}
                                        onClick={handleFormSubmit}
                                        className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 p-3 font-semibold text-white transition-all hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <span>Verify OTP</span>
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}

                        {step === "Reset-Password" && (
                            <div className="w-full max-w-[450px]">
                                <div className="mb-6 flex flex-col gap-3">
                                    <p className="font-poppins text-sm font-semibold text-blue-600">
                                        Forgotten Password?
                                    </p>

                                    <h1 className="font-poppins text-3xl font-semibold tracking-tight text-black">
                                        Reset Password
                                    </h1>

                                    <p className="text-sm leading-6 text-slate-500">
                                        Choose a new password for your account.
                                    </p>
                                </div>

                                <div className="flex flex-col gap-4">
                                    <div>
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium text-slate-700"
                                        >
                                            New Password
                                        </label>

                                        <div
                                            className={`${INPUT_BASE} relative mt-3 flex items-center justify-between gap-2 px-4`}
                                            aria-invalid={!!errors.password}
                                        >
                                            <input
                                                id="password"
                                                type={showPassword ? "text" : "password"}
                                                autoComplete="new-password"
                                                placeholder="Enter new password"
                                                className="h-full w-full bg-transparent outline-none"
                                                {...register("password")}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword((s) => !s)}
                                                className="cursor-pointer text-slate-500"
                                                aria-label={showPassword ? "Hide password" : "Show password"}
                                            >
                                                {showPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        {errors.password && (
                                            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="confirmPassword"
                                            className="block text-sm font-medium text-slate-700"
                                        >
                                            Confirm Password
                                        </label>

                                        <div
                                            className={`${INPUT_BASE} relative mt-3 flex items-center justify-between gap-2 px-4`}
                                            aria-invalid={!!errors.confirmPassword}
                                        >
                                            <input
                                                id="confirmPassword"
                                                type={showConfirmPassword ? "text" : "password"}
                                                autoComplete="new-password"
                                                placeholder="Confirm new password"
                                                className="h-full w-full bg-transparent outline-none"
                                                {...register("confirmPassword")}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirmPassword((s) => !s)}
                                                className="cursor-pointer text-slate-500"
                                                aria-label={
                                                    showConfirmPassword ? "Hide password" : "Show password"
                                                }
                                            >
                                                {showConfirmPassword ? <EyeClosed size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        {errors.confirmPassword && (
                                            <p className="mt-1 text-sm text-red-600">
                                                {errors.confirmPassword.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex items-center justify-center">
                                    <button
                                        type="button"
                                        disabled={loading}
                                        onClick={handleFormSubmit}
                                        className="mt-5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-blue-600 p-3 font-semibold text-white transition-all hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <span>{loading ? "Saving..." : "Reset Password"}</span>
                                        <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </main>
    )
}