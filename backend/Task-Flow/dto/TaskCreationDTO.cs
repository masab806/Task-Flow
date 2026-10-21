using System;

namespace task_flow.dto;

public class TaskCreationDTO
{
    public string TaskTitle {get; set;}
    public string Description {get; set;}
    public int ProjectId {get; set;}
    public int EmployeeId {get; set;}
    public DateTime Due_date {get; set;}
    public string Priority {get; set;}

}
