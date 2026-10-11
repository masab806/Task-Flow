using System;

namespace task_flow.models;

public class Founder
{
    public int id { get; set; }
    public string WorkEmail { get; set; } = string.Empty;
    public string FullName { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string CompanyRole { get; set; } = string.Empty;
    public string OrganizationName { get; set; } = string.Empty;
    public string CompanyDesignation { get; set; } = string.Empty;
    public string TeamSize {get; set;} = string.Empty;
}
