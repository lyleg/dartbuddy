import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import App from './containers/App';
import reducers from './reducers';
import { render } from 'react-dom'

let store = createStore(reducers);

let rootElement = document.querySelector('#app');
render(
  // The child must be wrapped in a function
  // to work around an issue in React 0.13.
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
);
