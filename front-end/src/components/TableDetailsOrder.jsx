import React from 'react';
import PropTypes from 'prop-types';

export default function TableDetailsOrder({ products }) {
  console.log(products);
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
            <td>{ detail.id }</td>
            <td>{ detail.name }</td>
            <td>{ detail.salesProduct.quantity }</td>
            <td>{ `R$ ${detail.price.replace('.', ',')}` }</td>
            <td>
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
