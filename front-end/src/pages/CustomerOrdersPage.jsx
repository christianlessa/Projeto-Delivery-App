import React, { useState } from 'react';
// import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import deliveryAPI from '../services/deliveryAppAPI';
import OrderCards from '../components/OrderCards';
import NavbarComponent from '../components/NavbarComponent';

function CustomerOrdersPage() {
  const [customerOrderList, setCustomerOrderList] = useState([]);

  const userId = useState(JSON.parse(localStorage.getItem('user')))[0].id;
  const userIdObject = { userId };

  const requestAllCustomerOrders = async () => {
    const APIResponse = await deliveryAPI('getOrdersByUserId', userIdObject);
    const ordersList = APIResponse.data;

    setCustomerOrderList(ordersList);
  };

  if (customerOrderList === undefined || customerOrderList.length === 0) {
    requestAllCustomerOrders();
  }

  const eight = 8;
  const teen = 10;
  const five = 5;
  const seven = 7;
  const four = 4;

  function renderCards() {
    return customerOrderList.map((order, index) => {
      const date = order.saleDate;
      const ordDate = `${
        date.slice(eight, teen)}/${date.slice(five, seven)}/${date.slice(0, four)
      }`;
      return (
        <Link
          key={ index }
          to={ `/customer/orders/${order.id}` }
        >
          <OrderCards
            dataTestId="customer_orders__element-"
            id={ order.id }
            totalPriceValue={ order.totalPrice }
            saleDate={ ordDate }
            status={ order.status }
          />
        </Link>
      );
    });
  }

  return (
    <div>
      <NavbarComponent />
      <Container className="customerOrderPage">
        <div>
          { renderCards() }
        </div>
      </Container>
    </div>
  );
}

export default CustomerOrdersPage;
