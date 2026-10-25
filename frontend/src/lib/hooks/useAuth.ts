import { useMutation } from '@tanstack/react-query'
import AuthService from '../../services/AuthService'

export function useRegisterUser() {
  return useMutation({
    mutationFn: AuthService.RegisterUser,
  })
}

export function useLoginUser() {
  return useMutation({
    mutationFn: AuthService.LoginUser,
  })
}
