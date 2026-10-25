using System;

namespace task_flow.dto;

public class ProjectCreationDTO
{
    public string projectTitle {get; set;} = string.Empty;
    public string Description {get; set;} = string.Empty;
    public int ProjectLeadId {get; set;} = 0;
    public string Status {get; set;} = string.Empty;
    public DateTime Due_Date {get; set;}

}
