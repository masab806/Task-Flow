  import {
    ArrowRight,
    CalendarDays,
    Check,
    ChevronDown,
    Circle,
    Clock3,
    MoreHorizontal,
    Plus,
    Search,
    Users,
  } from 'lucide-react'

  const projects = [
    {
      name: 'Website redesign',
      code: 'PRJ-024',
      description: 'A refreshed, accessible experience for the TaskFlow platform.',
      progress: 72,
      tasks: '18 / 25 tasks',
      due: 'Oct 30, 2026',
      status: 'On track',
      color: 'bg-blue-500',
      members: [
        { name: 'Alex Morgan', initials: 'AM', color: 'bg-blue-100 text-blue-700' },
        { name: 'Jordan Lee', initials: 'JL', color: 'bg-violet-100 text-violet-700' },
        { name: 'Maya Singh', initials: 'MS', color: 'bg-rose-100 text-rose-700' },
        { name: 'Riley Kim', initials: 'RK', color: 'bg-amber-100 text-amber-700' },
      ],
    },
    {
      name: 'Customer portal',
      code: 'PRJ-021',
      description: 'Self-service portal for customer onboarding and support.',
      progress: 46,
      tasks: '11 / 24 tasks',
      due: 'Nov 12, 2026',
      status: 'In progress',
      color: 'bg-violet-500',
      members: [
        { name: 'Sam Taylor', initials: 'ST', color: 'bg-emerald-100 text-emerald-700' },
        { name: 'Priya Patel', initials: 'PP', color: 'bg-orange-100 text-orange-700' },
        { name: 'Jordan Lee', initials: 'JL', color: 'bg-violet-100 text-violet-700' },
      ],
    },
    {
      name: 'Mobile app launch',
      code: 'PRJ-018',
      description: 'Prepare the new mobile app for its public launch.',
      progress: 89,
      tasks: '24 / 27 tasks',
      due: 'Oct 24, 2026',
      status: 'At risk',
      color: 'bg-emerald-500',
      members: [
        { name: 'Riley Kim', initials: 'RK', color: 'bg-amber-100 text-amber-700' },
        { name: 'Alex Morgan', initials: 'AM', color: 'bg-blue-100 text-blue-700' },
      ],
    },
  ]

  const teamActivity = [
    { name: 'Alex Morgan', initials: 'AM', title: 'Product Designer', email: 'alex.morgan@taskflow.co', tasks: '6 tasks', color: 'bg-blue-100 text-blue-700' },
    { name: 'Jordan Lee', initials: 'JL', title: 'Frontend Engineer', email: 'jordan.lee@taskflow.co', tasks: '4 tasks', color: 'bg-violet-100 text-violet-700' },
    { name: 'Maya Singh', initials: 'MS', title: 'Product Designer', email: 'maya.singh@taskflow.co', tasks: '5 tasks', color: 'bg-rose-100 text-rose-700' },
    { name: 'Riley Kim', initials: 'RK', title: 'Engineering Lead', email: 'riley.kim@taskflow.co', tasks: '3 tasks', color: 'bg-amber-100 text-amber-700' },
  ]

  const fieldClass = 'mt-1.5 h-10 w-full rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100'
  const labelClass = 'text-xs font-semibold text-slate-700'

  function AvatarStack({ members }: { members: typeof projects[number]['members'] }) {
    return (
      <div className="flex items-center">
        {members.slice(0, 4).map((member, index) => (
          <span
            key={`${member.name}-${index}`}
            title={member.name}
            className={`-ml-2 flex size-7 items-center justify-center rounded-full border-2 border-white text-[9px] font-bold first:ml-0 ${member.color}`}
          >
            {member.initials}
          </span>
        ))}
        {members.length > 4 && <span className="-ml-2 flex size-7 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-[9px] font-semibold text-slate-600">+{members.length - 4}</span>}
      </div>
    )
  }

  export function ProjectDirectory() {
    return (
      <div className="grid gap-4 lg:grid-cols-3">
        {projects.map((project) => (
          <article key={project.code} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/30">
            <div className="flex items-start justify-between">
              <div className="flex size-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><Circle className={`size-4 fill-current ${project.color.replace('bg-', 'text-')}`} /></div>
              <button type="button" aria-label={`More options for ${project.name}`} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100"><MoreHorizontal className="size-5" /></button>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <h3 className="font-semibold text-slate-900">{project.name}</h3>
              <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${project.status === 'At risk' ? 'bg-rose-50 text-rose-700' : project.status === 'On track' ? 'bg-emerald-50 text-emerald-700' : 'bg-blue-50 text-blue-700'}`}>{project.status}</span>
            </div>
            <p className="mt-1 text-[11px] font-medium text-slate-400">{project.code}</p>
            <p className="mt-3 min-h-10 text-xs leading-5 text-slate-500">{project.description}</p>
            <div className="mt-5">
              <div className="mb-2 flex justify-between text-[11px]">
                <span className="font-medium text-slate-600">Progress</span><span className="font-semibold text-slate-800">{project.progress}%</span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${project.color}`} style={{ width: `${project.progress}%` }} /></div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
              <div className="flex items-center gap-2"><AvatarStack members={project.members} /><span className="text-[11px] text-slate-500">{project.members.length} members</span></div>
              <button type="button" className="flex items-center gap-1 text-xs font-semibold text-blue-600">View <ArrowRight className="size-3.5" /></button>
            </div>
            <div className="mt-3 flex gap-4 text-[11px] text-slate-500">
              <span>{project.tasks}</span><span className="flex items-center gap-1"><CalendarDays className="size-3" />{project.due}</span>
            </div>
          </article>
        ))}
      </div>
    )
  }

  export function ProjectTeams() {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200/30">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:px-5">
          <div>
            <p className="text-sm font-semibold text-slate-900">Team roster by project</p>
            <p className="mt-1 text-xs text-slate-500">Employees assigned to your active projects.</p>
          </div>
          <label className="relative block w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
            <input aria-label="Search employees or projects" placeholder="Search employees or projects" className="h-9 w-full rounded-lg border border-slate-200 bg-white pl-9 pr-3 text-xs outline-none placeholder:text-slate-400 focus:border-blue-400" />
          </label>
        </div>
        <div className="divide-y divide-slate-100">
          {projects.map((project) => (
            <div key={project.code} className="px-4 py-4 sm:px-5">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2.5">
                  <span className={`size-2 rounded-full ${project.color}`} />
                  <h3 className="text-sm font-semibold text-slate-800">{project.name}</h3>
                  <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-slate-500">{project.code}</span>
                </div>
                <span className="text-xs text-slate-500">{project.members.length} members</span>
              </div>
              <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                {project.members.map((member, index) => (
                  <div key={`${project.code}-${member.name}`} className="flex min-w-0 items-center gap-2.5 rounded-xl border border-slate-100 bg-slate-50/70 p-2.5">
                    <span className={`flex size-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${member.color}`}>{member.initials}</span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-semibold text-slate-800">{member.name}</p>
                      <p className="truncate text-[10px] text-slate-500">{index === 0 ? 'Project lead' : 'Team member'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-slate-100 px-5 py-3 text-xs text-slate-500">
          <span>Showing 3 of 8 projects</span><button type="button" className="font-semibold text-blue-600">View all projects</button>
        </div>
      </div>
    )
  }

  export function TaskAssignment() {
    return (
      <form className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/30">
        <div className="space-y-4">
          <label className="block"><span className={labelClass}>Task title</span><input placeholder="e.g. Review mobile onboarding flow" className={fieldClass} /></label>
          <label className="block"><span className={labelClass}>Description <span className="font-normal text-slate-400">(optional)</span></span><textarea rows={3} placeholder="Add context, links, or acceptance criteria..." className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 px-3 py-2.5 text-sm text-slate-700 outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100" /></label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block"><span className={labelClass}>Project</span><span className="relative block"><select defaultValue="website" className={`${fieldClass} appearance-none pr-9`}><option value="website">Website redesign</option><option>Customer portal</option><option>Mobile app launch</option></select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" /></span></label>
            <label className="block"><span className={labelClass}>Assign to</span><span className="relative block"><select defaultValue="jordan" className={`${fieldClass} appearance-none pr-9`}><option value="jordan">Jordan Lee</option><option>Alex Morgan</option><option>Maya Singh</option><option>Riley Kim</option></select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" /></span></label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block"><span className={labelClass}>Due date</span><span className="relative block"><input type="text" placeholder="Select a date" className={`${fieldClass} pr-9`} /><CalendarDays className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" /></span></label>
            <label className="block"><span className={labelClass}>Priority</span><span className="relative block"><select defaultValue="medium" className={`${fieldClass} appearance-none pr-9`}><option value="low">Low</option><option value="medium">Medium</option><option>High</option></select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" /></span></label>
          </div>
        </div>
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="flex items-center gap-1.5 text-[11px] text-slate-400"><Clock3 className="size-3.5" /> Task will be added to the selected project</span>
          <button type="button" className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-3.5 text-xs font-semibold text-white hover:bg-blue-700"><Plus className="size-4" /> Assign task</button>
        </div>
      </form>
    )
  }

  export function EmployeeAssignment() {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/30">
        <label className="block"><span className={labelClass}>Project</span><span className="relative block"><select defaultValue="website" className={`${fieldClass} appearance-none pr-9`}><option value="website">Website redesign</option><option>Customer portal</option><option>Mobile app launch</option></select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" /></span></label>
        <div className="mt-5 flex items-center justify-between">
          <div><p className="text-xs font-semibold text-slate-800">Available employees</p><p className="mt-0.5 text-[11px] text-slate-500">Choose who should join this project.</p></div>
          <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-500">4 available</span>
        </div>
        <div className="mt-3 space-y-2">
          {teamActivity.map((person, index) => (
            <label key={person.name} className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-100 p-3 transition-colors hover:bg-slate-50">
              <input type="checkbox" defaultChecked={index === 0} className="size-4 accent-blue-600" />
              <span className={`flex size-9 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${person.color}`}>{person.initials}</span>
              <span className="min-w-0 flex-1"><span className="block truncate text-xs font-semibold text-slate-800">{person.name}</span><span className="mt-0.5 block truncate text-[10px] text-slate-500">{person.title} · {person.email}</span></span>
              <span className="hidden shrink-0 text-[10px] text-slate-400 sm:inline">{person.tasks}</span>
            </label>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-4">
          <span className="flex items-center gap-1.5 text-[11px] text-slate-400"><Users className="size-3.5" /> 1 employee selected</span>
          <button type="button" className="inline-flex h-9 items-center gap-2 rounded-lg bg-blue-600 px-3.5 text-xs font-semibold text-white hover:bg-blue-700"><Check className="size-4" /> Add to project</button>
        </div>
      </div>
    )
  }
