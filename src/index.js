import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import index_reducer from './Redux/reducers/index_reducer'

const mystore = createStore(index_reducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={mystore} >
    <App />
  </Provider>,
  document.getElementById('root')
);
