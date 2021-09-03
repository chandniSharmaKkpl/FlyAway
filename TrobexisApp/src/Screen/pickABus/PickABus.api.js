import {actionConstant, apiConstant, appConstant} from '../../constant';
import {ApiBase} from '../../api/apiBase';

export const getBusRoute = (token1, params) => {
  let urlString = apiConstant.GET_BUS_ROUTE;
  console.log(urlString);

  return ApiBase(token1)
    .post(urlString, params.payload.params)
    .then(response =>
      Promise.resolve({
        data: response,
        //status: response.status
      }).then(accessToken => {
        console.log("Route",accessToken);
        return accessToken.data.data;
      }),
    ).catch(err=>{
        console.log("error ",err)
    });
};
