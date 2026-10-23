using System;
using task_flow.models;
using task_flow.repositories.ProjectRepository;

namespace task_flow.services.ProjectService;

public class ProjectService : IProjectService
{
    private readonly IProjectRepository _projectRepository;

    public ProjectService(IProjectRepository projectRepository)
    {
        _projectRepository = projectRepository;
    }

    public async Task<IEnumerable<Project>> GetAllProjects()
    {
        return await _projectRepository.GetAllProjects();
    }
}
