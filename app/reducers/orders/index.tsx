import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { INITIAL_REQUEST_STATUS, RequestStatus } from '../common';

const actionCreator = actionCreatorFactory('Orders');

export const startLoading = actionCreator('START_LOADING');


export interface Item {
  name: string;
  price: Numeral;
  quantity: number;
}

export interface Status {
  status_code: number;
  description: string;
  date_updated: string;
}

export interface Deliveryman {
  id: number;
  name: string;
  sex?: number;
  phone: string;
  date_updated: string;
}

export interface DeliverymanLocation {
  latitude: number;
  longitude: number;
  date_updated: string;
}

export interface Tag {
  id: number;
  name: string;
}

export interface Order {
  id: number;
  order_number: string;
  shop_number: string;
  batch_number: number;
  customer_id: number;
  platform_batch_number: number;
  custom_name: string;
  custom_phone: string;
  custom_address: string;
  custom_remarks: string;
  appointment_time: string;
  payment_type: number;
  packing_charges: number;
  freight: number;
  reduction: number;
  platform_reduction: number;
  coupon: number;
  platform_coupon: number;
  platform_service_fee: number;
  pay_amount: number;
  income: number;
  total_price: number;
  staple_count: number;
  invoice_type: number;
  invoice_title: string;
  date_actived: string;
  date_updated: string;
  order_times: number;
  finished_order_times: number;
  items: Item[];
  status_history: Status[];
  deliveryman: Deliveryman[];
  deliveryman_locations: DeliverymanLocation[];
  tags: Tag[];
}

export interface State {
  receivedOrders?: Order[];       // 今天收到的订单（未接单）
  acceptedOrders?: Order[];       // 今天已经接单的订单
  requestStatus: RequestStatus;
}

const INITIAL_STATE: State = {
  requestStatus: INITIAL_REQUEST_STATUS
}

const reducer = reducerWithInitialState(INITIAL_STATE)
  .case(startLoading, (state) => ({ ...state, fetchPageStatus: { loading: true } }));

export default reducer;
