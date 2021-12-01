import AsyncStorage from '@react-native-async-storage/async-storage';
import {appConstant} from '../constant';

const getAccessToken = async () => {
  const temp = await AsyncStorage.getItem(appConstant.ACCESS_TOKEN);

  let token;
  if (temp) {
    token = temp;
    return token;
  } else {
  }
  return token;
};

const setAccessToken = async data => {
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
  Promise.resolve(user).then(response => {
    return response;
  });
}

const setUser = async data => {
  await AsyncStorage.setItem(appConstant.USER, JSON.stringify(data))
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

const getUserId = async () => {
  const temp = await AsyncStorage.getItem(appConstant.USERID);

  console.log("temp get userid data ---->", temp);

  let token;
  if (temp) {
    console.log("1 get userid data ---->", temp);
    token = temp;
    return token;
  } else {
  }
  return token;
};

const setUserId = async data => {
  console.log("1 set userid data ---->", data);
  await AsyncStorage.setItem(appConstant.USERID, data)
    .then(() => {
      console.log("Success set userid data ---->", data);

      return true;
    })
    .catch(() => {
      console.log("Failed to set userid data ---->");

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
  setUser,
getUserId, 
setUserId
};
