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
  fullName?: string,
  role?: string,
  companyRole?: string,
  organizationName?: string,
}

export type LoginResponse = {
  userId: number
  workEmail: string
  fullName: string
  role: string
  companyRole?: string
  success: boolean
  token: string
  message: string
}

export type Project = {
  projectId: number
  projectTitle: string
  description: string
  projectProgress: number
  status: string
  projectTasks?: unknown[]
  due_date: string
}

export type Employee = {
  id: number
  fullName: string
  workEmail?: string
  companyRole?: string
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
