import React, { useEffect, useState } from 'react';
import '../css/Products.css';
import { getWishlistProductsByUserID, getProductImage } from '../api/products-axios';
import { Title, Pagination } from '@mantine/core';
import { getID } from '../api/users-axios';
import LoadingWrapper from '../common/LoadingWrapper';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { Buffer } from 'buffer';

export default function ProductWishlist() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activePage, setPage] = useState(1);
  const [pageSize] = useState(20);

  useEffect(() => {
    setPage(1);
    getID()
      .then((id) => {
        getWishlistProductsByUserID(id)
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
        Įsiminti skelbimai
      </Title>

      <LoadingWrapper loading={loading} error={error}>
        {chunks[activePage - 1]?.filter((product) => !product.hidden).length > 0 ? (
          <>
            <div id="product">
              {chunks[activePage - 1]
                .filter((product) => !product.hidden)
                .map((product) => (
                  <Link
                    to={`/product/${product.id}`}
                    style={{ textDecoration: 'none' }}
                    key={product.id}>
                    <div className="card" key={product.id}>
                      <img
                        src={product.image}
                        alt={'Prekės nuotrauka'}
                        style={{ width: '300px', height: '300px' }}
                      />
                      <div className="content">
                        <h3>{product.name}</h3>
                        <span style={{ color: 'red' }}>${product.price}</span>
                        <p>{product.status}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
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
