import 'bootstrap';
import Rails from 'rails-ujs';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import pages from '../reducers/pages.js';
import App from '../components/app.js';

import '../styles/application.scss';

document.addEventListener("DOMContentLoaded", () => {
  Rails.start();

  const store = createStore(pages);

  const rootElement = $('#manual');
  if (rootElement) {
    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      rootElement[0]
    );
  }
});
