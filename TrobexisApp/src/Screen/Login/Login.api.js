import {actionConstant, apiConstant, appConstant} from '../../constant';
import localDB from '../../database/localDb';
import {ApiBase} from '../../api/apiBase';
import axios from 'axios';

export const getToken = () => {

let urlString = apiConstant.GET_ACCESS_TOKEN;

    return ApiBase()
      .get(urlString)
      .then(response => 
        Promise.resolve({
          data: response,
       
        }).then(response => {
          return response.data.data;
        }).catch(error=> {
          console.log('Error on Authentication', error);
        }),
      );


}