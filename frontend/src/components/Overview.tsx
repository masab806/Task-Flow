
import React, { useState } from 'react'
import TaskCard from './TaskCard'

const Overview = () => {
  const [activeTab, setActiveTab] = useState('Board')

  const tabs = ['Board', 'List', 'Timeline']

  return (
    <div className="min-h-screen w-full p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <p className="text-gray-400">Projects /</p>
        <p>Website Redesign</p>
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <p className="text-xl sm:text-2xl font-semibold text-black">
          Website Redesign
        </p>
        <p className="text-sm text-gray-400">
          Plan, track, and ship a better web experience.
        </p>
      </div>

      <div className="mt-8 sm:mt-10 border-b border-gray-200">
        <ul className="flex gap-5 sm:gap-7 list-none p-0 m-0 overflow-x-auto">
          {tabs.map((tab) => (
            <li
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative shrink-0 pb-3 text-sm cursor-pointer transition-colors duration-200
                after:absolute after:bottom-0 after:left-0 after:h-0.5
                after:bg-blue-500 after:transition-all after:duration-200
                ${activeTab === tab
                  ? 'text-blue-600 font-medium after:w-full'
                  : 'text-gray-500 hover:text-gray-800 after:w-0 hover:after:w-full'
                }`}
            >
              {tab}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Overview
