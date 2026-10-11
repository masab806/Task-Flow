type LogoProps = {
  variant?: 'light' | 'dark'
}

const VARIANT_STYLES = {
  light: { text: 'text-white', mark: 'bg-white text-blue-600' },
  dark: { text: 'text-slate-950', mark: 'bg-blue-600 text-white' },
} as const

export function Logo({ variant = 'dark' }: LogoProps) {
  const styles = VARIANT_STYLES[variant]

  return (
    <span className={`flex items-center gap-2 text-lg font-bold tracking-tight ${styles.text}`}>
      <span
        aria-hidden="true"
        className={`flex size-8 items-center justify-center rounded-xl text-sm font-bold ${styles.mark}`}
      >
        T
      </span>
      TaskFlow
    </span>
  )
}

export default Logo