import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children, isAuthenticated }) => {
  const location = useLocation();
  
  if (!isAuthenticated) {
    // Redireciona para o login, guardando a localização atual
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default PrivateRoute;