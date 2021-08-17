import {actionConstant, apiConstant, appConstant} from '../../constant';
import localDB from '../../database/localDb';
import {ApiBase} from '../../api/apiBase';

export const getToken = () => {
    return ApiBase()
      .get(apiConstant.GET_ACCESS_TOKEN)
      .then(response =>
        Promise.resolve({
          data: response,
          //status: response.status
        }).then(accessToken => {
            console.log(' accessToken is', accessToken);

          return accessToken.data.data;
        }),
      );
  };

  export const  getUserProfile = (token1) => {
      // Get access token
//const accessToken = localDB.getAccessToken();

console.log(' getUserProfile token is ', token1);

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
          console.log(' user profile is in response', response);
          return response.data.data;
        }),
      );
  };