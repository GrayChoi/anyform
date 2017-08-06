import { notification } from 'antd';
import axios from 'axios';
import { firebaseConfig } from './config';


const instance = axios.create({
  baseURL: `${firebaseConfig.apiURL}`,
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  }
});

const request = (url, options) => {
  console.log(options);
  return instance.request({
    url,
    headers: {
      'Authorization': `Bearer ${sessionStorage.getItem('idToken')}`,
    },
    ...options,
  }).catch((error) => {
    if (error.response) {
      notification.error({
        message: error.response.status,
        description: error.response.data,
      });
    } else if (error.request) {
      notification.error({
        message: 'No response',
        description: error.request,
      });
    } else {
      notification.error({
        message: 'Internal error',
        description: error.message,
      });
    }
  });
};

export default request;
