import { useUserInfoQuery } from '@/redux/features/auth/auth.api'
import { type TRole } from '@/types'
import { type ComponentType } from 'react'
import { Navigate, useLocation } from 'react-router'

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const location = useLocation()
    const currentPath = location.pathname
    const { data, isLoading, isSuccess } = useUserInfoQuery(undefined)

    // Show loading state
    if (isLoading) {
      return (
        <div className="flex justify-center items-center min-h-screen">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )
    }

    if (isSuccess) {
      // Redirect if not authenticated
      if (!data?.data?.email && currentPath !== '/') {
        return <Navigate to="/" replace state={{ from: location }} />
      }

      const userRole = data?.data?.role
      const userDashboardPath = `/${userRole.toLowerCase()}/dashboard`

      // Check role permissions
      if (requiredRole && userRole !== requiredRole) {
        return <Navigate to="/unauthorized" replace />
      }

      // Redirect to dashboard if not already there (for non-specific routes)
      if (!requiredRole && currentPath !== userDashboardPath) {
        return <Navigate to={userDashboardPath} replace />
      }
    } else if (requiredRole) {
      return <Navigate to="/" replace state={{ from: location }} />
    }

    // Render the component if all checks pass
    return <Component />
  }
}
