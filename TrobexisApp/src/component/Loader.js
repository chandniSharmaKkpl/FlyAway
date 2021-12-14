import React from 'react';
import {View, ActivityIndicator} from 'react-native';
import {appColor} from '../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {BackgroundImage} from 'react-native-elements/dist/config';

const Loader = props => {
  const {loading} = props;
  return (
    <>
      {loading ? (
        <View style={props.viewName ? styles.viewWeb : styles.viewTransparant}>
          <ActivityIndicator size="large" color={appColor.NAVY_BLUE} />
        </View>
      ) : null}
    </>
  );
};

const styles = {
  viewTransparant: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    //   backgroundColor:'pink',
    width: wp('100%'),
    height: hp('100%'),
  },
  viewWeb: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: 'rgb(173,207,240)' ,
    width: wp('100%'),
    height: hp('100%'),
  },
};

export default Loader;
