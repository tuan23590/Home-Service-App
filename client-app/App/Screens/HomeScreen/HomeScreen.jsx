import { View, Text} from 'react-native'
import React from 'react'
import Header from './Header'
import Slider from './Slider'
import Categories from './Categories'
import Discover from './Discover'
import { ScrollView } from 'react-native-virtualized-view'

export default function HomeScreen() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header/>
      <View style={{marginHorizontal: 20}}>
      <Slider/>
      <Categories/>
      <Discover/>
      </View>
    </ScrollView> 
  )
}