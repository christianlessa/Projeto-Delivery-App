import React, { useContext, useEffect } from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import AppContext from '../context/AppContext';

function NavbarComponent() {
  const { currentUser, setCurrentUser } = useContext(AppContext);
  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) setCurrentUser(user.name);
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
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand
          data-testid="customer_products__element-navbar-link-products"
          type="button"
          onClick={ btnProducts }
        >
          Produtos
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-auto">
            <Nav.Link
              data-testid="customer_products__element-navbar-link-orders"
              onClick={ btnOrders }
            >
              Meus Pedidos
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link
              data-testid="customer_products__element-navbar-user-full-name"
              type="btn right"
              className="btn-right"
            >
              { currentUser }
            </Nav.Link>
            <Button
              data-testid="customer_products__element-navbar-link-logout"
              type="btn right"
              onClick={ btnLogout }
              variant="outline-success"
            >
              Sair
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
