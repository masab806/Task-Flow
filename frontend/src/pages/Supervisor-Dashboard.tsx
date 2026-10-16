import { Plus, Users } from 'lucide-react'
import { Button } from '../components/ui/button'
import Navbar from '../components/Navbar'

const stats = [
  { label: 'Team members', value: '12', note: '+2 this month' },
  { label: 'Active tasks', value: '4', note: 'Across 3 projects' },
  { label: 'Completed this week', value: '24', note: '18% above average' },
  { label: 'At risk', value: '3', note: 'Needs attention today' },
]

const tasks = [
  { id: 'TF-097', title: 'Redesign project overview', user: 'Jordan Lee', initials: 'JL', status: 'In progress', priority: 'High', due: 'Today', color: 'bg-sky-100 text-sky-700' },
  { id: 'TF-101', title: 'Set up real-time updates', user: 'Maya Singh', initials: 'MS', status: 'In progress', priority: 'High', due: 'Oct 12', color: 'bg-blue-100 text-blue-700' },
  { id: 'TF-108', title: 'Audit notification preferences', user: 'Jordan Lee', initials: 'JL', status: 'To do', priority: 'Medium', due: 'Oct 14', color: 'bg-sky-100 text-sky-700' },
  { id: 'TF-103', title: 'Write API documentation', user: 'Alex Morgan', initials: 'AM', status: 'In review', priority: 'Medium', due: 'Oct 15', color: 'bg-amber-100 text-amber-700' },
]

const team = [
  { name: 'Alex Morgan', initials: 'AM', progress: 82, count: '12 tasks' },
  { name: 'Jordan Lee', initials: 'JL', progress: 68, count: '9 tasks' },
  { name: 'Maya Singh', initials: 'MS', progress: 54, count: '7 tasks' },
  { name: 'Riley Kim', initials: 'RK', progress: 91, count: '14 tasks' },
]

const tableHeaders = ['Task', 'Assignee', 'Status', 'Priority', 'Due']

function PageHeader() {
  return (
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div>
        <p className="mb-3 text-xs font-medium text-slate-500">Management</p>
        <h1 className="text-2xl font-bold tracking-tight sm:text-[28px]">Supervisor dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Assign work, monitor progress, and keep your team unblocked.
        </p>
      </div>
      <Button className="w-fit gap-2 bg-blue-600 shadow-sm hover:bg-blue-700">
        <Plus data-icon="inline-start" />
        Assign task
      </Button>
    </div>
  )
}

function StatCards() {
  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ label, value, note }) => (
        <div key={label} className="rounded-xl border border-slate-200 bg-white p-5">
          <p className="text-xs text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
          <p className="mt-2 text-xs text-slate-500">{note}</p>
        </div>
      ))}
    </div>
  )
}

function TaskTable() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <h2 className="text-sm font-semibold">Task status overview</h2>
      <p className="mt-1 text-xs text-slate-500">Current workload across your team.</p>

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[650px] text-left">
          <thead>
            <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wide text-slate-400">
              {tableHeaders.map((header) => (
                <th key={header} className="pb-3">{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="border-b border-slate-50 last:border-0">
                <td className="py-4">
                  <p className="text-xs font-semibold text-slate-800">{task.title}</p>
                  <p className="mt-1 text-[11px] text-slate-400">{task.id}</p>
                </td>
                <td className="py-4">
                  <span className="flex items-center gap-2 text-xs text-slate-600">
                    <span className={`flex size-6 items-center justify-center rounded-full text-[9px] font-bold ${task.color}`}>
                      {task.initials}
                    </span>
                    {task.user}
                  </span>
                </td>
                <td className="py-4">
                  <span className="rounded-full bg-slate-100 px-2 py-1 text-[10px] font-semibold text-slate-600">
                    {task.status}
                  </span>
                </td>
                <td className="py-4 text-xs text-slate-500">{task.priority}</td>
                <td className="py-4 text-xs text-slate-500">{task.due}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function TeamHealth() {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold">Team health</h2>
          <p className="mt-1 text-xs text-slate-500">Progress by contributor.</p>
        </div>
        <Users className="size-4 text-slate-400" />
      </div>

      <div className="mt-5 flex flex-col gap-5">
        {team.map(({ name, initials, progress, count }) => (
          <div key={name}>
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-medium">
                <span className="flex size-7 items-center justify-center rounded-full bg-slate-100 text-[9px] font-bold">
                  {initials}
                </span>
                {name}
              </span>
              <span className="text-[11px] text-slate-500">{count}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-slate-100">
              <div className="h-full rounded-full bg-blue-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function SupervisorDashboard() {
  return (
    <>
      <Navbar />
      <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8">
        <PageHeader />
        <StatCards />
        <div className="mt-8 grid gap-4 xl:grid-cols-[1.5fr_1fr]">
          <TaskTable />
          <TeamHealth />
        </div>
      </div>
    </>
  )
}