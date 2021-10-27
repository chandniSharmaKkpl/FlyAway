import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ImageBackground,
  Pressable,
} from 'react-native';
import stylesHome from '../home/Home.style';
import commonStyle from '../../common/common.style';
import styles from './ClientCode.style';
import {LoginTextView, Loader, NotifyMessage} from '../../component';
import { appColor, appConstant, imageConstant, alertMsgConstant} from '../../constant';
import localDB from '../../database/localDb';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {requestToGetApiBase} from './ClientCode.action';
import {Platform} from 'react-native';
import PushController from '../../component/PushControllerTemp';
import { useNavigation } from '@react-navigation/native';
import AuthContext from '../../context/AuthContext';


const ClientCodeScreen = props => {
  const navigation = useNavigation();
const {setUserData} = React.useContext(AuthContext)
  const [clientCode, setClientCode] = useState('TONEAPPUAT');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const responseData = useSelector(state => state.ClientCodeReducer);
  const [deviceInfo, setDeviceInfo] = useState({}); // Getting user device info from push controller.

  // Getting device info from push controller
  const getDeviceInfo = value => {
    setDeviceInfo(value);
  };

  // React.useEffect(() => {

  //   console.log(" in effect", responseData); 

  //   checkResponseCode()
  // },[responseData, responseData.responseAccountUrl])

  const submitForm = () => {
    if (clientCode === '') {
      setError(alertMsgConstant.CLIENT_CODE_NOT_EMPTY);
    } else {
      // Call api here
      let param = {
        client: clientCode,
        DeviceType: Platform.OS === 'android' ? 'ANDROID' : 'IOS',
        DeviceId:
          'AAAA4fgIYKU:APA91bGXNo_Z0_F4CH1LXxt1gIdwZME-RmCUh_RVppfuTmYEHPxi5Cicx_M3A2iUyQcsFOOGb1Q5dfl8_qDROhvOfHjfnl0rf70aY5TJxR_DsIAabq-W_DJ1Mm5FcyBKQ66Fbpknyty5', //deviceInfo.device_uuid,
      };
      dispatch(requestToGetApiBase(param,navigation));
    }
  };

  const checkResponseCode = useCallback(
    () => {
      if (responseData.error && Object.keys(responseData.error).length !== 0) {
        console.log(" errr", responseData); 
        NotifyMessage(responseData.error); 
        return;
     }
     if (
       responseData && responseData.responseAccountUrl &&
       responseData.responseAccountUrl.length > 0 &&
       responseData.responseAccountUrl[0].code &&
       responseData.responseAccountUrl[0].code === 'Authenticate'
     ) {

       setUserData(responseData.clientToken);
       localDB.saveClientCode(clientCode);
       NotifyMessage(alertMsgConstant.LOGIN_SUCCESSFUL); 
       navigation.navigate(appConstant.DRAWER_NAVIGATOR);
     } 
    },
    [responseData],
  );

  // const checkResponseCode = () => 
  // };
  return (
    <>
     {checkResponseCode()}
      <View style={stylesHome.container}>
        <ImageBackground
          source={imageConstant.IMAGE_LOGIN_BACKGROUND}
          style={commonStyle.image}
          resizeMode={'cover'}>
          <View style={styles.logoImage}>
            <Image
              source={imageConstant.IMAGE_LOGO}
              resizeMode={'contain'}
              style={commonStyle.image}
            />
          </View>
          <View style={styles.titleView}>
            <Text style={styles.titleStyle}>Client Code</Text>
          </View>

          <View style={styles.inputView}>
            <LoginTextView
              placeholder="Enter Client Code"
              value={clientCode}
              error={error}
              onChangeText={value => {
                setClientCode(value);
                if (value.trim().length > 0) {
                  setError('');
                }
              }}
            />
            <Pressable style={styles.btnLogin} onPress={() => submitForm()}>
              <Text style={styles.loginBtnText}>Submit</Text>
            </Pressable>
          </View>
        </ImageBackground>
        {responseData.isRequesting ? (
          <Loader loading={responseData.isRequesting} />
        ) : null}
      </View>
      <PushController getDeviceInfo={getDeviceInfo} />
    </>
  );
};

export default ClientCodeScreen;
