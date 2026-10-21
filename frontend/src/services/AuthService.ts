import api from "../lib/api/api";
import type { LoginData } from "../lib/types";

const AuthService = {
    RegisterUser: async (data) => {
        const res = await api.post("/api/User/register", data)

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