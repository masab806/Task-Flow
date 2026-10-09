using Microsoft.AspNetCore.Http;
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
        public async Task<ActionResult> RegisterUser([FromBody] UserRegistrationDTO dto)
        {
            var result = await _authService.RegisterAsync(
                dto.Username,
                dto.Email,
                dto.Password,
                dto.Role
            );

            if (!result.Success)
            {
                return BadRequest(result);
            };

            return Ok(result);
        }

        [HttpPost("login")]
        public async Task<ActionResult> LoginUser([FromBody] UserLoginDTO dto)
        {
            var result = await _authService.LoginAsync(
                dto.Email,
                dto.Password
            );

            if(!result.Success)
            {
                return BadRequest(result);
            };

            return Ok(result);
        }
    };    
}
