using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using task_flow.dto;
using task_flow.services.TaskService;

namespace task_flow.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TaskController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        [HttpPost("/assign")]
        public async Task<ActionResult> CreateTask([FromBody] TaskCreationDTO dto)
        {
            var result = await _taskService.AssignTask(
                projectId: dto.ProjectId,
                taskTitle: dto.TaskTitle,
                description: dto.Description,
                due_date: dto.Due_date,
                employeeId: dto.EmployeeId,
                priority: dto.Priority
            );

            return Ok(result);
        }
    }
}
