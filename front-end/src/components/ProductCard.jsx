import React, { useContext, useState } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

export default function ProductCard({ product }) {
  const { productItens, setProductItens } = useContext(AppContext);
  const [quantityProduct, setQuantityProduct] = useState(0);

  const changeCartItens = (quantity) => {
    const filter = productItens.filter(({ id }) => id !== product.id);

    setProductItens([
      ...filter,
      { ...product, quantity },
    ]);
  };

  const handleChange = (type, event) => {
    if (quantityProduct < 0) return setQuantityProduct(0);
    if (type === 'plus') {
      const plusQuantity = quantityProduct + 1;
      changeCartItens(plusQuantity);
      setQuantityProduct(plusQuantity);
    }
    if (type === 'minus') {
      const minusQuantity = quantityProduct - 1;
      changeCartItens(minusQuantity);
      setQuantityProduct(minusQuantity);
    }

    if (type === 'input') {
      const inputQuantity = Number(event.target.value);
      if (quantityProduct > inputQuantity) {
        changeCartItens(inputQuantity);
        setQuantityProduct(inputQuantity);
      }
      if (quantityProduct < inputQuantity) {
        changeCartItens(inputQuantity);
        setQuantityProduct(inputQuantity);
      }
      if (quantityProduct === 0) {
        const filter = quantityProduct.filter(({ id }) => id !== product.id);
        setProductItens(filter);
        setQuantityProduct(inputQuantity);
      }
    }
  };

  return (
    <Card style={ { width: '18rem' } }>
      <Card.Body>
        <Card.Text
          data-testid={ `customer_products__element-card-price-${product.id}` }
        >
          { product.price.replace('.', ',') }
        </Card.Text>
        <Card.Img
          data-testid={ `customer_products__img-card-bg-image-${product.id}` }
          src={ product.url_image }
          variant="top"
        />
        <Card.Title
          data-testid={ `customer_products__element-card-title-${product.id}` }
          className="text-center"
        >
          { product.name }
        </Card.Title>
        <Form>
          <Form.Control
            data-testid={ `customer_products__input-card-quantity-${product.id}` }
            onChange={ (event) => handleChange('input', event) }
            value={ quantityProduct }
            min="0"
          />
        </Form>
        <Button
          data-testid={ `customer_products__button-card-rm-item-${product.id}` }
          type="button"
          onClick={ () => handleChange('minus') }
          disabled={ quantityProduct === 0 }
          className="float-left"
        >
          -
        </Button>
        <Button
          data-testid={ `customer_products__button-card-add-item-${product.id}` }
          type="button"
          onClick={ () => handleChange('plus') }
          className="float-right"
        >
          +
        </Button>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object,
}.isRequired;
