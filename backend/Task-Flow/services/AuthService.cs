using System;
using task_flow.dto;
using task_flow.models;
using task_flow.repositories;
using task_flow.utils;

namespace task_flow.services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly JwtUtil _jwtUtil;

    public AuthService(IUserRepository userRepository, JwtUtil jwtUtil)
    {
        _userRepository = userRepository;
        _jwtUtil = jwtUtil;
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

        var token = _jwtUtil.GenerateToken(user.id, email, password);

        return new AuthResponseDTO
        {
            Success = true,
            Message = "User Logged In!",
            Token = token.ToString(),
            User = new UserResponseDTO
            {
                userId = user.id,
                Username = user.Username,
                Email = user.Email,
                role = user.role,
            }
        };
    }

    public async Task<UserResponseDTO> RegisterAsync(string username, string email, string password, string role)
    {
        if (string.IsNullOrWhiteSpace(username) || string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password) || string.IsNullOrWhiteSpace(role))
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
            role = role,
            Password = hashedPassword
        };

        await _userRepository.AddAsync(newUser);

        await _userRepository.SaveChangesAsync();


        return new UserResponseDTO
        {
            userId = newUser.id,
            Email = newUser.Email,
            Username = newUser.Username,
            role = newUser.role,
            Success = true,
        };
    }
}
