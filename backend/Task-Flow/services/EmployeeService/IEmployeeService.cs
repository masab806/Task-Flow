using System;
using task_flow.models;

namespace task_flow.services.EmployeeService;

public interface IEmployeeService
{
    public Task<ICollection<Employee>> GetAllEmployees();
}
