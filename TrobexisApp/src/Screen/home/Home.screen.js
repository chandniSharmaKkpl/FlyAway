import React from 'react';
import {View, Text} from 'react-native';
import styles from './Home.style';
import Header from '../../component/Header';

const HomeScreen =(props)=>{

    return(
        <>
        <View style={styles.container}>
<Header />
            <Text style={{}}> Home Tab </Text>
        </View>
        </>
    )
}

export default HomeScreen; 