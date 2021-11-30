import React from 'react'
import {Alert,StyleSheet,View,Text,TextInput,TouchableOpacity, Platform, StatusBar,SafeAreaView} from 'react-native'
import firebase from 'firebase'
import { RFValue } from 'react-native-responsive-fontsize';
import Dashboard from './Dashboard'
export default class Login extends React.Component{

  constructor(){
    super()
    this.state={
      userid:'',
      password:''
    }
  }

  login=()=>{
    if(this.state.userid && this.state.password){
      firebase.auth().signInWithEmailAndPassword(this.state.userid,this.state.password)
      .then((user)=>{
        this.props.navigation.navigate('DashboardScreen')
      })
      .catch((error)=>{
        Alert.alert(error.message)
      })
    }
  }

  render(){
    return(
    <View style={styles.container}>
      <SafeAreaView style = {styles.safeAreaView} />
      <Text style={styles.login}>Login</Text>
      <View>
        <TextInput 
            placeholder='username/email-Id' 
            style = {styles.inputBox} 
            onChangeText={(text)=>{
              this.setState({
                userid:text
            })}}
            value = {this.state.userid}
          />
        <TextInput 
            placeholder='password' 
            style = {styles.inputBox}
            secureTextEntry = {true}
            onChangeText={(text)=>{
              this.setState({
                password:text
              })
            }}
            value= {this.state.password}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.button}
        onPress={()=>{
          this.login()
        }} >
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity 
           style={styles.button} 
           onPress={()=>{this.props.navigation.navigate('SignInScreen')}}
        >
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

    </View>
    )
  }
}

const styles=StyleSheet.create({
  container: {
      flex: 1, 
      alignItems:'center', 
      justifyContent :"center",
      backgroundColor:"rgb(79, 0, 146 )"
  },
  login:{
    textAlign:'center',
    color:'white',
    fontSize:RFValue(39),
    fontWeight:'bold'
  },
  safeAreaView: {
   marginTop : Platform.OS=='android'? StatusBar.currentHeight:0
  },
  inputBox: {
    height:RFValue(40),
    width: RFValue(280),
    borderWidth :RFValue(1),
    marginTop:RFValue(40),
    borderRadius:20,
    textAlign:'center',
    backgroundColor:'white'
  
  },

  button:{
    height:RFValue(60),
    width: RFValue(100),
    borderWidth :RFValue(3),
    borderColor:"white",
    backgroundColor:"rgb(253, 95, 49 )",
    marginTop:RFValue(30),
    borderRadius:15,
    justifyContent:'center'
    
  },
  buttonText:{
    textAlign :"center", 
    fontWeight:'bold',
    fontSize:RFValue(18)
    
  }
})