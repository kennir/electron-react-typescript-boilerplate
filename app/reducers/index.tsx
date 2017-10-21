import * as Common from './common';
import * as MyApp from './myapp';
import * as Auth from './auth';
import AuthSaga from './auth/saga';
import * as Orders from './orders';

interface StoreRootState {
  myapp: MyApp.State;
  auth : Auth.State;
  orders: Orders.State;
}

const reducers = {
  myapp: MyApp.default,
  auth: Auth.default,
  orders: Auth.default,
};

const sagaes = [
  AuthSaga,
]

export {
  Common,
  MyApp,
  Auth,
  Orders,

  sagaes,
  reducers,
  StoreRootState
};
