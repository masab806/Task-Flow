using System;
using task_flow.dto;
using task_flow.models;
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
                Username = user.Username,
                Email = user.Email,
                
            }
        };
    }

    public async Task<UserResponseDTO> RegisterAsync(string username, string email, string password)
    {
        if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
        {
            return new UserResponseDTO
            {
                userId = 0,
                Username = "",
                Email = "",
                Message = "Invalid Credentials",
                Success = false
            };
        }

        var exists = await _userRepository.UserExistsByEmail(email);

        if (exists)
        {
            return new UserResponseDTO
            {
                userId = 0,
                Username = "",
                Email = "",
                Message = "User Already Exists!",
                Success = false
            };
        }

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(password);

        var newUser = new User
        {
            Email = email,
            Username = username,
            Password = hashedPassword
        };

        await _userRepository.AddAsync(newUser);

        await _userRepository.SaveChangesAsync();


        return new UserResponseDTO
        {
            userId = newUser.id,
            Email = newUser.Email,
            Username = newUser.Username,
        };
    }
}
