import React from 'react'
import {StyleSheet,View,Text} from 'react-native'
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

  renderItem=({item,index})=>{
     return(
       <Card>
         <Card.Title>{item.created_by}</Card.Title>
         <Card.FeaturedTitle>{item.created_on}</Card.FeaturedTitle>
         <Card.FeaturedSubtitle>{item.query}</Card.FeaturedSubtitle>
       </Card>
     ) 
  }

  render(){
    return(
      <View style={styles.container}><Text style={styles.header}>Feed</Text>
      <View>
        <FlatList 
          keyExtractor={(item,index)=>index.toString()}
          data={this.state.allQueries}
          renderItem={this.renderItem}
          />
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


