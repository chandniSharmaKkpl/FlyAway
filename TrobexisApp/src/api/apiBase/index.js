import axios from 'axios';
import { apiConstant } from '../../constant';
import { Buffer } from "buffer";


export const ApiBase = (token = null) => {
  var username = apiConstant.USER_NAME_API;
  var password = apiConstant.PASSWORD_API;  
  
  const tokenCred = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
  
  let instance = axios.create({
    baseURL: apiConstant.BASE_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${tokenCred}`
    },
  });

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
