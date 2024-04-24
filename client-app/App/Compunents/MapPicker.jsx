import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
export default function MapPicker({hideModal}) {
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