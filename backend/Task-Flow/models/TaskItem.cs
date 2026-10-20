using System;

namespace task_flow.models;

public class TaskItem
{
    public int TaskItemId {get; set;}
    public string TaskTitle {get; set;} = string.Empty;
    public bool IsCompleted {get; set;} = false;
    public int TaskProgress {get; set;} = 0;
    public int ProjectId {get; set;}
    public int UserId {get; set;}
    public string Priority {get; set;} = "";
    public DateTime Due_date {get; set;}
    public string Description {get; set;}
    public Project Project {get; set;} = null;
}
