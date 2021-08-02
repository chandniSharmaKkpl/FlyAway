import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, Image, FlatList, BackHandler} from 'react-native';
import stylesHome from '../home/Home.style';
import stylesCommon from '../../common/common.style';
import styles from './SiteTravelItinary.style';
import {HeaderCustom, BookingCard} from '../../component';
import {Avatar} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {appColor, appConstant, imageConstant} from '../../constant';
import {ScrollView} from 'react-native-gesture-handler';

const SiteTravelItinary = props => {
  const [arrayBooking, setArrayBooking] = useState([1]);

  React.useEffect(() => {
    let array = [1, 2, 3];
    arrayBooking.push(array);
    BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);

    return () => {
      BackHandler.removeEventListener(
        'hardwareBackPress',
        handleBackButtonClick,
      );
    };
  }, []);

  const handleBackButtonClick = () => {
    props.navigation.goBack();
  };

  const renderItem = item => {
    return (
      <View>
        <BookingCard
          item={item}
          titleColor={appColor.NAVY_BLUE}
          title={'Butler Park to Barrow Island'}
          viewName={appConstant.PICK_A_BUS}
        />
      </View>
    );
  };
  const onClickBack = useCallback(() => {
    props.navigation.goBack();
  }, []);

  const returnView = (title, value) => {
    return (
      <View style={{flexDirection: 'row', paddingTop:hp('1%'), paddingBottom:hp('1%')}}>
        <Text style={styles.textBlue}>{title}: </Text>
        <Text style={styles.textBlack}>{value}</Text>
      </View>
    );
  };

  return (
    <>
      <View style={stylesHome.container}>
        <HeaderCustom
          title={'Site Travel Itinerary'}
          viewName={appConstant.SITE_ITINARY}
          leftIcon={false}
          rightIcon={true}
          centerTitle={true}
          onClickRightIcon={() => onClickBack()}
          rightIconImage={imageConstant.IMAGE_ARROW_BACK}
        />
        <Text style={stylesCommon.textHeading}>Site Travel Itinerary</Text>

        {/* Bookinng Detail  */}
        <ScrollView style={{}}>
          {/* View user information */}
          <View style={styles.viewOutSide}>
            <View style={{padding: 15}}>
              {returnView('Name', 'Poole Boris')}
              {returnView('Bus Booking', 'Butler Park to Barrow Island')}
              {returnView('Date', 'Tue, July20,2021 to Tue, July 20, 2021')}
              {returnView('TRV', '3123')}
            </View>
          </View>

{/* View Travel information */}

<View style={styles.viewOutSide}>
  <View style={styles.viewInside}>

  </View>

</View>

        </ScrollView>
      </View>
    </>
  );
};

export default SiteTravelItinary;
