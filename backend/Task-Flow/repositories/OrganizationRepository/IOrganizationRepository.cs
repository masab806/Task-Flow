using System;
using task_flow.models;

namespace task_flow.repositories.OrganizationRepository;

public interface IOrganizationRepository
{
    public Task<ICollection<Organization?>> GetAllOrganizations();
    public Task<Organization?> GetOrganizationById(int organizationId);
    public Task<Organization?> GetOrganizationByName(string organizationName);
    public Task<bool?> OrganizationExistsByName(string organizationName);
    public Task<Organization> AddOrganization(Organization organization);
    Task SaveChangesAsync();
}
