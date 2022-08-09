import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import deliveryAppAPI from '../services/deliveryAppAPI';

function LoginPage() {
  const history = useHistory();
  const [inputState, setInputState] = useState({
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

  useEffect(() => {
    let userLocalStorage = null;
    if (localStorage && localStorage.user) {
      userLocalStorage = JSON.parse(localStorage.getItem('user'));
    }
    if (localStorage && localStorage.user && userLocalStorage.role === 'customer') {
      history.push('/customer/products');
    }
  }, [history]);

  const handleClick = async () => {
    const user = {
      email: inputState.email,
      password: inputState.password,
    };
    try {
      const login = await deliveryAppAPI('loginUser', user);
      localStorage.clear(); // limpando localStorage
      localStorage.setItem('user', JSON.stringify(login));
      // console.log(login.user.role);
      if (login.role === 'administrator') {
        history.push('/admin/manage');
      } else if (login.role === 'customer') {
        history.push('/customer/products');
      } else if (login.role === 'seller') {
        history.push('seller/orders');
      }
    } catch (error) {
      setInvalidMessage('visible');
    }
  };

  const toRegisterPage = () => {
    history.push('/register');
  };

  useEffect(() => {
    // eslint-disable-next-line no-useless-escape
    const emailRegexValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const emailValidator = emailRegexValidator.test(inputState.email);
    const magicNumber = 5;
    const passwordValidator = inputState.password.length > magicNumber;

    if (emailValidator && passwordValidator) {
      setBtnStatus(false);
    } else {
      setBtnStatus(true);
    }
  }, [inputState]);

  return (
    <Container className="login-container">
      <div>
        <h2
          style={ { visibility: invalidMessage } }
          data-testid="common_login__element-invalid-email"
        >
          Login Invalid
        </h2>
      </div>

      <h1> Name of App </h1>
      <Form autoComplete="off">
        <Form.Label label="Login">
          Login
        </Form.Label>
        <Form.Control
          data-testid="common_login__input-email"
          type="email"
          placeholder="email@trybeer.com.br"
          name="email"
          onChange={ handleChange }
          value={ inputState.email }
        />
        <Form.Label label="Password">
          Password
        </Form.Label>
        <Form.Control
          data-testid="common_login__input-password"
          type="password"
          placeholder="*******"
          name="password"
          onChange={ handleChange }
          value={ inputState.password }
        />
        <div>
          <Button
            data-testid="common_login__button-login"
            type="button"
            variant="success"
            disabled={ btnStatus }
            onClick={ handleClick }
          >
            LOGIN
          </Button>
        </div>

        <div>
          <Button
            data-testid="common_login__button-register"
            type="button"
            onClick={ toRegisterPage }
          >
            Ainda não tenho conta
          </Button>
        </div>

      </Form>
    </Container>
  );
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default LoginPage;
