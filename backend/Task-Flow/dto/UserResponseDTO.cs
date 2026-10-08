using System;

namespace task_flow.dto;

public class UserResponseDTO
{
    public int userId {get; set;}
    public string Email {get; set;} = "";
    public string Username {get; set;} = "";
    public string Message {get; set;} = "";
    public bool Success {get; set;} = false;
}
