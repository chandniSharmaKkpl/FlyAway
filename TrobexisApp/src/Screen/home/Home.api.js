import {actionConstant, apiConstant, appConstant} from '../../constant';
import localDB from '../../database/localDb';
import {ApiBase} from '../../api/apiBase';



  export const  getUserProfile = (token1) => {
      // Get access token
//const accessToken = localDB.getAccessToken();


    let urlString = apiConstant.USER_PROFILE;
    console.log(urlString);
   urlString = urlString.replace(":userId","BM123" )
   console.log(urlString);

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

  export const  getItinaryList = (token1) => {
    // Get access token
//const accessToken = localDB.getAccessToken();


  let urlString = apiConstant.GET_ITINARY_LIST;
  console.log(urlString);
 urlString = urlString.replace(":userId","BM123" )
 console.log(urlString);

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

export const  getItinaryListAllJourney = (token1) => {
  // Get access token
//const accessToken = localDB.getAccessToken();


let urlString = apiConstant.GET_ITINARY_LIST_ALL_JOURNEY;
console.log(urlString);
urlString = urlString.replace(":userId","BM123" )
console.log(urlString);

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


export const  getApprovalList = (token1) => {
  // Get access token
//const accessToken = localDB.getAccessToken();

let urlString = apiConstant.GET_APPROVAL_LIST;
console.log(urlString);
urlString = urlString.replace(":userId","BM123" )
console.log(urlString);

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


  export const  getItinaryDetail = (token1, itinaryId) => {
    // Get access token
//const accessToken = localDB.getAccessToken();

console.log(' itinary detail token is ', token1);

  let urlString = apiConstant.GET_ITINARY_DETAIL;
  console.log(urlString);
 urlString = urlString.replace(":itineraryId","L4192" )
 console.log(urlString);

  return ApiBase(token1)
    .get(urlString)
    .then(response => 
      Promise.resolve({
        data: response,
        //status: response.status
      }).then(response => {
        console.log('itinary detail is in response', response);
        return response.data.data;
      }),
    );
};