import {actionConstant} from '../../constant';

//  Bus Route

 export const requestToGetBusRoute = () => ({
    type: actionConstant.ACTION_GET_BUS_ROUTE_REQUEST,
    payload: {
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

  //  Bus Stops

 export const requestToGetBusStop = () => ({
  type: actionConstant.ACTION_GET_BUS_STOP_REQUEST,
  payload: {
  },
});


export const successToGetBusStop = (data) => ({
  type: actionConstant.ACTION_GET_BUS_STOP_SUCCESS,
  payload: {
    data: data,
  },
});

export const failToGetBusStop = (error) => ({
  type: actionConstant.ACTION_GET_BUS_STOP_FAILURE,
  payload: {
    data: error,
  },
});




export default{
  requestToGetBusRoute, 
  requestToGetBusStop,

  }