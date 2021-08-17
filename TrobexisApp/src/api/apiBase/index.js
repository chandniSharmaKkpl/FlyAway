import axios from 'axios';
import {apiConstant} from '../../constant';

export const ApiBase = (token = null) => {
  let instance = axios.create({
    baseURL: apiConstant.BASE_URL,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 30000,
    auth: {
      username: apiConstant.USER_NAME_API,
      password: apiConstant.PASSWORD_API,
    },
  });

  console.log(' in api instance ', token);
  if (token && token !== null) {
    instance = axios.create({
      baseURL: apiConstant.BASE_URL,
      timeout: 30000,
      headers: {
        AUTHORIZATION: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
  }
  return instance;
};
