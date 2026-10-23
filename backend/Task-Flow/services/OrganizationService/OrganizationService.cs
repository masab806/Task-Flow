using System;
using task_flow.models;
using task_flow.repositories.OrganizationRepository;

namespace task_flow.services.OrganizationService;

public class OrganizationService : IOrganizationService
{
    private readonly IOrganizationRepository _organizationRepository;

    public OrganizationService(IOrganizationRepository organizationRepository)
    {
        _organizationRepository = organizationRepository;
    }

    public async Task<IEnumerable<Organization>> GetAllOrganizations()
    {
        return await _organizationRepository.GetAllOrganizations();
    }
}
