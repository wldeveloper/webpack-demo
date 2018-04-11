import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import Reducers from './reducers';
import App from './App';

import 'moment/locale/zh-cn';
moment.locale('zh-cn');
import 'babel-polyfill';

// redux
const middleware = [thunk];
const store = createStore(
  Reducers,
  compose(
    applyMiddleware(...middleware)
  )
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('app')
);
