import React from 'react'
import {StyleSheet,View,Text,TouchableOpacity} from 'react-native'
import firebase from 'firebase'
import { FlatList } from 'react-native-gesture-handler'
import {Card} from 'react-native-elements'
import { RFValue } from 'react-native-responsive-fontsize';

export default class Feed extends React.Component{
  constructor(){
    super()
    this.state={
       allQueries:[]
    }
  }
  componentDidMount(){
    this.fetchQueries()
  }
  fetchQueries(){
    const query= firebase.firestore().collection('queries').onSnapshot((snapShot)=>{
        var queries=[];
        snapShot.forEach((doc)=>{
           queries.push(doc.data())
        })      
        console.log("Queries from Feed Screen : "+ queries)
        
        this.setState({
          allQueries:queries
        })
     })
  }

  renderItem = ({item})=>{
    console.log(item)
    var date = item.create_On.toDate().toString() // "Thu Dec 02 2021 6:27:37 GMT+0530 (IST)"
    var dateArray = date.split(" ")  
        /*
            Array [
            "Thu",
            "Dec",
            "02",
            "2021",
            "16:27:37",
            "GMT+0530",
            "(IST)",
            ] */
    return(
      <View>
        <TouchableOpacity onPress={()=>{
            this.props.navigation.navigate('Query', {query:item} )
        }}>
          <Text>{item.created_by}</Text>
          <Card><Text>{item.query}</Text></Card>
          <Text>{dateArray[2] + " "+ dateArray[1] + ", " + dateArray[3]}</Text>
          <View style={{ borderBottomColor: 'black',borderBottomWidth: StyleSheet.hairlineWidth}}/>
        </TouchableOpacity>
      </View>
    )
}

  render(){
    return(
      <View style={styles.container}><Text style={styles.header}>Feed</Text>
      <View>
      {
        this.state.allQueries.length == 0 ?(
          <View>
              <Text> No queries yet</Text>
          </View>
        ):
        (
         <FlatList 
          keyExtractor={(item,index)=>index.toString()}
          data={this.state.allQueries}
          renderItem={this.renderItem}
          />
        )
        }
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
    backgroundColor:"rgb(67,13,113)"
},
header:{
  textAlign:'center',
  color:'white',
  marginTop:RFValue(50),
  fontSize:RFValue(27),
  fontWeight:'bold'
},


})


