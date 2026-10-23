import api from "../lib/api/api";
import type { LoginData } from "../lib/types";
import type { SignupPayload } from "../lib/AuthSchema";

const AuthService = {
    RegisterUser: async (data: SignupPayload) => {
        const endpoint = data.role === "employee"
            ? "/api/User/registerEmployee"
            : "/api/User/register";
        const res = await api.post(endpoint, data)

        const responseData = res.data

        return responseData;
    },

    LoginUser: async (data: LoginData) => {
        const res = await api.post("/api/User/login", data)

        const responseData = res.data

        return responseData;
    }
}

export default AuthService