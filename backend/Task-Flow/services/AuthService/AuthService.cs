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

    public async Task<UserResponseDTO> RegisterFounder(string CompanyRole, string WorkEmail, string FullName, string Password, string OrganizationName, string Role, string TeamSize, string CompanyDesignation)
    {
        if(string.IsNullOrWhiteSpace(WorkEmail) || string.IsNullOrWhiteSpace(FullName) || string.IsNullOrWhiteSpace(Password))
        {
            return new UserResponseDTO
            {
                userId = 0,
                FullName = "",
                role = "",
                Message = "Invalid Credentials",
                Success = false,
            };
        }

        var exists = await _userRepository.UserExistsByEmail(WorkEmail);

        if (exists)
        {
             return new UserResponseDTO
            {
                userId = 0,
                FullName = "",
                role = "",
                Message = "Invalid Credentials",
                Success = false,
            };
        }
        

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(Password);

        var newFounder = new Founder
        {
            WorkEmail = WorkEmail,
            FullName = FullName,
            CompanyDesignation = CompanyDesignation,
            CompanyRole = CompanyRole,
            OrganizationName = OrganizationName,
            TeamSize = TeamSize,
            Password = hashedPassword
        };

        return new UserResponseDTO
        {
            userId = newFounder.id,
            FullName = newFounder.FullName
        };

    }

}
