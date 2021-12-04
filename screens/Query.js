import React from 'react'
import {StyleSheet,View,Text,TouchableOpacity, TextInput} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';

export default class Query extends React.Component{
  constructor(){
    super();
    this.state = {
      textInputAdded : false
    }
  }
  renderTextInput=()=>{
    this.setState({textInputAdded : true})
    console.log("Working")
    return(
      <View>
        <Text>Hello</Text>
        <TextInput 
          style={styles.inputBox}
          placeholder="add reply"
       />
      </View>
      
    )
  }

  render(){
    var query = this.props.route.params.query
    console.log(query)
    return(
    <View style={styles.container}><Text style={styles.header}>Query</Text>
        <Text style={styles.text}>{query.category}</Text>
        <View>
          <TouchableOpacity onPress={()=>{
            this.renderTextInput()
          }}><Text style={styles.text}>Comment</Text></TouchableOpacity></View>
    </View>
    )
  }
}

const styles=StyleSheet.create({
container:{
  flex:1,
  backgroundColor:"rgb(67,13,113)"
},
inputBox: {
  height:RFValue(40),
  width: RFValue(280),
  borderWidth :RFValue(1),
  marginTop:RFValue(40),
  textAlign:'center',
  backgroundColor:'white'

},
header:{
  textAlign:'center',
  color:'white',
  marginTop:RFValue(20),
  fontSize:RFValue(27),
  fontWeight:'bold'
},
text:{
  color:'white',
  fontSize:RFValue(12)
}
})