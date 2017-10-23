import { call, put, takeEvery } from 'redux-saga/effects';
import { get, print } from '../../api';
import * as actions from './';
import { Action } from 'redux';

interface AcceptOrdersAction extends Action {

}

function* _acceptOrders(action: AcceptOrdersAction) {
  yield put(actions.startLoading());
  const { response, error } = yield call(get, '/orders/accepted?shop_number=021001');
  if (response) {
    // call print services
    const orders = response.data.results;
    yield call(print, orders);

    yield put(actions.acceptOrdersSuccess(orders));
  } else {
    yield put(actions.acceptOrdersFail({
      statusCode: error.statusCode,
      statusText: error.statusText,
      errorMessage: error.errorMessage
    }));
  }
}

function* saga() {
  yield takeEvery(actions.acceptOrders.type, _acceptOrders);
}

export default saga;
