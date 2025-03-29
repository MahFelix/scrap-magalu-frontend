// styles.js
import styled from 'styled-components';
import { FiLogIn, FiUserPlus, FiLock, FiMail, FiUser } from 'react-icons/fi';

export const LoginContainer = styled.div`
  font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
  background-color: #98c8f8;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const AuthCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 1000px;
  min-height: 500px;
  display: flex;
  overflow: hidden;
  position: relative;
`;

export const AuthPanel = styled.div`
  width: 50%;
  padding: 6rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
`;

export const SlidingOverlay = styled.div`
  position: absolute;
  top: 0;
  left: ${props => props.$activePanel === 'register' ? '50%' : '0'};
  width: 50%;
  height: 100%;
  background-color: #3498db;
  transition: all 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 2rem;
  text-align: center;
  
  h2 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    margin-left: -40px;
  }
  
  p {
    margin-bottom: 2rem;
    line-height: 1.6;
    margin-left: -50px;
  }
`;

export const ToggleButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: transparent;
  color: white;
  border: 2px solid white;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-left: -40px;
  
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

export const PanelTitle = styled.h2`
  font-size: 1.75rem;
  color: #2c3e50;
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  
  &::before {
    content: '';
    display: inline-block;
    width: 8px;
    height: 32px;
    background-color: #3498db;
    border-radius: 4px;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

export const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #34495e;
`;

export const InputField = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  svg {
    position: absolute;
    left: 12px;
    color: #7f8c8d;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 40px;
  border: 1px solid #e0e0e0;
  border-radius: 6px;
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.2);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  
  &:hover {
    background-color: #2980b9;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(52, 152, 219, 0.3);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const ToggleLink = styled.p`
  text-align: center;
  margin-top: 1.5rem;
  color: #7f8c8d;
  font-size: 0.875rem;
  
  span {
    color: #3498db;
    cursor: pointer;
    font-weight: 500;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

// Exportando os ícones para facilitar a importação
export const Icons = {
  FiLogIn,
  FiUserPlus,
  FiLock,
  FiMail,
  FiUser
};