using System;

namespace task_flow.dto;

public class UserLoginDTO
{
    public string Email {get; set;} = "";
    public string Password {get; set;} = "";
    public string OrganizationName {get; set;} = "";
}
