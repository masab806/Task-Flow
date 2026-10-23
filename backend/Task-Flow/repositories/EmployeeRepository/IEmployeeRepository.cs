using System;
using task_flow.models;

namespace task_flow.repositories.EmployeeRepository;

public interface IEmployeeRepository
{
    Task<ICollection<Employee>> GetAllEmployees();
    Task<bool?> EmployeeExistsByMail(string employeeMail);
    Task<Employee> GetEmployeeByEmail(string employeeMail);
    Task<Employee> GetEmployeeById(int employeeId);
    Task<Employee> CreateEmployee(Employee employee);
    Task SaveChangesAsync();
}
