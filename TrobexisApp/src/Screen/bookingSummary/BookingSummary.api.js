import {actionConstant, apiConstant, appConstant} from '../../constant';
import {ApiBase} from '../../api/apiBase';

export const  postBooking = (token1, argument) => {
  // Get access token
//const accessToken = localDB.getAccessToken();

let dictTemp = argument.payload.params
dictTemp.userId = "BM123";
argument.payload.params = dictTemp

let urlString = apiConstant.POST_BUS_BOOKING;

return ApiBase(token1)
  .post(urlString, argument.payload.params)
  .then(response =>
    Promise.resolve({
      data: response,
      //status: response.status
    }).then(apiResponse => {
      // console.log("booking summary response ---> ",apiResponse);
      return apiResponse.data.data;
    }),
  ).catch(err=>{
      console.log("error ",err)
  });
  
};

