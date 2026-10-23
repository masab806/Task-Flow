import { useState } from 'react'
import { CalendarDays, FolderKanban, MoreHorizontal, Plus, Search, X } from 'lucide-react'
import { Avatar, AvatarStack, Badge, Button, Card, DateInput, Field, ProgressBar, projects, Select, TextArea, TextInput, tones } from './Shared'

export function Projects() {
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false)

  return (
    <>
      <div className="space-y-5">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Projects</h2>
            <p className="mt-1 text-sm text-slate-500">Keep every initiative moving forward in one place.</p>
          </div>
          <button
            type="button"
            onClick={() => setIsCreateProjectOpen(true)}
            className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 sm:self-auto"
          >
            <Plus aria-hidden className="size-4" />
            Create Project
          </button>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <Card key={p.code} className="flex flex-col p-5">
              <div className="flex items-start justify-between">
                <span className={`flex size-10 items-center justify-center rounded-lg ${tones[p.tone].avatar}`}>
                  <FolderKanban aria-hidden className="size-5" />
                </span>
                <button
                  type="button"
                  aria-label={`More options for ${p.name}`}
                  className="-mr-1.5 -mt-1.5 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
                >
                  <MoreHorizontal className="size-5" />
                </button>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <h3 className="text-base font-semibold text-slate-900">{p.name}</h3>
                <Badge tone={p.tone} dot>{p.status}</Badge>
              </div>
              <p className="mt-0.5 text-xs text-slate-500">{p.code}</p>
              <p className="mt-3 text-sm leading-6 text-slate-600">{p.description}</p>

              <div className="mt-5">
                <div className="mb-2 flex items-baseline justify-between text-sm">
                  <span className="text-slate-500">{p.tasks}</span>
                  <span className="font-semibold tabular-nums text-slate-900">{p.progress}%</span>
                </div>
                <ProgressBar value={p.progress} tone={p.tone} label={`${p.name} progress`} />
              </div>

              <div className="mt-auto pt-5">
                <div className="flex items-center justify-between border-t border-slate-100 pt-4">
                  <div className="flex items-center gap-2.5">
                    <AvatarStack members={p.members} />
                    <span className="text-xs text-slate-500">{p.members.length} members</span>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs text-slate-500">
                    <CalendarDays aria-hidden className="size-3.5" /> {p.due}
                  </span>
                </div>
                <div className="mt-3"><Button variant="link">View project</Button></div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {isCreateProjectOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/40 p-4 backdrop-blur-[2px]"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setIsCreateProjectOpen(false)
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-project-title"
            className="my-auto w-full max-w-xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
          >
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 id="create-project-title" className="text-lg font-semibold text-slate-900">Create project</h2>
                <p className="mt-1 text-sm text-slate-500">Set up a project and organize your team’s work.</p>
              </div>
              <button
                type="button"
                aria-label="Close create project form"
                onClick={() => setIsCreateProjectOpen(false)}
                className="-mr-2 -mt-1 rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <X aria-hidden className="size-5" />
              </button>
            </div>

            <div className="grid gap-5 px-6 py-5">
              <Field label="Project title">
                <TextInput placeholder="e.g. Website redesign" />
              </Field>
              <Field label="Description" optional>
                <TextArea placeholder="What is this project about?" />
              </Field>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Status">
                  <Select options={['Planning', 'In progress', 'On hold', 'Completed']} defaultValue="Planning" />
                </Field>
                <Field label="Due date">
                  <DateInput />
                </Field>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Initial progress">
                  <TextInput type="number" defaultValue={0} min={0} max={100} />
                </Field>
                <Field label="Project lead ID">
                  <TextInput type="number" placeholder="Enter team member ID" min={1} />
                </Field>
              </div>
              <p className="text-xs leading-5 text-slate-500">
                Project ID and creation date are assigned automatically. Tasks can be added after the project is created.
              </p>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50/60 px-6 py-4">
              <button
                type="button"
                onClick={() => setIsCreateProjectOpen(false)}
                className="h-10 rounded-lg border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Cancel
              </button>
              <button
                type="button"
                className="h-10 rounded-lg bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
              >
                Create project
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  )
}

export function ProjectTeams() {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col justify-between gap-3 border-b border-slate-200 p-5 sm:flex-row sm:items-center">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Team roster by project</h3>
          <p className="mt-1 text-sm text-slate-500">Employees assigned to your active projects.</p>
        </div>
        <label className="relative block w-full sm:w-72">
          <Search aria-hidden className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input
            aria-label="Search employees or projects"
            placeholder="Search employees or projects"
            className="h-10 w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 text-sm placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </label>
      </div>

      <div className="divide-y divide-slate-100">
        {projects.map((p) => (
          <section key={p.code} className="p-5">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className={`size-2.5 rounded-full ${tones[p.tone].dot}`} />
                <h4 className="text-sm font-semibold text-slate-900">{p.name}</h4>
                <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500">{p.code}</span>
              </div>
              <span className="text-sm text-slate-500">{p.members.length} members</span>
            </div>
            <ul className="grid gap-2.5 sm:grid-cols-2 xl:grid-cols-4">
              {p.members.map((m, i) => (
                <li key={m.name} className="flex min-w-0 items-center gap-3 rounded-lg border border-slate-200 bg-slate-50/60 p-3">
                  <Avatar person={m} />
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-slate-900">{m.name}</p>
                    <p className="truncate text-xs text-slate-500">{i === 0 ? 'Project lead' : 'Team member'}</p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/60 px-5 py-3 text-sm text-slate-500">
        <span>Showing 3 of 8 projects</span>
        <Button variant="link">View all projects</Button>
      </div>
    </Card>
  )
}