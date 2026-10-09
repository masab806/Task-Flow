using System;
using Microsoft.EntityFrameworkCore;
using task_flow.data;
using task_flow.models;

namespace task_flow.repositories.ProjectRepository;

public class ProjectRepository : IProjectRepository
{
    private readonly AppDbContext _context;
    private readonly DbSet<Project> _dbSet;

    public ProjectRepository(AppDbContext context)
    {
        _context = context;
        _dbSet = context.Set<Project>();
    }

    public async Task<IEnumerable<Project>> GetAllProjects()
    {
        return await _dbSet.AsNoTracking().ToListAsync();
    }

    public async Task<IEnumerable<Project>> GetProjectById(int projectId)
    {
        return await _dbSet.Where(p => p.ProjectId == projectId).ToListAsync();
    }

    public async Task<Project> CreateProject(Project project)
    {
        _dbSet.Add(project);
        await _context.SaveChangesAsync();
        return project;
    }
}
