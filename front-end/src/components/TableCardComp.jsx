import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';

function TableCardComp({ name, price, index, subtotal, quantity, removeItem, id }) {
  return (
    <tr>
      <td
        data-testid={ `customer_checkout__element-order-table-item-number-${index}` }
      >
        {index + 1}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-name-${index}` }
      >
        {name}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-quantity-${index}` }
      >
        {quantity}
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-unit-price-${index}` }
      >
        { price }
      </td>
      <td
        data-testid={ `customer_checkout__element-order-table-sub-total-${index}` }
      >
        { subtotal}
      </td>
      <td>
        <Button
          type="submit"
          data-testid={ `customer_checkout__element-order-table-remove-${index}` }
          onClick={ () => removeItem(id) }
        >
          Remover
        </Button>
      </td>
    </tr>
  );
}

TableCardComp.propTypes = {
  price: PropTypes.number,
  title: PropTypes.string,
}.isRequire;

export default TableCardComp;
