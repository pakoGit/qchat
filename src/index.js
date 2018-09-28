import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';

import Home from './components/Home';
import store from './redux/store';

ReactDOM.render(
   <Provider store={store}>
    <Home />
  </Provider>,
  document.getElementById('app')
);

module.hot.accept();
