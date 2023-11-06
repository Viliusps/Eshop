import React, { useEffect, useState } from 'react';
import '../css/ProductDetails.css';
import { getProduct, getProductImage } from '../api/products-axios';
import { useParams, useNavigate } from 'react-router-dom';
import { getID, getRole, getUser } from '../api/users-axios';
import { Button } from '@mantine/core';
import { IconArrowBackUp, IconHeart } from '@tabler/icons-react';
import LoadingWrapper from '../common/LoadingWrapper';
import Comments from '../utils/Comments';
import { Buffer } from 'buffer';
import {
  addWishlistProduct,
  deleteWishlistProduct,
  wishlistProductExists
} from '../api/wishlist-axios';

export default function ProductDetails() {
  const [product, setProduct] = useState([]);
  const [image, setImage] = useState(null);
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [role, setRole] = useState('');
  const [wishlistExists, setWishlistExists] = useState(false);
  const [isOwnProduct, setIsOwnProduct] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    getRole().then((role) => {
      setRole(role);
    });
    getProduct(id)
      .then((data) => {
        if (data.hidden) {
          navigate('/product');
        }
        setProduct(data);
        getUser(data.user_id).then((data2) => {
          setUser(data2);
          getID().then((id) => {
            if (data.user_id !== id) {
              wishlistProductExists(id, data.id).then((exists) => {
                setWishlistExists(exists);
                setIsOwnProduct(false);
              });
            }
          });
        });
        getProductImage(data.id).then((image) => {
          const base64String = `data:image/*;base64,${Buffer.from(image, 'binary').toString(
            'base64'
          )}`;
          setImage(base64String);
        });
      })
      .catch((error) => {
        console.error(error);
        navigate('/product');
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleAddToWishlist = () => {
    getID().then((userId) => {
      addWishlistProduct(userId, product.id);
      setWishlistExists(true);
    });
  };

  const handleDeleteFromWishlist = () => {
    getID().then((userId) => {
      deleteWishlistProduct(userId, product.id);
      setWishlistExists(false);
    });
  };

  return (
    <div className="details">
      <LoadingWrapper loading={loading} error={error}>
        <Button
          className="back-button"
          leftIcon={<IconArrowBackUp />}
          color="cyan"
          radius="xl"
          size="md"
          onClick={() => navigate(-1)}>
          Atgal
        </Button>
        <img src={image} alt={'Prekės nuotrauka'} style={{ width: '300px', height: '300px' }} />
        <div className="box">
          {role !== 'GUEST' && !isOwnProduct ? (
            wishlistExists ? (
              <Button
                data-testid="istrinti"
                variant="filled"
                color="violet"
                style={{ float: 'right' }}
                radius="xl"
                size="md"
                onClick={handleDeleteFromWishlist}>
                <IconHeart />
                Pamiršti
              </Button>
            ) : (
              <Button
                data-testid="prideti"
                variant="outline"
                color="violet"
                style={{ float: 'right' }}
                radius="xl"
                size="md"
                onClick={handleAddToWishlist}>
                <IconHeart />
                Įsiminti
              </Button>
            )
          ) : null}

          <div className="row">
            <h2>{product.name}</h2>
          </div>
          <div className="row">
            <span>${product.price}</span>
          </div>
          <b>Būklė: </b>
          <p>{product.status}</p>
          <br />
          <br />
          <b>Pardavėjo duomenys: </b>
          <br />
          <p>{user.username}</p>
          <br />
          <p>{user.email}</p>
          <br />
          <p>{user.phone}</p>
          <br />
          <b>Miestas: </b>
          <p>{product.city}</p>
        </div>
        <div className="box">
          <h2>Aprašymas:</h2>
          <p style={{ wordWrap: 'break-word' }}>{product.description}</p>
        </div>
      </LoadingWrapper>
      <Comments data={id} />
    </div>
  );
}
