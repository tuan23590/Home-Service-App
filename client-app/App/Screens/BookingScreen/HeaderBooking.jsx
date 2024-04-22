import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons';


export default function HeaderBooking() {
  const param = useRoute().params;
  const navigation = useNavigation();
  useEffect(() => {
    console.log(param)
  }, [])
  return (
    <View style={{padding: 20}}> 
     <TouchableOpacity style={{display:'flex',flexDirection:'row',gap: 10,
    alignItems: 'center'}}
    onPress={()=>navigation.goBack()}
    >
     <Ionicons name="chevron-back-sharp" size={24} color="black" />
      <Text style={{fontSize:17}}>{param?.category?.name}</Text>
     </TouchableOpacity>
    </View>
  )
}