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
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerUser = async () => {
    const userId = uuid.v4();
    try {
      // Query Firestore to find documents where the email field matches the provided email value
      const querySnapshot = await firestore().collection('users').where('email', '==', email).get();
  
      // Check if any documents were found
      if (querySnapshot.empty) {
        firestore()
        .collection('users')
        .doc(userId)
        .set({
          name: name,
          email: email,
          mobile: mobile,
          userId: userId,
          password: password,
        })
        .then(() => {
          console.log('User created');
          navigation.navigate('Login');
        })
        .catch(error => console.log(error));
        
      } else {
        console.log('Email exists in at least one document');
        // Iterate through the documents if needed
      }
    } catch (error) {
      console.error('Error checking email:', error);
    }
   
  };

  const validate = () => {
    let isValid = true;
    if (name == '') {
      isValid = false;
    }
    if (email == '') {
      isValid = false;
    }
    if (mobile == '') {
      isValid = false;
    }
    if (password == '') {
      isValid = false;
    }
    if (confirmPassword == '') {
      isValid = false;
    }
    if (confirmPassword !== password) {
      isValid = false;
    }
    return isValid;
  };
  return (
    <View style={styles.container}>
      <Text style={styles.signTxt}>Sign Up</Text>
      <TextInput
        style={[styles.txtInput, {marginTop: 40}]}
        placeholder="Enter Name"
        value={name}
        onChangeText={txt => setName(txt)}
      />
      <TextInput
        style={[styles.txtInput, {marginTop: 30}]}
        placeholder="Enter Email"
        value={email}
        onChangeText={txt => setEmail(txt)}
      />
      <TextInput
        style={[styles.txtInput, {marginTop: 30}]}
        keyboardType="phone-pad"
        placeholder="Enter Mobile"
        value={mobile}
        onChangeText={txt => setMobile(txt)}
      />
      <TextInput
        style={[styles.txtInput, {marginTop: 30}]}
        placeholder="Enter Password"
        value={password}
        onChangeText={txt => setPassword(txt)}
      />
      <TextInput
        style={[styles.txtInput, {marginTop: 30}]}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={txt => setConfirmPassword(txt)}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (validate()) {
            registerUser();
          } else {
            Alert.alert('Please enter correct details');
          }
        }}>
        <Text style={styles.btnTxt}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginTxt}>or Login</Text>
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
