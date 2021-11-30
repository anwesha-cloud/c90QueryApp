import React from 'react';
import { View,Text,StyleSheet } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import Feed from '../screens/Feed';
import CreateQuery from '../screens/CreateQuery';
import Notification from '../screens/Notification'
import Profile from '../screens/Profile'

const Tab = createMaterialBottomTabNavigator();

export default class TabNavigator extends React.Component {
  render() {
    return (
      <Tab.Navigator
      labeled={false}
      barStyle={styles.bottomTabStyle}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Feed') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Create Query') {
            iconName = focused ? 'add-circle' : 'add-circle-outline';
          } else if (route.name === 'Notification'){
            iconName = focused?'notifications':'notifications-outline';
          } else if (route.name === 'Profile'){
            iconName = focused?'person':'person-outline';
          }
          return (
            <Ionicons
              name={iconName}
              size={RFValue(25)}
              color={color}
              style={styles.icons}
            />
          );
        },
      })}
      activeColor={'white'}
      inactiveColor={'white'}>  
        <Tab.Screen name="Feed" component={Feed}/>
        <Tab.Screen name="Create Query" component={CreateQuery} />
        <Tab.Screen name="Notification" component={Notification} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: 'rgb(253, 95, 49 )',
    height: '8%',
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: 'hidden',
    position: 'absolute',
  },
  icons: {
    width: RFValue(25),
    height: RFValue(25),
  },
});
