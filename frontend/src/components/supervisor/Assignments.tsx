import { Check, Clock3, Plus, Users } from 'lucide-react'
import { Avatar, Badge, Button, Card, CardHeader, DateInput, Field, Select, TextArea, TextInput, roster } from './shared'

const projectOptions = ['Website redesign', 'Customer portal', 'Mobile app launch']
const footer = 'mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between'
const hint = 'flex items-center gap-2 text-sm text-slate-500'

export function AssignTask() {
  return (
    <Card className="mx-auto max-w-2xl p-6">
      <CardHeader title="Assign a new task" description="Give the task an owner and a due date." />
      <div className="mt-6 space-y-5">
        <Field label="Task title"><TextInput placeholder="e.g. Review mobile onboarding flow" /></Field>
        <Field label="Description" optional><TextArea placeholder="Add context, links, or acceptance criteria…" /></Field>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Project"><Select options={projectOptions} /></Field>
          <Field label="Assign to"><Select options={['Jordan Lee', 'Alex Morgan', 'Maya Singh', 'Riley Kim']} /></Field>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="Due date"><DateInput /></Field>
          <Field label="Priority"><Select options={['Low', 'Medium', 'High']} defaultValue="Medium" /></Field>
        </div>
      </div>
      <div className={footer}>
        <span className={hint}><Clock3 aria-hidden className="size-4" /> The task is added to the selected project</span>
        <Button icon={<Plus className="size-4" />}>Assign task</Button>
      </div>
    </Card>
  )
}

export function AssignEmployees() {
  return (
    <Card className="mx-auto max-w-2xl p-6">
      <CardHeader title="Assign employees to project" description="Choose who should join this project." />
      <div className="mt-6"><Field label="Project"><Select options={projectOptions} /></Field></div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-900">Available employees</p>
        <Badge>4 available</Badge>
      </div>

      <ul className="mt-3 space-y-2">
        {roster.map(({ person, role, email, tasks }, i) => {
          const selected = i === 0
          return (
            <li key={person.name}>
              <label className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${selected ? 'border-blue-500 bg-blue-50/60' : 'border-slate-200 hover:bg-slate-50'}`}>
                <input type="checkbox" defaultChecked={selected} className="size-4 rounded accent-blue-600" />
                <Avatar person={person} />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium text-slate-900">{person.name}</span>
                  <span className="block truncate text-xs text-slate-500">{role} · {email}</span>
                </span>
                <span className="hidden shrink-0 text-xs text-slate-500 sm:inline">{tasks}</span>
              </label>
            </li>
          )
        })}
      </ul>

      <div className={footer}>
        <span className={hint}><Users aria-hidden className="size-4" /> 1 employee selected</span>
        <Button icon={<Check className="size-4" />}>Add to project</Button>
      </div>
    </Card>
  )
}