import React from 'react';
import { render } from 'react-dom';
import MyProvider, { MyContext } from './containers/context.jsx';
import App from './components/app.jsx';

class ReactApp {
  constructor() {
    render(
      <MyProvider>
        <MyContext.Consumer>
          {context => <App context={context} />}
        </MyContext.Consumer>
      </MyProvider>,
      document.getElementById('react-masonry')
    );
  }
}

export { ReactApp };
