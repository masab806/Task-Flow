import { useQuery } from '@tanstack/react-query'
import EmployeeService from '../../services/EmployeeService'

export const employeeKeys = {
  all: ['employees'] as const,
}

export function useEmployees() {
  return useQuery({
    queryKey: employeeKeys.all,
    queryFn: EmployeeService.getAllEmployees,
  })
}
