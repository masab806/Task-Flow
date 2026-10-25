import {create} from "zustand"
import type { LoginResponse, User } from "../lib/types"

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

interface AuthActions {
    setSession: (response: LoginResponse) => void
    logout: ()=> void
}

type AuthStore = AuthState & AuthActions

export const useAuthStore = create<AuthStore>((set)=> ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    setSession: (response: LoginResponse) => {
        const user: User = {
            id: String(response.userId),
            email: response.workEmail,
            name: response.fullName,
            fullName: response.fullName,
            role: response.role,
            companyRole: response.companyRole,
        }
        set({user, isAuthenticated: response.success, error: null})
    },

    logout: async ()=> {
        set({
            user: null,
            isAuthenticated: false,
            error: null,
            isLoading: false
        })
    }
}))