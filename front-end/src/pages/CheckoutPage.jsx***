import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import AppProvider from '../context/AppProvider';
import deliveryAppAPI from '../services/deliveryAppAPI';
import NavbarComponent from '../components/NavbarComponent';

export default function CheckoutPage() {
  const { totalPrice, productItems } = useContext(AppProvider);

  const history = useHistory();
  const [seller, setSeller] = useState(['Fulana Pereira']);
  const [inputState, setInputState] = useState({
    deliveryAddress: '',
    deliveryNumber: '',
  });

  const handleChange = ({ target: { name, value } }) => {
    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  const submitBtn = async () => {
    const { deliveryAddress, deliveryNumber } = inputState;
    const userLocalStorage = JSON.parse(localStorage.getItem('user'));
    const userId = userLocalStorage.id;
    const { name } = userLocalStorage;
    const status = 'Pendente';

    const sellerId = 2;
    const salesProducts = productItems;

    const getNewOrder = {
      totalPrice,
      deliveryAddress,
      deliveryNumber,
      status,
      userId,
      sellerId,
      name,
      salesProducts,
    };
    try {
      const checkoutToOrderAPI = await deliveryAppAPI('newOrder', getNewOrder);
      history.push(`/customer/order/${checkoutToOrderAPI.data.id}`);
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <div>
      <NavbarComponent />
      <Form.Label htmlFor="order-review">Finalizar Pedido</Form.Label>

    </div>
  );
}
