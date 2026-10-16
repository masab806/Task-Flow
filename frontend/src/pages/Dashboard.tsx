
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import Overview from '../components/Overview/Overview'
import MyWork from '../components/MyWork'
import Teams from '../components/Teams'
import Projects from '../components/Projects'

const Dashboard = () => {
  const [activeNav, setActiveNav] = useState('Overview')

  const renderActiveView = () => {
    switch (activeNav) {
      case 'Overview':
        return <Overview />
      case 'My Work':
        return <MyWork />
      case 'Teams':
        return <Teams />
      case 'Projects':
        return <Projects />
      default:
        return <Overview />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar
        activeNav={activeNav}
        setActiveNav={setActiveNav}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Navbar />

        <main className="min-h-0 flex-1 overflow-y-auto p-3">
          <div className="text-slate-700">
            {renderActiveView()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Dashboard
