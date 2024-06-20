import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import Heading from './../../Compunents/Heading'
import ThoiLuong from './ThoiLuong'
import DichVuThem from './DichVuThem';
import TuyChon from './TuyChon'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors'
import MapPicker from '../../Compunents/MapPicker'
import ChonThoiGianLamViec from './ChonThoiGianLamViec';
import numeral from 'numeral';
import { DonHangContext } from '../../Provider/DonHangProvider'

export default function BookingSingle({hideModal}) {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalThoiGianLamViec, setModalThoiGianLamViec] = useState(false);
  const {tongCong,dichVuChinh} = useContext(DonHangContext);
  const press = () => {
    setModalThoiGianLamViec(true);
  }
  return (
      <View>
        <View style={{padding: 20}}> 
      <TouchableOpacity style={{display:'flex',flexDirection:'row',gap: 10,
      alignItems: 'center'}}
      onPress={()=>hideModal()}
      >
      <Ionicons name="chevron-back-sharp" size={24} color="black" />
        <Text style={{fontSize:17}}>Tạo đơn</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>setModalVisible(true)}>
        <Text>Mo Map</Text>
      </TouchableOpacity>
      </View>
      <View style={{marginHorizontal:20}}>
        <Heading text={"Thời lượng"} description={"Ước lượng thời gian cần dọn dẹp"}/>
        <ThoiLuong />

        <Heading text={"Tùy chọn"}/>
        <TuyChon />
        <TouchableOpacity 
          onPress={()=>press()}
        >
          <View style={styles.container}>
            <Text style={{ color: 'white',textAlign: 'center',fontWeight: 'bold'}}> {numeral(dichVuChinh?.gia).format('0,0')} VND/{dichVuChinh?.thoiGian}h</Text>
            <Text style={{color: 'white'}}>Tiếp theo</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        animationType='slide'
        visible={modalVisible}
        style={{top: -20}}
        >
          <MapPicker hideModal={()=>setModalVisible(false)}/>
        </Modal>
        <Modal
        animationType='slide'
        visible={modalThoiGianLamViec}
        style={{top: -20}}
        >
          <ChonThoiGianLamViec hideModal={()=>setModalThoiGianLamViec(false)}/>
        </Modal>
      </View>
  )
}

const styles = StyleSheet.create({ 
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