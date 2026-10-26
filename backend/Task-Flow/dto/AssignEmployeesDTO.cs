using System;

namespace task_flow.dto;

public class AssignEmployeesDTO
{
    public int ProjectId { get; set; }
    public int[] EmployeeIds { get; set; } = [];

}
