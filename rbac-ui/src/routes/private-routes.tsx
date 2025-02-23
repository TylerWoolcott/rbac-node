import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
  children: React.ReactNode,
  roles: string[]
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  const { isAuthenticated, isLoading } = useAuth()
  console.log("🚀 ~ isAuthenticated:", isAuthenticated)
  const location = useLocation()
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }
  if (roles && !roles.some((role) => {
    const currentUser = JSON.parse(localStorage.getItem('user') || '')
    return currentUser.user.role === role
  })) {
    return <Navigate to='/unauthorized' replace />
  }
  return <>{children}</>
}
