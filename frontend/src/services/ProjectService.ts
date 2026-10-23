import api from "../lib/api/api";

const ProjectService = {
    getAllProjects: async ()=> {
        const res = await api.get("/api/Project/getProjects")

        const responseData = res.data

        return responseData ?? [];
    }
}

export default ProjectService;