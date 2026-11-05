using System;

namespace task_flow.dto;

public class ResetPasswordDTO
{
    public string WorkEmail {get; set;} = string.Empty;
    public string OTP {get; set;}
    public string Password {get; set;} = string.Empty;
}
