using System;
using System.Threading.Tasks;
using task_flow.models;

namespace task_flow.repositories;

public interface IUserRepository
{
    Task<User?> GetUserById(int id);
    Task<bool> UserExistsByEmail(string email);
    Task<User?> GetUserByEmail(string email);
}
