import React from 'react'
import { useAuthStore } from '../stores/AuthStore'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoutes = () => {
  const {isAuthenticated, isLoading, user} = useAuthStore()

  if(isLoading) return <div>Loading...</div>

  if(isAuthenticated && user?.role == "supervisor"){
    return <Navigate to="/supervisor"/>
  }

  return isAuthenticated ? <Outlet/> : <Navigate to="/"/>
 
}

export default ProtectedRoutes