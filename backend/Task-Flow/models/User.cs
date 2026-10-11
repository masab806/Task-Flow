using System;

namespace task_flow.models;

public class User
{
    public int id {get; set;}
    public string WorkEmail {get; set;} = string.Empty;
    public string FullName {get; set;} = string.Empty;
    public string Password {get; set;} = string.Empty;
    public string Role {get; set;} = string.Empty;
    public string OrganizationName {get; set;} = string.Empty;
    public string CompanyRole {get; set;} = string.Empty;
    public ICollection<TaskItem?> TasksList {get; set;} = null;
    public ICollection<Project?> ProjectList {get; set;} = null;
    public DateTimeOffset created_at {get; set;} = DateTime.UtcNow;
}
