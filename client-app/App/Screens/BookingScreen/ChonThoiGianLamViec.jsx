import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React, { useContext, useState } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Heading from './../../Compunents/Heading';
import ChonNgayLam from './ChonNgayLam';
import GhiChuChoTasker from './GhiChuChoTasker';
import Colors from '../../Utils/Colors';
import numeral from 'numeral';
import ChiTietDonHang from './ChiTietDonHang';
import { DonHangContext } from '../../Provider/DonHangProvider';

import { ScrollView } from 'react-native-virtualized-view'

export default function ChonThoiGianLamViec({hideModal}) {
  const [modalVisible, setModalVisible] = useState(false);
  const {tongTien,dichVuChinh}= useContext(DonHangContext);

  return (
    
    <View style={{margin: 20}}>
      <TouchableOpacity
      onPress={()=>hideModal()}
      >
        <Ionicons name="chevron-back-sharp" size={24} color="black" />
      <Text>ChonThoiGianLamViec</Text>
      </TouchableOpacity>
      <Heading text="Thời gian làm việc" />
      <ChonNgayLam />
      <Heading text="Ghi chú cho tasker" description='Ghi chú này sẽ giúp Tasker làm nhanh và tốt hơn'/>
      <GhiChuChoTasker />
      <TouchableOpacity onPress={()=>{setModalVisible(true)}}>
      <View style={styles.container}>
            <Text style={{ color: 'white',textAlign: 'center',fontWeight: 'bold'}}> {numeral(tongTien).format('0,0')} VND/{dichVuChinh?.thoiGian}h</Text>
            <Text style={{color: 'white'}}>Tiếp theo</Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType='slide'
        visible={modalVisible}
        style={{top: -20}}
        >
          <ScrollView>
          <ChiTietDonHang hideModal={()=>setModalVisible(false)}/>
          </ScrollView>
        </Modal>
      
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