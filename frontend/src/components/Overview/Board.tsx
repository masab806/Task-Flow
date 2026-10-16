
import { CircleDot, Clock3, MoreHorizontal, Plus } from 'lucide-react'
import type { TaskColumn } from '../../lib/types'

interface BoardProps {
  columns: TaskColumn[]
}

const Board = ({ columns }: BoardProps) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {columns.map((column) => (
        <section key={column.id} className="min-w-0">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`size-2.5 rounded-full ${column.color}`} />
              <h2 className="text-sm font-semibold">{column.title}</h2>
              <span className="text-xs text-slate-400">
                {column.tasks.length}
              </span>
            </div>
            <button aria-label={`More ${column.title} options`}>
              <MoreHorizontal className="size-4 text-slate-400" />
            </button>
          </div>

          <div className="flex min-h-[180px] flex-col gap-3 rounded-xl bg-slate-100/70 p-2.5">
            {column.tasks.map((task) => (
              <article
                key={task.id}
                className="group cursor-pointer rounded-lg border border-slate-200/80 bg-white p-3.5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="text-[11px] font-semibold text-slate-400">
                    {task.id}
                  </span>
                  <MoreHorizontal className="size-4 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>

                <h3 className="mt-2 break-words text-[13px] font-semibold leading-5 text-slate-800">
                  {task.title}
                </h3>

                <div className="mt-3 flex items-center justify-between gap-2">
                  <span className={`rounded px-1.5 py-1 text-[10px] font-semibold ${task.tagColor}`}>
                    {task.tag}
                  </span>
                  <span className="flex items-center gap-1 whitespace-nowrap text-[11px] text-slate-400">
                    <Clock3 className="size-3" />
                    {task.due}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                  <span className={`flex items-center gap-1.5 text-[11px] ${task.priority === 'High' ? 'text-rose-600' : 'text-slate-400'}`}>
                    <CircleDot className="size-3.5" />
                    {task.priority}
                  </span>
                  <span className={`flex size-6 items-center justify-center rounded-full text-[9px] font-bold ${task.avatarColor}`}>
                    {task.avatar}
                  </span>
                </div>
              </article>
            ))}

         
          </div>
        </section>
      ))}
    </div>
  )
}

export default Board
