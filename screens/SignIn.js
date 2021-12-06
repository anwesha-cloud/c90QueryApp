import React from 'react'
import {StyleSheet,KeyboardAvoidingView,View,Text,Alert,TouchableOpacity,Platform, StatusBar,SafeAreaView,ScrollView,TextInput} from 'react-native'
import firebase from 'firebase'
import { RFValue } from 'react-native-responsive-fontsize';

export default class SignIn extends React.Component{

  // grade/experience, companyName/schoolName, designation/careerInterest
  //error when professional button is pressed & cancel button not visible
  constructor(){
    super()
    this.state={
      studentContainerVisible:false,
      professionalContainerVisible:true,
      fullName:'',
      emailId:'',
      password:'',
      confirmPassword:'',
      companyName:'',
      designation:'',
      experience:'',
      state:'',
      country:''
    }
  }

  signIn=()=>{
    const {fullName, emailId, password, confirmPassword,companyName,designation,experience,state,country} = this.state;
    if(fullName && emailId && password 
      && confirmPassword &&companyName && designation && experience && state && country ){
            if(password==confirmPassword){
                 firebase.auth().createUserWithEmailAndPassword(emailId,password)
                 .then((userCredential)=>{
                  const userCred = firebase.auth().currentUser
                   if(studentContainerVisible){
                     firebase.firestore().collection("students").add({
                           fullName:fullName,
                           emailId:emailId,
                           schoolName:companyName,
                           careerInterest:designation,
                           grade:experience,
                           state:state,
                           country:country
                     }).then((response)=>{
                      this.props.navigation.navigate('LoginScreen')
                     }).catch((error)=>{
                       console.log(error.message)
                     })
                     return userCred.updateProfile({
                      displayName: fullName
                    })
                   }else if (professionalContainerVisible){
                     firebase.firestore().collection("professionals").add({
                      fullName:fullName,
                      emailId:emailId,
                      companyName:companyName,
                      designation:designation,
                      experience:experience,
                      state:state,
                      country:country
                     }).then((response)=>{
                          this.props.navigation.navigate('LoginScreen')
                     }).catch((error)=>{
                       console.log(error.message)
                     })
                     return userCred.updateProfile({
                      displayName: fullName
                    })
                   }
                 })
                 .catch((error)=>{
                   console.log(error.message);
                   Alert.alert(error.message)
                 })

            }
            else{
              Alert.alert("Please enter the same entries for password and confirm password")
            }
      }
     else {
       Alert.alert('Please enter all the fields')
     } 
    
  }

  render(){
    return(
      <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "padding" : "height"}
      style={styles.container}
    >
      <SafeAreaView style={styles.safeAreaView}/>
      <Text style={styles.header}>Sign In</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}
        onPress={()=>{
          this.setState({
              studentContainerVisible:true,
              professionalContainerVisible:false
              
          })}}>
          <Text style={styles.button_text}>Student</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.button}
         onPress={()=>{
           this.setState({
             studentContainerVisible:false,
             professionalContainerVisible:true
           })
        
         }}>
           <Text style={styles.button_text}>Professional</Text>
          </TouchableOpacity>
      </View>
      {
        this.state.studentContainerVisible && (
          <View style = {styles.professionalModal}>
            <ScrollView>
                 <TextInput placeholder = "Full Name" 
                            style = {styles.inputBox}
                            value = {this.state.fullName}
                            keyboardType = "email-address"
                            onChangeText= {(text)=>{this.setState({fullName:text})}} />
                 <TextInput placeholder = "Email-Address" 
                            style = {styles.inputBox} 
                            value = {this.state.emailId}
                            onChangeText= {(text)=>{this.setState({emailId : text})}}/>
                 <TextInput placeholder = "Password"
                            style = {styles.inputBox}
                            value = {this.state.password}
                            secureTextEntry={true}
                            onChangeText= {(text)=>{this.setState({password: text})}}/>
                 <TextInput placeholder = "Confirm Password" 
                            style = {styles.inputBox}
                            value = {this.state.confirmPassword}
                            secureTextEntry={true}
                            onChangeText= {(text)=>{this.setState({confirmPassword : text})}}/>
                 <TextInput placeholder = "School Name"
                            style = {styles.inputBox}
                            value = {this.state.companyName}
                            onChangeText= {(text)=>{this.setState({companyName : text})}}/>
                 <TextInput placeholder = "Career Interest"
                            style = {styles.inputBox}
                            value = {this.state.designation}
                            onChangeText= {(text)=>{this.setState({designation : text})}}/>
                 <TextInput placeholder = "Grade"
                            style = {styles.inputBox}
                            keyboardType = "numeric"
                            value = {this.state.experience}
                            onChangeText= {(text)=>{this.setState({experience: text})}}/>
                 <TextInput placeholder = "State" 
                            style = {styles.inputBox}
                            value = {this.state.state}
                            onChangeText= {(text)=>{this.setState({state : text})}}/>
                 <TextInput placeholder = "Country"
                            style = {styles.inputBox}
                            value = {this.state.country}
                            onChangeText= {(text)=>{this.setState({country : text})}}/>
              </ScrollView>
          </View>
        )
      }
      {
        this.state.professionalContainerVisible && (
          <View style = {styles.professionalModal}>
            <ScrollView>
                 <TextInput placeholder = "Full Name" 
                            style = {styles.inputBox}
                            value = {this.state.fullName}
                            keyboardType = "email-address"
                            onChangeText= {(text)=>{this.setState({fullName:text})}} />
                 <TextInput placeholder = "Email-Address" 
                            style = {styles.inputBox} 
                            value = {this.state.emailId}
                            onChangeText= {(text)=>{this.setState({emailId : text})}}/>
                 <TextInput placeholder = "Password"
                            style = {styles.inputBox}
                            value = {this.state.password}
                            secureTextEntry={true}
                            onChangeText= {(text)=>{this.setState({password: text})}}/>
                 <TextInput placeholder = "Confirm Password" 
                            style = {styles.inputBox}
                            value = {this.state.confirmPassword}
                            secureTextEntry={true}
                            onChangeText= {(text)=>{this.setState({confirmPassword : text})}}/>
                 <TextInput placeholder = "Company/Organization"
                            style = {styles.inputBox}
                            value = {this.state.companyName}
                            onChangeText= {(text)=>{this.setState({companyName : text})}}/>
                 <TextInput placeholder = "Designation"
                            style = {styles.inputBox}
                            value = {this.state.designation}
                            onChangeText= {(text)=>{this.setState({designation : text})}}/>
                 <TextInput placeholder = "Total Years Of Experience"
                            style = {styles.inputBox}
                            keyboardType = "numeric"
                            value = {this.state.experience}
                            onChangeText= {(text)=>{this.setState({experience: text})}}/>
                 <TextInput placeholder = "State" 
                            style = {styles.inputBox}
                            value = {this.state.state}
                            onChangeText= {(text)=>{this.setState({state : text})}}/>
                 <TextInput placeholder = "Country"
                            style = {styles.inputBox}
                            value = {this.state.country}
                            onChangeText= {(text)=>{this.setState({country : text})}}/>
              </ScrollView>
          </View>

        )
      }
      <View>
        <TouchableOpacity
         style={styles.button}
         onPress={()=>{
          this.signIn()
        }}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.button}
          onPress={()=>{
          this.props.navigation.navigate("LoginScreen")
        }}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
      
    </KeyboardAvoidingView>
    )
  }
}

const styles= StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'rgb(79, 0, 146 )'
  },
  safeAreaView:{
    marginTop:Platform.OS=='android'?StatusBar.currentHeight:0
  },
  buttonContainer:{
    flexDirection:'row',
    marginLeft:RFValue(58),
    
    
  }, 
  header:{
    textAlign:'center',
    color:'white',
    fontSize:RFValue(33),
    fontWeight:'bold'
  },
  button : {
    height:RFValue(55),
    width: RFValue(100),
    borderWidth :RFValue(3),
    borderColor:"white",
    backgroundColor:"rgb(253, 95, 49 )",
    marginTop:RFValue(25),
    margin:RFValue(7),
    borderRadius:RFValue(15),
    alignSelf:'center' 
  },
  buttonText:{
    textAlign :"center", 
    fontWeight:'bold',
    fontSize:RFValue(18),
    marginTop:RFValue(10)
  },
  button_text:{
    textAlign :"center", 
    fontWeight:'bold',
    fontSize:RFValue(14),
    color:'white',
    marginTop:RFValue(10)

  },
  inputBox : {
    height:RFValue(42),
    width: RFValue(220),
    borderWidth :RFValue(2),
    borderColor:'black',
    marginTop:RFValue(40),
    borderRadius:RFValue(20),
    alignSelf:'center',
    textAlign:'center',
    backgroundColor:'white'

 }, 
 professionalModal : {
       flex : 0.7, 
       borderWidth : 1
}
})