using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using task_flow.models;
using task_flow.services.EmployeeService;

namespace task_flow.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        
        public EmployeeController(IEmployeeService employeeService)
        {
            _employeeService = employeeService;
        }

        [HttpGet("GetAll")]
        public async Task<ActionResult<ICollection<Employee>>> GetAllEmployees()
        {
            var result = await _employeeService.GetAllEmployees();

            return Ok(result);
        }
    }
}
