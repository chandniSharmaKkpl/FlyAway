import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  BackHandler,
  Pressable,
} from 'react-native';
import stylesHome from '../home/Home.style';
import styles from './AddLuggage.style';
import stylesCommon from '../../common/common.style';
import {HeaderCustom, BookingCard} from '../../component';
import {Avatar} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {appColor, appConstant, imageConstant} from '../../constant';
import IconFontisto from 'react-native-vector-icons/Fontisto';
import commonStyle from '../../common/common.style';

const AddLuggage = props => {
    const [countLuggage, setCountLuggage] = useState(0);
    const [strCounLuggageShow, setStrCounLuggageShow] = useState("00");
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

  

  const onClickBack = useCallback(() => {
    props.navigation.goBack();
  }, []);
  return (
    <>
      <View style={stylesHome.container}>
        <HeaderCustom
          title={'Add Luggage'}
          viewName={appConstant.ADD_LUGGAGE}
          onClickLeftIcon={()=> props.navigation.goBack()}
          leftIcon={true}
          rightIcon={false}
          centerTitle={true}
          onClickRightIcon={() => {}}
          rightIconImage={''}
        />
        <Text style={stylesCommon.textHeading}>
          Are you taking any luggage?
        </Text>

        <View style={styles.viewOutSide}>
          <View style={styles.viewLuggage}>
            <Pressable style={styles.viewMinus} onPress={()=> {
                if (countLuggage< 1) {
                    setCountLuggage(0);
                }else{
                    setCountLuggage( countLuggage-1);
                }
                setStrCounLuggageShow((countLuggage < 10 ? "0" : "") + countLuggage);


            }}>
              <IconFontisto name="minus-a" style={styles.iconMinus}/>
            </Pressable>

            <View style={styles.viewCount}>
              <Text style={styles.textCount}>{strCounLuggageShow}</Text>
              <Text style={styles.textPiece}>Pieces</Text>
            </View>

            <Pressable style={styles.viewMinus}  onPress={()=> {
                setCountLuggage( countLuggage+1);
                setStrCounLuggageShow((countLuggage < 10 ? "0" : "") + countLuggage);

            }}>
              <IconFontisto name="plus-a" style={styles.iconMinus}/>
            </Pressable>
          </View>
        </View>

        <Pressable
          style={commonStyle.yellowButton}
          onPress={() =>
            props.navigation.navigate(appConstant.BOOKING_SUMMARY, {luggageData:{
              "pickABusData": props.route.params.pickABusData,
              "countLuggage":countLuggage
            }})
          }>
          <Text style={stylesCommon.yellowButtonTitle}>Next</Text>
        </Pressable>
      </View>
    </>
  );
};

export default AddLuggage;
