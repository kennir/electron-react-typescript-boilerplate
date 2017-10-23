import actionCreatorFactory from 'typescript-fsa';
import {reducerWithInitialState} from 'typescript-fsa-reducers';
import {rehydrate} from '../persist';
import {RequestStatus, RequestError, INITIAL_REQUEST_STATUS} from '../common';
import * as moment from 'moment'

const actionCreator = actionCreatorFactory('Auth');
export const login = actionCreator < {
  username: string,
  password: string
} > ('LOGIN');
export const logout = actionCreator('LOGOUT');
export const startLoading = actionCreator('START_LOADING');
export const loginSuccess = actionCreator < {
  username: string,
  token: string
} > ('LOGIN_SUCCESS');
export const loginFail = actionCreator < RequestError > ('LOGIN_FAIL');

export interface State {
  username?: string;
  password?: string;
  shop_number?: string;
  token?: string;
  requestStatus : RequestStatus;
}

const INITIAL_STATE : State = {
  requestStatus: INITIAL_REQUEST_STATUS
};

const reducer = reducerWithInitialState(INITIAL_STATE).case(rehydrate, (state, {auth}) => ({
  ...state,
  token: auth
    ? auth.token
    : undefined,
  username: auth
    ? auth.username
    : undefined,
  password: auth
    ? auth.password
    : undefined,
  shop_number: auth
    ? auth.shop_number
    : undefined
})).case(logout, (state) => ({
  ...state,
  token: undefined
})).case(startLoading, (state) => ({
  ...state,
  requestStatus: {
    ...state.requestStatus,
    loading: true
  }
})).case(loginSuccess, (state, {username, token}) => ({
  ...state,
  username: username,
  token,
  requestStatus: {
    loading: false,
    lastUpdated: moment()
  }
})).case(loginFail, (state, {statusCode, statusText, errorMessage}) => ({
  ...state,
  token: undefined,
  requestStatus: {
    loading: false,
    statusCode,
    statusText,
    errorMessage,
    lastUpdated: moment()
  }
}));

export default reducer;
