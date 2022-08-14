import React from 'react';
import PropTypes from 'prop-types';

export default function TableDetailsOrder({ products }) {
  const dataTestId = 'customer_order_details__element-';
  return (
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
      </thead>
      <tbody>
        {products.map((detail, index) => (
          <tr key={ index } className="order-card">
            <td data-testid={ `${dataTestId}order-table-item-number-${detail.id}` }>
              { detail.id }
            </td>
            <td data-testid={ `${dataTestId}order-table-name-${detail.id}` }>
              { detail.name }
            </td>
            <td data-testid={ `${dataTestId}order-table-quantity-${detail.id}` }>
              { detail.salesProduct.quantity }
            </td>
            <td data-testid={ `${dataTestId}order-table-sub-total-${detail.id}` }>
              { `R$ ${detail.price.replace('.', ',')}` }
            </td>
            <td data-testid={ `${dataTestId}order-total-price-${detail.id}` }>
              { (detail.price * detail.salesProduct.quantity)
                .toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL' }) }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

TableDetailsOrder.propTypes = {
  products: PropTypes.object,
}.isRequire;
