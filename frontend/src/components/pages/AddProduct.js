import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Select, Textarea, TextInput, Title } from '@mantine/core';
import { IconCheck, IconCircleX, IconCurrencyEuro } from '@tabler/icons-react';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import { addProduct } from '../api/products-axios';
import { getID } from '../api/users-axios';
import { productCategories } from '../common/productCategories';
import { ImageDropzone } from '../common/Dropzone';

const StyledButton = styled(Button)`
  margin-bottom: 15px;
  margin-right: 10px;
  margin-left: 10px;
`;

export default function AddProduct() {
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [statusError, setStatusError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [imageError, setImageError] = useState('');
  const [image, setImage] = useState(null);
  const [city, setCity] = useState('');
  const [cityError, setCityError] = useState('');
  const formRef = useRef();
  const navigate = useNavigate();

  function handleSubmit() {
    let valid = true;
    let regCity = /^[^\d\s!@#$%^&*()+\\[\]{};:'"|\\,.\\/<>?`~=_]+$/;
    if (description === '') {
      setDescriptionError('Aprašymas negali būti tuščias');
      valid = false;
    }

    if (price > 10000) {
      setPriceError('Kaina turi būti žemesnė už 10000 Eur');
      valid = false;
    }

    if (price < 0) {
      setPriceError('Kaina turi būti teigiama');
      valid = false;
    }

    if (status === '') {
      setStatusError('Pasirinkite prekės būklę');
      valid = false;
    }

    if (category === '') {
      setCategoryError('Pasirinkite prekės kategoriją');
      valid = false;
    }

    if (image === null) {
      setImageError('Įkelkite prekės nuotrauką');
      valid = false;
    }

    if (city === '') {
      setCityError('Pasirinkite miestą');
      valid = false;
    }

    if (!regCity.test(city)) {
      setCityError('Neteisingai įvestas miestas');
      valid = false;
    }

    if (valid) {
      getID().then((data) => {
        addProduct(name, price, status, description, data, category, image, city).then(() => {
          showToastMessage();
          navigate('/my-products');
        });
      });
    }
  }

  const showToastMessage = () => {
    toast.success('Pridėta sėkmingai!', {
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

  const handleImageUpload = (file) => {
    if (file) {
      setImage(file);
      setImageError('');
    } else {
      setImage(null);
      setImageError('Prašome įkelti nuotrauką.');
    }
  };

  return (
    <>
      <form ref={formRef}>
        <div className="details">
          <ImageDropzone onImageUpload={handleImageUpload} imageError={imageError} />

          <div className="box">
            <Title
              align="center"
              sx={(theme) => ({
                fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                fontWeight: 900
              })}>
              Pridėti skelbimą
            </Title>
            <br />
            <TextInput
              data-testid="Prekės pavadinimas"
              label="Prekės pavadinimas"
              placeholder="Prekės pavadinimas"
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
              onInvalid={(e) => e.target.setCustomValidity('Įveskite prekės pavadinimą')}
              onInput={(e) => e.target.setCustomValidity('')}
            />
            <TextInput
              data-testid="Prekės kaina"
              type="number"
              label="Prekės kaina"
              placeholder="Prekės kaina"
              error={priceError}
              onChange={(e) => {
                setPriceError('');
                setPrice(e.target.value);
              }}
              icon={<IconCurrencyEuro />}
              required
              onInvalid={(e) => e.target.setCustomValidity('Įveskite prekės kainą')}
              onInput={(e) => e.target.setCustomValidity('')}
            />
            <Select
              data-testid="Prekės būklė"
              label="Prekės būklė"
              placeholder="Pasirinkite"
              data={['Neveikianti', 'Mažai naudota', 'Naudota', 'Nauja']}
              onChange={(e) => {
                setStatus(e);
                setStatusError('');
              }}
              error={statusError}
              required
            />
            <Select
              data-testid="Kategorija"
              label="Kategorija"
              placeholder="Pasirinkite"
              data={Object.values(productCategories)}
              onChange={(value) => {
                setCategory(value);
                setCategoryError('');
              }}
              error={categoryError}
              required
            />
            <TextInput
              data-testid="Miestas"
              label="Miestas"
              placeholder="Miestas"
              error={cityError}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              required
              onInvalid={(e) => e.target.setCustomValidity('Įveskite miestą')}
              onInput={(e) => e.target.setCustomValidity('')}
            />
          </div>
          <div className="box" style={{ minWidth: '90%' }}>
            <Textarea
              onChange={(e) => {
                setDescriptionError('');
                setDescription(e.target.value);
              }}
              data-testid="Prekės aprašymas"
              placeholder="Prekės aprašymas"
              label="Aprašymas"
              autosize
              withAsterisk
              minRows={4}
              maxRows={8}
              error={descriptionError}
              sx={{ maxWidth: '500px', margin: 'auto' }}
              required
              onInvalid={(e) => e.target.setCustomValidity('Įveskite prekės aprašymą')}
              onInput={(e) => e.target.setCustomValidity('')}
            />
          </div>
          <div style={{ margin: 'auto' }}>
            <StyledButton
              className="button"
              leftIcon={<IconCircleX />}
              color="indigo"
              radius="xl"
              size="md"
              variant="outline"
              onClick={() => navigate('/my-products')}>
              Atšaukti
            </StyledButton>
            <StyledButton
              className="button"
              leftIcon={<IconCheck />}
              color="green"
              radius="xl"
              size="md"
              variant="outline"
              onClick={() => (formRef.current.reportValidity() ? handleSubmit() : null)}>
              Išsaugoti
            </StyledButton>
          </div>
        </div>
      </form>
    </>
  );
}
