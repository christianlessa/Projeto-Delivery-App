import React, { useContext, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

function NavbarComponent() {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setCurrentUser(user.user.name);
  }, [currentUser, setCurrentUser]);

  const btnProducts = () => {
    history.push('/customer/products');
  };

  const btnOrders = () => {
    history.push('/customer/orders');
  };

  const btnLogout = async () => {
    localStorage.removeItem('user');
    history.push('/');
  };

  return (
    <Container className="navbar-container">
      <Container className="navbar-left">
        <Button
          data-testid="customer_products__element-navbar-link-products"
          type="button"
          onClick={ btnProducts }
        >
          Produtos
        </Button>
        <Button
          data-testid="customer_products__element-navbar-link-orders"
          type="button"
          onClick={ btnOrders }
        >
          Meus Pedidos
        </Button>
      </Container>

      <Container className="navbar-left">
        <Button
          data-testid="customer_products__element-navbar-user-full-name"
          type="btn right"
          className="btn-right"
        >
          { currentUser }
        </Button>
        <Button
          data-testid="customer_products__element-navbar-link-logout"
          type="btn right"
          onClick={ btnLogout }
        >
          Sair
        </Button>
      </Container>
    </Container>
  );
}

export default NavbarComponent;
