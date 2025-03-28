import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FiLogIn, FiUserPlus, FiLock, FiMail, FiUser } from 'react-icons/fi';


// Container principal
const LoginContainer = styled.div`
  font-family: 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
  background-color: #98c8f8;
  min-height: 100vh;
 
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

// Card principal
const AuthCard = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  width: 1000px;
  min-height: 500px;
  display: flex;
  overflow: hidden;
  position: relative;
`;

// Painel (login ou registro)
const AuthPanel = styled.div`
  width: 50%;
  padding: 6rem;
  display: flex;
  flex-direction: column;
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
`;

// Overlay dinâmico
const SlidingOverlay = styled.div`
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

// Botão de alternar
const ToggleButton = styled.button`
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

// Título do painel
const PanelTitle = styled.h2`
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

// Grupo de formulário
const FormGroup = styled.div`
  margin-bottom: 1.5rem;
  position: relative;
`;

// Label do input
const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #34495e;
`;

// Input field
const InputField = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  
  svg {
    position: absolute;
    left: 12px;
    color: #7f8c8d;
  }
`;

// Input
const Input = styled.input`
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

// Botão de submit
const SubmitButton = styled.button`
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

// Link alternar
const ToggleLink = styled.p`
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


function LoginPage({ setIsAuthenticated }) {
  const [activePanel, setActivePanel] = useState('login');
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');

  // Form states
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Verificar autenticação ao carregar
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth) {
      navigate('/products');
    }
  }, [navigate]);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
    setLoginError('');
  };
  
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({
      ...prev,
      [name]: value
    }));
    setRegisterError('');
  };
  
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    
    // Credenciais de teste (remova em produção)
    const testCredentials = [
      { email: "admin@teste.com", password: "admin123" },
      { email: "usuario@teste.com", password: "senha123" }
    ];
  
    // Verifica se é uma credencial válida
    const isValid = testCredentials.some(
      cred => cred.email === loginForm.email && cred.password === loginForm.password
    );
  
    if (isValid) {
      setIsAuthenticated(true); // Isso vai acionar o useEffect no App.js
      navigate('/products');
      return;
    }
  
    // Validação básica
    if (!loginForm.email || !loginForm.password) {
      setLoginError('Por favor, preencha todos os campos');
      return;
    }
  
    setLoginError('Credenciais inválidas');
  };
  
  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    
    // Validações
    if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      setRegisterError('Por favor, preencha todos os campos');
      return;
    }

    if (!validateEmail(registerForm.email)) {
      setRegisterError('Por favor, insira um email válido');
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterError('As senhas não coincidem');
      return;
    }

    if (registerForm.password.length < 6) {
      setRegisterError('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    // Simulação de registro
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userEmail', registerForm.email);
    navigate('/products');
  };
  
  const togglePanel = () => {
    setActivePanel(prev => prev === 'login' ? 'register' : 'login');
    setLoginError('');
    setRegisterError('');
  };

  return (
    <LoginContainer>
      <AuthCard>
        {/* Painel de Login */}
        <AuthPanel>
          <PanelTitle>
            <FiLogIn size={24} />
            Login
          </PanelTitle>
          
          {loginError && <p style={{color: 'red', marginBottom: '1rem'}}>{loginError}</p>}
          
          <form onSubmit={handleLoginSubmit}>
            <FormGroup>
              <InputLabel>Email</InputLabel>
              <InputField>
                <FiMail size={18} />
                <Input 
                  type="email" 
                  name="email" 
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  placeholder="seu@email.com"
                  required
                />
              </InputField>
            </FormGroup>
            
            <FormGroup>
              <InputLabel>Senha</InputLabel>
              <InputField>
                <FiLock size={18} />
                <Input 
                  type="password" 
                  name="password" 
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  placeholder="••••••••"
                  required
                />
              </InputField>
            </FormGroup>
            
            <SubmitButton type="submit">
              <FiLogIn size={18} />
              Entrar
            </SubmitButton>
          </form>
          
          <ToggleLink>
            Não tem uma conta? <span onClick={togglePanel}>Registre-se</span>
          </ToggleLink>
        </AuthPanel>
        
        {/* Painel de Registro */}
        <AuthPanel>
          <PanelTitle>
            <FiUserPlus size={24} />
            Registrar
          </PanelTitle>

          {registerError && <p style={{color: 'red', marginBottom: '1rem'}}>{registerError}</p>}
          
          <form onSubmit={handleRegisterSubmit}>
            <FormGroup>
              <InputLabel>Nome</InputLabel>
              <InputField>
                <FiUser size={18} />
                <Input 
                  type="text" 
                  name="name" 
                  value={registerForm.name}
                  onChange={handleRegisterChange}
                  placeholder="Seu nome completo"
                  required
                />
              </InputField>
            </FormGroup>
            
            <FormGroup>
              <InputLabel>Email</InputLabel>
              <InputField>
                <FiMail size={18} />
                <Input 
                  type="email" 
                  name="email" 
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  placeholder="seu@email.com"
                  required
                />
              </InputField>
            </FormGroup>
            
            <FormGroup>
              <InputLabel>Senha</InputLabel>
              <InputField>
                <FiLock size={18} />
                <Input 
                  type="password" 
                  name="password" 
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  placeholder="••••••••"
                  required
                />
              </InputField>
            </FormGroup>
            
            <FormGroup>
              <InputLabel>Confirme sua senha</InputLabel>
              <InputField>
                <FiLock size={18} />
                <Input 
                  type="password" 
                  name="confirmPassword" 
                  value={registerForm.confirmPassword}
                  onChange={handleRegisterChange}
                  placeholder="••••••••"
                  required
                />
              </InputField>
            </FormGroup>
            
            <SubmitButton type="submit">
              <FiUserPlus size={18} />
              Registrar
            </SubmitButton>
          </form>
          
          <ToggleLink>
            Já tem uma conta? <span onClick={togglePanel}>Faça login</span>
          </ToggleLink>
        </AuthPanel>
        
        {/* Overlay dinâmico */}
        <SlidingOverlay $activePanel={activePanel}>
          {activePanel === 'login' ? (
            <>
              <h2>Bem-vindo de volta!</h2>
              <p>Para manter-se conectado conosco, por favor faça login com suas informações pessoais</p>
              <ToggleButton onClick={togglePanel}>
                <FiUserPlus size={18} />
                Login
              </ToggleButton>
            </>
          ) : (
            <>
              <h2>Olá, amigo!</h2>
              <p>Entre com seus dados pessoais e comece sua jornada conosco</p>
              <ToggleButton onClick={togglePanel}>
                <FiLogIn size={18} />
                Registrar
              </ToggleButton>
            </>
          )}
        </SlidingOverlay>
      </AuthCard>
    </LoginContainer>
  );
}

export default LoginPage;