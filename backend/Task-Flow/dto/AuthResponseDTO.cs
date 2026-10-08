using System;

namespace task_flow.dto;

public class AuthResponseDTO
{
    public string Message {get; set;} = "";
    public bool Success {get; set;} = false;
    public string Token {get; set;} = "";
    public UserResponseDTO? User {get; set;}
}
