import api from "../lib/api/api";
import type { ProjectCreationType } from "../lib/ProjectSchema";
import type { Project } from "../lib/types";

const ProjectService = {
    getAllProjects: async (): Promise<Project[]> => {
        const res = await api.get<Project[]>("/api/Project/getProjects")
        return res.data ?? [];
    },

    createProject: async (data: ProjectCreationType): Promise<Project> => {
        const res = await api.post<Project>("/api/Project/create", data)
        return res.data;
    },

    assignEmployee: async (employeeIds: number[]) => {
        const res = await api.post("/api/Project/assign", employeeIds);
        return res.data
    }
}

export default ProjectService;