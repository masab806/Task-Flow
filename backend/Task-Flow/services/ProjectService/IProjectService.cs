using System;
using task_flow.models;

namespace task_flow.services.ProjectService;

public interface IProjectService
{
    public Task<IEnumerable<Project>> GetAllProjects();
    public Task<Project> CreateProject(
    string projectTitle,
    string description,
    int projectLeadId,
    string status,
    DateTime due_date);
    public Task<ICollection<Employee>> AssignEmployees(int projectId, int[] employeeIds);
}
