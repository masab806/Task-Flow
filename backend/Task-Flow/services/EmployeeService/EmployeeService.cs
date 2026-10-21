using System;
using Microsoft.AspNetCore.Mvc;
using task_flow.models;
using task_flow.repositories.EmployeeRepository;

namespace task_flow.services.EmployeeService;

public class EmployeeService : IEmployeeService
{
    private readonly IEmployeeRepository _employeeRepository;

    public EmployeeService(IEmployeeRepository employeeRepository)
    {
        _employeeRepository = employeeRepository;
    }

    public async Task<ICollection<Employee>> GetAllEmployees()
    {
        return await _employeeRepository.GetAllEmployees();
    }
}
