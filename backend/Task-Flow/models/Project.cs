using System;

namespace task_flow.models;

public class Project
{
    public int ProjectId {get; set;}
    public string ProjectTitle {get; set;} = string.Empty;
    public string ProjectProgress {get; set;} = string.Empty;
    public ICollection<TaskItem> ProjectTasks {get; set;} = new List<TaskItem>();
    public DateTimeOffset CreatedAt {get; set;} = DateTime.UtcNow;
}
