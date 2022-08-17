import React, { useState, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';
import sellerDeliveryAPI from '../services/sellerDeliveryAPI';
import TableDetailsOrder from '../components/TableDetailsOrder';

export default function SellerOrderDetail() {
  const getParams = useParams();
  const { orderId } = getParams;

  const [sellerOrderList, setSellerOrderList] = useState([]);
  const [statusOrder, setStatusOrder] = useState({});

  const sellerId = JSON.parse(localStorage.getItem('user')).id;
  const sellerIdObj = { sellerId };

  // Magic Numbers
  const eight = 8;
  const teen = 10;
  const five = 5;
  const seven = 7;
  const four = 4;

  const requestAllOrdersAPI = async () => {
    const ordersList = await sellerDeliveryAPI('getSellerOrders', sellerIdObj);
    const order = ordersList.data.filter((event) => event.id === Number(orderId))[0];
    const date = order.saleDate;
    const dateToCard = `
    ${date.slice(eight, teen)}/${date.slice(five, seven)}/${date.slice(0, four)}`;
    order.saleDate = dateToCard;
    setSellerOrderList(order);
    // setStatusOrder({
    //   orderId,
    //   status: sellerOrderList.status,
    // });
  };

  if (!sellerOrderList || sellerOrderList.length === 0) requestAllOrdersAPI();

  const prepareBtn = () => {
    setStatusOrder({
      orderId,
      status: 'Preparando',
    });
  };

  const inTransitBtn = () => {
    setStatusOrder({
      orderId,
      status: 'Em Trânsito',
    });
  };

  useEffect(() => {
    if (statusOrder.status) {
      sellerDeliveryAPI('changeStatus', statusOrder);
      requestAllOrdersAPI();
    }
  }, [statusOrder]);

  useEffect(() => {
    requestAllOrdersAPI();
  }, []);

  const dataTestId = 'seller_order_details__element-';

  return (sellerOrderList.length === 0 ? <span>Carregando...</span>
    : (
      <Container>
        <NavbarComponent />
        <h2>Detalhe do Pedido</h2>
        <section>
          <h3>
            {'Pedido '}
            <span data-testid={ `${dataTestId}order-details-label-order-id` }>
              {sellerOrderList.id}
            </span>
          </h3>
          <p data-testid={ `${dataTestId}order-details-label-order-date` }>
            {sellerOrderList.saleDate}
          </p>
          <p data-testid={ `${dataTestId}order-details-label-delivery-status` }>
            {sellerOrderList.status}
          </p>
          <Button
            data-testid="seller_order_details__button-preparing-check"
            type="button"
            disabled={ sellerOrderList.status !== 'Pendente' }
            onClick={ prepareBtn }
          >
            Preparar Pedido
          </Button>
          <Button
            data-testid="seller_order_details__button-dispatch-check"
            type="button"
            disabled={ sellerOrderList.status !== 'Preparando' }
            onClick={ inTransitBtn }
          >
            Saiu para entrega
          </Button>
        </section>
        <section>
          <TableDetailsOrder
            products={ sellerOrderList.products }
            dataTestId="seller_order_details__element-"
          />
        </section>
        <h2>
          Total R$:
          <span
            data-testid="seller_order_details__element-order-total-price"
          >
            {sellerOrderList.totalPrice.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL' }).replace('.', ',')}
          </span>
        </h2>
      </Container>
    )
  );
}
