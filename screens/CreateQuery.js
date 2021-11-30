import React from 'react';
import { StyleSheet,TextInput,TouchableOpacity ,View, Text, ScrollView, TouchableOpacityBase } from 'react-native';
import firebase from 'firebase'
import { RFValue } from 'react-native-responsive-fontsize';

export default class CreateQuery extends React.Component {
   constructor(){
     super()
     this.state={
       emailId:firebase.auth().currentUser.email ,
       category:'',
       query:'',
       create_On:'',
       created_by:firebase.auth().currentUser.displayName
     }
   }

  postQuery=()=>{
      firebase.firestore().collection("queries").add({
        emailId:this.state.emailId,
        category:this.state.category,
        query:this.state.query,
        create_On:firebase.firestore.FieldValue.serverTimestamp(),
        created_by:this.state.created_by
      })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Create Query</Text>
        <ScrollView>
          <TextInput
             placeholder="Category"
             style={styles.inputBox}
             onChangeText={(text)=>{
                category:text
             }}
             value={this.state.category}
          />
          <TextInput
             placeholder="Create Query"
             style={styles.descInputBox}
             onChangeText={(text)=>{
                query:text
             }}
             value={this.state.query}
             multiline={true}
          />
        </ScrollView>
        <View>
          <TouchableOpacity onPress={()=>{
            this.postQuery()
          }}
          style={styles.button}
          >
            <Text style={styles.buttonText}>Post</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
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
  inputBox: {
    height:RFValue(40),
    width: RFValue(250),
    borderWidth :RFValue(1),
    marginTop:RFValue(50),
    textAlign:'center',
    backgroundColor:'white'
  },
  descInputBox: {
    height:RFValue(160),
    width: RFValue(250),
    borderWidth :RFValue(1),
    marginTop:RFValue(40),
    textAlign:'center',
    backgroundColor:'white'
  },

  button:{
    height:RFValue(50),
    width: RFValue(100),
    borderWidth :RFValue(3),
    borderColor:"white",
    backgroundColor:"rgb(253, 95, 49 )",
    marginBottom:RFValue(200),
    borderRadius:RFValue(35),
    justifyContent:'center'
  },
  buttonText:{
    textAlign :"center", 
    fontWeight:'bold',
    fontSize:RFValue(18)
    
  }
})