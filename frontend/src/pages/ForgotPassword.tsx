
import { Link } from "react-router-dom"
import Logo from "../components/Logo"
import { ArrowLeft, ArrowRight, Check, Eye, EyeClosed, Mail } from "lucide-react"
import { useState } from "react"
import { Button } from "../components/supervisor/Shared"

export default function ForgotPassword() {
    const [step, setStep] = useState<"Email-Step" | "OTP-Step" | "Reset-Password">("Reset-Password")
    const [otp, setOtp] = useState(["", "", "", ""])
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false)

    const FEATURES = [
        "One clear view of every project",
        "Fast, focused workflows for your team",
        "Built for momentum, not busywork",
    ]

    const INPUT_BASE =
        "h-11 w-full rounded-lg border border-slate-200 bg-white text-sm outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-100 aria-invalid:border-red-400 aria-invalid:focus:ring-red-100"

    const handleOtpChange = (value: string, index: number) => {
        if (!/^\d?$/.test(value)) return

        const updatedOtp = [...otp]
        updatedOtp[index] = value
        setOtp(updatedOtp)

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

                        <p className="font-poppins text-2xl font-semibold">
                            Reset Password
                        </p>
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
                                        Tell us a bit about your team so we can get your workspace ready.
                                    </p>
                                </div>

                                <label className="block text-sm font-medium text-slate-700">
                                    Work email

                                    <div className="relative mt-3">
                                        <Mail className="absolute left-4 top-1/2 size-5 -translate-y-1/2 text-slate-400" />

                                        <input
                                            type="email"
                                            autoComplete="email"
                                            placeholder="you@company.com"
                                            className={`${INPUT_BASE} pl-12 pr-4`}
                                        />
                                    </div>
                                </label>

                                <div className="flex items-center justify-center">
                                    <button className="mt-5 w-[400px] p-2 cursor-pointer hover:opacity-80 transition-all text-white flex items-center gap-2 justify-center font-semibold rounded-md bg-blue-600">
                                        <span>Send OTP</span>
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
                                        Tell us a bit about your team so we can get your workspace ready.
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
                                                className="size-14 rounded-xl border border-slate-200 bg-white text-center text-2xl font-semibold text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                                            />
                                        ))}
                                    </div>
                                </div>

                                <div className="mt-6 flex items-center justify-center">
                                    <button
                                        type="button"
                                        disabled={otp.some((digit) => digit === "")}
                                        onClick={() => {
                                            const enteredOtp = otp.join("")
                                            console.log(enteredOtp)
                                        }}
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
                                        Tell us a bit about your team so we can get your workspace ready.
                                    </p>
                                </div>


                                <div className="flex flex-col gap-4">
                                    <label className="block text-sm font-medium text-slate-700">
                                        New Password

                                        <div className={`${INPUT_BASE} px-4 relative mt-3 items-center  justify-between flex`}>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                autoComplete="new-password"
                                                placeholder="Enter new password"
                                                
                                            />
                                            <button onClick={()=> setShowPassword(!showPassword)} className="cursor-pointer">{showPassword ? <EyeClosed/> : <Eye/>}</button>
                                        </div>
                                    </label>

                                    <label className="block text-sm font-medium text-slate-700">
                                        Confirm Password

                                        <div className={`${INPUT_BASE} px-4 relative mt-3 items-center  justify-between flex`}>
                                            <input
                                                type={showConfirmPassword ? "text" : "password"}
                                                autoComplete="new-password"
                                                placeholder="Enter new password"
                                                
                                            />
                                            <button onClick={()=> setShowConfirmPassword(!showConfirmPassword)} className="cursor-pointer">{showConfirmPassword ? <EyeClosed/> : <Eye/>}</button>
                                        </div>
                                    </label>
                                </div>

                                <div className="flex items-center justify-center">
                                    <button
                                        type="button"
                                        className="mt-5 cursor-pointer flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 p-3 font-semibold text-white transition-all hover:opacity-80"
                                    >
                                        <span>Reset Password</span>
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
