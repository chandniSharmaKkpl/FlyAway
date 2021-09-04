import {actionConstant, apiConstant, appConstant} from '../../constant';
import localDB from '../../database/localDb';
import {ApiBase} from '../../api/apiBase';

export const  getBusRoute = (token1) => {
  // Get access token
//const accessToken = localDB.getAccessToken();

let urlString = apiConstant.GET_BUS_ROUTE;
return ApiBase(token1)
  .get(urlString)
  .then(response => 
    Promise.resolve({
      data: response,
      //status: response.status
    }).then(response => {
      return response.data.data;
    }),
  );
};

export const  getBusStop = (token1) => {
  // Get access token
//const accessToken = localDB.getAccessToken();


let urlString = apiConstant.GET_BUS_STOP;
console.log(urlString);

return ApiBase(token1)
  .get(urlString)
  .then(response => 
    Promise.resolve({
      data: response,
      //status: response.status
    }).then(response => {
      console.log(" bus stop "); 
      return response.data.data;
    }),
  );
};

  