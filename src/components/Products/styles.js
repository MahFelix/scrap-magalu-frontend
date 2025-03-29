// styles.js
import styled, { keyframes, css } from 'styled-components';
import { FiRefreshCw, FiExternalLink, FiAlertCircle, FiLogOut } from 'react-icons/fi';

// Animations
export const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Layout Components
export const AppContainer = styled.div`
  font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
  background-color: #98c8f8;
  min-height: 100vh;
  padding: 2rem;
`;

export const Header = styled.header`
  max-width: 1200px;
  margin: 0 auto 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #e0e0e0;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
  color: #2c3e50;
  margin: 0;
  display: flex;
  align-items: center;
  
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 32px;
    background-color: #3498db;
    margin-right: 12px;
    border-radius: 4px;
  }
`;

// Button Components
export const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.75rem 1.5rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.2);
  
  &:hover {
    background-color: #2980b9;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    ${props => props.$loading && css`animation: ${spin} 1s linear infinite;`}
  }
`;

export const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0.75rem 1.5rem;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: 1rem;
  
  &:hover {
    background-color: #c0392b;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

// Product Components
export const ProductGrid = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
`;

export const ProductCard = styled.article`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  display: flex;
  flex-direction: column;
  
  &:hover {
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-4px);
  }
`;

export const ProductContent = styled.div`
  padding: 1.25rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

export const ProductTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  color: #34495e;
  margin: 0 0 0.75rem;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ProductPrice = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
`;

export const ProductLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  padding: 0.5rem 1rem;
  background-color: #f5f7fa;
  color: #3498db;
  text-decoration: none;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: #e1f0fa;
  }
`;

// State Components
export const LoadingState = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

export const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid rgba(52, 152, 219, 0.2);
  border-top-color: #3498db;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const ErrorState = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1.5rem;
  background-color: #fef2f2;
  border-radius: 8px;
  border-left: 4px solid #ef4444;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const EmptyState = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
`;

// Exporting icons for easy import
export const Icons = {
  FiRefreshCw,
  FiExternalLink,
  FiAlertCircle,
  FiLogOut
};