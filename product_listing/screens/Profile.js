import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [mobile, setMobile] = useState(null);

  useEffect(() => {
    // Function to fetch data from AsyncStorage
    const fetchStoredValue = async () => {
      try {
        // Get the value from AsyncStorage
        const emailVal = await AsyncStorage.getItem('EMAIL');
        const nameVal = await AsyncStorage.getItem('NAME');
        const mobileVal = await AsyncStorage.getItem('MOBILE');
        setEmail(emailVal);
        setName(nameVal);
        setMobile(mobileVal);
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };

    // Call the function to fetch data when the component mounts
    fetchStoredValue();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('NAME');
    await AsyncStorage.removeItem('EMAIL');
    await AsyncStorage.removeItem('MOBILE');
    navigation.navigate('Login');

  };

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome</Text>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.detail}>{email}</Text>
      <Text style={styles.detail}>{mobile}</Text>
      <TouchableOpacity style={[styles.button, {marginTop: 100}]} onPress={()=> navigation.navigate('Products')}>
        <Text style={styles.seeProduct}>See Products</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => logout()}
        style={[styles.button, {marginTop: 20}]}>
        <Text style={styles.seeProduct}>logout</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 15,
  },
  welcome: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  name: {
    fontSize: 30,
    color: 'brown',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  detail: {
    fontSize: 16,
    color: 'black',
  },
  button: {
    height: 60,
    backgroundColor: 'yellow',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  seeProduct: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'brown',
  },
});
