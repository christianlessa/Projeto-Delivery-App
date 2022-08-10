import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Container, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';
import deliveryAppAPI from '../services/deliveryAppAPI';
import NavbarComponent from '../components/NavbarComponent';
import TableComponent from '../components/TableComponent';

export default function CheckoutPage() {
  const { totalPrice, productItems } = useContext(AppContext);

  const history = useHistory();
  const [sellerList] = useState(['Fulana Pereira']);
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
    const { name } = userLocalStorage;

    const userId = userLocalStorage.id;
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
      console.log(error);
    }
  };

  return (
    <div>
      <NavbarComponent />
      <Form.Label htmlFor="order-review">Finalizar Pedido</Form.Label>
      <Container>
        <TableComponent />
        <Button data-testid="customer_checkout__element-order-total-price">
          Total:
          { totalPrice.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </Button>
      </Container>

      <Form.Label htmlFor="details-form">Detalhes e Endereço para Entrega</Form.Label>
      <Container>
        <Form.Label htmlFor="seller-form">P. Vendedora Responsável:</Form.Label>
        <Form>
          <select
            data-testid="customer_checkout__select-seller"
          >
            { sellerList?.map((seller, i) => (
              <option value={ seller } key={ i }>
                { seller }
              </option>
            ))}
          </select>
          <Form.Label htmlFor="form-address">Endereço</Form.Label>
          <Form.Control
            data-testid="customer_checkout__input-address"
            type="string"
            placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
            name="deliveryAddress"
            onChange={ handleChange }
            value={ inputState.deliveryAddress }
          />
          <Form.Label htmlFor="form-number">Número</Form.Label>
          <Form.Control
            data-testid="customer_checkout__input-addressNumber"
            type="number"
            placeholder="198"
            name="deliveryNumber"
            onChange={ handleChange }
            value={ inputState.deliveryNumber }
          />
        </Form>
        <Button
          data-testid="customer_checkout__button-submit-order"
          variant="success"
          onClick={ submitBtn }
        >
          Finalizar Pedido
        </Button>
      </Container>
    </div>
  );
}

CheckoutPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
