import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { AppContainer } from 'react-hot-loader';
import Reducers from './reducers';
import App from './App';

import moment from 'moment';
import 'moment/locale/zh-cn';

moment.locale('zh-cn');
import 'babel-polyfill';

// redux
const logger = createLogger();
const middleware = [thunk, logger];
const store = createStore(
  Reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  compose(applyMiddleware(...middleware)),
);
// HMR
if (module.hot) {
  module.hot.accept('./reducers', () => {
    const nextRootReducer = require('./reducers').default;
    store.replaceReducer(nextRootReducer);
  });
}

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    document.getElementById('app'),
  );
};
render(App);
if (module.hot) {
  module.hot.accept('./App', () => {
    render(App);
  });
}
