import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../src/screens/LoginScreen';
import HomeScreen from '../src/screens/HomeScreen';
import RegisterScreen from '../src/screens/RegisterScreen';
import DetailScreen from '../src/screens/DetailScreen';
import VideoScreen from '../src/screens/VideoScreen'; // Asegúrate de que este componente esté bien definido

type RootStackParamList = {
  Login: undefined;
  Home: undefined;
  Register: undefined;
  Detail: undefined;
  Video: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Detail" component={DetailScreen} />
        <Stack.Screen name="Video" component={VideoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;
  