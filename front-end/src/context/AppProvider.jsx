import React, { useState, useMemo, useEffect } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

export default function AppProvider({ children }) {
  const [currentUser, setCurrentUser] = useState('');
  const [productItems, setProductItems] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const newPrice = productItems.reduce((acc, curr) => (
      acc + Number(curr.quantity) * Number(curr.price)), 0);
    setTotalPrice(newPrice);
  }, [productItems]);

  const globalState = useMemo(() => ({
    currentUser,
    setCurrentUser,
    productItems,
    setProductItems,
    allProducts,
    setAllProducts,
    cart,
    setCart,
    totalPrice,
    setTotalPrice,
  }), [currentUser, productItems, allProducts, cart, totalPrice]);

  return (
    <AppContext.Provider value={ globalState }>
      { children }
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
