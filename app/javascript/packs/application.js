import 'bootstrap';
import Rails from 'rails-ujs';
import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import pages from '../reducers/pages.js';
import App from '../components/app.js';

import '../styles/application.scss';

document.addEventListener("DOMContentLoaded", () => {
  Rails.start();

  const rootElement = $('#manual');
  if (rootElement) {
    const manual_id = rootElement.data('manual-id');
    const data = rootElement.data('pages');

    console.log(data);

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(pages,
                              { manual_id: manual_id, pages: data},
                              composeEnhancers(applyMiddleware(thunk)));

    ReactDOM.render(
      <Provider store={store}>
        <App />
      </Provider>,
      rootElement[0]
    );
  }
});
