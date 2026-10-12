using System;
using System.Collections;
using Microsoft.EntityFrameworkCore;
using task_flow.data;
using task_flow.models;

namespace task_flow.repositories.OrganizationRepository;

public class OrganizationRepository : IOrganizationRepository
{
    private readonly AppDbContext _context;
    private readonly DbSet<Organization> _dbSet;

    public OrganizationRepository(AppDbContext context)
    {
        _context = context;
        _dbSet = context.Set<Organization>();
    }

    public async Task<bool?> OrganizationExistsByName(string organizationName)
    {
        return await _dbSet.AnyAsync(o => o.OrganizationName == organizationName);
    }

    public async Task<Organization> GetOrganizationById(int organizationId)
    {
        return await _dbSet.FindAsync(organizationId);
    }

    public async Task<Organization> GetOrganizationByName(string organizationName)
    {
        return await _dbSet.FirstOrDefaultAsync(o => o.OrganizationName == organizationName);
    }

    public async Task<ICollection<Organization>> GetAllOrganizations()
    {
        return await _dbSet.AsNoTracking().ToListAsync();
    }
    
    public async Task<Organization> AddOrganization(Organization organization)
    {
        var entry = await _dbSet.AddAsync(organization);
        return entry.Entity;
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
