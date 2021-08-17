
import AsyncStorage from '@react-native-async-storage/async-storage'
import {appConstant} from '../constant';

const getAccessToken = async () => {
    const temp = await AsyncStorage.getItem(appConstant.ACCESS_TOKEN)

    let user
     if (temp) {
         user = JSON.parse(temp);
         console.log(" data ===", user ); 
         return user;
     } else {
         
     }
     return user;
}


const setAccessToken = async (data) => {
    await AsyncStorage.setItem(appConstant.ACCESS_TOKEN, JSON.stringify(data))
    .then(() => {
        return true;
    })
    .catch(() => {
        return false;
    })
}

export default{
    getAccessToken,
    setAccessToken
}