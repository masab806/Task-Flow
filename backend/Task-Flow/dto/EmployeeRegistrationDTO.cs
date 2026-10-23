using System;

namespace task_flow.dto;

public class EmployeeRegistrationDTO
{
    public string FullName {get; set;} = string.Empty;
    public string WorkEmail {get; set;} = string.Empty;
    public string Role {get; set;} = string.Empty;
    public string OrganizationName {get; set;} = string.Empty;
    public string CompanyRole {get; set;} = string.Empty;
    public string Password {get; set;} = string.Empty;
}
