using System;
using task_flow.models;

namespace task_flow.services.ProjectService;

public interface IProjectService
{
    public Task<IEnumerable<Project>> GetAllProjects();
}
