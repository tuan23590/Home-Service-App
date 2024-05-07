import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons';
import Heading from './../../Compunents/Heading';
import ChonNgayLam from './ChonNgayLam';
import GhiChuChoTasker from './GhiChuChoTasker';
import Colors from '../../Utils/Colors';

export default function ChonThoiGianLamViec({hideModal}) {
  return (
    <View style={{margin: 20}}>
      <TouchableOpacity
      onPress={()=>hideModal()}
      >
        <Ionicons name="chevron-back-sharp" size={24} color="black" />
        <Text>thoi giam lam viec</Text>
      </TouchableOpacity>
      <Heading text="Thời gian làm việc" />
      <ChonNgayLam />
      <Heading text="Ghi chú cho tasker" description='Ghi chú này sẽ giúp Tasker làm nhanh và tốt hơn'/>
      <GhiChuChoTasker />
      <TouchableOpacity>
        <Text style={styles.confirmBtn}>Tiếp theo</Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({ 
  confirmBtn:{
    backgroundColor: Colors.GREEN,
    color: 'white',
    padding: 15,
    textAlign: 'center',
    borderRadius: 10,
    marginTop: 20,
    fontSize: 17
  }
})