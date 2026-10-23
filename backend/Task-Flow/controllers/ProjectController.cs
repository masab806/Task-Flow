using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using task_flow.models;
using task_flow.services.ProjectService;

namespace task_flow.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        [HttpGet("getProjects")]
        public async Task<ActionResult<IEnumerable<Project>>> GetAllProjects()
        {
            var result = await _projectService.GetAllProjects();

            return Ok(result);
        }
    }
}
