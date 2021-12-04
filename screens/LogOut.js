import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import firebase from 'firebase';

export default class LogOut extends React.Component {
  componentDidMount() {
    firebase.auth().signOut().then((res)=>{
      this.props.navigation.navigate('LoginScreen')
    }).catch((error)=>{console.log("Error while logging out : "+ error.message)})
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>LOG OUT</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
