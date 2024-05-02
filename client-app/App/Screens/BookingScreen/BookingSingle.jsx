import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React, { useState } from 'react'
import HeaderBooking from './HeaderBooking'
import Heading from './../../Compunents/Heading'
import ThoiLuong from './ThoiLuong'
import DichVu from './DichVu';
import BookingOption from './BookingOption'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors'
import MapPicker from '../../Compunents/MapPicker'

export default function BookingSingle({hideModal}) {
  const [selected, setSelected] = useState();
  const [selectedDichVu, setSelectedDichVu] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [thoiGianChonDichVuThem, setThoiGianChonDichVuThem] = useState(2);

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
      <ThoiLuong onTimeSelect={setSelected} thoiGianChonDichVuThem={thoiGianChonDichVuThem}/>

      <Heading text={"Dịch vụ thêm"} description={"Chọn dịch vụ thêm"}/>
      <DichVu onselectedDichVu={setSelectedDichVu} />

      <Heading text={"Tùy chọn"}/>
      <BookingOption />
      <TouchableOpacity 
        onPress={()=>{setThoiGianChonDichVuThem(thoiGianChonDichVuThem+1)}}
      >
        <Text style={styles.confirmBtn}>Tiếp theo {selected?.thoiGian}</Text>
      </TouchableOpacity>
    </View>

    <Modal
      animationType='slide'
      visible={modalVisible}
      style={{top: -20}}
      >
        <MapPicker hideModal={()=>setModalVisible(false)}/>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({ 
  confirmBtn:{
    backgroundColor: Colors.ORANGE,
    color: 'white',
    padding: 15,
    textAlign: 'center',
    borderRadius: 10,
    marginTop: 20,
    fontSize: 17
  }
})