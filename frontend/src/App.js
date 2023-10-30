import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './components/pages/Login.js';
import { getID, getRole, getUser } from './components/api/users-axios';
import React, { useEffect, useState } from 'react';
import Auth from './services/Auth';
import { useLocation } from 'react-router-dom';
import Products from './components/pages/Products';
import ProductDetails from './components/pages/ProductDetails';
import Register from './components/pages/Register';
import { NavBar } from './components/common/Navbar';
import Profile from './components/pages/Profile';
import RecycleInfo from './components/pages/RecycleInfo';
import MyProducts from './components/pages/MyProducts';
import EditProduct from './components/pages/EditProduct';
import AllEditProducts from './components/pages/AllEditProducts';
import { ToastContainer } from 'react-toastify';
import AllUsers from './components/pages/AllUsers';
import EditUser from './components/pages/EditUser';
import AddProduct from './components/pages/AddProduct';
import { refreshToken } from './components/api/token-axios';
import ProductWishlist from './components/pages/ProductWishlist';
import Rules from './components/pages/Rules';
import { register, login } from './components/api/token-axios';
import { updateUser } from './components/api/users-axios';

export default function App() {
  const location = useLocation();
  const [role, setRole] = useState(null);

  useEffect(() => {
    getRole().then((data) => {
      setRole(data);
      if (data !== 'GUEST') {
        //refreshes token
        //(does not work lmao)
        getID().then((data1) => {
          getUser(data1).then((data2) => {
            refreshToken(data2.username)
              .then((data) => {
                localStorage.setItem('token', data.token);
              })
              .catch(() => {
                localStorage.clear();
                window.location.href = '/login';
              });
          });
        });
      }
    });
  }, [location.pathname]);

  if (!role) {
    return null;
  } else {
    return (
      <div>
        <NavBar />
        <ToastContainer />
        <Routes>
          <Route element={<Auth check={role === 'GUEST'} />}>
            <Route path="/login" element={<Login login={login} />} />
            <Route path="/register" element={<Register register={register} />} />
          </Route>

          <Route element={<Auth check={role === 'ADMIN'} />}>
            <Route path="/edit-products" element={<AllEditProducts />} />
            <Route path="/edit-products/:id" element={<EditProduct />} />
            <Route path="/users" element={<AllUsers />} />
            <Route path="/users/:id" element={<EditUser />} />
          </Route>

          <Route element={<Auth check={role !== 'GUEST'} />}>
            <Route path="/profile" element={<Profile updateUser={updateUser} />} />
            <Route path="/my-products" element={<MyProducts />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/my-products/:id" element={<EditProduct />} />
            <Route path="/wishlist" element={<ProductWishlist />} />
          </Route>

          <Route path="/product" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/recycle" element={<RecycleInfo />} />
          <Route path="/rules" element={<Rules />} />
          <Route path="*" element={<Navigate to="/product" replace />} />
        </Routes>
      </div>
    );
  }
}
