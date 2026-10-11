using System;

namespace task_flow.models;

public class Organization
{
    public int id {get; set;}
    public string OrganizationName {get; set;} = string.Empty;
    public string TeamSize {get; set;} = string.Empty;
}
