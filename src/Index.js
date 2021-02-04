import React from 'react';
import ReactDOM from 'react-dom';
import App from '../src/components/App';
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
