import api from "../lib/api/api"
import type { AssignTaskType } from "../lib/types"

const taskService = {
    assignTask: async (data: AssignTaskType)=> {
        const res = await api.post("/api/Task/assign", data)

        const responseData = res.data

        return responseData
    }
}

export default taskService