
import type { TaskColumn } from '../../lib/types'

interface ListProps {
  columns: TaskColumn[]
}

const List = ({ columns }: ListProps) => {
  const tasks = columns.flatMap((column) =>
    column.tasks.map((task) => ({
      ...task,
      status: column.title,
    }))
  )

  return (
    <div className="mt-6 overflow-x-auto rounded-xl border border-slate-200 bg-white">
      <table className="w-full min-w-[650px] text-left text-sm">
        <thead className="border-b border-slate-200 bg-slate-50 text-xs text-slate-500">
          <tr>
            <th className="px-4 py-3 font-medium">Task</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Priority</th>
            <th className="px-4 py-3 font-medium">Due date</th>
            <th className="px-4 py-3 font-medium">Assignee</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {tasks.map((task) => (
            <tr key={task.id} className="hover:bg-slate-50">
              <td className="px-4 py-3">
                <p className="font-medium text-slate-800">{task.title}</p>
                <p className="mt-1 text-xs text-slate-400">{task.id}</p>
              </td>

              <td className="px-4 py-3">
                <span className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-600">
                  {task.status}
                </span>
              </td>

              <td className={`px-4 py-3 text-xs ${task.priority === 'High' ? 'font-medium text-rose-600' : 'text-slate-500'}`}>
                {task.priority}
              </td>

              <td className="whitespace-nowrap px-4 py-3 text-xs text-slate-500">
                {task.due}
              </td>

              <td className="px-4 py-3">
                <span className={`flex size-7 items-center justify-center rounded-full text-[10px] font-bold ${task.avatarColor}`}>
                  {task.avatar}
                </span>
              </td>
            </tr>
          ))}

          {tasks.length === 0 && (
            <tr>
              <td colSpan={5} className="px-4 py-10 text-center text-sm text-slate-400">
                No tasks found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default List
