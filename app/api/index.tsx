import axios, { AxiosError } from 'axios';
import { ipcRenderer } from 'electron';

const DEV_SERVER_BASE_URL = 'http://localhost:5000/api/v1.0';
const SERVER_BASE_URL = 'http://120.26.68.200:5000/api/v1.0';


interface ErrorMessage {
  [key: number]: {
    statusCode: string;
    statusText: string;
    errorMessage: string;
  }
}

const knownErrors: ErrorMessage = {
  401: {
    'statusCode': '401',
    'statusText': '认证失败',
    'errorMessage': '用户名不存在或密码错误'
  }
};

const init = (token?: string): void => {
  if (process.env.NODE_ENV === 'production') {
    axios.defaults.baseURL = SERVER_BASE_URL;
  } else {
    axios.defaults.baseURL = DEV_SERVER_BASE_URL;
  }
  axios.defaults.headers.common.Accept = 'application/json';
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.put['Content-Type'] = 'application/json';
  setToken(token);
}

const checkAuthError = (error: AxiosError) => {
  if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // store.dispatch(Auth.logout());
      }
    }
};

const formatError = (error: AxiosError) => {
  const { response } = error;
  return (response!.status in knownErrors) ? {
    error: {
      ...knownErrors[response!.status]
    }
  } : {
    error: {
      statusCode: response!.status,
      statusText: response!.statusText,
      errorMessage: error.message
    }
  };
};

export const getError = (error: AxiosError) => {
  printErrorMessage(error);
  const { response } = error;
  return (response) ? formatError(error) : {
      error: {
        statusCode: -1,
        statusText: '无法连接网络',
        errorMessage: '请检查网络连接并且确认当前的网络可以接入互联网'
      }
    };
};

const printErrorMessage = (error: AxiosError) => {
  if (error.response && error.response.data) {
    console.error(JSON.stringify(error.response.data));   // tslint:disable-line
  }
};

const get = (endpoint: string, query: string | undefined = undefined) => {
  const fullUrl = query ? endpoint + query : endpoint;
  return axios.get(fullUrl)
  .then((response) => ({response}))
  .catch((error) => {
    checkAuthError(error);
    return getError(error);
  });
}

const post = (endpoint: string, data: string) => {
  return axios.post(endpoint, data)
  .then((response) => ({response}))
  .catch((error) => {
    checkAuthError(error);
    return getError(error);
  });
}

const put = (endpoint: string, data: string) => {
  return axios.put(endpoint, data)
  .then((response) => ({response}))
  .catch((error) => {
    checkAuthError(error);
    return getError(error);
  });
}

const login = (payload: {}) => {
  return axios.post('/auth', JSON.stringify(payload))
    .then(response => ({ response }))
    .catch(error => getError(error));
}

const setToken = (token?: string): void => {
  axios.defaults.headers.common.Authorization = token ? `JWT ${token}` : undefined;
}

const print = (order: any): void => {
  ipcRenderer.send('print_order', order);
}

export {
  init,
  get,
  post,
  put,
  // high level api
  login,
  setToken,
  print,
};
