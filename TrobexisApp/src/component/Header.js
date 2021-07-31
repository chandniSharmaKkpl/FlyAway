import React from 'react';
import { View, TextInput, Image, Text, Pressable } from 'react-native';
import appColor from '../constant/colorConstant';
import imageConstant from '../constant/imageConstant'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import fontConstant from '../constant/fontConstant';

const HeaderCustom = (props) => {
  const { title, leftIcon, rightIcon, viewName, centerTitle, onClickRightIcon, rightIconImage } = props

  return (
    <View style={{
      flexDirection: 'row', justifyContent: 'space-between', height: hp('10%'),
      backgroundColor: appColor.NAVY_BLUE
    }}>

      <View style={{
        height: hp('2.5%'), width: wp('8%'),
        marginTop: hp('6%'),
        marginLeft: wp('4%')
      }}>
        {leftIcon ? <Image style={{ width: '100%', height: '100%' }} resizeMode={'contain'} source={imageConstant.IMAGE_MENU} />
          : null}
      </View>

      <Text style={styles.textTitle}>{title}</Text>

      <Pressable style={rightIconImage? styles.styleArrow: styles.styleBell}
        onPress={onClickRightIcon}
      >
        <Image style={{ width: '100%', height: '100%' }} resizeMode={'contain'}
          source={rightIconImage ? rightIconImage : imageConstant.IMAGE_GROUP_418} />
      </Pressable>
    </View>

  );
}

export default HeaderCustom;

const styles = {
  styleBell:{
    height: hp('3%'), width: wp('8%'),
    marginTop: hp('6%'),
    marginRight: wp('4%')
  },
  styleArrow:{
    height: hp('3%'), width: wp('6%'),
    marginTop: hp('6%'),
    marginRight: wp('4%')
  },
  textTitle: {
    fontFamily: fontConstant.BARLOW_BOLD,
    fontSize: fontConstant.TEXT_H2_SIZE_BOLD,
    color: appColor.WHITE,
    flexWrap: 'wrap',
    alignSelf: 'center',

    marginTop: hp('4%'),
  },
}