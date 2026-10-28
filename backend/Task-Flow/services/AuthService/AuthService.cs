using System;
using System.Diagnostics;
using StackExchange.Redis;
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
    private readonly IDatabase _redis;

    public AuthService(IFounderRepository founderRepository, IOrganizationRepository organizationRepository, IEmployeeRepository employeeRepository, JwtUtil jwtUtil, IConnectionMultiplexer redis)
    {
        _founderRepository = founderRepository;
        _organizationRepository = organizationRepository;
        _employeeRepository = employeeRepository;
        _jwtUtil = jwtUtil;
        _redis = redis.GetDatabase();
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

    public async Task<EmployeeResponseDTO> RegisterEmployee(string FullName, string WorkEmail, string Role, string OrganizationName, string CompanyRole, string Password)
    {
        if(string.IsNullOrWhiteSpace(FullName) || string.IsNullOrEmpty(WorkEmail) || string.IsNullOrWhiteSpace(Role) || string.IsNullOrWhiteSpace(OrganizationName) || string.IsNullOrWhiteSpace(CompanyRole) || string.IsNullOrWhiteSpace(Password))
        {
            throw new InvalidDataException("Invalid Fields!");
        };

        var organization = await _organizationRepository.GetOrganizationByName(OrganizationName);

        
        if(organization == null)
        {
            throw new InvalidOperationException("Organization Not Found");
        };

        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(Password);

        var newEmployee = new Employee
        {
          FullName = FullName,
          WorkEmail = WorkEmail,
          CompanyRole = CompanyRole,
          Password = hashedPassword,
          Role = string.IsNullOrWhiteSpace(Role) ? "Employee" : Role,
          Organization = organization,
        };

        await _employeeRepository.CreateEmployee(newEmployee);
        await _employeeRepository.SaveChangesAsync();

        if(newEmployee.id == 0)
        {
            return new EmployeeResponseDTO
            {
                EmployeeId = 0,
                WorkEmail = "",
                FullName = ""   
            };
        }


        return new EmployeeResponseDTO
        {
            EmployeeId = newEmployee.id,
            FullName = FullName,
            WorkEmail = WorkEmail,
            CompanyRole = CompanyRole,
            OrganizationName = organization.OrganizationName,
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
                CompanyRole = employee.CompanyRole,
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
