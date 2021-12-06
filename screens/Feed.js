import React from 'react'
import {StyleSheet,View,Text,TouchableOpacity} from 'react-native'
import firebase from 'firebase'
import { FlatList } from 'react-native-gesture-handler'
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Card} from 'react-native-elements'
import { RFValue } from 'react-native-responsive-fontsize';

export default class Feed extends React.Component{
  constructor(){
    super()
    this.state={
       allQueries:[],
       is_liked: false,
       likes: this.props.story.value.likes,
    
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
  likeAction = () => {
    if (this.state.is_liked) {
      firebase
        .database()
        .ref('queries')
        .child('likes')
        .set(firebase.database.ServerValue.increment(-1));
      this.setState({ likes: (this.state.likes -= 1), is_liked: false });
    } else {
      firebase
        .database()
        .ref('queries')
        .child('likes')
        .set(firebase.database.ServerValue.increment(1));
      this.setState({ likes: (this.state.likes += 1), is_liked: true });
    }
  };

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
      <View style={styles.cardContainer}>
        <TouchableOpacity onPress={()=>{
            this.props.navigation.navigate('Query', {query:item} )
        }}>
          <Card>
            <Text style={styles.created_by_text}>{item.created_by}</Text>
            <Text style={styles.created_on_text}>{dateArray[2] + " "+ dateArray[1] + ", " + dateArray[3]}</Text>
            <Text style={styles.query_text}>{item.query}</Text>
          </Card>
          <View style={styles.actionContainer}>
              <TouchableOpacity
                style={
                  this.state.is_liked
                    ? styles.likeButtonLiked
                    : styles.likeButtonDisliked
                }
                onPress={() => this.likeAction()}>
                <Ionicons
                  name={'heart'}
                  size={RFValue(30)}
                />
                <Text
                  style={ styles.likeText}>
                  {this.state.likes}
                </Text>
              </TouchableOpacity>
            </View>
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
cardContainer: {
  margin: RFValue(13),
  backgroundColor: '#2f345d',
  borderRadius: RFValue(20),
},
created_by_text: {
  fontSize: RFValue(25),
  color: 'white',
},
created_on_text: {
  fontSize: RFValue(18),
  color: 'white',
},
query_text: {
  fontSize: RFValue(13),
  color: 'white',
},
actionContainer: {
  justifyContent: 'center',
  alignItems: 'center',
  padding: RFValue(10),
},
likeButtonLiked: {
  width: RFValue(160),
  height: RFValue(40),
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  backgroundColor: '#eb3948',
  borderRadius: RFValue(30),
},
likeButtonDisliked: {
  width: RFValue(160),
  height: RFValue(40),
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'row',
  borderColor: '#eb3948',
  borderWidth: 2,
  borderRadius: RFValue(30),
},
likeText: {
  color: 'white',
  fontSize: 25,
  marginLeft: 25,
  marginTop: 6,
},

})


