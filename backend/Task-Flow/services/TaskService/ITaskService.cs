using System;
using task_flow.models;

namespace task_flow.services.TaskService;

public interface ITaskService
{
    public Task<TaskItem> AssignTask(int projectId, string taskTitle, string description, int employeeId, string priority, DateTime due_date);
}
