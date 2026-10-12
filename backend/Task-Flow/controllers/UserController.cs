
using Microsoft.AspNetCore.Mvc;
using task_flow.dto;
using task_flow.services;

namespace task_flow.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IAuthService _authService;

        public UserController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> RegisterFounder(
            [FromBody] FounderRegistrationDTO dto)
        {
            var result = await _authService.RegisterFounder(
                dto.Role,
                dto.WorkEmail,
                dto.FullName,
                dto.Password,
                dto.OrganizationName,
                dto.TeamSize,
                dto.CompanyDesignation
            );

            if (result.FounderId == 0)
            {
                return BadRequest(result);
            }

            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<ActionResult> LoginUser(
            [FromBody] UserLoginDTO dto)
        {
            var result = await _authService.LoginUser(
                dto.Email,
                dto.Password
            );

            if (!result.Success)
            {
                return Unauthorized(result);
            }

            return Ok(result);
        }
    }
}
