using System;

namespace task_flow.dto;

public class UserResponseDTO
{
    public int userId {get; set;}
    public string WorkEmail {get; set;} = "";
    public string FullName {get; set;} = "";
    public string Message {get; set;} = "";
    public string Role {get; set;}
    public bool Success {get; set;} = false;
    public string Token {get; set;} = "";
}
