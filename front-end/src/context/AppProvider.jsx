import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState('');
  const [productItens, setProductItens] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const globalState = useMemo(() => ({
    currentUser,
    setCurrentUser,
    productItens,
    setProductItens,
    allProducts,
    setAllProducts,
    cart,
    setCart,
    totalPrice,
    setTotalPrice,
  }), [currentUser, productItens, allProducts, cart, totalPrice]);

  return (
    <AppContext.Provider value={ globalState }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
