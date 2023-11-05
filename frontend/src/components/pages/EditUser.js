import React, { useEffect, useRef, useState } from 'react';
import { getUser } from '../api/users-axios';
import { Button, Container, Select, Stack, TextInput, Title } from '@mantine/core';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingWrapper from '../common/LoadingWrapper';

// eslint-disable-next-line react/prop-types
export default function EditUser({ adminUpdateUser }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const formRef = useRef();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [user, setUser] = useState([]);
  const [role, setRole] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
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

  function handleEmailChange(event) {
    setEmail(event.target.value);
    setEmailError('');
  }

  function handlePhoneChange(event) {
    setPhone(event.target.value);
    setPhoneError('');
  }

  function handleClick() {
    let valid = true;
    if (!isValidEmail(email)) {
      setEmailError('Email is not valid!');
      valid = false;
    }

    if (!isValidPhone(phone)) {
      setPhoneError('Phone number is not valid!');
      valid = false;
    }

    if (valid) {
      adminUpdateUser(user.id, username, email, phone, user.password, role).then(() => {
        showToastMessage();
        navigate('/users');
      });
    }
  }

  useEffect(() => {
    getUser(id)
      .then((data) => {
        setUser(data);
        setUsername(data.username);
        setEmail(data.email);
        setPhone(data.phone);
        setRole(data.role);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        navigate('/users');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const showToastMessage = () => {
    toast.success('Redaguota sėkmingai!', {
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

  return (
    <LoadingWrapper loading={loading} error={error}>
      <div className="details">
        <img
          src="https://thumbs.dreamstime.com/b/no-image-available-icon-flat-vector-no-image-available-icon-flat-vector-illustration-132482953.jpg"
          alt=""
        />
        <div>
          <Title
            align="center"
            sx={(theme) => ({
              fontFamily: `Greycliff CF, ${theme.fontFamily}`,
              fontWeight: 900,
              minWidth: 290
            })}>
            Redaguoti naudotoją
          </Title>
          <form ref={formRef}>
            <Container size={520} my={40}>
              <Stack>
                <TextInput label="Vartotojo vardas" value={username} disabled />
                <TextInput
                  data-testid="el_pastas"
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
                  data-testid="tel_nr"
                  label="Naujas tel. nr."
                  placeholder="+37066666666"
                  value={phone}
                  onChange={handlePhoneChange}
                  error={phoneError}
                  required
                  onInvalid={(e) => e.target.setCustomValidity('Įveskite tel. nr.')}
                  onInput={(e) => e.target.setCustomValidity('')}
                />
                <Select
                  data-testid="role"
                  label="Naudotojo rolė"
                  placeholder="Pasirinkite"
                  value={role}
                  data={['USER', 'ADMIN', 'BLOCKED']}
                  onChange={setRole}
                  required
                />
                <Button.Group>
                  <Button variant="outline" fullWidth mt="xl" onClick={() => navigate(-1)}>
                    Atšaukti
                  </Button>
                  <Button
                    fullWidth
                    mt="xl"
                    onClick={() => (formRef.current.reportValidity() ? handleClick() : null)}>
                    Išsaugoti
                  </Button>
                </Button.Group>
              </Stack>
            </Container>
          </form>
        </div>
      </div>
    </LoadingWrapper>
  );
}
