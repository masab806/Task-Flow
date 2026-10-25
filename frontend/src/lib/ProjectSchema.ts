import { z } from "zod";

export const ProjectCreationSchema = z.object({
  projectTitle: z.string().min(1, "Project Title Is Required!"),
  description: z.string().optional(),
  ProjectLeadId: z.coerce.number().min(1, "Please select a project lead"),
  Status: z.string().min(1, "Status Is Required!"),
  ProjectProgress: z.coerce.number().min(0).max(100),
  DueDate: z.string().min(1, "Due date is required"),
});

export type ProjectCreationInput = z.input<typeof ProjectCreationSchema>;
export type ProjectCreationType = z.output<typeof ProjectCreationSchema>;