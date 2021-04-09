import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';

import './index.less';
import store from './redux/store';
import HttpApi from '@src/utils/https';

switch (process.env.REACT_APP_ENV) {
  case 'local':
    break;
  case 'dev':
    HttpApi.baseURL = 'http://172.100.20.170:9191';
    break;
  case 'test':
    break;
  default:
    break;
}

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
