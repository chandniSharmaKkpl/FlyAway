import {actionConstant, apiConstant, appConstant} from '../../constant';
import localDB from '../../database/localDb';
import {ApiBase} from '../../api/apiBase';

export const getToken = () => {
  console.log("token","call hhere");
    return ApiBase()
      .get(apiConstant.GET_ACCESS_TOKEN)
      .then(response =>
        Promise.resolve({
          data: response,
          //status: response.status
        }).then(accessToken => {
          console.log("token",accessToken);
          return accessToken.data.data;
        }),
      ).catch(err=>{
          console.log("error ",err)
      });
  };
