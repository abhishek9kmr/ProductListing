import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 2000)
  }, []);
  const checkLogin = async () => {
    const email = await AsyncStorage.getItem('EMAIL');
    console.log('Email', email);
    if (email !== null) {
      navigation.navigate('Profile');
      console.log('Profile');
    } else {
      navigation.navigate('Signup');
      console.log('Signup');
    }
  };
  return (
    <View style={styles.container}>
      <View style={[styles.circle, { marginLeft: -200, marginTop: -200, backgroundColor: 'brown'}]}></View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={styles.splashTxt}>{'Product List\nApp'}</Text>
      </View>
      <View style={[styles.circle, { marginLeft: 200, marginBottom: -200, backgroundColor: 'yellow'}]}></View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  splashTxt: {
    color: 'black',
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  circle: {height: 400, width: 400, borderRadius: 200},
});
