import React, { useEffect, useState } from 'react';
import { Button, Container, FloatingLabel, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import deliveryAppAPI from '../services/deliveryAppAPI';

// style:
import './styles/LoginPageStyle.css';
import logo from '../images/logo.png';

function RegisterPage() {
  const history = useHistory();
  const [inputState, setInputState] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [btnStatus, setBtnStatus] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState('hidden');

  const handleChange = ({ target: { name, value } }) => {
    console.log(name, value, inputState);
    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  const handleClick = async () => {
    const { name, email, password } = inputState;
    const newUser = await deliveryAppAPI('registerUser', {
      name,
      email,
      password,
    });

    if (newUser === 'exists') {
      setInvalidMessage('visible');
    }
    if (newUser !== 'exists') {
      localStorage.setItem('user', JSON.stringify(newUser));
      history.push('/customer/products');
    }
  };

  useEffect(() => {
    // eslint-disable-next-line no-useless-escape
    const emailRegexValidator = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const emailValidator = emailRegexValidator.test(inputState.email);
    const magicNumber = 5;
    const passwordValidator = inputState.password.length > magicNumber;
    const magicNumber2 = 12;
    const nameValidator = inputState.name.length > magicNumber2;

    if (nameValidator && emailValidator && passwordValidator) {
      setBtnStatus(false);
    } else {
      setBtnStatus(true);
    }
  }, [inputState]);

  return (
    <Container>
      <img src={ logo } alt="logo" />
      <h1>Cadastro</h1>
      <div>
        <h2
          style={ { visibility: invalidMessage } }
          data-testid="common_register__element-invalid_register"
        >
          Usuário já existe
        </h2>
      </div>
      <Form>
        <Form.Label> Seu Nome</Form.Label>
        <Form.Control
          as="textarea"
          data-testid="common_register__input-name"
          type="name"
          placeholder="Seu Nome"
          name="name"
          onChange={ handleChange }
          value={ inputState.name }
        />

        <FloatingLabel
          label="Email"
        />
        <Form.Control
          data-testid="common_register__input-email"
          type="email"
          placeholder="seu-email@site.com.br"
          name="email"
          onChange={ handleChange }
          value={ inputState.email }
        />

        <FloatingLabel
          label="Senha"
        />
        <Form.Control
          data-testid="common_register__input-password"
          type="password"
          placeholder="******"
          name="password"
          onChange={ handleChange }
          value={ inputState.password }
        />

        <div>
          <Button
            data-testid="common_register__button-register"
            type="button"
            disabled={ btnStatus }
            onClick={ handleClick }
          >
            CADASTRAR
          </Button>
        </div>
      </Form>
    </Container>
  );
}

RegisterPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default RegisterPage;
