import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { StyleSheet, Text, View,FlatList, SafeAreaView, ActivityIndicator,TouchableOpacity } from 'react-native';
import { WebView } from 'react-native-webview';
import axios from 'axios';

const colors =  ["red","orange","green","gray"];

const handlep = (item)=>{

  console.log(item)

 return (
   
    <WebView 
      style={styles.container}
      source={{ uri: 'https://google.com' }}
    />


 )

}

const Item = ({ item }) => (

   

  <View style={{flexDirection:'row'}} >
    <View style={{width:5,height:15,backgroundColor:colors[Math.floor(Math.random()*colors.length)],marginRight:10}}></View>
   
   <TouchableOpacity onPress={()=>handlep(item.title)}>
    <Text style={{color:'blue'}} >{item.title}</Text>
    </TouchableOpacity>   
   
    <Text style={{color:'blue',marginLeft:10}} >{item.timestamp}</Text>
    <TouchableOpacity>
    <FontAwesome style={{marginLeft:10}} size={24} color="gray" name="eye" />
    </TouchableOpacity>
    
    <TouchableOpacity>
    <FontAwesome style={{marginLeft:10,opacity:0.1}} size={24} color="#33E2FF" name="play-circle" />
    </TouchableOpacity>

    <TouchableOpacity>
    <FontAwesome style={{marginLeft:10,opacity:0.1}} size={24}  color="gray" name="star" />
    </TouchableOpacity>

  </View>
);

export default function App() {

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const token = 'ba1e81464b7597a2b34c6495512f63ad6102ad1f+\\\\'
  const renderItem = ({ item }) => <Item item={item}/>;

  //https://www.mediawiki.org/w/api.php?action=query&prop=categories&rcnamespace=0&rcstart=&rcprop=Cuser%7Cuserid%7Ctimestamp%7Ctitle&rctype=new&rclimit=10&format=json&origin=*
  // 'https://www.mixesdb.com/db/api.php?action=query&format=json&meta=tokens'
  //  https://www.mixesdb.com/db/api.php?action=query&format=json&list=recentchanges&rcnamespace=0&rcstart=&rcprop=user%7Ctimestamp%7Ctitle&rclimit=75&rctype=new&redirects=


  //const URL = 'https://www.mixesdb.com/db/api.php?action=query&format=json&list=recentchanges&rcnamespace=0&rcstart=&rcprop=user%7Ctimestamp%7Ctitle&rclimit=75&rctype=new&type=csrf&token=955b323bfcc5373c0475b305348ac1b360fdbab8+\\\\'
  

const fetchdata = async () => {

  try{
 
    //זה מא שאני רוצה אבל לא עובד https://www.mixesdb.com/db/api.php?action=query&list=recentchanges&rcnamespace=0&format=json&rcstart=&rcprop=user%7Ctimestamp%7Ctitle&rclimit=75&rctype=new&origin=*&type=csrf&token=955b323bfcc5373c0475b305348ac1b360fdbab8+%5C%5C`
    const response = await fetch(
      'https://www.mediawiki.org/w/api.php?action=query&list=recentchanges&rcnamespace=0&rcstart=&rcprop=Cuser%7Cuserid%7Ctimestamp%7Ctitle&rctype=new&rclimit=10&format=json&origin=*',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          
         
        }
      }
    )

    const json = await response.json();
    console.log(json.query.recentchanges)
    setData(json.query.recentchanges)
    
  }catch (error){
    console.error(error)
  }finally {
    setLoading(false);
  }

  


 
    
};


useEffect(() => {

  fetchdata();

}, []);

return (
  <View style={{ flex: 1, padding: 24 ,justifyContent:'center',alignItems:'center'}}>


     <Text style={{fontSize:24,justifyContent:'center',alignItems:'center',marginBottom:20}}>Top mixes</Text>
  {isLoading ? <ActivityIndicator/> : (
    <FlatList
      data={data}
      keyExtractor={({ userid }, index) =>userid}
    renderItem={renderItem} keyExtractor={item => item.userid}
    />
  )}


  <Text style={{position:'absolute',zIndex:1,justifyContent:'center',top:400,fontSize:24}} >Artist</Text>

  <View style={{flexDirection:'row',position:'absolute',top:450}} >
    <View style={{width:5,height:15,backgroundColor:'red',marginRight:10}}></View>
   
   <TouchableOpacity>
    <Text style={{color:'blue'}} >balia</Text>
    </TouchableOpacity>   
   
    <TouchableOpacity>
    <FontAwesome style={{marginLeft:10}} size={24} color="gray" name="eye" />
    </TouchableOpacity>
    
    <TouchableOpacity>
    <FontAwesome style={{marginLeft:10,opacity:0.1}} size={24} color="#33E2FF" name="play-circle" />
    </TouchableOpacity>

    <TouchableOpacity>
    <FontAwesome style={{marginLeft:10,opacity:0.1}} size={24}  color="gray" name="star" />
    </TouchableOpacity>

  </View>


</View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
