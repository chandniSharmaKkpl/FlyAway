import React, {useState, useCallback} from 'react';
import {View, Text, Image, FlatList, TouchableOpacity, Pressable} from 'react-native';
import stylesCommon from '../../../common/common.style';

import stylesHome from '../../home/Home.style';
import styles from './Reason.style';
import {HeaderCustom, BookingCard} from '../../../component';
import {Avatar} from 'react-native-elements';
import {appConstant, imageConstant} from '../../../constant';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Reason = props => {
  const [reason, setReason] = useState('Insufficient information');
  const [arrayReason, setArrayReason] = useState([]);
  const [showReasonList, setShowReasonList] = useState(false);
  const [comments, setComments] = useState('');

  return (
    <>
      <View style={stylesHome.container}>
        <HeaderCustom
          title={'Reason For Decline'}
          viewName={appConstant.REASON}
          leftIcon={true}
          onClickLeftIcon={() => moveBack()}
          rightIcon={false}
          centerTitle={true}
          onClickRightIcon={() => {}}
          rightIconImage={''}
        />
        <View style={styles.viewTextInput}>
          <Text style={styles.textHello}>Reason for Decline?</Text>
          <View style={styles.buttonReason}>
            <TouchableOpacity>
              <Text>{reason}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.viewTextInput}>
          <Text style={styles.textHello}>Comments (Options)</Text>
          
        </View>

        <Pressable
          style={stylesCommon.yellowButton}
          onPress={() => onClickBookSeat()}>
          <Text
            style={[
              styles.buttonSearchBusTitle,
              stylesCommon.yellowButtonTitle,
            ]}>
            Submit Reason
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default Reason;
