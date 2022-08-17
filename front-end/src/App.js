import React from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderDetailsPage from './pages/OrderDetailsPage';
import CustomerOrdersPage from './pages/CustomerOrdersPage';
import AdminPage from './pages/AdminPage';
import SellerOrdersPage from './pages/SellerOrdersPage';
import SellerOrderDetail from './pages/SellerOrderDetail';
// import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={ () => <Redirect to="/login" /> } />
      <Route exact path="/login" component={ LoginPage } />
      <Route exact path="/register" component={ RegisterPage } />
      <Route exact path="/customer/products" component={ ProductsPage } />
      <Route exact path="/customer/checkout" component={ CheckoutPage } />
      <Route exact path="/customer/orders" component={ CustomerOrdersPage } />
      <Route exact path="/customer/orders/:orderId" component={ OrderDetailsPage } />
      <Route exact path="/admin/manage" component={ AdminPage } />
      <Route exact path="/seller/orders" component={ SellerOrdersPage } />
      <Route exact path="/seller/orders/:orderId" component={ SellerOrderDetail } />
    </Switch>

  );
}

export default App;
