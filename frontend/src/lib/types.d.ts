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

