import React from 'react'
import { Button } from './ui/button'
import { MoreHorizontal, Plus } from 'lucide-react'

const projects = [
  { name: 'Website redesign', description: 'Plan, track, and ship a better web experience.', tasks: '13 tasks', progress: 61, color: 'bg-blue-500', members: 'AM · JL · RK' },
  { name: 'Mobile app', description: 'Bring the TaskFlow experience to iOS and Android.', tasks: '8 tasks', progress: 38, color: 'bg-violet-500', members: 'MS · AM · JL' },
  { name: 'Growth experiments', description: 'Test ideas that help teams work better together.', tasks: '5 tasks', progress: 80, color: 'bg-amber-400', members: 'RK · MS' },
  { name: 'Growth experiments', description: 'Test ideas that help teams work better together.', tasks: '5 tasks', progress: 80, color: 'bg-amber-400', members: 'RK · MS' },
  { name: 'Growth experiments', description: 'Test ideas that help teams work better together.', tasks: '5 tasks', progress: 80, color: 'bg-amber-400', members: 'RK · MS' },
  { name: 'Growth experiments', description: 'Test ideas that help teams work better together.', tasks: '5 tasks', progress: 80, color: 'bg-amber-400', members: 'RK · MS' },
  { name: 'Growth experiments', description: 'Test ideas that help teams work better together.', tasks: '5 tasks', progress: 80, color: 'bg-amber-400', members: 'RK · MS' },
  { name: 'Growth experiments', description: 'Test ideas that help teams work better together.', tasks: '5 tasks', progress: 80, color: 'bg-amber-400', members: 'RK · MS' },
  { name: 'Growth experiments', description: 'Test ideas that help teams work better together.', tasks: '5 tasks', progress: 80, color: 'bg-amber-400', members: 'RK · MS' },
  { name: 'Growth experiments', description: 'Test ideas that help teams work better together.', tasks: '5 tasks', progress: 80, color: 'bg-amber-400', members: 'RK · MS' },
]

const ProjectCard = () => {
    return (
        <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8">
            <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) =>
                    <button key={project.name} className="group rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md">
                        <div className="flex items-start justify-between"><span className={`size-3 rounded-full ${project.color}`} />
                            <MoreHorizontal className="size-4 text-slate-300 opacity-0 transition-opacity group-hover:opacity-100" />
                        </div>
                        <h2 className="mt-5 text-base font-bold text-slate-900">{project.name}</h2>
                        <p className="mt-1 min-h-10 text-sm leading-5 text-slate-500">{project.description}</p>
                        <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
                            <span>{project.tasks}</span>
                            <span className="font-semibold text-slate-700">{project.progress}% complete</span></div>
                        <div className="mt-2 h-2 overflow-hidden rounded-full bg-slate-100"><div className={`h-full rounded-full ${project.color}`} style={{ width: `${project.progress}%` }} /></div>
                        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                            <span className="text-xs text-slate-400">Team {project.members}</span>
                            <span className="text-xs font-semibold text-blue-600">Open project</span>
                        </div>
                    </button>)}
            </div>
        </div>
    )
}

export default ProjectCard