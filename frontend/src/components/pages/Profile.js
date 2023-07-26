import React, { useEffect, useRef, useState } from 'react';
import { getID, getUser, updateUser } from '../api/users-axios';
import { Button, Container, PasswordInput, Stack, TextInput, Title } from '@mantine/core';
import { login } from '../api/token-axios';
import LoadingWrapper from '../common/LoadingWrapper';

export default function Profile() {
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

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
      updateUser(user.id, username, email, phone, password).then((data) => {
        if (data) {
          login(username, password).then(() => {
            window.location.href = '/product';
          });
        } else {
          setUsernameError('Toks vartotojas jau egzistuoja!');
        }
      });
    }
  }

  const [user, setUser] = useState([]);
  useEffect(() => {
    getID().then((data) => {
      getUser(data)
        .then((data2) => {
          setUser(data2);
          setUsername(data2.username);
          setEmail(data2.email);
          setPhone(data2.phone);
        })
        .catch((error) => {
          console.error(error);
          setError(true);
        })
        .finally(() => {
          setLoading(false);
        });
    });
  }, []);
  const formRef = useRef();
  return (
    <div className="details">
      <LoadingWrapper loading={loading} error={error}>
        <div>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
              minWidth: 290
            })}>
            Redaguoti profilį
          </Title>
          <form ref={formRef}>
            <Container size={520} my={40}>
              <Stack>
                <TextInput
                  label="Naujas vartotojo vardas"
                  placeholder="Vartotojo vardas"
                  value={username}
                  onChange={handleUsernameChange}
                  error={usernameError}
                  required
                  onInvalid={(e) => e.target.setCustomValidity('Įveskite vartotojo vardą')}
                  onInput={(e) => e.target.setCustomValidity('')}
                />
                <TextInput
                  label="Naujas el. paštas"
                  placeholder="you@gmail.com"
                  value={email}
                  onChange={handleEmailChange}
                  error={emailError}
                  required
                  onInvalid={(e) => e.target.setCustomValidity('Įveskite el. paštą')}
                  onInput={(e) => e.target.setCustomValidity('')}
                />
                <TextInput
                  label="Naujas tel. nr."
                  placeholder="+37066666666"
                  value={phone}
                  onChange={handlePhoneChange}
                  error={phoneError}
                  required
                  onInvalid={(e) => e.target.setCustomValidity('Įveskite tel. nr.')}
                  onInput={(e) => e.target.setCustomValidity('')}
                />
                <PasswordInput
                  label="Naujas slaptažodis"
                  placeholder="Jūsų slaptažodis"
                  onChange={handlePasswordChange}
                  error={passwordError}
                  required
                  onInvalid={(e) => e.target.setCustomValidity('Įveskite slaptažodį')}
                  onInput={(e) => e.target.setCustomValidity('')}
                />
                <PasswordInput
                  label="Patvirtinti naują slaptažodį"
                  placeholder="Patvirtinti slatažodį"
                  onChange={handleConfPasswordChange}
                  error={passwordConfError}
                  required
                  onInvalid={(e) => e.target.setCustomValidity('Įveskite slaptažodį')}
                  onInput={(e) => e.target.setCustomValidity('')}
                />
                <Button
                  fullWidth
                  mt="xl"
                  onClick={() => (formRef.current.reportValidity() ? handleClick() : null)}>
                  Išsaugoti
                </Button>
              </Stack>
            </Container>
          </form>
        </div>
      </LoadingWrapper>
    </div>
  );
}
