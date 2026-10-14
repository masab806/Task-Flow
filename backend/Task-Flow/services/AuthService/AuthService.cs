using System;
using task_flow.dto;
using task_flow.models;
using task_flow.repositories;
using task_flow.repositories.EmployeeRepository;
using task_flow.repositories.OrganizationRepository;
using task_flow.utils;

namespace task_flow.services;

public class AuthService : IAuthService
{
    private readonly IFounderRepository _founderRepository;
    private readonly IOrganizationRepository _organizationRepository;
    private readonly IEmployeeRepository _employeeRepository;
    private readonly JwtUtil _jwtUtil;

    public AuthService(IFounderRepository founderRepository, IOrganizationRepository organizationRepository, IEmployeeRepository employeeRepository, JwtUtil jwtUtil)
    {
        _founderRepository = founderRepository;
        _organizationRepository = organizationRepository;
        _employeeRepository = employeeRepository;
        _jwtUtil = jwtUtil;
    }

    public async Task<FounderResponse> RegisterFounder(string CompanyRole, string WorkEmail, string FullName, string Password, string OrganizationName, string TeamSize, string CompanyDesignation)
    {
        if (string.IsNullOrWhiteSpace(WorkEmail) || string.IsNullOrWhiteSpace(FullName) || string.IsNullOrWhiteSpace(Password))
        {
            return new FounderResponse
            {
                FounderId = 0,
                FullName = "",
                WorkEmail = "",
                OrganizationName = "",
                Message = "Incomplete Fields!"
            };
        }

        var exists = await _founderRepository.FounderExistsByEmail(WorkEmail);

        if (exists)
        {
            return new FounderResponse
            {
                FounderId = 0,
                FullName = "",
                WorkEmail = "",
                OrganizationName = "",
                Message = "Founder Exists!"
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

        if(newFounder == null)
        {
            return new FounderResponse
            {
                FounderId = 0,
                FullName = "",
                WorkEmail = "",
                OrganizationName = "",
                Message = "Founder Not Registered!"
            };
        }

        await _founderRepository.AddAsync(newFounder);
        await _founderRepository.SaveChangesAsync();

        var newOrganization = new Organization
        {
            OrganizationName = OrganizationName,
            TeamSize = TeamSize
        };

        if(newOrganization == null)
        {
            return new FounderResponse
            {
                Message = "Organization Not Created"
            };
        }

       await _organizationRepository.AddOrganization(newOrganization);
       await _organizationRepository.SaveChangesAsync();

        return new FounderResponse
        {
            FounderId = newFounder.id,
            FullName = newFounder.FullName,
            OrganizationName = newFounder.OrganizationName,
            WorkEmail = newFounder.WorkEmail,
        };
    }

    public async Task<UserResponseDTO> LoginUser(string WorkEmail, string Password)
    {
        if(string.IsNullOrWhiteSpace(WorkEmail) || string.IsNullOrWhiteSpace(Password))
        {
            return new UserResponseDTO
            {
                userId = 0,
                FullName = "",
                WorkEmail = "",
                Message = "Invalid Credentials",
                Role = "",
                Success = false
            };
        }

        var founder = await _founderRepository.GetFounderByEmail(WorkEmail);

        if(founder != null && BCrypt.Net.BCrypt.Verify(Password, founder.Password))
        {
            var token = _jwtUtil.GenerateToken(
                founder.id,
                founder.WorkEmail,
                "Founder"
            );

            return new UserResponseDTO
            {
                userId = founder.id,
                FullName = founder.FullName,
                WorkEmail = founder.WorkEmail,
                Message = "Message Successful",
                Role = "Founder",
                Success = true,
                Token = token.Token,
            };
        }

        var employee =  await _employeeRepository.GetEmployeeByEmail(WorkEmail);

        if(employee != null && BCrypt.Net.BCrypt.Verify(Password, employee.Password))
        {
            var token = _jwtUtil.GenerateToken(
                employee.id,
                employee.WorkEmail,
                "Employee"
            );

            return new UserResponseDTO
            {
                userId = employee.id,
                FullName = employee.FullName,
                WorkEmail = employee.WorkEmail,
                Message = "Login Successful",
                Role = "Employee",
                Success = true,
                Token = token.Token,
            };
        }

        return new UserResponseDTO
        {
            userId = 0,
            FullName = "",
            WorkEmail = "",
            Message = "Invalid Credentials",
            Success = false,
            Token = ""
        };
    }
}
