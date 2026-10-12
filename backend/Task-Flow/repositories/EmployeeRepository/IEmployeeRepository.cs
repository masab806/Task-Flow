using System;
using task_flow.models;

namespace task_flow.repositories.EmployeeRepository;

public interface IEmployeeRepository
{
    Task<bool?> EmployeeExistsByMail(string employeeMail);
    Task<Employee> GetEmployeeByEmail(string employeeMail);
}
