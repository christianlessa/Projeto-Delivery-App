import React, { useState, useEffect } from 'react';
// import PropTypes from 'prop-types';
import { Button, Container, Form } from 'react-bootstrap';
import adminDeliveryAPI from '../services/adminDeliveryAPI';

function AdminPage() {
  const [inputState, setInputState] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
    roleList: ['customer', 'seller', 'administrator'],
  });
  const [btnStatus, setBtnStatus] = useState(false);
  const [userExists, setUserExists] = useState('hidden');

  const handleChange = ({ target: { name, value } }) => {
    // console.log(name, value, inputState);
    setInputState({
      ...inputState,
      [name]: value,
    });
  };

  const adminRegister = async () => {
    const { name, email, password, role } = inputState;
    const newUser = await adminDeliveryAPI('registerUser', {
      name,
      email,
      role,
      password,
    });

    setInputState({
      name: '',
      email: '',
      password: '',
      role: 'customer',
      roleList: ['customer', 'seller', 'administrator'],
    });
    if (newUser === 'exists') {
      return setUserExists('visible');
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
      <h1>Cadastrar um novo usuário</h1>
      <div>
        <h2
          data-testid="admin_manage__element-invalid-register"
          style={ { visibility: userExists } }
        >
          Usuário já existe
        </h2>
      </div>
      <Form>
        <Form.Label htmlFor="inputName">
          Nome
          <Form.Control
            id="inputName"
            data-testid="admin_manage__input-name"
            name="name"
            type="text"
            placeholder="Nome e Sobrenome"
            value={ inputState.name }
            onChange={ handleChange }
          />
        </Form.Label>

        <Form.Label htmlFor="inputEmail">
          Email
          <Form.Control
            id="inputEmail"
            data-testid="admin_manage__input-email"
            type="email"
            name="email"
            placeholder="seu-email@site.com.br"
            onChange={ handleChange }
            value={ inputState.email }
          />
        </Form.Label>

        <Form.Label htmlFor="inputPassword">
          Senha
          <Form.Control
            id="inputPassword"
            data-testid="admin_manage__input-password"
            type="password"
            name="password"
            placeholder="*********"
            onChange={ handleChange }
            value={ inputState.password }
          />
        </Form.Label>

        <Form.Label htmlFor="typeRole">
          <select
            className="typeRole"
            data-testid="admin_manage__select-role"
            name="role"
            onChange={ handleChange }
            value={ inputState.role }
          >
            {
              inputState.roleList.map((option, index) => (
                <option
                  value={ option }
                  key={ index }
                >
                  { option }
                </option>
              ))
            }
          </select>
        </Form.Label>

        <Button
          data-testid="admin_manage__button-registe"
          disabled={ btnStatus }
          onClick={ adminRegister }
          type="button"
        >
          CADASTRAR
        </Button>
      </Form>
    </Container>
  );
}

// AdminPage.propTypes = {};

export default AdminPage;
