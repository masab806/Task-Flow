using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using task_flow.models;
using task_flow.services.OrganizationService;

namespace task_flow.controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrganizationController : ControllerBase
    {
        private readonly IOrganizationService _organizationService;

        public OrganizationController(IOrganizationService organizationService)
        {
            _organizationService = organizationService;
        }

        public async Task<ActionResult<IEnumerable<Organization>>> GetAllOrganizations()
        {
            var result = await _organizationService.GetAllOrganizations();
            
            return Ok(result);
        }
    }
}
