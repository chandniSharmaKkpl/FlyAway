import {takeLatest, take, call, put, select, all} from 'redux-saga/effects';
import DeviceInfo from 'react-native-device-info';

import {
  actionConstant,
  apiConstant,
  appConstant,
  errorCodeConstant,
} from '../../constant';
import {
  getApiBase,
  getClientTokenBasedOnApiBase,
  getAccountURL,
  getAccessTokenBaseOnClientToken,
} from './ClientCode.api';
import {isError} from '../../common';
import {setLoader} from './ClientCode.action';
import localDB from '../../database/localDb';

//** Worker Get Api Base  */

export function* workerGetApiBase(argumentData) {
  try {
    const apiBaseResponse = yield call(getApiBase, argumentData.payload.data);

    if (isError(apiBaseResponse)) {
      //** For showing global error message  */
      yield put({
        type: actionConstant.ACTION_API_ERROR_SUCCESS,
        payload: apiBaseResponse,
      });
      //** for handling failure scenario in each */
      yield put({
        type: actionConstant.ACTION_GET_API_BASE_FAILURE,
        payload: apiBaseResponse,
      });

      yield put(setLoader(false));
    } else {
      yield put({
        type: actionConstant.ACTION_GET_API_BASE_SUCCESS,
        payload: apiBaseResponse,
      });
      yield call(
        workerGetClientTokenBaseOnApiBase,
        argumentData.payload.data,
        apiBaseResponse,
      );
    }
  } catch (error) {
    yield put(setLoader(false));
    yield put({
      type: actionConstant.ACTION_API_ERROR_SUCCESS,
      payload: error,
    });
    yield put({
      type: actionConstant.ACTION_GET_API_BASE_FAILURE,
      payload: error,
    });
  }
}

//**  worker client Token based on api base  */

export function* workerGetClientTokenBaseOnApiBase(argumentData, apiBase) {
  try {
    const clientToken = yield call(
      getClientTokenBasedOnApiBase,
      argumentData,
      apiBase.value,
    );
    // console.log('  client Token  in saga -======>>>>>>', clientToken);
    if (isError(clientToken)) {
      yield put(setLoader(false));
      yield put({
        type: actionConstant.ACTION_API_ERROR_SUCCESS,
        payload: clientToken,
      });

      yield put({
        type: actionConstant.ACTION_GET_CLIENT_TOKEN_FAILURE,
        payload: clientToken,
      });
    } else {
      yield put({
        type: actionConstant.ACTION_GET_CLIENT_TOKEN_SUCCESS,
        payload: clientToken,
      });
      yield call(workerGetAccountUrl, argumentData, apiBase.value, clientToken);
    }
  } catch (error) {
    yield put(setLoader(false));
    yield put({
      type: actionConstant.ACTION_API_ERROR_SUCCESS,
      payload: error,
    });

    yield put({
      type: actionConstant.ACTION_GET_CLIENT_TOKEN_FAILURE,
      payload: error,
    });
  }
}

//** Worker Account URL  */

export function* workerGetAccountUrl(argumentData, apiBase, clientToken) {
  console.log(' argument data ---', argumentData);

  try {
    const responseAccountUrl = yield call(
      getAccountURL,
      argumentData,
      apiBase,
      clientToken,
    );
    if (isError(responseAccountUrl)) {
      yield put({
        type: actionConstant.ACTION_API_ERROR_SUCCESS,
        payload: responseAccountUrl,
      });
      yield put({
        type: actionConstant.ACTION_GET_ACCOUNT_URL_FAILURE,
        payload: responseAccountUrl,
      });
    } else {
      yield put({
        type: actionConstant.ACTION_GET_ACCOUNT_URL_SUCCESS,
        payload: responseAccountUrl,
      });

      let loginUrl = '';
      let responseLoginUrl = '';
      let functionUrl = '';

      if (responseAccountUrl && Array.isArray(responseAccountUrl)) {
        loginUrl = responseAccountUrl[0].value;
        responseLoginUrl = responseAccountUrl[0].value;
        loginUrl = loginUrl.replace(':mobileDeviceId', argumentData.DeviceId);

        functionUrl = responseAccountUrl[1].value;
        console.log(' functionurl ==', functionUrl);
      } else {
      }

      let user = {
        client: argumentData.client,
        clientToken: clientToken,
        deviceId: argumentData.DeviceId,
        apiBaseUrl: apiBase,
        loginUrl: loginUrl,
        responseLoginUrl: responseLoginUrl,
        functionUrl: functionUrl,
        //  userId: 'P000000443', // Temp
      };
      localDB.setUser(user);

      // *** Save client codes ***//
      const temp = localDB.getClientCode();
      // eslint-disable-next-line no-lone-blocks
      {
        Promise.resolve(temp).then(response => {
          if (response) {
            //** Only unique client codes will be saved  */
            if (response.indexOf(argumentData.client) < 0) {
              let arrayTemp = [...response, argumentData.client];
              localDB.saveClientCode(arrayTemp);
            }
          } else {
            //**For first time case */
            let arrayTemp = [argumentData.client];
            localDB.saveClientCode(arrayTemp);
          }
        });
      }

      // ** For stopping loader **//
      yield put(setLoader(false));
      //  argumentData.navigation.navigate(appConstant.DRAWER_NAVIGATOR); // Temp
      let dict = {loginUrl: loginUrl, responseLoginUrl: responseLoginUrl};
      argumentData.navigation.navigate(appConstant.LOGIN, {data: dict});
    }
  } catch (error) {
    yield put(setLoader(false));
    yield put({
      type: actionConstant.ACTION_API_ERROR_SUCCESS,
      payload: error,
    });
    yield put({
      type: actionConstant.ACTION_GET_ACCOUNT_URL_FAILURE,
      payload: error,
    });
  }
}

export function* watchGetApiBase() {
  yield takeLatest(
    actionConstant.ACTION_GET_API_BASE_REQUEST,
    workerGetApiBase,
  );
}

export default watchGetApiBase;
