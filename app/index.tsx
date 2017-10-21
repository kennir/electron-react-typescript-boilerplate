import * as React from 'react';
import { render } from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { AppContainer } from 'react-hot-loader';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { persistStore, autoRehydrate } from 'redux-persist';
import { StoreRootState, reducers, MyApp, sagaes } from './reducers';
import createFilter from 'redux-persist-transform-filter';
import createHistory from 'history/createHashHistory';
import createSagaMiddleware from 'redux-saga';
import Root from './containers/Root';
import * as Api from './api';
import 'numeral/locales/chs';
import 'moment/locale/zh-cn';
import './app.global.scss';

const history = createHistory();
const routeMiddleware = routerMiddleware(history);
const sagaMiddleware = createSagaMiddleware();


const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer,
  }),
  undefined,
  composeWithDevTools(
    applyMiddleware(
      routeMiddleware,
      sagaMiddleware
    ),
    autoRehydrate()
  )
);

sagaes.forEach((saga) => sagaMiddleware.run(saga));

const transforms = [
  createFilter('auth', ['id', 'token', 'is_admin', 'is_disabled', 'username']),
];

const blacklist = ['app', 'user', 'menu', 'menuItem', 'order', 'router', 'setting'];

persistStore(
  store, { blacklist, transforms, keyPrefix: 'fresca.erp-client-v0.1:' }, () => {
    const state = store.getState();
    if (state) {
      Api.init((state as StoreRootState).auth.token);
    }
    // Loading后通知组件加载完成
    store.dispatch(MyApp.setPersistFinished());
  }
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

export { store, persistStore };

