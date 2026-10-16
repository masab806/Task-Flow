
import { Dot, MoreHorizontal, Timer } from 'lucide-react'
import React from 'react'

const TaskCard = () => {
    return (
        <div className="group w-full min-w-0 min-h-[170px] bg-white rounded-lg shadow-md border border-transparent transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-blue-500">
            <div className='flex items-center justify-between mr-2'>
                <p className="text-xs px-4 pt-3 pb-2 font-semibold text-gray-500">
                    TF-104
                </p>
                <button onClick={()=> console.log("Working")} className='opacity-0 transition-opacity group-hover:opacity-100'><MoreHorizontal size={15}/></button>
            </div>

            <div className="px-4 py-1">
                <p className="text-sm font-bold break-words">
                    Create On Boarding CheckList
                </p>
            </div>

            <div className="px-4 py-2 flex flex-wrap items-center justify-between gap-2">
                <p className="text-[10px] bg-purple-200 px-2 py-1 text-purple-900 font-semibold rounded">
                    Product
                </p>

                <p className="flex items-center text-[10px] gap-1 text-gray-500 whitespace-nowrap">
                    <Timer size={12} />
                    Today
                </p>
            </div>

            <div className="px-4 py-2">
                <div className="h-px bg-gray-200" />
            </div>

            <div className="px-4 pb-3 flex items-center justify-between gap-2 min-h-[40px]">
                <div className="flex items-center min-w-0">
                    <Dot color="red" size={24} />
                    <span className="text-xs text-red-500">High</span>
                </div>

                <div className="shrink-0 size-7 rounded-full flex items-center justify-center bg-red-100">
                    <span className="text-[10px] font-bold text-red-900">
                        AM
                    </span>
                </div>
            </div>
        </div>
    )
}

export default TaskCard
