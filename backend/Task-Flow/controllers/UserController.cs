using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace task_flow.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpPost]
        public IActionResult RegisterUser
    }
}
