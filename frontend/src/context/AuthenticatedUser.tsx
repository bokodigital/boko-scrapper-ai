import { Navigate } from 'react-router-dom'
import { useAuthStore } from './AuthStore';

const AuthenticatedUserRoute = ({ children }: any) => {
    const { isAuthenticated, user } = useAuthStore();
    if (isAuthenticated && user) {
      return <Navigate to="/dashboard" replace />;
    }
  
    return children;
  };


export default AuthenticatedUserRoute