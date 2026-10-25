import api from "../lib/api/api";
import type { ProjectCreationType } from "../lib/ProjectSchema";

const ProjectService = {
    getAllProjects: async ()=> {
        const res = await api.get("/api/Project/getProjects")

        const responseData = res.data

        return responseData ?? [];
    },

    createProject: async (data: ProjectCreationType)=> {
        const res = await api.post("/api/Project/create", data)
        
        const responseData = res.data

        return responseData;
    }
}

export default ProjectService;