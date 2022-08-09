import React, { useContext, useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import NavbarComponent from '../components/NavbarComponent';
import AppContext from '../context/AppContext';
import deliveryAppAPI from '../services/deliveryAppAPI';
import ProductCard from '../components/ProductCard';

// Requisição API
const getAllProducts = async (setAllProducts, setCart) => {
  const productList = await deliveryAppAPI('getAllProducts');
  setAllProducts(productList.data);
  const getLocalStorage = JSON.parse(localStorage.getItem('cart'));

  if (!getLocalStorage) {
    const cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
  }
  if (getLocalStorage) {
    setCart(getLocalStorage);
  }
};

export default function ProductsPage({ history }) {
  const { allProducts, setAllProducts, setCart, totalPrice } = useContext(AppContext);
  const [btnStatus, setBtnStatus] = useState(true);

  useEffect(() => {
    getAllProducts(setAllProducts, setCart);
  }, [setAllProducts, setCart]);

  const toCheckoutPage = () => {
    history.push('/customer/checkout');
  };

  useEffect(() => {
    if (Number(totalPrice) > 0) {
      setBtnStatus(false);
    }
    setBtnStatus(true);
  }, [totalPrice]);

  return (
    <div>
      <NavbarComponent />
      <Container>
        <Button
          data-testid="customer_products__button-cart"
          type="button"
          disabled={ btnStatus }
          onClick={ toCheckoutPage }
        >
          PREÇO TOTAL:
          <span
            data-testid="customer_products__checkout-bottom-value"
          >
            {/* https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString */}
            { totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </span>
        </Button>
        { allProducts.map((product) => (
          <ProductCard key={ product.name } product={ product } />
        ))}
      </Container>
    </div>
  );
}

ProductsPage.propTypes = {
  history: PropTypes.object,
}.isRequired;
