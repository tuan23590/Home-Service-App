import { Text, TouchableOpacity, View } from 'react-native'
import React, { Component } from 'react'
import { Ionicons } from '@expo/vector-icons';

export default function Detail({hideModal}) {
  return (
    <View>
      <TouchableOpacity
      onPress={()=>hideModal()}
      >
        <Ionicons name="chevron-back-sharp" size={24} color="black" />
        <Text>Detail</Text>
      </TouchableOpacity>
    </View>
  )
}