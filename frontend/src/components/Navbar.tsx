import {
    Bell,
    ChevronDown,
    Search,
} from 'lucide-react'
import { useAuthStore } from '../stores/AuthStore'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

const Navbar = () => {
    const { user, logout } = useAuthStore()
    const navigate = useNavigate()

    const handleLogout = ()=> {
        logout()
        navigate("/")
        toast.success("Logged Out Successfully!")
    }

    return (
        <section className="min-w-0 flex-1">
            <header className="flex h-[68px] items-center justify-between border-b border-slate-200 bg-white px-5 sm:px-8">
                <div className="flex items-center gap-3">
                    <div className="flex size-8 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white">T
                    </div>
                    <span className="font-bold">TaskFlow</span>
                </div>
                <div className="relative hidden w-[280px] md:block"><Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                    <input placeholder="Search tasks..." className="h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-10 text-sm outline-none placeholder:text-slate-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100" />
                    <kbd className="absolute right-2 top-1/2 -translate-y-1/2 rounded border border-slate-200 bg-white px-1.5 py-0.5 text-[10px] text-slate-400">⌘ K</kbd>
                </div>
                <div className="flex items-center gap-2 sm:gap-4">
                    <button className="relative rounded-lg p-2 text-slate-500 hover:bg-slate-100" aria-label="Notifications"><Bell className="size-[18px]" />
                        <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-blue-600" /></button><div className="hidden h-6 w-px bg-slate-200 sm:block" />
                    <button className="flex items-center gap-2 text-sm font-medium">
                        <span className="flex size-8 items-center justify-center rounded-full bg-blue-100 text-xs font-bold text-blue-700">AM</span>
                        <span className="hidden sm:inline">{user?.fullName || "Username"}</span>
                        <DropdownMenu>
                            <DropdownMenuTrigger render={<ChevronDown className="size-4 text-slate-400" />} />
                            <DropdownMenuContent className="mt-2">
                                <DropdownMenuGroup>
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuItem>Profile</DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onClick={handleLogout} className="text-red-600 hover:text-red-600 cursor-pointer">Logout</DropdownMenuItem>
                                </DropdownMenuGroup>
                            </DropdownMenuContent>

                        </DropdownMenu>
                    </button>
                </div>
            </header>

        </section>
    )
}

export default Navbar