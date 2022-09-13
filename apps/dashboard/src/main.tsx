import React from 'react';
import { render } from 'react-dom';
import App from './app/app';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '@carpool/dashboard/redux';

const root = document.getElementById('root');
render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>,
  root
);
