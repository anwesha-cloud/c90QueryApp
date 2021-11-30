import React from 'react';
import { View, Text } from 'react-native';
import { createSwitchNavigator,createAppContainer} from 'react-navigation';
import Dashboard from './screens/Dashboard';
import LoginScreen from './screens/Login';
import SignIn from './screens/SignIn';
import {firebaseConfig} from './config';
import firebase from 'firebase'


if (!firebase.apps.length){
   firebase.initializeApp(firebaseConfig);
}else{
  firebase.app();
}

const AppSwitchNavigator = createSwitchNavigator({
  LoginScreen: LoginScreen,
  SignInScreen:SignIn,
  DashboardScreen:Dashboard

});

const AppContainer = createAppContainer(AppSwitchNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer/>;
  }
}
