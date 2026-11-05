import api from "../lib/api/api";
import type { LoginData, LoginResponse } from "../lib/types";
import type { SignupPayload } from "../lib/AuthSchema";

const AuthService = {
    RegisterUser: async (data: SignupPayload): Promise<void> => {
        const endpoint = data.role === "employee"
            ? "/api/User/registerEmployee"
            : "/api/User/register";
        await api.post(endpoint, data)
    },

    LoginUser: async (data: LoginData): Promise<LoginResponse> => {
        const res = await api.post<LoginResponse>("/api/User/login", data)
        return res.data;
    },

    GenerateOTP: async (data: {email: string})=> {
        const res = await api.post("/api/User/otp", data)
        return res.data;
    }
}

export default AuthService