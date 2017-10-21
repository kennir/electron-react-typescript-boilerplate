import * as moment from 'moment';

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
}

export const INITIAL_PAGINATION: Pagination = {
  currentPage: 1,
  totalPages: 0,
  totalItems: 0
};

export interface RequestStatus {
  loading: boolean;
  lastUpdated?: moment.Moment;
  statusCode?: number;
  statusText?: string;
  errorMessage?: string;
}

export interface RequestError {
  statusCode: number;
  statusText: string;
  errorMessage: string;
}

export const INITIAL_REQUEST_STATUS: RequestStatus = {
  loading: false
};
