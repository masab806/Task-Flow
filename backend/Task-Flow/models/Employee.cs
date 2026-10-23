using System.Text.Json.Serialization;

namespace task_flow.models;

public class Employee
{
    public int id {get; set;}
    public string FullName {get; set;}
    public string WorkEmail {get; set;}
    public string CompanyRole {get; set;}
    [JsonIgnore]
    public string Password {get; set;}
    public string Role {get; set;}
    public Organization Organization {get; set;}
}
