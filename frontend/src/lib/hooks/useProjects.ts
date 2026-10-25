import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { ProjectCreationType } from '../ProjectSchema'
import ProjectService from '../../services/ProjectService'

export const projectKeys = {
  all: ['projects'] as const,
}

export function useProjects() {
  return useQuery({
    queryKey: projectKeys.all,
    queryFn: ProjectService.getAllProjects,
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (project: ProjectCreationType) => ProjectService.createProject(project),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: projectKeys.all })
    },
  })
}

export function assignEmployees(){
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (employeeIds: number[]) => ProjectService.assignEmployee(employeeIds),
    onSuccess: async ()=> {
      await queryClient.invalidateQueries({queryKey: projectKeys.all})
    },
  })
}