import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Heading from '../../Compunents/Heading';
import Colors from '../../Utils/Colors';
import { formCaLeContext } from './BookingSingle';
import numeral from 'numeral';

export default function ChiTietDonHang({hideModal}) {
    // const {tongCong,vatNuoi,chonDichVuThem,chonThoiLuong,gioLam,ngayLamViec} = useContext(formCaLeContext);
  return (
    <View>
         <TouchableOpacity
      onPress={()=>hideModal()}
      >
        <Ionicons name="chevron-back-sharp" size={24} color="black" />
        <Text>Chi Tiet Don Hang</Text>
      </TouchableOpacity>
      <Heading text='Vị trí làm việc'/>
      <View style={styles.box}>
        <Text>123 Nguyen Trai, Quan 1, TP HCM</Text>
        <Text>Nguyễn Văn A</Text>
        <Text>Số Điện thoại: 0123456789</Text>
        <Text>Chi tiết địa chỉ</Text>
        <Text>123 Nguyen Trai, Quan 1, TP HCM 123 Nguyen Trai, Quan 1, TP HCM </Text>
      </View>
        <Heading text='Thông tin công việc'/>
        <View style={styles.box}>
            <Text style={styles.boldText}>Thời gian làm việc</Text>
            <Text>Ngày Làm Việc: {ngayLamViec.join(', ')}</Text>
            <Text>Làm trong: {chonThoiLuong.thoiGian} giờ, bắt đầu lúc {`${gioLam.getHours().toString().padStart(2, '0')}:${gioLam.getMinutes().toString().padStart(2, '0')}`} </Text>
            <Text style={styles.boldText}>Chi tiết công việc</Text>
            <Text>Khối lượng công việc: {chonThoiLuong.moTaDichVu}m² / {parseInt(parseInt(chonThoiLuong.moTaDichVu) / 25)} Phòng</Text>
            <Text>Dịch vụ thêm: {chonDichVuThem.map(item => item?.tenDichVu).join(', ')}</Text>
            <Text>Nhà có vật nuôi: {vatNuoi}</Text>
        </View>
        <Heading text='Phương thức thanh toán'/>
        <View style={styles.box}>
            <Text>tiền mặt {'>'}  |  Khuyến mãi {'>'}</Text> 
        </View>
        <Text style={styles.boldText}>Tổng cộng: {numeral(tongCong).format('0,0')} VND</Text>

        <TouchableOpacity>
            <Text style={styles.confirmBtn}>Đăng việc</Text>   
        </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    box: {
        // display: 'flex',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',
        padding: 20,
        backgroundColor: Colors.LIGHT_GRAY,
        borderRadius: 10,
        marginVertical: 10
    },
    confirmBtn:{
        backgroundColor: Colors.GREEN,
        color: 'white',
        padding: 15,
        textAlign: 'center',
        borderRadius: 10,
        marginTop: 20,
        fontSize: 17
      },
    boldText: {
        fontWeight: 'bold',
        fontSize: 17
    }
})