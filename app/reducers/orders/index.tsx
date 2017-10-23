import actionCreatorFactory from 'typescript-fsa';
import {reducerWithInitialState} from 'typescript-fsa-reducers';
import {INITIAL_REQUEST_STATUS, RequestStatus, RequestError} from '../common';
import * as moment from 'moment';

const actionCreator = actionCreatorFactory('Orders');

export const startLoading = actionCreator('START_LOADING');
// 从服务器获取所有服务器接单的订单
export const acceptOrders = actionCreator('ACCEPT_ORDERS');
export const acceptOrdersSuccess = actionCreator < Order[] > ('ACCEPT_ORDERS_SUCCESS');
export const acceptOrdersFail = actionCreator < RequestError > ('ACCEPT_ORDERS_FAIL')

export interface Item {
  name : string;
  price : Numeral;
  quantity : number;
}

export interface Status {
  status_code : number;
  description : string;
  date_updated : string;
}

export interface Deliveryman {
  id : number;
  name : string;
  sex?: number;
  phone : string;
  date_updated : string;
}

export interface DeliverymanLocation {
  latitude : number;
  longitude : number;
  date_updated : string;
}

export interface Tag {
  id : number;
  name : string;
}

export interface Order {
  id : number;
  order_number : string;
  shop_number : string;
  batch_number : number;
  customer_id : number;
  platform_batch_number : number;
  custom_name : string;
  custom_phone : string;
  custom_address : string;
  custom_remarks : string;
  appointment_time : string;
  payment_type : number;
  packing_charges : number;
  freight : number;
  reduction : number;
  platform_reduction : number;
  coupon : number;
  platform_coupon : number;
  platform_service_fee : number;
  pay_amount : number;
  income : number;
  total_price : number;
  staple_count : number;
  invoice_type : number;
  invoice_title : string;
  date_actived : string;
  date_updated : string;
  order_times : number;
  finished_order_times : number;
  items : Item[];
  status_history : Status[];
  deliveryman : Deliveryman[];
  deliveryman_locations : DeliverymanLocation[];
  tags : Tag[];
}

export interface State {
  acceptedOrders: Order[]; // 今天已经接单的订单
  requestStatus: RequestStatus;
}

const INITIAL_STATE : State = {
  acceptedOrders: [],
  requestStatus: INITIAL_REQUEST_STATUS
}

const reducer = reducerWithInitialState(INITIAL_STATE).case(startLoading, (state) => ({
  ...state,
  requestStatus: {
    loading: true,
    lastUpdated: moment()
  }
})).case(acceptOrdersSuccess, (state, orders) => ({
  ...state,
  acceptedOrders: [...state.acceptedOrders, ...orders],
  requestStatus: {
    loading: false,
    lastUpdated: moment()
  }
})).case(acceptOrdersFail, (state, {statusCode, statusText, errorMessage}) => ({
  ...state,
  requestStatus: {
    loading: false,
    statusCode,
    statusText,
    errorMessage,
    lastUpdated: moment()
  }
}));

export default reducer;
