using System;
using System.Threading.Tasks;
using task_flow.models;

namespace task_flow.repositories;

public interface IFounderRepository
{
    Task<Founder?> GetFounderById(int founderId);
    Task<bool> FounderExistsByEmail(string email);
    Task<Founder?> GetFounderByEmail(string email);
    Task<Founder?> AddAsync(Founder founder);
    Task SaveChangesAsync();
}
