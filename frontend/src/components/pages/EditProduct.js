import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { deleteProduct, getProduct, updateProduct, getProductImage } from '../api/products-axios';
import { Button, Divider, Modal, Select, Textarea, TextInput, Title } from '@mantine/core';
import { IconCheck, IconCircleX, IconCurrencyEuro, IconTrash } from '@tabler/icons-react';
import { getID, getRole, getUser } from '../api/users-axios';
import styled from 'styled-components';
import { useDisclosure } from '@mantine/hooks';
import { toast } from 'react-toastify';
import LoadingWrapper from '../common/LoadingWrapper';
import { Buffer } from 'buffer';
import { ImageDropzone } from '../common/Dropzone';
import { productCategories } from '../common/productCategories';
import { Switch } from '@mantine/core';

const StyledButton = styled(Button)`
  margin-bottom: 15px;
  margin-right: 10px;
  margin-left: 10px;
`;

const Cancel = styled(Button)`
  margin: 0;
  float: left;
  margin-left: 10px;
  position: relative;
  -ms-transform: translate(-50%, -50%);
  margin-bottom: 25px;
  margin-top: 10px;
`;

const Approve = styled(Button)`
  margin: 0;
  float: right;
  margin-right: 10px;
  position: relative;
  -ms-transform: translate(-50%, -50%);
  margin-bottom: 25px;
  margin-top: 10px;
`;

export default function EditProduct() {
  const [category, setCategory] = useState('');
  const [imageError, setImageError] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [product, setProduct] = useState([]);
  const [status, setStatus] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [user, setUser] = useState([]);
  const [image, setImage] = useState(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [city, setCity] = useState('');
  const [checked, setChecked] = useState(false);
  const formRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  useEffect(() => {
    getRole().then((role) => {
      getID().then((data) => {
        getProduct(id)
          .then((data2) => {
            getProductImage(data2.id).then((image) => {
              const base64String = `data:image/*;base64,${Buffer.from(image, 'binary').toString(
                'base64'
              )}`;
              const blob = new Blob([image], { type: 'image/jpeg' });
              const file = new File([blob], 'image.jpg', { type: 'image/jpeg' });
              setImage(file);
              setImageSrc(base64String);
            });
            if (data !== data2.user_id && location.pathname.includes('/my-products')) {
              navigate('/my-products');
            } else if (
              data !== data2.user_id &&
              role !== 'ADMIN' &&
              location.pathname.includes('/edit-products')
            ) {
              navigate('/edit-products');
            }
            setProduct(data2);
            setStatus(data2.status);
            setName(data2.name);
            setDescription(data2.description);
            setPrice(data2.price);
            setCity(data2.city);
            setCategory(data2.category);
            setChecked(data2.hidden);
            getUser(data2.user_id).then((data3) => {
              setUser(data3);
            });
          })
          .catch((error) => {
            console.error(error);
            setError(true);
            if (location.pathname.includes('/my-products')) {
              navigate('/my-products');
            } else if (location.pathname.includes('/edit-products')) {
              navigate('/edit-products');
            }
          })
          .finally(() => {
            setLoading(false);
          });
      });
    });
  }, []);

  const handleDelete = () => {
    deleteProduct(id).then(() => {
      showToastMessage();
      navigate(-1);
    });
    close();
  };

  function handleSubmit() {
    let valid = true;

    if (category === '') {
      setCategoryError('Pasirinkite prekės kategoriją');
      valid = false;
    }

    if (description === '') {
      setDescriptionError('Aprašymas negali būti tuščias');
      valid = false;
    }

    if (price < 0) {
      setPriceError('Kaina turi būti teigiama');
      valid = false;
    }

    if (price > 10000) {
      setPriceError('Kaina negali būti didesnė nei 10000 Eur');
      valid = false;
    }

    if (valid) {
      updateProduct(
        product.id,
        name,
        price,
        status,
        description,
        product.user_id,
        category,
        image,
        city,
        checked
      ).then(() => {
        showEditToastMessage();
        navigate(-1);
      });
    }
  }

  const showEditToastMessage = () => {
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

  const showToastMessage = () => {
    toast.success('Pašalinta sėkmingai!', {
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
      <LoadingWrapper loading={loading} error={error}>
        <form ref={formRef}>
          <div className="details">
            <ImageDropzone
              onImageUpload={handleImageUpload}
              imageError={imageError}
              defaultImage={image}
              imageSrc={imageSrc}
            />

            <div className="box">
              <Title
                align="center"
                sx={(theme) => ({
                  fontFamily: `Greycliff CF, ${theme.fontFamily}`,
                  fontWeight: 900
                })}>
                Redaguoti skelbimą
              </Title>
              <br />
              <Switch
                checked={checked}
                label="Paslėpti?"
                description="Paslėpta prekė tampa nematoma kitiems svetainės naudotojams"
                onChange={(event) => {
                  setChecked(event.currentTarget.checked);
                }}
              />
              <TextInput
                label="Prekės pavadinimas"
                placeholder="Prekės pavadinimas"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                required
                onInvalid={(e) => e.target.setCustomValidity('Įveskite prekės pavadinimą')}
                onInput={(e) => e.target.setCustomValidity('')}
              />
              <TextInput
                type="number"
                label="Prekės kaina"
                placeholder="Prekės kaina"
                value={price}
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
                label="Prekės būklė"
                placeholder="Pasirinkite"
                value={status}
                data={['Neveikianti', 'Mažai naudota', 'Naudota', 'Nauja']}
                onChange={setStatus}
                required
              />
              <Select
                label="Kategorija"
                placeholder="Pasirinkite"
                data={Object.values(productCategories)}
                onChange={(value) => {
                  setCategory(value);
                  setCategoryError('');
                }}
                value={category}
                error={categoryError}
                required
              />
              {location.pathname.includes('/edit-products') ? (
                <>
                  <br />
                  <b>Pardavėjo duomenys: </b>
                  <br />
                  {user.username}
                  <br />
                  {user.email}
                  <br />
                  {user.phone}
                </>
              ) : null}
              <TextInput
                label="Miestas"
                placeholder="Miestas"
                value={city}
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
                value={description}
                onChange={(e) => {
                  setDescriptionError('');
                  setDescription(e.target.value);
                }}
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
                onClick={() => navigate(-1)}>
                Atšaukti
              </StyledButton>
              <StyledButton
                className="button"
                leftIcon={<IconTrash />}
                color="red"
                radius="xl"
                size="md"
                variant="outline"
                onClick={() => open()}>
                Ištrinti
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
        <Modal opened={opened} onClose={close} withCloseButton={false} xOffset="0vh" centered>
          <h2 style={{ textAlign: 'center' }}>
            Ar tikrai norite ištrinti
            <br />
            &quot;{product.name}&quot;?
          </h2>
          <Divider my="sm" />
          <div>
            <Cancel color="indigo" radius="xl" size="lg" onClick={close}>
              Atšaukti
            </Cancel>
            <Approve
              color="red"
              radius="xl"
              size="lg"
              leftIcon={<IconTrash />}
              onClick={handleDelete}>
              Patvirtinti
            </Approve>
          </div>
        </Modal>
      </LoadingWrapper>
    </>
  );
}
