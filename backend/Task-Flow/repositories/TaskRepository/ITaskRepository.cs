using System;
using task_flow.models;

namespace task_flow.repositories.TaskRepository;

public interface ITaskRepository
{
    public Task<IEnumerable<TaskItem?>> GetTasksByProjectId(int projectId);
    public Task<IEnumerable<TaskItem?>> GetAllTasks();
    public Task<TaskItem?> CreateTask(TaskItem task);
    public Task<TaskItem> GetTaskById(int TaskItemId);
    public Task<bool> DeleteTaskById(int TaskItemId);
    Task SaveChangesAsync();
}
