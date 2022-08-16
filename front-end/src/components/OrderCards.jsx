import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function OrderCard({ id, totalPriceValue, saleDate, status, dataTestId }) {
  const price = totalPriceValue
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    .replace('.', ',');

  return (
    <Card>
      <Card.Body>
        <Card.Text
          data-testid={ `${dataTestId}order-id-${id}` }
        >
          {'Pedido '}
          { id }
        </Card.Text>
        <Card.Text
          data-testid={ `${dataTestId}delivery-status-${id}` }
        >
          { status }
        </Card.Text>
        <Card.Text
          data-testid={ `${dataTestId}order-date-${id}` }
        >
          { saleDate }
        </Card.Text>
        <Card.Text
          data-testid={ `${dataTestId}card-price-${id}` }
        >
          { `R$: ${price}` }
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

OrderCard.propTypes = {
  id: PropTypes.number,
  totalPriceValue: PropTypes.number,
  deliveryAddress: PropTypes.string,
  saleDate: PropTypes.number,
  status: PropTypes.string,
}.isRequire;

export default OrderCard;
