import React from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function OrderCard({ id, totalPriceValue, saleDate, status }) {
  return (
    <Card>
      <Card.Body>
        <Card.Text
          data-testid={ `customer_orders__element-order-id-${id}` }
        >
          {'Pedido '}
          { id }
        </Card.Text>
        <Card.Text
          data-testid={ `customer_orders__element-delivery-status-${id}` }
        >
          { status }
        </Card.Text>
        <Card.Text
          data-testid={ `customer_orders__element-order-date-${id}` }
        >
          { saleDate }
        </Card.Text>
        <Card.Text
          data-testid={ `customer_orders__element-card-price-${id}` }
        >
          { totalPriceValue
            .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
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
