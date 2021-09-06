import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import HttpApi from '@src/utils/https';
import './index.scss';
import store from './store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

switch (process.env.REACT_APP_ENV) {
  case 'mock':
    break;
  case 'local':
    HttpApi.baseURL = 'http://localhost:3000';
    break;
  case 'dev':
    HttpApi.baseURL = 'http://localhost:8090';
    break;
  case 'test':
    break;
  default:
    break;
}

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistStore(store)}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
