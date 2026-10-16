import { LayoutDashboard, ListTodo, FolderKanban, Users, PlusIcon } from 'lucide-react'
import React, { useState } from 'react'


interface SidebarProps {
    activeNav: string,
    setActiveNav: React.Dispatch<React.SetStateAction<string>>
}

const navItems = [
    { label: 'Overview', icon: LayoutDashboard },
    { label: 'My Work', icon: ListTodo, count: '6' },
    { label: 'Projects', icon: FolderKanban },
    { label: 'Teams', icon: Users },
]

const Sidebar = ({ activeNav, setActiveNav }: SidebarProps) => {
    return (
        <aside className="sticky top-0 h-screen w-[250px] shrink-0 overflow-y-auto border-r border-slate-200 bg-white p-6">
            <div className="flex items-center gap-3">
                <div className="flex size-10 text-xl items-center justify-center rounded-xl bg-blue-600 font-bold text-white">
                    T
                </div>
                <span className="font-bold text-slate-800 text-2xl">TaskFlow</span>
            </div>

            <div className="mt-9 px-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-400">Workspace</div>
            <nav className="mt-3 flex flex-col gap-1" aria-label="Workspace navigation">
                {navItems.map((item) => {
                    const Icon = item.icon
                    const selected = activeNav === item.label
                    return <button key={item.label} onClick={() => setActiveNav(item.label)} className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${selected ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'}`}>
                        <span className="flex items-center gap-3"><Icon className="size-[17px]" />{item.label}</span>
                        {item.count && <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-xs text-slate-500">{item.count}</span>}
                    </button>
                })}
            </nav>

            <div className="mt-9 px-3 text-[11px] flex items-center justify-between font-semibold uppercase tracking-[0.14em] text-slate-400">
                <span>Projects</span>
                <button className='cursor-pointer'><PlusIcon size={14} /></button>
            </div>

            <div className="mt-3 flex flex-col gap-1">
                {['Website redesign', 'Mobile app', 'Growth experiments'].map((project, index) => <button key={project} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-slate-600 hover:bg-slate-50"><span className={`size-2 rounded-full ${['bg-blue-500', 'bg-violet-500', 'bg-amber-400'][index]}`} />{project}</button>)}
            </div>



        </aside>
    )
}

export default Sidebar