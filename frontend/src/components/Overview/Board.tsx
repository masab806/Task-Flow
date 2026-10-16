
import { CircleDot, Clock3, MoreHorizontal, Plus } from 'lucide-react'
import type { TaskColumn } from '../../lib/types'
import TaskCard from '../TaskCard'

interface BoardProps {
  columns: TaskColumn[]
}

const Board = ({ columns }: BoardProps) => {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {columns.map((column) => (
        <TaskCard/>
      ))}
    </div>
  )
}

export default Board
