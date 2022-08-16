import React, { useState } from 'react';
import { Card, Container } from 'react-bootstrap';
// import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import NavbarComponent from '../components/NavbarComponent';
import OrderCard from '../components/OrderCards';
import sellerDeliveryAPI from '../services/sellerDeliveryAPI';

function SellerOrdersPage() {
  // const history = useHistory();
  const [sellerOrders, setSellerOrders] = useState([]);
  const sellerId = useState(JSON.parse(localStorage.getItem('user')))[0].id;
  const sellerIdObj = { sellerId };

  const requestAllSellerOrders = async () => {
    const ordersList = await sellerDeliveryAPI('getSellerOrders', sellerIdObj);
    console.log(ordersList.data);
    setSellerOrders(ordersList.data);
  };

  if (!sellerOrders || sellerOrders.length === 0) {
    requestAllSellerOrders();
  }

  // Magic Numbers
  const eight = 8;
  const teen = 10;
  const five = 5;
  const seven = 7;
  const four = 4;

  function render() {
    return sellerOrders.map((product, index) => {
      const date = product.saleDate;
      const ordDate = `${
        date.slice(eight, teen)}/${date.slice(five, seven)}/${date.slice(0, four)
      }`;
      return (
        <Link key={ index } to={ `/seller/orders/${product.id}` }>
          <Card key={ index }>
            <OrderCard
              dataTestId="seller_orders__element-"
              id={ product.id }
              deliveryAddress={ `${product.deliveryAddress}, ${product.deliveryNumbers}` }
              saleDate={ ordDate }
              status={ product.status }
              totalPriceValue={ product.totalPrice }
            />
            <p>{ `${product.deliveryAddress}, ${product.deliveryNumber}` }</p>
          </Card>
        </Link>
      );
    });
  }

  return (
    <div>
      <NavbarComponent />
      <Container>
        <section>
          { render() }
        </section>
      </Container>
    </div>
  );
}

SellerOrdersPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default SellerOrdersPage;
