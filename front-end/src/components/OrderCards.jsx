import React, { useState, useEffect } from 'react';
import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

function OrderCard({ id, totalPriceValue, saleDate, status, dataTestId }) {
  const [color, setColor] = useState('write');

  const price = totalPriceValue
    .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
    .replace('.', ',');

  const colorBackground = () => {
    if (status === 'Pendente') { // customer declara uma ordem
      setColor('darkorange');
    } else if (status === 'Preparando') { // seller validar a ordem e mandar para preparo
      setColor('chartreuse');
    } else if (status === 'Em Trânsito') { // seller encaminha para o customer
      setColor('crimson');
    } else if (status === 'Entregue') { // customer declara que foi entrege na tela customer orders
      setColor('turquoise');
    }
  };

  useEffect(() => {
    colorBackground();
  }, [color]);

  return (
    <Card>
      <Card.Body className="new-card">
        <Card.Text
          className="text-card"
          data-testid={ `${dataTestId}order-id-${id}` }
        >
          {'Pedido '}
          { id }
        </Card.Text>
        <div className="status-price">
          <Card.Text
            className="card-status"
            style={ { backgroundColor: color } }
            data-testid={ `${dataTestId}delivery-status-${id}` }
          >
            { status }
          </Card.Text>
          <div className="date-price">
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
          </div>
        </div>
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
