import {actionConstant, apiConstant, appConstant} from '../../constant';
import localDB from '../../database/localDb';
import {ApiBase} from '../../api/apiBase';

export const getToken = () => {
  let data = {
    "token": "202109110610177083178a1aaad3e4681b2b15aa58e765886b",
    "expirydatetimeutc": "2021-09-11T08:06:19Z"
}
  return data;
  console.log("token","call hhere");
    return ApiBase()
      .get(apiConstant.GET_ACCESS_TOKEN)
      .then(response =>
        Promise.resolve({
          data: response
        }).then(accessToken => {
          console.log("token",accessToken);
          return accessToken.data.data;
        }),
      ).catch(err=>{
          console.log("error in Login api ===> ",err)
      });
  };
