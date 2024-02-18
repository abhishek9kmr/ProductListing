// In App.js in a new project

import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from '../screens/Signup';
import Login from '../screens/Login';
import Products from '../screens/Products';
import Profile from '../screens/Profile';
import Splash from '../screens/Splash';
import ProductDetails from '../screens/ProductDetails';

const Stack = createNativeStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Products"
          component={Products}
        />
        <Stack.Screen
          name="ProductDetails"
          component={ProductDetails}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
