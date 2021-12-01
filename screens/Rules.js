import React from 'react'
import {StyleSheet,View,Text} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';

export default class Rules extends React.Component{
  render(){
    return(
    <View styles={styles.container}>
      <Text styles={styles.header}>Rules</Text>
      <Text>*The users can report a post if they find the content unappropriate</Text>
      <Text>*If a post is being reported more than three times then the user's account will be banned permanently.</Text>
      <Text></Text>
    </View>
    )
  }
}
const styles=StyleSheet.create({
  container: {
    flex: 1, 
    alignItems:'center', 
    justifyContent :"center",
    backgroundColor:"rgb(67,13,113)"
},
header:{
  textAlign:'center',
  color:'white',
  marginTop:RFValue(40),
  fontSize:RFValue(33),
  fontWeight:'bold'
},

})