using System;
using task_flow.models;

namespace task_flow.services.OrganizationService;

public interface IOrganizationService
{
    public Task<IEnumerable<Organization>> GetAllOrganizations();
}
