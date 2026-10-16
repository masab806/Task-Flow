
import { CalendarDays } from 'lucide-react'
import type { TaskColumn } from '../../lib/types'

interface TimelineProps {
  columns: TaskColumn[]
}

const Timeline = ({ columns }: TimelineProps) => {
  const tasks = columns.flatMap((column) =>
    column.tasks.map((task) => ({
      ...task,
      status: column.title,
      statusColor: column.color,
    }))
  )

  return (
    <div className="mt-6 rounded-xl border border-slate-200 bg-white p-4 sm:p-6">
      <div className="mb-6">
        <h2 className="text-sm font-semibold text-slate-800">
          Project timeline
        </h2>
        <p className="mt-1 text-xs text-slate-500">
          Track task deadlines and progress.
        </p>
      </div>

      <div className="relative ml-2 space-y-6 border-l border-slate-200 pl-6">
        {tasks.map((task) => (
          <article key={task.id} className="relative">
            <span className={`absolute -left-[31px] top-1 size-2.5 rounded-full ring-4 ring-white ${task.statusColor}`} />

            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div className="min-w-0">
                <p className="text-[11px] text-slate-400">{task.id}</p>
                <h3 className="mt-1 break-words text-sm font-semibold text-slate-800">
                  {task.title}
                </h3>

                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-slate-100 px-2 py-1 text-[10px] text-slate-600">
                    {task.status}
                  </span>
                  <span className={`text-xs ${task.priority === 'High' ? 'text-rose-600' : 'text-slate-500'}`}>
                    {task.priority} priority
                  </span>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-2 text-xs text-slate-500">
                <CalendarDays className="size-4" />
                {task.due}
                <span className={`ml-1 flex size-7 items-center justify-center rounded-full text-[10px] font-bold ${task.avatarColor}`}>
                  {task.avatar}
                </span>
              </div>
            </div>
          </article>
        ))}

        {tasks.length === 0 && (
          <p className="text-sm text-slate-400">No tasks to display.</p>
        )}
      </div>
    </div>
  )
}

export default Timeline
