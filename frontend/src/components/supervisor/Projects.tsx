import { CalendarDays, FolderKanban, MoreHorizontal, Search } from 'lucide-react'
import { Avatar, AvatarStack, Badge, Button, Card, ProgressBar, projects, tones } from './shared'

export function Projects() {
  return (
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