import React, {useState, useCallback} from 'react';
import {Pressable, Image} from 'react-native';
import styles from './Login.style';
import {Loader, HeaderCustom} from '../../component';
import {useDispatch} from 'react-redux';
import {connect} from 'react-redux';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {ImageBackground} from 'react-native';
import commonStyle from '../../common/common.style';
import {appColor, appConstant, imageConstant} from '../../constant';
import {requestToGetAccessToken} from './Login.action';
import {isEmailValid, isMobileNumberValid} from '../../helper/validations';
import alertMsgConstant from '../../constant/alertMsgConstant';
import AuthContext from '../../context/AuthContext';
import PushController from '../../component/PushControllerTemp';
import {WebView} from 'react-native-webview';
import {useRoute, useNavigation} from '@react-navigation/core';
import localDb from '../../database/localDb';

const LoginScreen = props => {
  const [isClickEye, setIsClickEye] = useState(false);
  //const newAccesstoken = get; // Getting api response
  const {setUserData} = React.useContext(AuthContext);

  const [deviceInfo, setDeviceInfo] = useState({}); // Getting user device info from push controller.
  const [userTemp, setUserTemp] = React.useState({
    email: '',
    password: '',
  });

  const [token, setToken] = React.useState({});

  const [error, setError] = React.useState({
    emailErr: '',
    passwordErr: '',
  });
  const route = useRoute();
  const [formErr, setFormError] = React.useState('');

  const [checked, setChecked] = React.useState(false);

  const [loading, setLoading] = React.useState(true);
  const dispatch = useDispatch(); // Calling api
  const [loginUrl, setLoginUrl] = useState(null);

  React.useEffect(() => {
    let isUserAvailable = false;
    const unsubscribe = props.navigation.addListener('focus', () => {
      setError({emailErr: '', passwordErr: ''});
      if (!isUserAvailable) {
        setUserTemp({email: '', password: ''});
      }
      setFormError('');
    });

    const tempUser = localDb.getUser();
    Promise.resolve(tempUser).then(response => {
      if (response) {
        console.log('navigator response ==>', response);
        if (response.loginUrl) {
          setLoginUrl(response.loginUrl);
        }
      }
    });
    return unsubscribe;
  }, [error]);

  function Validate({email, password}) {
    let emailErr = '';
    let passwordErr = '';

    if (email.trim() === '') {
      emailErr = alertMsgConstant.EMAIL_NOT_EMPTY;
    } else if (!isEmailValid(email)) {
      emailErr = alertMsgConstant.EMAIL_NOT_VALID;
    }

    if (password.trim() === '') {
      passwordErr = alertMsgConstant.PASSWORD_NOT_EMPTY;
    }

    if (emailErr === '' && passwordErr === '') {
      return 'ok';
    } else {
      return {
        emailErr,
        passwordErr,
      };
    }
  }

  const submitForm = () => {
    const validate = Validate(userTemp);

    setError(
      validate !== 'ok'
        ? validate
        : {
            emailErr: '',
            passwordErr: '',
          },
    );

    console.log(' validate is ===', validate);
    // Temporary commit this condition
    if (validate === 'ok') {
      dispatch(requestToGetAccessToken());
    }
  };
  // Getting device info from push controller
  const getDeviceInfo = value => {
    console.log(' device info ----->', value);
    setDeviceInfo(value);
  };

  const checkRememberMe = async () => {
    setChecked(!checked);
  };

  const setLoggedInUserInLocalDB = data => {
    if (checked) {
      if (data) {
        if (setCurrentUser(data)) {
        }
      }
    }
  };
  const onPressRight = () => {
    setIsClickEye(!isClickEye);
  };

  const movetToScreen = useCallback(
    token => {
      //  console.log(" token are ===", token);

      if (token && token.token) {
        //setUserData(token)
        props.navigation.navigate(appConstant.DRAWER_NAVIGATOR);
      }
    },
    [props.accessToken],
  );

  const hideSpinner = () => {
    setLoading(false);
  };

  return (
    <>
      <WebView
        onLoad={() => hideSpinner()}
        style={styles.webview}
        source={{
          uri: route && route.params ? route.params.loginUrl : loginUrl,
        }}></WebView>
      {/* <TextInput 
              value={route && route.params && route.params.loginUrl? route.params.loginUrl: loginUrl}
              style={styles.tokenStyle}
              multiline={true}
            /> */}
      <Pressable
        style={styles.iconHeader}
        onPress={() => props.navigation.goBack()}>
        <Image
          style={{width: '100%', height: '100%'}}
          resizeMode={'contain'}
          source={imageConstant.IMAGE_ARROW_BACK}
        />
      </Pressable>

      {loading && <Loader viewName={appConstant.LOGIN} loading={loading} />}
    </>
  );
};

const mapStateToProps = state => {
  // Redux Store --> Component
  return {
    accessToken: state.LoginReducer.accessToken,
    isRequesting: state.LoginReducer.isRequesting,
  };
};
// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)

export default connect(mapStateToProps, null)(LoginScreen);
