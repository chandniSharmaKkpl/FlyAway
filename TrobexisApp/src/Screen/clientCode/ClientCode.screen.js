import React, {useState, useCallback} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ImageBackground,
  Pressable,
  TextInput,
  BackHandler,
  Keyboard
} from 'react-native';
import stylesHome from '../home/Home.style';
import commonStyle from '../../common/common.style';
import styles from './ClientCode.style';
import {LoginTextView, Loader, AlertView} from '../../component';
import {
  appColor,
  appConstant,
  imageConstant,
  alertMsgConstant,
} from '../../constant';
import localDB from '../../database/localDb'; 

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {requestToGetApiBase} from './ClientCode.action';
import {Platform} from 'react-native';
import PushController from '../../component/PushControllerTemp';
import {useNavigation} from '@react-navigation/native';
import AuthContext from '../../context/AuthContext';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';


const ClientCodeScreen = props => {
  const navigation = useNavigation();
  const {setUserData} = React.useContext(AuthContext);
  const [clientCode, setClientCode] = useState(''); //TONEAPPUAT
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const responseData = useSelector(state => state.ClientCodeReducer);
  const [deviceInfo, setDeviceInfo] = useState({}); // Getting user device info from push controller.
  const [isAlertShow, setIsAlertShow] = useState(false);
  //const [countBack, setCountBack] = React.useState(0)
  var countBack = 0;
  // Getting device info from push controller
  const getDeviceInfo = value => {
    setDeviceInfo(value);
  };
  const handleBackButtonClick = () => {
    countBack = countBack + 1;
    console.log(' back count   ', countBack);

    if (countBack > 1) {
     setIsAlertShow(true)
    } 
    return true;
  };

  React.useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
    return () => {
      BackHandler.removeEventListener(
        "hardwareBackPress",
        handleBackButtonClick
      );
    };
  },[])

  const submitForm = () => {
    
    if (clientCode === '') {
      setError(alertMsgConstant.CLIENT_CODE_NOT_EMPTY);
    } else {
      // Call api here
      let param = {
        client: clientCode,
        DeviceType: Platform.OS === 'android' ? 'ANDROID' : 'IOS',
        DeviceId: deviceInfo.device_token,
      };
     // console.log(" param --->", param); 
      dispatch(requestToGetApiBase(param, navigation));
    }
  };

  const checkResponseCode = useCallback(() => {
    if (responseData.error && Object.keys(responseData.error).length !== 0) {
      console.log(' errr', responseData);
      toast.show(responseData.error,{type: alertMsgConstant.TOAST_DANGER})
      return;
    }
    if (
      responseData &&
      responseData.responseAccountUrl &&
      responseData.responseAccountUrl.length > 0 &&
      responseData.responseAccountUrl[0].code &&
      responseData.responseAccountUrl[0].code === 'Authenticate'
    ) {
      console.log(' response data ', responseData);
      let loginUrl = responseData.responseAccountUrl[0].value; 
      loginUrl = loginUrl.replace(":mobileDeviceId", deviceInfo.device_token);
    
      let user = {
        clientToken: responseData.clientToken,
        deviceId:deviceInfo.device_token,
        apiBaseUrl: responseData.apiBaseData.value,
        loginUrl: loginUrl
      };

      localDB.setUser(user);
    // Making the client code screen empty 
       setClientCode('');  
    
     //  props.navigation.navigate(appConstant.DRAWER_NAVIGATOR);

       navigation.navigate(appConstant.LOGIN, {loginUrl: loginUrl});
    }
  }, [responseData]);

  // const checkResponseCode = () =>
  // };
  return (
    <>
      {checkResponseCode()}
      <Pressable style={stylesHome.container} onPress={()=> Keyboard.dismiss()}>
       
        <ImageBackground
          source={imageConstant.IMAGE_LOGIN_BACKGROUND}
          style={commonStyle.image}
          resizeMode={'cover'}>
 <KeyboardAwareScrollView>
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

          {/* <TextInput 
              value={deviceInfo.device_token? deviceInfo.device_token: ''}
              style={styles.tokenStyle}
              multiline={true}
            /> */}
            </KeyboardAwareScrollView>
        </ImageBackground>
        
        {responseData.isRequesting ? (
          <Loader loading={responseData.isRequesting} />
        ) : null}
      </Pressable>
      {isAlertShow ? (
        <AlertView
          title={alertMsgConstant.PLEASE_CONFIRM}
          subtitle={alertMsgConstant.EXIT_CONFIRM}
          confirmBtnTxt={alertMsgConstant.YES}
          cancelBtnTxt={alertMsgConstant.NO}
          buttonCount={2}
          bigBtnText={''}
          onPressConfirmBtn={() => {
            setIsAlertShow(false);
            BackHandler.exitApp()
          }}
          onPressCancel={() => {
            setIsAlertShow(false);
            countBack = 0;
          }}
          onPressBigBtn={() => {
          }}
        />
      ) : null}
      <PushController getDeviceInfo={getDeviceInfo} navigation={navigation}/>
    </>
  );
};

export default ClientCodeScreen;
