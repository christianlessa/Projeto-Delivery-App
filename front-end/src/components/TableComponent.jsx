import React, { useContext } from 'react';
import { Container, Table } from 'react-bootstrap';
import AppContext from '../context/AppContext';
import TableCardComp from './TableCardComp';

function TableComponent() {
  const { productItems, setProductItems } = useContext(AppContext);

  const removeItem = (event) => {
    const filter = productItems.filter(({ id }) => id !== event);
    setProductItems(filter);
    localStorage.setItem('cart', JSON.stringify(filter));
  };

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Subtotal</th>
            <th>Remover Item</th>
          </tr>
        </thead>

        <tbody>
          { productItems.map((cart, index) => (
            <TableCardComp
              key={ index }
              index={ index }
              id={ cart.id }
              name={ cart.name }
              quantity={ cart.quantity }
              removeItem={ removeItem }
              price={ (cart.price * 1)
                .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }
              subtotal={
                (cart.quantity * cart.price)
                  .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
              }
            />
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default TableComponent;
