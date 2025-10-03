import React from 'react';
import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Application from "../src/containers/Application";
import ScrollToTop from './ScrollToTop';
import { store } from './store';
import { SET_AUTH } from '../src/containers/Authentication/reducers';
import setToken from '../src/token';

const token = localStorage.getItem('token');

if (token) {
  setToken(token);
  store.dispatch({ type: SET_AUTH });
}

createRoot(document.getElementById("app") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop />
        <Application />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);