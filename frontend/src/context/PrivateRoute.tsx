import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from './AuthStore';

const PrivateRoute = ({ children }: any) => {
  const { isAuthenticated, isCheckingAuth, checkAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="flex items-center justify-center min-h-screen">
      <div className="spinner">Loading...</div>
    </div>
    )
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children
}



export default PrivateRoute