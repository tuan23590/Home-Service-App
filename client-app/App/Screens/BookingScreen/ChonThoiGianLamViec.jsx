import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Heading from './../../Compunents/Heading';
import ChonNgayLam from './ChonNgayLam';
import GhiChuChoTasker from './GhiChuChoTasker';
import Colors from '../../Utils/Colors';
import numeral from 'numeral';
import { formCaLeContext } from './BookingSingle';


export default function ChonThoiGianLamViec({hideModal}) {
  
  const {tongCong,chonThoiLuong}= useContext(formCaLeContext);

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
      <View style={styles.container}>
            <Text style={{ color: 'white',textAlign: 'center',fontWeight: 'bold'}}> {numeral(tongCong).format('0,0')} VND/{chonThoiLuong?.thoiGian}h</Text>
            <Text style={{color: 'white'}}>Tiếp theo</Text>
        </View>
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
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.GREEN,
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    fontSize: 17
}
})