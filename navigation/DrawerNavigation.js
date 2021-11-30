import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from './StackNavigation';
import LogOut from '../screens/LogOut';
import Rules from '../screens/Rules'

const Drawer = createDrawerNavigator();

export default class DrawerNavigation extends React.Component {
  render() {
    return (
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={StackNavigator} />
        <Drawer.Screen name="Rules" component={Rules} />
        <Drawer.Screen name="LogOut" component={LogOut} />
      </Drawer.Navigator>
    );
  }
}
