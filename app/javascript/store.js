import 'babel-polyfill';

import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { crudReducer, crudSaga, ApiClient } from 'redux-crud-store/es';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const client = new ApiClient({ basePath: 'http://localhost:3000/api' });
const crudMiddleware = createSagaMiddleware();

const createStoreWithMiddleware = composeEnhancers(
  applyMiddleware(
    crudMiddleware
    // add other middlewares here...
  )
)(createStore)

const tickets = (state, action) => {
  return state || {};
};

const reducer = combineReducers({
  models: crudReducer,
  tickets
})

const store = createStoreWithMiddleware(reducer);
crudMiddleware.run(crudSaga(client));

export default store;