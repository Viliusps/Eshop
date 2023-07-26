import React, { useEffect, useState } from 'react';
import '../css/Products.css';
import { deleteProduct, getProductByUser, getProductImage } from '../api/products-axios';
import { Button, Divider, Modal, Pagination, Title } from '@mantine/core';
import { IconTrash } from '@tabler/icons-react';
import { getID } from '../api/users-axios';
import LoadingWrapper from '../common/LoadingWrapper';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Buffer } from 'buffer';

const Edit = styled(Button)`
  margin: 0;
  float: left;
  margin-left: 10px;
  position: relative;
  -ms-transform: translate(-50%, -50%);
`;

const Delete = styled(Button)`
  margin: 0;
  float: right;
  margin-right: 10px;
  position: relative;
  -ms-transform: translate(-50%, -50%);
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

export default function MyProducts() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [deleteItem, setDeleteItem] = useState([]);
  const [activePage, setPage] = useState(1);
  const [pageSize] = useState(20);

  const [opened, { open, close }] = useDisclosure(false);
  useEffect(() => {
    setPage(1);
    getID()
      .then((id) => {
        getProductByUser(id)
          .then(async (data) => {
            const productsWithImages = [];
            for (const product of data) {
              const imageData = await getProductImage(product.id);
              product.image = `data:image/*;base64,${Buffer.from(imageData, 'binary').toString(
                'base64'
              )}`;
              productsWithImages.push(product);
            }
            setProducts(productsWithImages);
          })
          .catch((error) => {
            console.error(error);
            setError(true);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((error) => {
        console.error(error);
        setError(true);
      });
  }, []);

  const handleDelete = () => {
    deleteProduct(deleteItem.id).then(async (data) => {
      const productsWithImages = [];
      for (const product of data) {
        const imageData = await getProductImage(product.id);
        product.image = `data:image/*;base64,${Buffer.from(imageData, 'binary').toString(
          'base64'
        )}`;
        productsWithImages.push(product);
      }
      setProducts(productsWithImages);
      showToastMessage();
    });
    close();
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

  const chunks = products.reduce((acc, curr) => {
    if (acc.length === 0 || acc[acc.length - 1].length === pageSize) {
      acc.push([]);
    }
    acc[acc.length - 1].push(curr);
    return acc;
  }, []);

  return (
    <>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900
        })}>
        Mano skelbimai
      </Title>

      <LoadingWrapper loading={loading} error={error}>
        {chunks.length > 0 ? (
          <>
            <div id="product">
              {chunks[activePage - 1].map((product) => (
                <div className="card" key={product.id}>
                  <img src={product.image} alt={'Prekės nuotrauka'} />
                  <div className="content">
                    <h3 style={{ color: 'inherit' }}>{product.name}</h3>
                  </div>
                  <div>
                    <Edit
                      onClick={() => navigate('/my-products/' + product.id)}
                      color="indigo"
                      radius="xl">
                      Redaguoti
                    </Edit>
                    <Delete
                      variant="outline"
                      color="red"
                      radius="xl"
                      leftIcon={<IconTrash />}
                      onClick={() => {
                        setDeleteItem(product);
                        open();
                      }}>
                      Ištrinti
                    </Delete>
                  </div>
                </div>
              ))}
            </div>
            <Modal opened={opened} onClose={close} withCloseButton={false} xOffset="0vh" centered>
              <h2 style={{ textAlign: 'center' }}>
                Ar tikrai norite ištrinti
                <br />
                &quot;{deleteItem.name}&quot;?
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
            <Pagination
              total={chunks.length}
              page={activePage}
              onChange={setPage}
              position="center"
              style={{ marginTop: '50px', marginBottom: '10px' }}
            />
          </>
        ) : (
          <h1 style={{ textAlign: 'center' }}>Sąrašas tuščias!</h1>
        )}
      </LoadingWrapper>
    </>
  );
}
