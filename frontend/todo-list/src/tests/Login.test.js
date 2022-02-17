import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import Login from '../pages/Login';
import App from '../App';

const EMAIL_INPUT_TEST_ID = 'email-input';
const PASSWORD_INPUT_TEST_ID = 'password-input';
const BUTTON_TEST_ID = 'login-btn';
const VALID_EMAIL = 'user@email.com';
const VALID_PASSWORD = '1234567';

describe('1 - Crie uma página inicial de login', () => {
  test('A rota para esta página deve ser \'/login\'', () => {
    const { history } = renderWithRouter(<Login />);

    const { pathname } = history.location;
    expect(pathname).toBe('/login');
  });

  test('Crie um local para que o usuário insira seu email e senha', () => {
    renderWithRouter(<Login />);
    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const password = screen.getByTestId(PASSWORD_INPUT_TEST_ID);
    const button = screen.getByTestId(BUTTON_TEST_ID);

    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Crie um botão com o texto \'Entrar\'', () => {
    renderWithRouter(<Login />);

    const button = screen.getByText(/Entrar/i);
    expect(button).toBeInTheDocument();
  });

  test('Crie campos para interação com os inputs', () => {
    renderWithRouter(<Login />);

    const email = screen.getByTestId(EMAIL_INPUT_TEST_ID);
    const senha = screen.getByTestId(PASSWORD_INPUT_TEST_ID);

    userEvent.type(email, VALID_EMAIL);
    expect(email.value).toBe(VALID_EMAIL);
    userEvent.type(senha, VALID_PASSWORD);
    expect(senha.value).toBe(VALID_PASSWORD);
  });
});
