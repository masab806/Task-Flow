import React from 'react'
import { useAuthStore } from '../stores/AuthStore'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
  const {isAuthenticated, isLoading} = useAuthStore()

  if(isLoading) return <div>Loading...</div>

  return isAuthenticated ? <Outlet/> : <Navigate to="/"/>
 
}

export default ProtectedRoutes