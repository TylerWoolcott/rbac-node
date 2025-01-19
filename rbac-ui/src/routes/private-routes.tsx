import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: React.ReactNode,
  roles: string[]
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, roles }) => {
  // const { user, isAuthenticated, isLoading } = useAuth()
  const isLoading = false;
  const isAuthenticated = false;
  const location = useLocation()
  if (isLoading) {
    return <div>Loading...</div>
  }
  if (!isAuthenticated) {
    return <Navigate to='/login' state={{ from: location }} replace />
  }
  if (roles && !roles.some(() => { })) {
    return <Navigate to='/unauthorized' replace />
  }
  return <>{children}</>
}
