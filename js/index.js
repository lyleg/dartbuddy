import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import reducers from './reducers';
import { render } from 'react-dom'

let store = createStore(reducers);

let rootElement = document.querySelector('#app');
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
