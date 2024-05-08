import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
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
import numeral from 'numeral';
import { createContext } from 'react';
import { color } from '@rneui/themed/dist/config'
export const formCaLeContext = createContext();

export default function BookingSingle({hideModal}) {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalThoiGianLamViec, setModalThoiGianLamViec] = useState(false);
  const [chonDichVuThem, setChonDichVuThem] = useState();
  const [gioLam, setGioLam] = useState(new Date());
  const [chonThoiLuong, setChonThoiLuong] = useState();
  const [vatNuoi, setVatNuoi] = useState('');
  const [dichVuThem, setDichVuThem] = useState([]);
  const [dichVuCaLe, setDichVuCaLe] = useState([]);
  const [thoiGianLamViec, setThoiGianLamViec] = useState(0);
  const [tongCong, setTongCong] = useState(0);
  const [ngayLamViec, setNgayLamViec] = useState([]);

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
    console.log('So luong dich vu them: ',chonDichVuThem.length);
    console.log('vat nuoi: ',vatNuoi);
    setModalThoiGianLamViec(true);
  }
  useEffect(() => { 
   
    const tongTienDichVuThem = chonDichVuThem?.reduce((accumulator, current) => accumulator + current.gia, 0);
    setTongCong(tongTienDichVuThem + chonThoiLuong?.gia);
    setThoiGianLamViec(chonThoiLuong?.thoiGian);
  }, [chonThoiLuong, chonDichVuThem]);
  return (
    <formCaLeContext.Provider value={{
      chonThoiLuong, 
      setChonThoiLuong,
      chonDichVuThem,
      setChonDichVuThem,
      vatNuoi,
      setVatNuoi,
      thoiGianLamViec, 
      setThoiGianLamViec,
      tongCong,
      gioLam, 
      setGioLam,
      ngayLamViec, 
      setNgayLamViec
      }}>
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
        <ThoiLuong data={dichVuCaLe}/>

        <Heading text={"Dịch vụ thêm"} description={"Chọn dịch vụ thêm"}/>
        <DichVu data={dichVuThem} />

        <Heading text={"Tùy chọn"}/>
        <TuyChon />
        <TouchableOpacity 
          onPress={()=>press()}
        >
          <View style={styles.container}>
            <Text style={{ color: 'white',textAlign: 'center',fontWeight: 'bold'}}> {numeral(tongCong).format('0,0')} VND/{chonThoiLuong?.thoiGian}h</Text>
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
    </formCaLeContext.Provider>
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