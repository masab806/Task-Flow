import { useMutation } from '@tanstack/react-query'
import taskService from '../../services/TaskService'

export function useAssignTask() {
  return useMutation({
    mutationFn: taskService.assignTask,
  })
}
