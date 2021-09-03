import {actionConstant, apiConstant, appConstant} from '../../constant';
import {ApiBase} from '../../api/apiBase';

export const  postBooking = (token1, params) => {
  // Get access token
//const accessToken = localDB.getAccessToken();

console.log(" bus route param ", params); 

let urlString = apiConstant.POST_BUS_BOOKING;
console.log(urlString);

return ApiBase(token1)
  .post(urlString, params.payload.params)
  .then(response => {
    console.log(" post booking ", response); 

    Promise.resolve({
      data: response,
      //status: response.status
    }).then(response => {
      console.log(" post booking 222", response); 
      return response.data.data;
    }) },
  );
};

