using System;
using System.Formats.Asn1;
using Microsoft.EntityFrameworkCore;
using task_flow.data;
using task_flow.models;

namespace task_flow.repositories.TaskRepository;

public class TaskRepository : ITaskRepository
{
    private readonly AppDbContext _context;
    private readonly DbSet<TaskItem> _dbSet;

    public TaskRepository(AppDbContext context)
    {
        _context = context;
        _dbSet = context.Set<TaskItem>();
    }

    public async Task<IEnumerable<TaskItem>> GetTasksByProjectId(int projectId)
    {
        return await _dbSet.AsNoTracking().Where(t => t.ProjectId == projectId).ToListAsync();
    }

    public async Task<IEnumerable<TaskItem>> GetAllTasks()
    {
        return await _dbSet.AsNoTracking().ToListAsync();
    }

    public async Task<TaskItem> CreateTask(TaskItem task)
    {
        _dbSet.Add(task);
        await _context.SaveChangesAsync();
        return task;
    }

    public async Task<TaskItem> GetTaskById(int TaskItemId)
    {
        return await _dbSet.FirstOrDefaultAsync(t => t.TaskItemId == TaskItemId);
    }

    public async Task<bool> DeleteTaskById(int TaskItemId)
    {
        var taskItem = await _dbSet.FindAsync(TaskItemId);

        if(taskItem != null)
        {
            _dbSet.Remove(taskItem);
            return true;
        };

        return false;
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
