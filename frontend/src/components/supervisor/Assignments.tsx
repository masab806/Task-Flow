import { Check, Clock3, Plus, Users } from 'lucide-react'
import { Avatar, Badge, Button, Card, CardHeader, Field, Select, roster, SubmitButton } from './Shared'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { AssignTaskSchema } from '../../lib/TaskSchema'
import taskService from '../../services/TaskService'

const projectOptions = [1, 2, 3]
const footer = 'mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between'
const hint = 'flex items-center gap-2 text-sm text-slate-500'

export function AssignTask() {

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    resolver: zodResolver(AssignTaskSchema)
  })

  const onFormSubmit = async (data) => {
    await taskService.assignTask(data)
  }

  const control = 'h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'

  return (
    <Card className="mx-auto max-w-2xl p-6">
      <form onSubmit={handleSubmit(onFormSubmit)} action="">
        <CardHeader title="Assign a new task" description="Give the task an owner and a due date." />
        <div className="mt-6 space-y-5">
          <Field label="Task title">
            <input className="h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'" {...register("taskTitle")} placeholder="e.g. Review mobile onboarding flow" />
            {errors.taskTitle && (<p className='text-xs text-red-600'>{errors.taskTitle.message}</p>)}
          </Field>
          <Field label="Description" optional>
            <input className='h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20' {...register("description")} placeholder="Add context, links, or acceptance criteria…" />
            {errors.description && (<p className='text-xs text-red-600'>{errors.description.message}</p>)}
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Project">
              <select
                {...register('projectId')}
                className={`${control} appearance-none`}
              >
                <option value="">Select a project</option>
                {projectOptions.map((project) => (
                  <option key={project} value={project}>
                    {project}
                  </option>
                ))}
              </select>
              {errors.projectId && (
                <p className="text-xs text-red-600">{errors.projectId.message}</p>
              )}
            </Field>

            <Field label="Assign to">
              <select
                {...register('employeeId', { valueAsNumber: true })}
                className={`${control} appearance-none`}
              >
                <option value="">Select an employee</option>
                {[1, 2, 3, 4].map(
                  (employee, index) => (
                    <option key={employee} value={index + 1}>
                      {employee}
                    </option>
                  )
                )}
              </select>
              {errors.employeeId && (
                <p className="text-xs text-red-600">{errors.employeeId.message}</p>
              )}
            </Field>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Due date">
              <input type="date" {...register("due_date", { valueAsDate: true })} className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
              {errors.due_date && (<p className='text-xs text-red-600'>{errors.due_date.message}</p>)}
            </Field>
            <Field label="Priority">
              <select
                {...register('priority')}
                defaultValue="Medium"
                className={`${control} appearance-none`}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              {errors.priority && (
                <p className="text-xs text-red-600">{errors.priority.message}</p>
              )}
            </Field>
          </div>
        </div>
        <div className={footer}>
          <span className={hint}><Clock3 aria-hidden className="size-4" /> The task is added to the selected project</span>
          <SubmitButton icon={<Plus className="size-4" />}>Assign task</SubmitButton>
        </div>
      </form>
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