import api from "../lib/api/api";

const EmployeeService = {
    getAllEmployees: async ()=> {
        const res = await api.get("/api/Employee/GetAll")

        const responseData = res.data

        return responseData ?? [];
    }
}

export default EmployeeService;