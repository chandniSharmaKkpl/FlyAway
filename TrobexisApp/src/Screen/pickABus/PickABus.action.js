import {actionConstant} from '../../constant';

//  Bus Route

 export const requestToGetBusRoute = (params) => ({
    type: actionConstant.ACTION_GET_BUS_ROUTE_REQUEST,
    payload: {
      params
    },
  });
  
  
  export const successToGetBusRoute = (data) => ({
    type: actionConstant.ACTION_GET_BUS_ROUTE_SUCCESS,
    payload: {
      data: data,
    },
  });
  
  export const failToGetBusRoute = (error) => ({
    type: actionConstant.ACTION_GET_BUS_ROUTE_FAILURE,
    payload: {
      data: error,
    },
  });

  export default{
    requestToGetBusRoute
  }