import {
  Box,
  Button,
  Container,
  TextField,
  makeStyles,
} from '@material-ui/core';
import React, { FormEvent, useState } from 'react';
import { IUser, signInEndpoint } from '../services/backend';

const styles = makeStyles({
  error: {
    backgroundColor: 'rgb(253, 236, 234)',
    borderRadius: '4px',
    padding: '16px',
    margin: '16px 0',
  },
});

interface ILoginScreenProps {
  onSignIn: (user: IUser) => void;
}

export default function LoginScreen({ onSignIn }: ILoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  function signIn(evt: FormEvent) {
    evt.preventDefault();
    signInEndpoint(email, password).then(onSignIn, e => {
      setError('E-mail não encontrado ou senha incorreta.');
    });
  }

  const classes = styles();

  return (
    <Container maxWidth="sm">
      <h1>Despesas</h1>
      <p>Digite o e-mail e senha para fazer o login</p>
      <form onSubmit={signIn}>
        <TextField
          margin="normal"
          label="E-mail"
          fullWidth
          variant="outlined"
          value={email}
          onChange={evt => {
            setEmail(evt.target.value);
          }}
        />
        <TextField
          margin="normal"
          label="Senha"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={evt => {
            setPassword(evt.target.value);
          }}
        />
        {error && <div className={classes.error}>{error}</div>}
        <Box textAlign="right" marginTop="16px">
          <Button variant="contained" color="primary" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </Container>
  );
}
