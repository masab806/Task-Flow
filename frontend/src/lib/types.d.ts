export type SignupData = {
  name: string
  email: string
  password: string
  organizationName: string
  teamSize: string
  role: string
}

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

