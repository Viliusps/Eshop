import {
  TextInput,
  PasswordInput,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Button,
  Stack
} from '@mantine/core';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

// eslint-disable-next-line react/prop-types
export default function Register({ register }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confPassword, setConfPassword] = useState('');

  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordConfError, setPasswordConfError] = useState('');

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPhone(phone) {
    return /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
      phone
    );
  }

  function handleUsernameChange(event) {
    setUsername(event.target.value);
    setUsernameError('');
  }
  function handleEmailChange(event) {
    setEmail(event.target.value);
    setEmailError('');
  }

  function handlePhoneChange(event) {
    setPhone(event.target.value);
    setPhoneError('');
  }

  function handlePasswordChange(event) {
    setPassword(event.target.value);
    setPasswordConfError('');
    setPasswordError(false);
  }

  function handleConfPasswordChange(event) {
    setConfPassword(event.target.value);
    setPasswordConfError('');
    setPasswordError(false);
  }

  function handleClick() {
    let valid = true;
    if (!isValidEmail(email)) {
      setEmailError('Neteisingas el. paštas');
      valid = false;
    }

    if (!isValidPhone(phone)) {
      setPhoneError('Neteisingas tel. nr.');
      valid = false;
    }

    if (confPassword !== password) {
      setPasswordConfError('Nevienodi slaptažodžiai');
      setPasswordError(true);
      valid = false;
    }

    if (valid) {
      register(username, email, phone, password).then((data) => {
        if (data) {
          showToastMessage();
          navigate('/login');
        } else {
          setUsernameError('Toks vartotojas jau egzistuoja');
        }
      });
    }
  }

  const showToastMessage = () => {
    toast.success('Paskyra sukurta sėkmingai!', {
      position: 'top-center',
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'light'
    });
  };

  const formRef = useRef();
  return (
    <form ref={formRef}>
      <Container size={520} my={40}>
        <Title
          align="center"
          sx={(theme) => ({
            fontFamily: `Greycliff CF, ${theme.fontFamily}`,
            fontWeight: 900
          })}>
          Sukurti paskyrą
        </Title>
        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <Stack>
            <TextInput
              data-testid="vartotojo_vardas"
              label="Vartotojo vardas"
              placeholder="Vartotojo vardas"
              onChange={handleUsernameChange}
              error={usernameError}
              required
              onInvalid={(e) => e.target.setCustomValidity('Įveskite vartotojo vardą')}
              onInput={(e) => e.target.setCustomValidity('')}
            />
            <TextInput
              data-testid="el_pastas"
              label="El. paštas"
              placeholder="you@gmail.com"
              onChange={handleEmailChange}
              error={emailError}
              required
              onInvalid={(e) => e.target.setCustomValidity('Įveskite el. paštą')}
              onInput={(e) => e.target.setCustomValidity('')}
            />
            <TextInput
              data-testid="tel_nr"
              label="Tel. nr."
              placeholder="+37066666666"
              onChange={handlePhoneChange}
              error={phoneError}
              required
              onInvalid={(e) => e.target.setCustomValidity('Įveskite tel. nr.')}
              onInput={(e) => e.target.setCustomValidity('')}
            />
            <PasswordInput
              data-testid="slaptazodis"
              label="Slaptažodis"
              placeholder="Jūsų slaptažodis"
              onChange={handlePasswordChange}
              error={passwordError}
              required
              onInvalid={(e) => e.target.setCustomValidity('Įveskite slaptažodį')}
              onInput={(e) => e.target.setCustomValidity('')}
            />
            <PasswordInput
              data-testid="patvirtinti_slaptazodi"
              label="Patvirtinti slaptažodį"
              placeholder="Patvirtinti slaptažodį"
              onChange={handleConfPasswordChange}
              error={passwordConfError}
              required
              onInvalid={(e) => e.target.setCustomValidity('Įveskite slaptažodį')}
              onInput={(e) => e.target.setCustomValidity('')}
            />
          </Stack>
          <Button
            data-testid="registruotis"
            fullWidth
            mt="xl"
            onClick={() => (formRef.current.reportValidity() ? handleClick() : null)}>
            Registruotis
          </Button>
          <Text color="dimmed" size="sm" align="center" mt={5}>
            Jau turite paskyrą?{' '}
            <Anchor href="#" size="sm" onClick={() => navigate('/login')}>
              Prisijungti
            </Anchor>
          </Text>
        </Paper>
      </Container>
    </form>
  );
}
