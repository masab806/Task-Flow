using System;
using task_flow.models;
using task_flow.repositories.EmployeeRepository;
using task_flow.repositories.ProjectRepository;
using task_flow.repositories.TaskRepository;

namespace task_flow.services.TaskService;

public class TaskService
{
    private readonly ITaskRepository _taskRepository;
    private readonly IProjectRepository _projectRepository;
    private readonly IEmployeeRepository _employeeRepository;

    public TaskService(ITaskRepository taskRepository, IProjectRepository projectRepository, IEmployeeRepository employeeRepository)
    {
        _taskRepository = taskRepository;
        _projectRepository = projectRepository;
        _employeeRepository = employeeRepository;
    }

    public async Task<TaskItem> AssignTask(int projectId, string taskTitle, string description, int employeeId, string priority, DateTime due_date)
    {
        var employee = await _employeeRepository.GetEmployeeById(employeeId);

        if(employee == null)
        {
            throw new InvalidOperationException("Employee not found.");
        }

        var project = await _projectRepository.GetProjectById(projectId);

        if(project == null)
        {
            throw new InvalidOperationException("Project Not Found.");
        };

        var TaskItem = new TaskItem
        {
            TaskTitle = taskTitle,
            Description = description,
            UserId = employeeId,
            ProjectId = projectId,
            Priority = priority,
            Due_date = due_date,
            TaskProgress = 0,
        };

        await _taskRepository.CreateTask(TaskItem);

        return TaskItem;

    }

}
