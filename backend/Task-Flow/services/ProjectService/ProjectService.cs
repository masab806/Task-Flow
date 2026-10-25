using System;
using task_flow.models;
using task_flow.repositories.EmployeeRepository;
using task_flow.repositories.ProjectRepository;

namespace task_flow.services.ProjectService;

public class ProjectService : IProjectService
{
    private readonly IProjectRepository _projectRepository;
    private readonly IEmployeeRepository _employeeRepository;

    public ProjectService(IProjectRepository projectRepository, IEmployeeRepository employeeRepository)
    {
        _projectRepository = projectRepository;
        _employeeRepository = employeeRepository;
    }

    public async Task<IEnumerable<Project>> GetAllProjects()
    {
        return await _projectRepository.GetAllProjects();
    }

    public async Task<Project> CreateProject(
    string projectTitle,
    string description,
    int projectLeadId,
    string status,
    DateTime due_date)
    {
        var employee = await _employeeRepository.GetEmployeeById(projectLeadId);

        if (employee == null)
        {
            throw new InvalidOperationException("Project lead not found.");
        }

        if (string.IsNullOrWhiteSpace(projectTitle))
        {
            throw new ArgumentException("Project title is required.");
        }

        if (string.IsNullOrWhiteSpace(description))
        {
            throw new ArgumentException("Project description is required.");
        }

        if (string.IsNullOrWhiteSpace(status))
        {
            throw new ArgumentException("Project status is required.");
        }

        var project = new Project
        {
            ProjectTitle = projectTitle,
            Description = description,
            ProjectLeadId = projectLeadId,
            Status = status,
            Due_date = due_date,
            ProjectProgress = 0,
            CreatedAt = DateTimeOffset.UtcNow
        };

        await _projectRepository.CreateProject(project);
        await _projectRepository.SaveChangesAsync();

        return project;
    }

    public async Task<ICollection<Employee>> AssignEmployees(int projectId, int[] employeeIds)
    {
        if(employeeIds == null || employeeIds.Length == 0)
        {
            throw new InvalidDataException("No Employees.");
        };

        var allEmployees = await _employeeRepository.FetchEmployeeByIds(employeeIds);

        if(allEmployees == null || allEmployees.Count == 0)
        {
            throw new InvalidDataException("Employees Not Found!");
        };

        var project = await _projectRepository.GetProjectById(projectId);

        if (project == null)
        {
            throw new InvalidDataException("Project Not Found!");
        }

        foreach (var employee in allEmployees)
        {
            project.assignedEmployees.Add(employee);
        }

        await _projectRepository.SaveChangesAsync();

        return project.assignedEmployees;
    }

}
