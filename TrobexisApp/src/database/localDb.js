import AsyncStorage from '@react-native-async-storage/async-storage';
import {appConstant} from '../constant';
const clearAll = async () => {
  try {
    await AsyncStorage.clear();
  } catch (e) {
    // clear error
  }

  console.log('Done.');
};
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

const saveClientCode = async clientCodeArray => {
  await AsyncStorage.setItem(
    appConstant.CLIENT_CODE,
    JSON.stringify(clientCodeArray),
  )
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

const getClientCode = async () => {
  const clientCode = await AsyncStorage.getItem(appConstant.CLIENT_CODE);
  let clientCodeArray;
  if (clientCode) {
    clientCodeArray = JSON.parse(clientCode);
    return clientCodeArray;
  } else {
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

export const getUser1 = () => {
  const user = getUser();
  Promise.resolve(user).then(response => {
    return response;
  });
};

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

  let token;
  if (temp) {
    token = temp;
    return token;
  } else {
  }
  return token;
};

const setUserId = async data => {
  await AsyncStorage.setItem(appConstant.USERID, data)
    .then(() => {
      return true;
    })
    .catch(() => {
      return false;
    });
};

const setUserSettings = async (data) => {
  await AsyncStorage.setItem(appConstant.USER_SETTING, JSON.stringify(data))
  .then(() => {
    return true;
  })
  .catch(() => {
    return false;
  });
};

const getUserSettings = async () => {
  const userSettings = await AsyncStorage.getItem(appConstant.USER_SETTING);
  let userSettingsArray;
  if (userSettings) {
    userSettingsArray = JSON.parse(userSettings);
    var itemArray = userSettingsArray.settings;
  
    return itemArray;
  } else {
    return null;
  }
};

// const setHomeScreenPath = async () => {
//   await AsyncStorage.setItem(appConstant.HOME_SCREEN_PATH);
//   then(() => {
//     return true;
//   })
//   .catch (() => {
//     return false;
//   });
// };

// const getHomeScreenPath = async () => {
//   const path = await AsyncStorage.getItem(appConstant.HOME_SCREEN_PATH);
//   let pathName;
//   if (path) {
//     pathName = JSON.parse(path);
//     console.log("Path ====>", pathName);
//     return pathName;
//   } else {
//   }
//   return pathName;
// };


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
  setUserId,
  clearAll,
  getUserSettings,
  setUserSettings,
  // setHomeScreenPath,
  // getHomeScreenPath
};
