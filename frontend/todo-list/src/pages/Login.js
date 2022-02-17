import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [btnStatus, setBtnStatus] = useState(true);

  useEffect(() => {
    const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const MIN_LENGTH = 6;
    if (email.match(emailValidation) && password.length >= MIN_LENGTH) {
      setBtnStatus(false);
    }
  }, [email, password]);

  function handleClick() {
    localStorage.setItem('user', JSON.stringify({ email}));
    history.push('/tasks');
  };

  return (
    <div className="login">
      <h1 className="login-title">Bem vindo</h1>
      <h3 className="login-welcome">Faça o login e tenha acesso a sua lista de tarefas</h3>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label htmlFor="user">Email</Form.Label>
          <Form.Control
            id="user"
            type="email"
            name="user"
            data-testid="email-input"
            onChange={ ({ target }) => setEmail(target.value) }
            value={ email }
            placeholder="user@email.com"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label htmlFor="password">Password</Form.Label>
          <Form.Control
            id="password"
            type="password"
            name="password"
            data-testid="password-input"
            onChange={ ({ target }) => setPassword(target.value) }
            value={ password }
            placeholder="password"
          />
        </Form.Group>
        <Button
          type="button"
          className="login-button"
          data-testid="login-btn"
          disabled={ btnStatus }
          onClick={ handleClick }
        >
          Entrar
        </Button>
      </Form>
    </div>
  )
};

export default Login;
