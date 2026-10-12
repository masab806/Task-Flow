using System;
using Microsoft.EntityFrameworkCore;
using task_flow.data;
using task_flow.models;

namespace task_flow.repositories;

public class FounderRepository : IFounderRepository
{
    private readonly AppDbContext _context;
    private readonly DbSet<Founder> _dbSet;

    public FounderRepository(AppDbContext context)
    {
        _context = context;
        _dbSet = context.Set<Founder>();
    }

    public async Task<Founder?> GetFounderById(int founderId)
    {
        return await _dbSet.FindAsync(founderId);
    }

    public async Task<Founder?> GetFounderByEmail(string email)
    {
        return await _dbSet.FirstOrDefaultAsync(u => u.WorkEmail.ToLower() == email.ToLower());
    }

    public async Task<bool> FounderExistsByEmail(string email)
    {
        return await _dbSet.AnyAsync(u => u.WorkEmail.ToLower() == email.ToLower());
    }

    public async Task<Founder?> AddAsync(Founder founder)
    {
        var entry = await _dbSet.AddAsync(founder);
        return entry.Entity;
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
