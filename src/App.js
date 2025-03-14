import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Home from './Pages/Home/Home';
import Login from './Pages/LoginAndSignup/Login';
import Cart from './Pages/Cart/Cart';
import Signup from './Pages/LoginAndSignup/Signup';
import SidebarState from './Components/SideBar/SidebarState';
import Dashboard from './Pages/Dashboard/Dashboard';
import UserAccount from './Pages/UserAcount/UserAccount';
import Orders from './Pages/Orders/Orders';
import Products from './Pages/Products/Products';
import ProductDetails from './Pages/Products/ProductDetails';
import AddProduct from './Pages/Products/AddProduct';
import Categories from './Pages/Products/Categories';
import Settings from './Pages/Settings/Settings';

export default function App() {
  const { customer, isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Router>
      <Routes>
        {!isAuthenticated || customer?.role !== "admin" ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/:id" element={<ProductDetails />} />
            <Route path="/userAccount" element={<UserAccount />} />
          </>
        ) : (
          <>
            <Route path="/" element={<SidebarState />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/add-product" element={<AddProduct />} />
              <Route path="/categories" element={<Categories />} />

              <Route path="orders" element={<Orders />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </>
        )}

        <Route path="*" element={"page not found"} />
      </Routes>
    </Router>
  );
}
