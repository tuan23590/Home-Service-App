import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import GlobalApi from '../../Utils/GlobalAPI'
import Heading from '../../Compunents/Heading'


export default function Slider() {
    const [slider,setSlider]=useState([]);
    useEffect(() => {   
        getSlider();
    }, [])
    const getSlider=async()=>{ 
        GlobalApi.getSlider().then(res=>{
            setSlider(res?.sliders);
        })
    }
  return (
    <View>
      <Heading text={"Khuyến mãi mới"}/>
      <FlatList
      data={slider}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index})=>(
        <View style={{marginLeft: 15}}>
            <Image source={{ uri: item?.image?.url }}
            style={styles.sliderImage}
            />
        </View>
      )}
      />
    </View>
  )
}
const styles = StyleSheet.create({
   sliderImage:{
       width:270,
       height:150,
       borderRadius:20,
       objectFit:'contain',
   }
})