import {create} from "zustand"
import AuthService from "../services/AuthService"
import type { User } from "../lib/types"

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

interface AuthActions {
    login: (credentials: Record<string, any>) => Promise<void>
    logout: ()=> void
}

type AuthStore = AuthState & AuthActions

export const AuthStore = create<AuthStore>((set)=> ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,

    login: async (credentals)=> {
        set({isLoading: true, error: null});
        try {
            const data = await AuthService.LoginUser(credentals)
            set({user: data.user, isAuthenticated: true})
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Login Failed";
            set({error: errorMessage})
        } finally {
            set({isLoading: false})
        }
    },

    logout: async ()=> {
        // Implement Logout
    }
}))