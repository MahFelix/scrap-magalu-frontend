import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import ProductsPage from './components/ProductsPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
   
    return localStorage.getItem('isAuthenticated') === 'true';
  });


  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('isAuthenticated', 'true');
    } else {
      localStorage.removeItem('isAuthenticated');
    }
  }, [isAuthenticated]);

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? (
              <Navigate to="/products" replace />
            ) : (
              <LoginPage setIsAuthenticated={setIsAuthenticated} />
            )
          } 
        />
        <Route 
          path="/products" 
          element={
            isAuthenticated ? (
              <ProductsPage setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/" replace />
            )
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;