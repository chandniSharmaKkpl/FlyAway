import React, {useState, useCallback, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Pressable,
  TextInput,
  Keyboard
} from 'react-native';
import stylesCommon from '../../../common/common.style';

import stylesHome from '../../home/Home.style';
import styles from './Reason.style';
import {HeaderCustom, BookingCard} from '../../../component';
import {Avatar} from 'react-native-elements';
import {appConstant, imageConstant} from '../../../constant';
import IconAntDesing from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Reason = props => {
  const [reason, setReason] = useState('Insufficient information');
  const [arrayReason, setArrayReason] = useState([]);
  const [showReasonList, setShowReasonList] = useState(false);
  const [comments, setComments] = useState('');
  const[textLimit, setTextLimit] = useState(0)

  useEffect(() => {
    // Call api to get reasons list
  }, []);

  renderReasonList = (item, index) => {
    return (
      <View>
        <Text style={styles.textRow}>Reason list </Text>
      </View>
    );
  };
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
        <View>
        <View style={styles.viewTextInput}>
          <Text style={styles.textHello}>Reason for Declining?</Text>
          <View style={styles.buttonReason}>
            <TouchableOpacity
            style={styles.buttonInsideReason}
              onPress={() => {
                setShowReasonList(!showReasonList);
              }}>
              <Text>{reason}</Text>
             {showReasonList? <IconAntDesing 
              name="caretdown"
              style={styles.iconCaret}
              /> :
              <IconAntDesing 
              name="caretup"
              style={styles.iconCaret}
              />
              }
            </TouchableOpacity>
          </View>
        </View>
       

        <View style={styles.viewTextInput}>
          <Text style={styles.textHello}>Comments (Options)</Text>
          <View style={styles.textAreaContainer}>
            <TextInput
              style={styles.textArea}
              underlineColorAndroid="transparent"
              placeholder="Add additional comment"
              placeholderTextColor="grey"
              numberOfLines={10}
              multiline={true}
              value={comments}
              onChangeText={(value)=>{
                if (value.length<=appConstant.COMMENT_MAX_LIMIT) {
                  setComments(value);
                 setTextLimit(value.length)
                }
                
              }}
            >
              </TextInput>
              <Text style={styles.textLimit}>{textLimit}/{appConstant.COMMENT_MAX_LIMIT}</Text>

          </View>
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
        {showReasonList ? (
          <View style={styles.viewFlatList}>
            <FlatList
              data={arrayReason}
              renderItem={renderReasonList}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        ) : null}
        </View>
      </View>
    </>
  );
};

export default Reason;
