import React from 'react'
import {StyleSheet,View,Text} from 'react-native'
import firebase from 'firebase'
import { FlatList } from 'react-native-gesture-handler'
import {Card} from 'react-native-elements'

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
      <View><Text>Feed</Text>
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
  container:{
      flex:1
  }
})


