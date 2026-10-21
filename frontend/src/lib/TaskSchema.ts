import { z } from "zod";

export const AssignTaskSchema = z.object({
  taskTitle: z.string().min(1, "Task Title Required!"),
  description: z.string().min(1, "Task Description Required!"),
  projectId: z.coerce.number().min(1, "Project Required!"),
  employeeId: z.coerce.number().min(1, "Employee Required!"),
  due_date: z.coerce.date(),
  priority: z.string().min(1, "Priority Required!")
});