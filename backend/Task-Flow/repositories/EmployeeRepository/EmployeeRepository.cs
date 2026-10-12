using System;
using Microsoft.EntityFrameworkCore;
using task_flow.data;
using task_flow.models;

namespace task_flow.repositories.EmployeeRepository;

public class EmployeeRepository : IEmployeeRepository
{
    private readonly AppDbContext _context;
    private readonly DbSet<Employee> _dbSet;

    public EmployeeRepository(AppDbContext context)
    {
        _context = context;
        _dbSet = context.Set<Employee>();
    }

    public async Task<bool?> EmployeeExistsByMail(string EmployeeMail)
    {
        return await _dbSet.AnyAsync(e => e.WorkEmail == EmployeeMail);
    }

    public async Task<Employee> GetEmployeeByEmail(string EmployeeMail)
    {
        return await _dbSet.FirstOrDefaultAsync(e => e.WorkEmail == EmployeeMail);
    }
}
