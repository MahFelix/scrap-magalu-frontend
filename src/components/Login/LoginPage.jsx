/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { 
  LoginContainer,
  AuthCard,
  AuthPanel,
  SlidingOverlay,
  ToggleButton,
  PanelTitle,
  FormGroup,
  InputLabel,
  InputField,
  Input,
  SubmitButton,
  ToggleLink,
  Icons
} from './styles';

const api = axios.create({
  baseURL: 'http://localhost:8090/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

function LoginPage({ setIsAuthenticated }) {
  const [activePanel, setActivePanel] = useState('login');
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    if (!loginForm.email || !loginForm.password) {
      setLoginError('Por favor, preencha todos os campos');
      setIsLoading(false);
      return;
    }

    if (!validateEmail(loginForm.email)) {
      setLoginError('Por favor, insira um email válido');
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post('/login', {
        email: loginForm.email,
        password: loginForm.password
      });

      // Mostra a notificação primeiro
      toast.success('Logado com sucesso!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Espera a notificação ser exibida antes de redirecionar
      setTimeout(() => {
        setIsAuthenticated(true);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', loginForm.email);
        navigate('/products');
      }, 2000);

    } catch (error) {
      setIsLoading(false);
      let errorMessage = 'Erro ao conectar com o servidor';
      
      if (error.response) {
        errorMessage = error.response.data || 'Credenciais inválidas';
        setLoginError(errorMessage);
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!registerForm.name || !registerForm.email || !registerForm.password || !registerForm.confirmPassword) {
      setRegisterError('Por favor, preencha todos os campos');
      setIsLoading(false);
      return;
    }

    if (!validateEmail(registerForm.email)) {
      setRegisterError('Por favor, insira um email válido');
      setIsLoading(false);
      return;
    }

    if (registerForm.password !== registerForm.confirmPassword) {
      setRegisterError('As senhas não coincidem');
      setIsLoading(false);
      return;
    }

    if (registerForm.password.length < 6) {
      setRegisterError('A senha deve ter pelo menos 6 caracteres');
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post('/register', {
        name: registerForm.name,
        email: registerForm.email,
        password: registerForm.password,
        confirmPassword: registerForm.confirmPassword
      });

      // Mostra a notificação primeiro
      toast.success('Cadastro concluído com sucesso!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Muda para o painel de login após o cadastro
      setTimeout(() => {
        setRegisterForm({
          name: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
      }, 2000);

    } catch (error) {
      setIsLoading(false);
      let errorMessage = 'Erro ao conectar com o servidor';
      
      if (error.response) {
        errorMessage = error.response.data || 'Erro ao registrar usuário';
        setRegisterError(errorMessage);
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };
  
  const togglePanel = () => {
    setActivePanel(prev => prev === 'login' ? 'register' : 'login');
    setLoginError('');
    setRegisterError('');
  };

  return (
    <LoginContainer>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      
      <AuthCard>
        <AuthPanel>
          <PanelTitle>
            <Icons.FiLogIn size={24} />
            Login
          </PanelTitle>
          
          {loginError && <p style={{color: 'red', marginBottom: '1rem'}}>{loginError}</p>}
          
          <form onSubmit={handleLoginSubmit}>
            <FormGroup>
              <InputLabel>Email</InputLabel>
              <InputField>
                <Icons.FiMail size={18} />
                <Input 
                  type="email" 
                  name="email" 
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  placeholder="seu@email.com"
                  required
                  disabled={isLoading}
                />
              </InputField>
            </FormGroup>
            
            <FormGroup>
              <InputLabel>Senha</InputLabel>
              <InputField>
                <Icons.FiLock size={18} />
                <Input 
                  type="password" 
                  name="password" 
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </InputField>
            </FormGroup>
            
            <SubmitButton type="submit" disabled={isLoading}>
              {isLoading ? (
                'Carregando...'
              ) : (
                <>
                  <Icons.FiLogIn size={18} />
                  Entrar
                </>
              )}
            </SubmitButton>
          </form>
          
          <ToggleLink>
            Não tem uma conta? <span onClick={togglePanel}>Registre-se</span>
          </ToggleLink>
        </AuthPanel>
        
        <AuthPanel>
          <PanelTitle>
            <Icons.FiUserPlus size={24} />
            Registrar
          </PanelTitle>

          {registerError && <p style={{color: 'red', marginBottom: '1rem'}}>{registerError}</p>}
          
          <form onSubmit={handleRegisterSubmit}>
            <FormGroup>
              <InputLabel>Nome</InputLabel>
              <InputField>
                <Icons.FiUser size={18} />
                <Input 
                  type="text" 
                  name="name" 
                  value={registerForm.name}
                  onChange={handleRegisterChange}
                  placeholder="Seu nome completo"
                  required
                  disabled={isLoading}
                />
              </InputField>
            </FormGroup>
            
            <FormGroup>
              <InputLabel>Email</InputLabel>
              <InputField>
                <Icons.FiMail size={18} />
                <Input 
                  type="email" 
                  name="email" 
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  placeholder="seu@email.com"
                  required
                  disabled={isLoading}
                />
              </InputField>
            </FormGroup>
            
            <FormGroup>
              <InputLabel>Senha</InputLabel>
              <InputField>
                <Icons.FiLock size={18} />
                <Input 
                  type="password" 
                  name="password" 
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </InputField>
            </FormGroup>
            
            <FormGroup>
              <InputLabel>Confirme sua senha</InputLabel>
              <InputField>
                <Icons.FiLock size={18} />
                <Input 
                  type="password" 
                  name="confirmPassword" 
                  value={registerForm.confirmPassword}
                  onChange={handleRegisterChange}
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </InputField>
            </FormGroup>
            
            <SubmitButton type="submit" >
        
                <>
                  <Icons.FiUserPlus size={18} />
                  Registrar
                </>
          
            </SubmitButton>
          </form>
          
          <ToggleLink>
            Já tem uma conta? <span onClick={togglePanel}>Faça login</span>
          </ToggleLink>
        </AuthPanel>
        
        <SlidingOverlay $activePanel={activePanel}>
          {activePanel === 'login' ? (
            <>
              <h2>Bem-vindo de volta!</h2>
              <p>Para manter-se conectado conosco, por favor faça login com suas informações pessoais</p>
              <ToggleButton onClick={togglePanel} disabled={isLoading}>
                <Icons.FiUserPlus size={18} />
                Login
              </ToggleButton>
            </>
          ) : (
            <>
              <h2>Olá, amigo!</h2>
              <p>Entre com seus dados pessoais e comece sua jornada conosco</p>
              <ToggleButton onClick={togglePanel} disabled={isLoading}>
                <Icons.FiLogIn size={18} />
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