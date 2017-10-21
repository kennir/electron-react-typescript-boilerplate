import { call, put, takeEvery } from 'redux-saga/effects';
import { login as doLogin, setToken } from '../../api';
import * as actions from './';
import { Action } from 'redux';

interface LoginAction extends Action {
  payload: {
    username: string;
    password: string;
  };
}

function* _login(action: LoginAction) {
  yield put(actions.startLoading());
  const { response, error } = yield call(doLogin, action.payload);
  if (response) {
    const { username } = action.payload;
    const token = response.data.access_token;
    yield put(actions.loginSuccess({ username, token }));

    yield call(setToken, token);
  } else {
    yield put(actions.loginFail({
      statusCode: error.statusCode,
      statusText: error.statusText,
      errorMessage: error.errorMessage
    }));
    yield call(setToken, undefined);
  }
}

function* saga() {
  yield takeEvery(actions.login.type, _login);
}

export default saga;
