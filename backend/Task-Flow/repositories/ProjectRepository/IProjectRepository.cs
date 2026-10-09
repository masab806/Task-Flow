using System;
using task_flow.models;

namespace task_flow.repositories.ProjectRepository;

public interface IProjectRepository
{
    public Task<IEnumerable<Project?>> GetAllProjects();
    public Task<IEnumerable<Project?>> GetProjectById(int projectId);
    public Task<Project> CreateProject(Project project);
}
