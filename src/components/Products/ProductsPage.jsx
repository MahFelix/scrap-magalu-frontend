/* eslint-disable no-undef */
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiRefreshCw, FiExternalLink, FiAlertCircle, FiLogOut } from 'react-icons/fi';
import {
  AppContainer,
  Header,
  Title,
  RefreshButton,
  LogoutButton,
  ButtonGroup,
  ProductGrid,
  ProductCard,
  ProductContent,
  ProductTitle,
  ProductPrice,
  ProductLink,
  LoadingState,
  LoadingSpinner,
  ErrorState,
  EmptyState,
} from './styles';




function ProductsPage({ setIsAuthenticated }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const isAuth = localStorage.getItem('isAuthenticated') === 'true';
    if (!isAuth) {
      navigate('/');
    }
  }, [navigate]);


  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    navigate('/');
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError('Não foi possível carregar os produtos. Por favor, tente novamente.');
      console.error('Erro:', err);
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    setError(null);
    try {
      const response = await axios.post('http://localhost:5000/update-products');
      console.log('Atualização bem-sucedida:', response.data);
      
      setTimeout(fetchProducts, 1500);
    } catch (err) {
      console.error('Erro ao atualizar:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Erro ao atualizar os produtos');
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AppContainer>
      <Header>
        <Title>Produtos Magazine Luiza</Title>
        <ButtonGroup>
          <RefreshButton onClick={handleRefresh} $loading={isRefreshing}>
            <FiRefreshCw size={18} />
            {isRefreshing ? 'Atualizando...' : 'Atualizar Produtos'}
          </RefreshButton>
          <LogoutButton onClick={handleLogout}>
            <FiLogOut size={18} />
            Sair
          </LogoutButton>
        </ButtonGroup>
      </Header>

      {loading && !isRefreshing ? (
        <LoadingState>
          <LoadingSpinner />
          <p>Carregando catálogo de produtos...</p>
        </LoadingState>
      ) : error ? (
        <ErrorState>
          <FiAlertCircle size={24} color="#ef4444" />
          <div>
            <p style={{ fontWeight: 600, margin: '0 0 0.5rem' }}>{error}</p>
            <button 
              onClick={fetchProducts}
              style={{
                background: 'none',
                border: 'none',
                color: '#3498db',
                cursor: 'pointer',
                padding: 0,
                fontWeight: 500
              }}
            >
              Tentar novamente
            </button>
          </div>
        </ErrorState>
      ) : products.length > 0 ? (
        <ProductGrid>
          {products.map((product) => (
            <ProductCard key={product.id || product.url}>
              <ProductContent>
                <ProductTitle>{product.title || 'Produto sem nome'}</ProductTitle>
                <ProductPrice>
                  {product.price || 'Preço não disponível'}
                </ProductPrice>
                {product.url && (
                  <ProductLink 
                    href={product.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <FiExternalLink size={14} />
                    Ver no site
                  </ProductLink>
                )}
              </ProductContent>
            </ProductCard>
          ))}
        </ProductGrid>
      ) : (
        <EmptyState>
          <h3 style={{ margin: '0 0 1rem' }}>Nenhum produto encontrado</h3>
          <p style={{ color: '#64748b', margin: 0 }}>Tente atualizar a lista de produtos</p>
        </EmptyState>
      )}
    </AppContainer>
  );
}

export default ProductsPage;