import type { ReactNode } from 'react'
import { CalendarDays, ChevronDown } from 'lucide-react'

/* ---------- tones (all classes written out so Tailwind can see them) ---------- */

export type Tone = 'blue' | 'green' | 'amber' | 'red' | 'violet' | 'slate'

export const tones: Record<Tone, { badge: string; dot: string; bar: string; avatar: string; text: string }> = {
  blue:   { badge: 'bg-blue-50 text-blue-700 ring-blue-600/15',          dot: 'bg-blue-500',    bar: 'bg-blue-500',    avatar: 'bg-blue-100 text-blue-700',       text: 'text-blue-600' },
  green:  { badge: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15', dot: 'bg-emerald-500', bar: 'bg-emerald-500', avatar: 'bg-emerald-100 text-emerald-700', text: 'text-emerald-600' },
  amber:  { badge: 'bg-amber-50 text-amber-800 ring-amber-600/20',       dot: 'bg-amber-500',   bar: 'bg-amber-500',   avatar: 'bg-amber-100 text-amber-800',     text: 'text-amber-600' },
  red:    { badge: 'bg-rose-50 text-rose-700 ring-rose-600/15',          dot: 'bg-rose-500',    bar: 'bg-rose-500',    avatar: 'bg-rose-100 text-rose-700',       text: 'text-rose-600' },
  violet: { badge: 'bg-violet-50 text-violet-700 ring-violet-600/15',    dot: 'bg-violet-500',  bar: 'bg-violet-500',  avatar: 'bg-violet-100 text-violet-700',   text: 'text-violet-600' },
  slate:  { badge: 'bg-slate-100 text-slate-600 ring-slate-500/15',      dot: 'bg-slate-400',   bar: 'bg-slate-400',   avatar: 'bg-slate-200 text-slate-700',     text: 'text-slate-500' },
}

/* ---------- mock data ---------- */

export type Person = { name: string; initials: string; tone: Tone }

export const people: Record<string, Person> = {
  alex:   { name: 'Alex Morgan', initials: 'AM', tone: 'blue' },
  jordan: { name: 'Jordan Lee',  initials: 'JL', tone: 'violet' },
  maya:   { name: 'Maya Singh',  initials: 'MS', tone: 'red' },
  riley:  { name: 'Riley Kim',   initials: 'RK', tone: 'amber' },
  sam:    { name: 'Sam Taylor',  initials: 'ST', tone: 'green' },
  priya:  { name: 'Priya Patel', initials: 'PP', tone: 'amber' },
}

export const stats: { label: string; value: string; note: string; noteTone: Tone }[] = [
  { label: 'Team members',        value: '12', note: '+2 this month',         noteTone: 'green' },
  { label: 'Active tasks',        value: '42', note: 'Across 3 projects',     noteTone: 'slate' },
  { label: 'Completed this week', value: '24', note: '18% above average',     noteTone: 'green' },
  { label: 'At risk',             value: '3',  note: 'Needs attention today', noteTone: 'red' },
]

export const tasks: {
  title: string; code: string; assignee: Person
  status: string; statusTone: Tone; priority: string; priorityTone: Tone
  due: string; overdue?: boolean
}[] = [
  { title: 'Redesign project overview',      code: 'TF-097', assignee: people.jordan, status: 'In progress', statusTone: 'blue',   priority: 'High',   priorityTone: 'red',   due: 'Today', overdue: true },
  { title: 'Set up real-time updates',       code: 'TF-101', assignee: people.maya,   status: 'In progress', statusTone: 'blue',   priority: 'High',   priorityTone: 'red',   due: 'Oct 22' },
  { title: 'Audit notification preferences', code: 'TF-108', assignee: people.jordan, status: 'To do',       statusTone: 'slate',  priority: 'Medium', priorityTone: 'amber', due: 'Oct 24' },
  { title: 'Write API documentation',        code: 'TF-103', assignee: people.alex,   status: 'In review',   statusTone: 'violet', priority: 'Medium', priorityTone: 'amber', due: 'Oct 26' },
]

export const workload = [
  { person: people.alex,   tasks: 12, max: 15 },
  { person: people.jordan, tasks: 9,  max: 15 },
  { person: people.maya,   tasks: 7,  max: 15 },
  { person: people.riley,  tasks: 14, max: 15 },
]

export const projects: {
  name: string; code: string; description: string; progress: number
  tasks: string; due: string; status: string; tone: Tone; members: Person[]
}[] = [
  { name: 'Website redesign',  code: 'PRJ-024', description: 'A refreshed, accessible experience for the TaskFlow platform.', progress: 72, tasks: '18 of 25 tasks', due: 'Oct 30, 2026', status: 'On track',    tone: 'green', members: [people.alex, people.jordan, people.maya, people.riley] },
  { name: 'Customer portal',   code: 'PRJ-021', description: 'Self-service portal for customer onboarding and support.',      progress: 46, tasks: '11 of 24 tasks', due: 'Nov 12, 2026', status: 'In progress', tone: 'blue',  members: [people.sam, people.priya, people.jordan] },
  { name: 'Mobile app launch', code: 'PRJ-018', description: 'Prepare the new mobile app for its public launch.',             progress: 89, tasks: '24 of 27 tasks', due: 'Oct 24, 2026', status: 'At risk',     tone: 'red',   members: [people.riley, people.alex] },
]

export const roster = [
  { person: people.alex,   role: 'Product Designer',  email: 'alex.morgan@taskflow.co', tasks: '6 tasks' },
  { person: people.jordan, role: 'Frontend Engineer', email: 'jordan.lee@taskflow.co',  tasks: '4 tasks' },
  { person: people.maya,   role: 'Product Designer',  email: 'maya.singh@taskflow.co',  tasks: '5 tasks' },
  { person: people.riley,  role: 'Engineering Lead',  email: 'riley.kim@taskflow.co',   tasks: '3 tasks' },
]

export const tabs = [
  { id: 'overview',         label: 'Overview' },
  { id: 'projects',         label: 'Projects' },
  { id: 'project-teams',    label: 'Project teams' },
  { id: 'assign-task',      label: 'Assign a task' },
  { id: 'assign-employees', label: 'Assign employees' },
] as const
export type TabId = typeof tabs[number]['id']

/* ---------- primitives ---------- */

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-slate-200 bg-white shadow-sm ${className}`}>{children}</div>
}

export function CardHeader({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h3 className="text-base font-semibold text-slate-900">{title}</h3>
        {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
      </div>
      {action}
    </div>
  )
}

const avatarSizes = { sm: 'size-7 text-[11px]', md: 'size-9 text-xs' }

export function Avatar({ person, tone, size = 'md', ring = false }: { person: Person; tone?: Tone; size?: keyof typeof avatarSizes; ring?: boolean }) {
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${avatarSizes[size]} ${tones[tone ?? person.tone].avatar} ${ring ? 'ring-2 ring-white' : ''}`}>
      {person.initials}
    </span>
  )
}

export function AvatarStack({ members, max = 4 }: { members: Person[]; max?: number }) {
  const extra = members.length - max
  return (
    <div className="flex items-center -space-x-2">
      {members.slice(0, max).map((m) => (
        <span key={m.name} title={m.name}><Avatar person={m} size="sm" ring /></span>
      ))}
      {extra > 0 && (
        <span className="inline-flex size-7 items-center justify-center rounded-full bg-slate-100 text-[11px] font-semibold text-slate-600 ring-2 ring-white">+{extra}</span>
      )}
    </div>
  )
}

export function Badge({ children, tone = 'slate', dot = false }: { children: string; tone?: Tone; dot?: boolean }) {
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${tones[tone].badge}`}>
      {dot && <span className={`size-1.5 rounded-full ${tones[tone].dot}`} />}
      {children}
    </span>
  )
}

export function ProgressBar({ value, tone = 'blue', label }: { value: number; tone?: Tone; label: string }) {
  return (
    <div role="progressbar" aria-label={label} aria-valuenow={Math.round(value)} aria-valuemin={0} aria-valuemax={100} className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
      <div className={`h-full rounded-full ${tones[tone].bar}`} style={{ width: `${value}%` }} />
    </div>
  )
}

export function Button({ children, variant = 'primary', icon }: { children: ReactNode; variant?: 'primary' | 'link'; icon?: ReactNode }) {
  const style = variant === 'primary'
    ? 'h-10 rounded-lg px-4 bg-blue-600 text-white shadow-sm hover:bg-blue-700'
    : 'rounded-md text-blue-600 hover:text-blue-700 hover:underline underline-offset-4'
  return (
    <button type="button" className={`inline-flex items-center justify-center gap-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${style}`}>
      {icon}{children}
    </button>
  )
}

export function SubmitButton({ children, variant = 'primary', icon }: { children: ReactNode; variant?: 'primary' | 'link'; icon?: ReactNode }) {
  const style = variant === 'primary'
    ? 'h-10 rounded-lg px-4 bg-blue-600 text-white shadow-sm hover:bg-blue-700'
    : 'rounded-md text-blue-600 hover:text-blue-700 hover:underline underline-offset-4'
  return (
    <button type="submit" className={`inline-flex items-center justify-center gap-2 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${style}`}>
      {icon}{children}
    </button>
  )
}

/* ---------- form fields ---------- */

const control = 'h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'

export function Field({ label, optional = false, children }: { label: string; optional?: boolean; children: ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-slate-700">
        {label} {optional && <span className="font-normal text-slate-400">(optional)</span>}
      </span>
      {children}
    </label>
  )
}

export const TextInput = ({
  placeholder,
  type = 'text',
  defaultValue,
  min,
  max,
}: {
  placeholder?: string
  type?: 'text' | 'number'
  defaultValue?: string | number
  min?: number
  max?: number
}) => <input type={type} placeholder={placeholder} defaultValue={defaultValue} min={min} max={max} className={control} />

export const TextArea = ({ placeholder }: { placeholder?: string }) => (
  <textarea rows={3} placeholder={placeholder} className={`${control} h-auto resize-none py-2.5`} />
)

export function Select({ options, defaultValue }: { options: string[]; defaultValue?: string }) {
  return (
    <span className="relative block">
      <select defaultValue={defaultValue} className={`${control} appearance-none pr-9`}>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown aria-hidden className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
    </span>
  )
}

export const DateInput = () => (
  <span className="relative block">
    <input type="date" className={`${control} pr-9`} />
    <CalendarDays aria-hidden className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
  </span>
)