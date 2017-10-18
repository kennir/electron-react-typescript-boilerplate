import * as React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AppContainer } from 'react-hot-loader';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import createSagaMiddleware from 'redux-saga';
import Root from './containers/Root';
import './app.global.scss';

const history = createHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();
const reducers = {}

export const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  undefined,
  composeWithDevTools(
    applyMiddleware(
      routeMiddleware,
      sagaMiddleware
    )
  )
);

render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);

if ((module as any).hot) {
  (module as any).hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root').default;
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}
