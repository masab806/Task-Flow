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
        return await _dbSet
            .Include(e => e.Organization)
            .FirstOrDefaultAsync(e => e.WorkEmail == EmployeeMail);
    }

    public async Task<Employee> GetEmployeeById(int employeeId)
    {
        return await _dbSet
            .Include(e => e.Organization)
            .FirstOrDefaultAsync(e => e.id == employeeId);
    }

    public async Task<ICollection<Employee>> GetAllEmployees()
    {
        return await _dbSet
            .Include(e => e.Organization)
            .ToListAsync();
    }
    
    public async Task<Employee> CreateEmployee(Employee employee)
    {
        var entry = await _dbSet.AddAsync(employee);
        return entry.Entity;

    }

    public async Task<ICollection<Employee>> FetchEmployeeByIds(int[] employeeIds)
    {
        var employees = await _dbSet.Where(e => employeeIds.Contains(e.id)).ToListAsync();
        return employees;
    }

    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}
