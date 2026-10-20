import { Users } from 'lucide-react'
import { Avatar, Badge, Card, CardHeader, ProgressBar, tasks, workload, type Tone } from './Shared'

// Bar colour reflects load: calm blue, then amber, then red near capacity.
const loadTone = (ratio: number): Tone => (ratio >= 0.9 ? 'red' : ratio >= 0.75 ? 'amber' : 'blue')

export function Overview() {
  return (
    <div className="grid gap-6 lg:grid-cols-12">
      <Card className="p-6 lg:col-span-7">
        <CardHeader title="Task status overview" description="Current workload across your team." />
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs text-slate-500">
                <th scope="col" className="pb-3 pr-4 font-medium">Task</th>
                <th scope="col" className="px-4 pb-3 font-medium">Assignee</th>
                <th scope="col" className="px-4 pb-3 font-medium">Status</th>
                <th scope="col" className="px-4 pb-3 font-medium">Priority</th>
                <th scope="col" className="pb-3 pl-4 font-medium">Due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {tasks.map((t) => (
                <tr key={t.code} className="transition-colors hover:bg-slate-50">
                  <td className="py-3.5 pr-4">
                    <p className="font-medium text-slate-900">{t.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{t.code}</p>
                  </td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Avatar person={t.assignee} size="sm" />
                      <span className="whitespace-nowrap text-slate-700">{t.assignee.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5"><Badge tone={t.statusTone}>{t.status}</Badge></td>
                  <td className="px-4 py-3.5"><Badge tone={t.priorityTone} dot>{t.priority}</Badge></td>
                  <td className={`whitespace-nowrap py-3.5 pl-4 ${t.overdue ? 'font-semibold text-rose-600' : 'text-slate-600'}`}>{t.due}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card className="p-6 lg:col-span-5">
        <CardHeader title="Team health" description="Open tasks per contributor." action={<Users aria-hidden className="size-5 text-slate-400" />} />
        <ul className="mt-5 space-y-5">
          {workload.map(({ person, tasks: count, max }) => (
            <li key={person.name}>
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2.5">
                  <Avatar person={person} tone="slate" size="sm" />
                  <span className="font-medium text-slate-900">{person.name}</span>
                </div>
                <span className="tabular-nums text-slate-500">{count} of {max}</span>
              </div>
              <div className="mt-2.5">
                <ProgressBar value={(count / max) * 100} tone={loadTone(count / max)} label={`${person.name} workload`} />
              </div>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  )
}