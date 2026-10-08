using System;

namespace task_flow.models;

public class User
{
    public int id {get; set;}
    public string Email {get; set;}
    public string Password {get; set;}
    public DateTimeOffset created_at {get; set;} = DateTime.UtcNow;
}
