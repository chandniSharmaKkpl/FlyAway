import {actionConstant, apiConstant, appConstant} from '../../constant';
import {ApiBase} from '../../api/apiBase';


export const cancelSiteTravelItinary = (token1, argument) => {

  let urlString = apiConstant.GET_ITINARY_DETAIL;
  console.log("cancel  site travel param ", argument); 

  urlString = urlString.replace(":itineraryId", argument.payload.params)

  return ApiBase(token1)
    .delete(urlString)
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

export const getItinaryDetail = (token1, argument) => {
  let urlString = apiConstant.GET_ITINARY_DETAIL;

  urlString = urlString.replace(":itineraryId",argument.payload.params)

  return ApiBase(token1)
    .get(urlString)
    .then(response =>
      Promise.resolve({
        data: response,
        //status: response.status
      }).then(apiResponse => {
        console.log("trip detail response ", apiResponse); 
        return apiResponse.data.data;
      }),
    ).catch(err=>{
        console.log("error ",err)
    });
};
