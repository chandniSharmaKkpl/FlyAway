import AsyncStorage from '@react-native-async-storage/async-storage';
import {appConstant} from '../constant';

const getAccessToken = async () => {
  const temp = await AsyncStorage.getItem(appConstant.ACCESS_TOKEN);

  let token;
  if (temp) {
    token = temp;
    console.log(' data get toekn===', token);
    return token;
  } else {
  }
  return token;
};

const setAccessToken = async data => {
  console.log(" save token ", data )
  await AsyncStorage.setItem(appConstant.ACCESS_TOKEN, data)
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

const getUser = async () => {
  const temp = await AsyncStorage.getItem(appConstant.USER);

  let user;
  if (temp) {
    user = JSON.parse(temp);
    
    return user;
  } else {
  }
  return user;
};

export  const getUser1 = () => {
  const user = getUser();
  console.log(' data get toekn===', user);

  Promise.resolve(user).then(response => {
    console.log(' data get toekn123345===', response);

    return response;
  });
}

const setUser = async data => {
  console.log(" save token ", data )
  await AsyncStorage.setItem(appConstant.USER, JSON.stringify(data))
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};


export default {
  getAccessToken,
  setAccessToken,
  getBaseUrl,
  setBaseUrl,
  saveClientCode,
  getClientCode,
  getUser, 
  setUser

};
