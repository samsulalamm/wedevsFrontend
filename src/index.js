import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-widgets/dist/css/react-widgets.css';
import './assets/scss/style.scss';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import PrivateRoute from "./auth/components/PrivateRoute";
import {getLocalAuthToken} from "./helper/utils";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./views/Login";
import {Provider} from "react-redux";
import store from "./redux/store";
import Dashboard from "./views/Dashboard";
import {ToastContainer} from "react-toastify";

import axios from "axios"

import ProductAdd from "./views/products/Add";
import ProductList from "./views/products/List";
import ProductDetail from "./views/products/Details";
import ProductEdit from "./views/products/Edit";

const authData = getLocalAuthToken() ? getLocalAuthToken() : '';

axios.defaults.headers.common['Authorization'] = 'Bearer ' + authData?.access_token || ''
axios.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error?.response?.status === 401 || error?.response?.status === 500) {
    localStorage.clear();
    window.location.reload()
  } else {
    return error.response;
  }
})

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <ProductList/>
        </PrivateRoute>

        <PrivateRoute exact path="/product/add">
          <ProductAdd/>
        </PrivateRoute>

        <PrivateRoute exact path="/product/details/:id">
          <ProductDetail/>
        </PrivateRoute>

        <PrivateRoute exact path="/product/edit/:id">
          <ProductEdit/>
        </PrivateRoute>

        <Route exact path="/login">
          <Login/>
        </Route>

        <Route>
          <p>404 | Page not found</p>
          <p><Link to="/">Back to Home</Link></p>
        </Route>
      </Switch>
    </Router>

    <ToastContainer position="bottom-right" autoClose={3000}/>
  </Provider>
  , document.getElementById('root'));

serviceWorker.unregister();
