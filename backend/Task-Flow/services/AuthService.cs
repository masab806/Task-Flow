using System;
using task_flow.dto;
using task_flow.repositories;

namespace task_flow.services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;

    public AuthService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }
    public async Task<AuthResponseDTO> LoginAsync(string email, string password)
    {

        if(string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
        {
            return new AuthResponseDTO
            {
                Message = "Invalid Credentials",
                Token = "",
                Success = false,   
            };
        }

        var exists = await _userRepository.UserExistsByEmail(email);

        if (!exists)
        {
            return new AuthResponseDTO
            {
                Message = "Invalid Credentials!",
                Token = "",
                Success = false,
            };
        }

        var user = await _userRepository.GetUserByEmail(email);

        var isMatch = BCrypt.Net.BCrypt.Verify(password, user.Password);

        if (!isMatch)
        {
            return new AuthResponseDTO
            {
                Success = false,
                Message = "Invalid Credentials!",
                Token = "",
            };
        }

        // TODO: Implement JWT Token

        return new AuthResponseDTO
        {
            Success = true,
            Message = "User Logged In!",
            Token = "abc",
            User = new UserResponseDTO
            {
                userId = user.id,
                Email = user.Email,
                
            }
        };
    }

    public async Task<string> RegisterAsync()
    {
        
    }
}
