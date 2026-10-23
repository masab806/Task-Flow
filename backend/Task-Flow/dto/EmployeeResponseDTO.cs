using System;

namespace task_flow.dto;

public class EmployeeResponseDTO
{
    public int EmployeeId {get; set;}
    public string FullName {get; set;} = string.Empty;
    public string WorkEmail {get; set;} = string.Empty;
    public string Role {get; set;} = string.Empty;
    public string OrganizationName {get; set;} = string.Empty;
    public string CompanyRole {get; set;} = string.Empty;
}
