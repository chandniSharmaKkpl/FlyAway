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

export const  getBusStop = (token1,argument) => {
  // Get access token
//const accessToken = localDB.getAccessToken();


let urlString = apiConstant.GET_BUS_STOP;

let dictTemp = argument.payload.params
dictTemp.userId = "BM123";
argument.payload.params = dictTemp
console.log(" param ---> ",argument);

return ApiBase(token1)
  .post(urlString,argument.payload.params)
  .then(response =>
    Promise.resolve({
      data: response,
      //status: response.status
    }).then(apiResponse => {
      console.log(" response ---> ",apiResponse);
      return apiResponse.data.data;
    }),
  ).catch(err=>{
      console.log("error ",err)
  });
};

  