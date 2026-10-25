using System;

namespace task_flow.models;

public class Project
{
    public int ProjectId {get; set;}
    public string ProjectTitle {get; set;} = string.Empty;
    public string Description {get; set;} = string.Empty;
    public int ProjectProgress {get; set;} = 0;
    public string Status {get; set;} = string.Empty;
    public ICollection<TaskItem> ProjectTasks {get; set;} = new List<TaskItem>();
    public DateTime Due_date {get; set;}
    public int ProjectLeadId {get; set;}
    public ICollection<Employee> assignedEmployees {get; set;}
    public DateTimeOffset CreatedAt {get; set;} = DateTime.UtcNow;
}
