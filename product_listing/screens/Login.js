import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signup = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async(email, password) => {
    try {
      // Query Firestore to find a user with the provided email
      const userSnapshot = await firestore().collection('users').where('email', '==', email).limit(1).get();
  
      // Check if a user with the provided email exists
      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        
        // Check if the password matches
        if (userData.password === password) {
          console.log(userData?.name, userData?.email, userData?.mobile)
          goToNext(userData?.name, userData?.email, userData?.mobile)
        } else {
          console.log('Incorrect password');
        }
      } else {
        console.log('User not found');
      }
    } catch (error) {
      console.error('Error checking credentials:', error);
    }
      
  };

  const goToNext=async (name, email, mobile)=>{
    await AsyncStorage.setItem('NAME', name);
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('MOBILE', mobile);
    setTimeout(() => {
      navigation.navigate("Profile");
    }, 1000);
    
  }

  return (
    <View style={styles.container}>
      <Text style={styles.signTxt}>Login</Text>
      <TextInput
        style={[styles.txtInput, {marginTop: 30}]}
        placeholder="Enter Email"
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        style={[styles.txtInput, {marginTop: 30}]}
        placeholder="Enter Password"
        value={password}
        onChangeText={txt => setPassword(txt)}
      />

      <TouchableOpacity style={styles.btn} onPress={() => loginUser(email, password)}>
        <Text style={styles.btnTxt}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.loginTxt}>or Signup</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 40,
  },
  signTxt: {
    fontSize: 30,
    fontWeight: '500',
    color: 'black',
    marginTop: 20,
  },
  txtInput: {
    height: 50,
    width: '100%',
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 10,
    borderColor: 'brown'
  },
  btn: {
    height: 60,
    width: '100%',
    borderRadius: 10,
    backgroundColor: 'yellow',
    marginTop: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnTxt: {
    fontSize: 20,
    fontWeight: '500',
    color: 'brown',
  },
  loginTxt: {
    fontSize: 20,
    marginTop: 20,
    textDecorationLine: 'underline',
    fontWeight: '600',
    color: 'black',
  },
});
