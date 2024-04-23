import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
export default function MapPicker({hideModal}) {
  fetch('https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=72&limit=-1')
  .then(response => response)
  .then(data => console.log(data))
  .catch((error) => console.error('Error:', error));
  return (
    <View>
      <TouchableOpacity
      onPress={()=>hideModal()}
      >
        <Ionicons name="chevron-back-sharp" size={24} color="black" />
        <Text>MapPicker</Text>
      </TouchableOpacity>
    </View>
  )
}