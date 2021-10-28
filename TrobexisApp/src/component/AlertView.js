import React from 'react';
import {View, Text, Image} from 'react-native';
import appColor from '../constant/colorConstant';
import fontConstant from '../constant/fontConstant';
import format from 'date-fns/format';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import imageConstant from '../constant/imageConstant';
import appConstant from '../constant/appConstant';
import {Pressable} from 'react-native';

const AlertView = props => {
  const {title, subtitle, confirmBtnTxt, cancelBtnTxt, buttonCount, bigBtnText, onPressConfirmBtn, onPressCancel, onPressBigBtn} = props;

  return (
    <View style={styles.viewOutSide}>
      <View style={styles.viewInside1}>
        <Text style={styles.textTitle}>{title}</Text>
        <Text style={styles.textSubtitle}>{subtitle}</Text>

        <View style={styles.viewButtons}>
          <Pressable style={styles.buttonYellow} onPress={onPressConfirmBtn}>
            <Text style={styles.textButtons}>{confirmBtnTxt}</Text>
          </Pressable>
          <Pressable style={styles.buttonRed} onPress={onPressCancel}>
            <Text style={styles.textButtons}>{cancelBtnTxt}</Text>
          </Pressable>
         
         {buttonCount === 3? <View>
            <Pressable style={styles.buttonRed} onPress={onPressBigBtn}>
            <Text style={styles.textButtons}>{bigBtnText}</Text>
          </Pressable>
          </View>: null }
        </View>
      </View>
    </View>
  );
};

const styles = {
  viewButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    //backgroundColor:'pink',
    width:'100%', 
    paddingLeft:'2%',
    paddingRight:'2%',
    alignItems:'center',
    height:'25%',
    marginTop:'5%'
  },
  viewOutSide: {
    width: wp('100%'),
    height: hp('100%'),
    backgroundColor: 'rgba(0,0,0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewInside1: {
    backgroundColor: appColor.WHITE,
    width: wp('90%'),
    height: hp('20%'),
    borderRadius: 10,
    alignItems:'center',
    alignSelf:'center'
  },
  textTitle: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H2_SIZE_BOLD,
    color: appColor.GRAY,
    paddingBottom:'2%',
    paddingTop:'5%'
  },
  textSubtitle: {
    fontFamily: fontConstant.BARLOW_REGULAR,
    fontSize: fontConstant.TEXT_17_SIZE_REGULAR,
    color: appColor.GRAY,
    paddingBottom:'2%',
    paddingTop:'2%'
  },
  textButtons: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H3_SIZE_BOLD,
    color: appColor.WHITE,
   // padding:'5%'
  },
  buttonYellow: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: '45%',
    height:'100%',
    alignSelf: 'center',
    // marginTop: '2%',
    // marginBottom: '2%',
    // width:wp('15%'),
    // height:hp('5%'),
    backgroundColor: appColor.YELLOW,
  },
  buttonRed: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    width: '45%',
    height:'100%',
    alignSelf: 'center',
    // marginTop: '2%',
    // marginBottom: '2%',
    // width:wp('15%'),
    // height:hp('5%'),
    backgroundColor: appColor.RED,
  },
};

export default AlertView;
