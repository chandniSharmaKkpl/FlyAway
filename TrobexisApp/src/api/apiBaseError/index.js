import axios from 'axios';
import { apiConstant } from '../../constant';
import { Buffer } from "buffer";

let instance = axios.create({
    baseURL: apiConstant.ERROR_API_BASE_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  
export default instance;  
// export default ApiBase = (token = null) => {
//   var username = apiConstant.USER_NAME_API;
//   var password = apiConstant.PASSWORD_API;  
  
//   const tokenCred = Buffer.from(`${username}:${password}`, 'utf8').toString('base64')
  
 
//   return instance;
// };
