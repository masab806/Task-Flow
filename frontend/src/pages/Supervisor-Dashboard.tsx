import { useState, type ComponentType } from 'react'
import { Plus } from 'lucide-react'
import { Button, Card, stats, tabs, tones, type TabId } from '../components/supervisor/Shared'
import { Overview } from '../components/supervisor/Overview'
import { Projects, ProjectTeams } from '../components/supervisor/Projects'
import { AssignTask, AssignEmployees } from '../components/supervisor/Assignments'

const views: Record<TabId, ComponentType> = {
  'overview': Overview,
  'projects': Projects,
  'project-teams': ProjectTeams,
  'assign-task': AssignTask,
  'assign-employees': AssignEmployees,
}

export function SupervisorDashboard({ activeTab: initialTab = 'overview' }: { activeTab?: TabId }) {
  const [activeTab, setActiveTab] = useState<TabId>(initialTab) 
  const View = views[activeTab]

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 antialiased">
      <main className="mx-auto max-w-[1360px] space-y-8 px-4 py-8 sm:px-6">
        <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Supervisor dashboard</h1>
            <p className="mt-1.5 text-sm text-slate-500">Assign work, monitor progress, and keep your team unblocked.</p>
          </div>
        </header>

        <section aria-label="Summary statistics" className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <Card key={s.label} className="p-5">
              <p className="text-sm font-medium text-slate-500">{s.label}</p>
              <p className="mt-2 text-3xl font-semibold tabular-nums tracking-tight">{s.value}</p>
              <p className={`mt-1.5 text-sm ${tones[s.noteTone].text}`}>{s.note}</p>
            </Card>
          ))}
        </section>

        <div className="space-y-6">
          <nav aria-label="Dashboard views" className="border-b border-slate-200">
            <div role="tablist" className="-mb-px flex gap-6 overflow-x-auto sm:gap-8">
              {tabs.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  onClick={()=> setActiveTab(t.id)}
                  aria-selected={t.id === activeTab}
                  className={`whitespace-nowrap border-b-2 px-0.5 pb-3 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${
                    t.id === activeTab ? 'border-blue-600 font-semibold text-blue-600' : 'border-transparent font-medium text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </nav>
          <div className="pb-12"><View /></div>
        </div>
      </main>
    </div>
  )
}