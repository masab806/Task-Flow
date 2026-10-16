
import React, { useState } from 'react'
import Board from '../Overview/Board'
import List from '../Overview/List'
import Timeline from '../Overview/Timeline'

const Overview = () => {
  const [activeTab, setActiveTab] = useState('Board')

  const tabs = ['Board', 'List', 'Timeline']

  const visibleColumns = [
    {
      id: 'todo',
      title: 'To Do',
      color: 'bg-slate-400',
      tasks: [
        {
          id: 'TF-104',
          title: 'Create On Boarding CheckList',
          tag: 'Product',
          tagColor: 'bg-purple-100 text-purple-800',
          due: 'Today',
          priority: 'High',
          avatar: 'AM',
          avatarColor: 'bg-red-100 text-red-700',
        },
        {
          id: 'TF-105',
          title: 'Design Landing Page',
          tag: 'Design',
          tagColor: 'bg-blue-100 text-blue-800',
          due: 'Oct 20',
          priority: 'Medium',
          avatar: 'JD',
          avatarColor: 'bg-blue-100 text-blue-700',
        },
      ],
    },
    {
      id: 'in-progress',
      title: 'In Progress',
      color: 'bg-blue-500',
      tasks: [
        {
          id: 'TF-101',
          title: 'Build Authentication Flow',
          tag: 'Development',
          tagColor: 'bg-green-100 text-green-800',
          due: 'Oct 18',
          priority: 'High',
          avatar: 'AM',
          avatarColor: 'bg-red-100 text-red-700',
        },
        {
          id: 'TF-102',
          title: 'Create Dashboard Layout',
          tag: 'Design',
          tagColor: 'bg-blue-100 text-blue-800',
          due: 'Oct 22',
          priority: 'Medium',
          avatar: 'JD',
          avatarColor: 'bg-blue-100 text-blue-700',
        },
      ],
    },
    {
      id: 'review',
      title: 'In Review',
      color: 'bg-amber-500',
      tasks: [
        {
          id: 'TF-103',
          title: 'Review Responsive Components',
          tag: 'Frontend',
          tagColor: 'bg-cyan-100 text-cyan-800',
          due: 'Oct 19',
          priority: 'Medium',
          avatar: 'SK',
          avatarColor: 'bg-green-100 text-green-700',
        },
      ],
    },
    {
      id: 'done',
      title: 'Done',
      color: 'bg-green-500',
      tasks: [
        {
          id: 'TF-099',
          title: 'Initialize Project',
          tag: 'Development',
          tagColor: 'bg-green-100 text-green-800',
          due: 'Oct 14',
          priority: 'Low',
          avatar: 'AM',
          avatarColor: 'bg-red-100 text-red-700',
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen w-full p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <p className="text-gray-400">Projects /</p>
        <p>Website Redesign</p>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <p className="text-xl font-semibold text-black sm:text-2xl">
          Website Redesign
        </p>
        <p className="text-sm text-gray-400">
          Plan, track, and ship a better web experience.
        </p>
      </div>

      <div className="mt-8 border-b border-gray-200 sm:mt-10">
        <ul className="m-0 flex list-none gap-5 overflow-x-auto p-0 sm:gap-7">
          {tabs.map((tab) => (
            <li
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative shrink-0 cursor-pointer pb-3 text-sm transition-colors duration-200
                after:absolute after:bottom-0 after:left-0 after:h-0.5
                after:bg-blue-500 after:transition-all after:duration-200
                ${
                  activeTab === tab
                    ? 'font-medium text-blue-600 after:w-full'
                    : 'text-gray-500 after:w-0 hover:text-gray-800 hover:after:w-full'
                }`}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5">
        {activeTab === 'Board' && (
          <Board
            columns={visibleColumns}
          />
        )}

        {activeTab === 'List' && (
          <List columns={visibleColumns} />
        )}

        {activeTab === 'Timeline' && (
          <Timeline columns={visibleColumns} />
        )}
      </div>

     
    </div>
  )
}

export default Overview
