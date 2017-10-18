import * as React from 'react';
import { Switch, Route } from 'react-router';
import App from './containers/App';
import HomePage from './containers/Home';


export default () => (
  <App>
    <Switch>
      <Route path="/" component={HomePage} />
    </Switch>
  </App>
);
