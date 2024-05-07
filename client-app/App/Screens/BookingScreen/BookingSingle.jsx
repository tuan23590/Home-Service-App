import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React, { createContext, useEffect, useState } from 'react'
import HeaderBooking from './HeaderBooking'
import Heading from './../../Compunents/Heading'
import ThoiLuong from './ThoiLuong'
import DichVu from './DichVu';
import TuyChon from './TuyChon'
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors'
import MapPicker from '../../Compunents/MapPicker'
import GlobalAPI from '../../Utils/GlobalAPI'
import ChonThoiGianLamViec from './ChonThoiGianLamViec';


export default function BookingSingle({hideModal}) {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalThoiGianLamViec, setModalThoiGianLamViec] = useState(false);
  const [chonDichVu, setChonDichVu] = useState();

  const [chonThoiLuong, setChonThoiLuong] = useState();
  const [vatNuoi, setVatNuoi] = useState('');
  const [dichVuThem, setDichVuThem] = useState([]);
  const [dichVuCaLe, setDichVuCaLe] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataDichVuCaLe = await GlobalAPI.getDichVuCaLe();
        const dataDichVuThem = await GlobalAPI.getDichVuThem();
        if (dataDichVuCaLe?.DichVuCaLe) {
          setDichVuCaLe(dataDichVuCaLe.DichVuCaLe);
        }
        if (dataDichVuThem?.DichVuThem) {
          setDichVuThem(dataDichVuThem.DichVuThem);
        }
      } catch (error) {
        console.error("Error fetching:", error);
      }
    };
    fetchData();
  }, []);


    
  const press = () => {
    console.log('Thoi luong cong viec: ',chonThoiLuong);
    console.log('So luong dich vu them: ',chonDichVu.length);
    console.log('vat nuoi: ',vatNuoi);
    setModalThoiGianLamViec(true);
  }
  return (
    <context.Provider value={{test, setTest}}>
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
        <ThoiLuong data={dichVuCaLe} childenSelected={setChonThoiLuong} parentSelected = {chonThoiLuong} />

        <Heading text={"Dịch vụ thêm"} description={"Chọn dịch vụ thêm"}/>
        <DichVu data={dichVuThem} onselectedDichVu={setChonDichVu} />

        <Heading text={"Tùy chọn"}/>
        <TuyChon onselectedVatNuoi={setVatNuoi} />
        <TouchableOpacity 
          onPress={()=>press()}
        >
          <Text style={styles.confirmBtn}>Tiếp theo</Text>
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
    </context.Provider>
    
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