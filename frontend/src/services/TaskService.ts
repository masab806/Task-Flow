import api from "../lib/api/api"
import type { AssignTaskType } from "../lib/types"

const taskService = {
    assignTask: async (data: AssignTaskType): Promise<void> => {
        await api.post("/api/Task/assign", data)
    }
}

export default taskService