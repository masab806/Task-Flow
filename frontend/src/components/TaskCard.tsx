import { Dot, Timer } from 'lucide-react'
import React from 'react'

const TaskCard = () => {
    return (
        <div className='min-w-[200px] min-h-[170px] bg-white rounded-lg shadow-lg border border-transparent transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-blue-500'>
            <div><p className='text-xs px-5 py-3 font-semibold text-gray-500'>TF-104</p></div>
            <div><p className='text-xs p-2 font-bold'>Create On Boarding CheckList</p></div>
            <div className='p-2 flex items-center justify-between'>
                <p className='text-[10px] bg-purple-200 p-1 text-purple-900 font-semibold rounded-xs'>Product</p>
                <p className='flex items-center text-[10px] gap-1 text-gray-500'><Timer size={12} /> Today</p>
            </div>
            <div className='p-2'>
            <div className='h-[1px] bg-gray-200' />
            </div>
                
            <div className='flex items-center justify-between min-h-[30px]'>
                <div className='flex items-center'>
                    <Dot color='red' />
                    <span className='text-[12px] text-red-500'>High</span>
                </div>
                <div className='mr-2 text-[10px] size-6 rounded-full items-center flex bg-red-500'>
                    <span className='ml-1 font-bold text-red-900'>AM</span>
                </div>
            </div>
        </div>
    )
}

export default TaskCard