import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import deliveryAppAPI from '../services/deliveryAppAPI';
import NavbarComponent from '../components/NavbarComponent';
import TableDetailsOrder from '../components/TableDetailsOrder';

export default function OrderDetailsPage() {
  const [customerOrderList, setCustomerOrderList] = useState([]);

  const userId = JSON.parse(localStorage.getItem('user')).id;
  const userIdObj = { userId };

  const getParams = useParams();
  const pageId = getParams.orderId;

  // Magic Numbers
  const eight = 8;
  const teen = 10;
  const five = 5;
  const seven = 7;
  const four = 4;

  const requestAllOrdersAPI = async () => {
    const orderList = await deliveryAppAPI('getOrdersByUserId', userIdObj);
    const order = orderList.data.filter((event) => event.id === Number(pageId))[0];
    const date = order.saleDate;
    const dateToCard = `
    ${date.slice(eight, teen)}/${date.slice(five, seven)}/${date.slice(0, four)}`;

    order.saleDate = dateToCard;
    setCustomerOrderList(order);
  };

  if (customerOrderList.length === 0) requestAllOrdersAPI();

  const dataTestId = 'customer_order_details__element-';

  return (customerOrderList.length === 0 ? <span>Carregando...</span>
    : (
      <div>
        <NavbarComponent />
        <Container className="customerOrderDetails">
          <h3>Detalhe do Pedido</h3>
          <section>
            <h3>
              {'Pedido '}
              <span
                data-testid={ `${dataTestId}order-details-label-order-id` }
              >
                {customerOrderList.id}
              </span>
            </h3>
            <p>
              {'P. Vend: '}
              <span
                data-testid={ `${dataTestId}order-details-label-seller-name` }
              >
                {customerOrderList.seller.name}
              </span>
            </p>
            <p
              data-testid={ `${dataTestId}order-details-label-order-date` }
            >
              {customerOrderList.saleDate}
            </p>
            <p
              data-testid={ `${dataTestId}order-details-label-delivery-status` }
            >
              {customerOrderList.status}
            </p>
            <button
              data-testid="customer_order_details__button-delivery-check"
              type="button"
              disabled={ customerOrderList.status !== 'Entregue' }
            >
              Marcar como entregue
            </button>
          </section>
          <TableDetailsOrder products={ customerOrderList.products } />
          <h2>
            {'Total R$ '}
            <span
              data-testid="customer_order_details__element-order-total-price"
            >
              {customerOrderList.totalPrice.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL' }).replace('.', ',')}
            </span>
          </h2>
        </Container>
      </div>
    )
  );
}

OrderDetailsPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
