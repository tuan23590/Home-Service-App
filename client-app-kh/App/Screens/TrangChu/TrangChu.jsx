import { View, Text} from 'react-native'
import React from 'react'
import Header from './Header'
import Slider from './Slider'
import DoanhMuc from './DoanhMuc'
import KhamPha from './KhamPha'
import { ScrollView } from 'react-native-virtualized-view'
import ModalProvider from '../../Provider/ModalProvider'

export default function TrangChu() {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Header/>
      <View style={{marginHorizontal: 20}}>
      <Slider/>
      <ModalProvider>
        <DoanhMuc/>
      </ModalProvider>
      <KhamPha/>
      </View>
    </ScrollView> 
  )
}