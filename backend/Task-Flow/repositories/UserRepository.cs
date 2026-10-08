using System;
using Microsoft.EntityFrameworkCore;
using task_flow.data;
using task_flow.models;

namespace task_flow.repositories;

public class UserRepository : IUserRepository
{
    private readonly AppDbContext _context;
    private readonly DbSet<User> _dbSet;

    public UserRepository(AppDbContext context)
    {
        _context = context;
        _dbSet = context.Set<User>();
    }

    public async Task<User?> GetUserById(int userId)
    {
        return await _dbSet.FindAsync(userId);
    }

    public async Task<User?> GetUserByEmail(string email)
    {
        return await _dbSet.FirstOrDefaultAsync(u => u.Email.ToLower() == email.ToLower());
    }

    public async Task<bool> UserExistsByEmail(string email)
    {
        return await _dbSet.AnyAsync(u => u.Email.ToLower() == email.ToLower());
    }
}
