import { Check, Clock3, Plus, Users } from 'lucide-react'
import { useState } from 'react'
import { Badge, Button, Card, CardHeader, Field, SubmitButton } from './Shared'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { AssignTaskSchema } from '../../lib/TaskSchema'
import type { AssignTaskType } from '../../lib/types'
import type { z } from 'zod'
import toast from 'react-hot-toast'
import { assignEmployees, useProjects } from '../../lib/hooks/useProjects'
import { useEmployees } from '../../lib/hooks/useEmployees'
import { useAssignTask } from '../../lib/hooks/useTasks'

const footer = 'mt-6 flex flex-col gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between'
const hint = 'flex items-center gap-2 text-sm text-slate-500'
const control = 'h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20'

export function AssignTask() {
  const { data: projects = [], isLoading: isLoadingProjects, isError: projectsError } = useProjects()
  const { data: employees = [], isLoading: isLoadingEmployees, isError: employeesError } = useEmployees()
  const assignTask = useAssignTask()

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm<z.input<typeof AssignTaskSchema>, unknown, z.output<typeof AssignTaskSchema>>({
    resolver: zodResolver(AssignTaskSchema)
  })

  const onFormSubmit = async (data: z.output<typeof AssignTaskSchema>) => {
    try {
      await assignTask.mutateAsync({
        ...data,
        due_date: data.due_date.toISOString(),
      } satisfies AssignTaskType)
      toast.success('Task assigned')
    } catch {
      toast.error('Unable to assign task')
    }
  }

  return (
    <Card className="mx-auto max-w-2xl p-6">
      <form onSubmit={handleSubmit(onFormSubmit)} action="">
        <CardHeader title="Assign a new task" description="Give the task an owner and a due date." />
        <div className="mt-6 space-y-5">
          <Field label="Task title">
            <input className={`${control}`} {...register("taskTitle")} placeholder="e.g. Review mobile onboarding flow" />
            {errors.taskTitle && (<p className='text-xs text-red-600'>{errors.taskTitle.message}</p>)}
          </Field>
          <Field label="Description" optional>
            <input className='h-10 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20' {...register("description")} placeholder="Add context, links, or acceptance criteria…" />
            {errors.description && (<p className='text-xs text-red-600'>{errors.description.message}</p>)}
          </Field>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Project">
              <select
                {...register('projectId', { valueAsNumber: true })}
                className={`${control} appearance-none`}
              >
                <option value="" disabled>
                  {isLoadingProjects ? 'Loading projects...' : projectsError ? 'Unable to load projects' : 'Select a project'}
                </option>
                {projects.map((project) => (
                  <option key={project.projectId} value={project.projectId}>
                    {project.projectTitle}
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
                <option value="" disabled>
                  {isLoadingEmployees ? 'Loading employees...' : employeesError ? 'Unable to load employees' : 'Select an employee'}
                </option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.fullName}
                  </option>
                ))}
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
  const {
    data: projects = [],
    isLoading: isLoadingProjects,
    isError: projectsError,
  } = useProjects();

  const {
    data: employees = [],
    isLoading: isLoadingEmployees,
    isError: employeesError,
  } = useEmployees();

  const [selectedProjectId, setSelectedProjectId] = useState<number | "">("");
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<number[]>([]);

  const { mutate, isPending, error, isSuccess } = assignEmployees();

  const handleAssign = () => {
    if (selectedProjectId === "" || selectedEmployeeIds.length === 0) {
      return;
    }

    mutate({
      projectId: selectedProjectId,
      employeeIds: selectedEmployeeIds,
    });
  };

  return (
    <Card className="mx-auto max-w-2xl p-6">
      <CardHeader
        title="Assign employees to project"
        description="Choose who should join this project."
      />

      <div className="mt-6">
        <Field label="Project">
          <select
            className={`${control} appearance-none`}
            value={selectedProjectId}
            disabled={isLoadingProjects || projectsError}
            onChange={(event) => {
              setSelectedProjectId(
                event.target.value === ""
                  ? ""
                  : Number(event.target.value)
              );
            }}
          >
            <option value="">
              {isLoadingProjects
                ? "Loading projects..."
                : projectsError
                  ? "Unable to load projects"
                  : "Select a project"}
            </option>

            {projects.map((project) => (
              <option
                key={project.projectId}
                value={project.projectId}
              >
                {project.projectTitle}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <p className="text-sm font-medium text-slate-900">
          Available employees
        </p>

        <Badge>
          {isLoadingEmployees
            ? "Loading..."
            : `${employees.length} available`}
        </Badge>
      </div>

      <ul className="mt-3 space-y-2">
        {isLoadingEmployees && (
          <li className="text-sm text-slate-500">
            Loading employees...
          </li>
        )}

        {employeesError && (
          <li className="text-sm text-red-600">
            Unable to load employees.
          </li>
        )}

        {!isLoadingEmployees &&
          !employeesError &&
          employees.length === 0 && (
            <li className="text-sm text-slate-500">
              No employees available.
            </li>
          )}

        {!isLoadingEmployees &&
          !employeesError &&
          employees.map((employee) => {
            const selected = selectedEmployeeIds.includes(employee.id);

            const initials = employee.fullName
              .split(/\s+/)
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0].toUpperCase())
              .join("");

            return (
              <li key={employee.id}>
                <label
                  className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                    selected
                      ? "border-blue-500 bg-blue-50/60"
                      : "border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selected}
                    onChange={(event) => {
                      setSelectedEmployeeIds((current) =>
                        event.target.checked
                          ? [...current, employee.id]
                          : current.filter((id) => id !== employee.id)
                      );
                    }}
                    className="size-4 rounded accent-blue-600"
                  />

                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-semibold text-blue-700">
                    {initials}
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium text-slate-900">
                      {employee.fullName}
                    </span>

                    <span className="block truncate text-xs text-slate-500">
                      {[employee.companyRole, employee.workEmail]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </span>
                </label>
              </li>
            );
          })}
      </ul>

      <div className={footer}>
        <span className={hint}>
          <Users aria-hidden className="size-4" />
          {selectedEmployeeIds.length} employees selected
        </span>

        <button
          type="button"
          onClick={handleAssign}
          disabled={
            isPending ||
            selectedProjectId === "" ||
            selectedEmployeeIds.length === 0
          }
          className="bg-blue-500 hover:opacity-80 p-2 cursor-pointer font-poppins rounded-md font-semibold text-white text-sm disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isPending ? "Assigning..." : "Add to project"}
        </button>
      </div>

      {isSuccess && (
        <p className="mt-3 text-sm text-green-600">
          Employees assigned successfully.
        </p>
      )}

      {error && (
        <p className="mt-3 text-sm text-red-600">
          {error.message || "Failed to assign employees."}
        </p>
      )}
    </Card>
  );
}
