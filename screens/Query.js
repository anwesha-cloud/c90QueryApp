import React from 'react'
import {StyleSheet,View,Text,TouchableOpacity, TextInput} from 'react-native'
import { RFValue } from 'react-native-responsive-fontsize';

export default class Query extends React.Component{
  constructor(){
    super();
    this.state = {
      textInput : []
    }
  }
  renderTextInput=()=>{
    console.log('Working');
    if (this.state.textInput.length == 0) {
      this.setState({
        textInput: [...this.state.textInput, 1],
      });
    } else {
      this.setState({
        textInput: [],
      });
    }
    console.log(this.state.textInput);
  };


  render(){
    var query = this.props.route.params.query
    console.log(query)
    return(
    <View style={styles.container}>
      <Text style={styles.header}>Query</Text>
      <Text style={styles.text}>{query.category}</Text>
      <TouchableOpacity
        style={styles.button}
         onPress={() => {
           this.renderTextInput();
         }}>
      <Text style={styles.buttonText}>Comment</Text>
      </TouchableOpacity>
        {this.state.textInput.map((item) => {
          return (
            <View style={{ flexDirection: 'row' }}>
              <TextInput placeholder="Add Comment" multiline={true} />
              <TouchableOpacity>
                <Text>Comment</Text>
              </TouchableOpacity>
            </View>
          );
        })}
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
},
button: {
  backgroundColor: 'orange',
  marginTop: 50,
  padding: 10,
  width: 150,
  marginLeft: 75,
  borderRadius: 10,
  height: 50,
},
buttonText: {
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: 20,
  color: 'white',
},
})