import React from 'react';
import './App.css';
import { Route, Redirect } from 'react-router-dom';
import { Switch } from 'react-router-dom/cjs/react-router-dom.min';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductsPage from './pages/ProductsPage';
import CheckoutPage from './pages/CheckoutPage';
import DetailsOrder from './pages/DetailsOrder';
// import rockGlass from './images/rockGlass.svg';

function App() {
  return (
    <Switch>
      <Route exact path="/" render={ () => <Redirect to="/login" /> } />
      <Route exact path="/login" component={ LoginPage } />
      <Route exact path="/register" component={ RegisterPage } />
      <Route exact path="/customer/products" component={ ProductsPage } />
      <Route exact path="/customer/checkout" component={ CheckoutPage } />
      <Route exact path="/customer/orders/:orderId" component={ DetailsOrder } />
    </Switch>

  );
}

export default App;
