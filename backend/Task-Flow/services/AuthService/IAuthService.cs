using System;
using task_flow.dto;

namespace task_flow.services;

public interface IAuthService
{
    Task<AuthResponseDTO> LoginAsync(string email, string password);
    Task<UserResponseDTO> RegisterAsync(string username, string email, string password, string role);
}
