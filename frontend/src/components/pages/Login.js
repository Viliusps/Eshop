import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Text,
  Container,
  Button,
  Title
} from '@mantine/core';
import { login } from '../api/token-axios';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const formRef = useRef();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const [blockedError, setBlockedError] = useState(false);
  const navigate = useNavigate();

  function handleClick() {
    login(username, password)
      .then(() => {
        window.location.href = '/product';
      })
      .catch((e) => {
        if (e.response.status === 404 || e.response.status === 403) {
          setUsernameError(true);
          setBlockedError(false);
        } else if (e.response.status === 401) {
          setBlockedError(true);
          setUsernameError(false);
        }
      });
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <form ref={formRef}>
      <Container size={420} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900
          })}>
          Prisijungti
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Vartotojo vardas"
            placeholder="Vartotojo vardas"
            onChange={handleUsernameChange}
            error={
              usernameError ? (
                <>
                  <label>Blogas vartotojo vardas ar slaptažodis. </label>
                </>
              ) : blockedError ? (
                <label>Neturite prieigos prie paskyros</label>
              ) : null
            }
            onInvalid={(e) => e.target.setCustomValidity('Įveskite vartotojo vardą')}
            onInput={(e) => e.target.setCustomValidity('')}
            required
          />
          <PasswordInput
            label="Slaptažodis"
            placeholder="Jūsų slaptažodis"
            required
            mt="md"
            onChange={handlePasswordChange}
            onInvalid={(e) => e.target.setCustomValidity('Įveskite slaptažodį')}
            onInput={(e) => e.target.setCustomValidity('')}
          />
          <Button
            fullWidth
            mt="xl"
            onClick={() => (formRef.current.reportValidity() ? handleClick() : null)}>
            Prisijungti
          </Button>
          <Text align="center" mt="md">
            Neturite paskyros?{' '}
            <Anchor href="#" weight={700} onClick={() => navigate('/register')}>
              Registruotis
            </Anchor>
          </Text>
        </Paper>
      </Container>
    </form>
  );
}
