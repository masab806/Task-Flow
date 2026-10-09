using System;

namespace task_flow.models;

public class User
{
    public int id {get; set;}
    public string Email {get; set;}
    public string Username {get; set;}
    public string Password {get; set;}
    public string role {get; set;}
    public ICollection<TaskItem?> TasksList {get; set;} = null;
    public ICollection<Project?> ProjectList {get; set;} = null;
    public DateTimeOffset created_at {get; set;} = DateTime.UtcNow;
}
