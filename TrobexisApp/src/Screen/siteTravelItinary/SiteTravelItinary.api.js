import {actionConstant, apiConstant, appConstant} from '../../constant';
import {ApiBase} from '../../api/apiBase';


export const cancelSiteTravelItinary = (token1, params) => {
  let urlString = apiConstant.GET_BUS_ROUTE;
  console.log(" site travel param ", params); 
  return ApiBase(token1)
    .post(urlString, params.payload.params)
    .then(response =>
      Promise.resolve({
        data: response,
        //status: response.status
      }).then(apiResponse => {
        console.log("cancel site travel response ", apiResponse); 

        return apiResponse.data.data;
      }),
    ).catch(err=>{
        console.log("error ",err)
    });
};

export const itinaryDetail = (token1, params) => {
  let urlString = apiConstant.GET_ITINARY_DETAIL;
  urlString = urlString.replace(":itineraryId","L4192" )

  console.log(" site travel param ", params); 

  return ApiBase(token1)
    .post(urlString, params.payload.params)
    .then(response =>
      Promise.resolve({
        data: response,
        //status: response.status
      }).then(apiResponse => {
        console.log("cancel site travel response ", apiResponse); 
        return apiResponse.data.data;
      }),
    ).catch(err=>{
        console.log("error ",err)
    });
};
