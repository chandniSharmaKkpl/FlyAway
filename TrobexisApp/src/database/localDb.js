import AsyncStorage from '@react-native-async-storage/async-storage';
import {appConstant} from '../constant';

const getAccessToken = async () => {
  const temp = await AsyncStorage.getItem(appConstant.ACCESS_TOKEN);

  let user;
  if (temp) {
    user = JSON.parse(temp);
    console.log(' data ===', user);
    return user;
  } else {
  }
  return user;
};

const setAccessToken = async data => {
  await AsyncStorage.setItem(appConstant.ACCESS_TOKEN, JSON.stringify(data))
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

const getBaseUrl = async () => {
  const temp = await AsyncStorage.getItem(appConstant.API_BASE_URL);

  if (temp) {
    return temp;
  } else {
    return '';
  }
};

const setBaseUrl = async baseURL => {
  await AsyncStorage.setItem(appConstant.API_BASE_URL, baseURL)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

const saveClientCode = async clientCode => {
  await AsyncStorage.setItem(appConstant.CLIENT_CODE, clientCode)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

const getClientCode = async () => {
  const clientCode = await AsyncStorage.getItem(appConstant.CLIENT_CODE);
  if (clientCode) {
    return clientCode;
  } else {
    return '';
  }
};

export default {
  getAccessToken,
  setAccessToken,
  getBaseUrl,
  setBaseUrl,
  saveClientCode,
  getClientCode
};
