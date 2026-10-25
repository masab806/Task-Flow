import api from "../lib/api/api";
import type { Employee } from "../lib/types";

const EmployeeService = {
    getAllEmployees: async (): Promise<Employee[]> => {
        const res = await api.get<Employee[]>("/api/Employee/GetAll")
        return res.data ?? [];
    }
}

export default EmployeeService;