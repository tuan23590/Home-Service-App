import { View, Text, FlatList, Image, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Heading from '../../Compunents/Heading'
import GlobalAPI from '../../Utils/GlobalAPI';
export default function KhamPha() {
 const [discovers, setDiscovers] = useState([]);
  useEffect(() => {  
    getDiscovers();
  }, [])
  const getDiscovers=async()=>{ 
    GlobalAPI.getDiscovers().then(res=>{
        setDiscovers(res.discovers);
    })
  }
  return (
    <View>
    <Heading text={"Khám phá"}/>
    <FlatList
    data={discovers}
    numColumns={2}
    renderItem={({item,index})=>(
        <View style={styles.item} >
            <Image source={{uri:item.image.url}} style={{width:150,height:150,borderRadius:10}}/>
            <Text>{item.name}</Text>
        </View>
    )}
    />
    </View> 
  )
}
const styles = StyleSheet.create({
    item:{
      flex:1,
      margin:10,
    }
})