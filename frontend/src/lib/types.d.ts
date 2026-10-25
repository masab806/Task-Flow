export type FounderSignupData = {
  fullName: string
  workEmail: string
  password: string
  organizationName: string
  role: 'founder'
  teamSize: string
  companyDesignation: string
}

export type EmployeeSignupData = {
  fullName: string
  workEmail: string
  password: string
  organizationName: string
  role: 'employee'
}

export type SignupPayload = FounderSignupData | EmployeeSignupData

export type LoginData = {
  email: string,
  password: string
}

export type User = {
  id: string,
  email: string,
  name?: string,
  role?: string,
  organizationName: string,
}


export interface Task {
  id: string
  title: string
  tag: string
  tagColor: string
  due: string
  priority: string
  avatar: string
  avatarColor: string
}

export interface TaskColumn {
  id: string
  title: string
  color: string
  tasks: Task[]
}

export type AssignTaskType = {
  taskTitle: string,
  description: string,
  projectId: number,
  employeeId: number,
  due_date: string,
  priority: string,
}

export type ProjectCreationType = {
  projectTitle: string,
  description: string,
  ProjectLeadId: number,
  Status: string,
  Due_Date: string
}