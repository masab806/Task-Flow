using System;
using task_flow.dto;

namespace task_flow.services;

public interface IAuthService
{
    Task<FounderResponse> RegisterFounder(string CompanyRole, string WorkEmail, string FullName, string Password, string OrganizationName, string TeamSize, string CompanyDesignation);
    Task<EmployeeResponseDTO> RegisterEmployee(string FullName, string WorkEmail, string Role, string OrganizationName, string CompanyRole, string Password);
    Task<UserResponseDTO> LoginUser(string WorkEmail, string Password);
    // Task<ResetPasswordDTO> ResetPassword(string WorkEmail, int OTP, string Password);
    
}
