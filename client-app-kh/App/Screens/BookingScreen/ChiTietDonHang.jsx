import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Heading from '../../Compunents/Heading';
import Colors from '../../Utils/Colors';
import numeral from 'numeral';
import { DonHangContext } from '../../Provider/DonHangProvider';
import GlobalAPI from '../../Utils/GlobalAPI';

export default function ChiTietDonHang({hideModal}) {
    const {vatNuoi,dichVuThem,dichVuChinh,gioLam,lichLamViec,tongTien,uuTienTasker,ghiChu} = useContext(DonHangContext);
    const formatDateWithTime = (dateString,boundHuor = 0) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hour = date.getHours() + boundHuor;
      const minute = date.getMinutes();
      return `${hour}:${minute} - ${day}/${month} `;
    };
    const press = () => {
      const fetchData = async () => {
        try {
          const data = await GlobalAPI.themDonHang(lichLamViec,dichVuChinh,dichVuThem,vatNuoi,ghiChu,uuTienTasker,tongTien);
        } catch (error) {
          console.error("Error fetching:", error);
        }
      };
      fetchData();
    };

  return (
    <View style={{marginHorizontal: 20}}>
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
            <Text>Làm trong: {dichVuChinh.thoiGian} giờ, bắt đầu lúc {`${gioLam.getHours().toString().padStart(2, '0')}:${gioLam.getMinutes().toString().padStart(2, '0')}`} </Text>
            <Text>Ngày Làm Việc:</Text>
            {lichLamViec?.map((ngay, index) => (
              <Text key={index}>Ngày Bắt đầu: {formatDateWithTime(ngay)} đến {formatDateWithTime(ngay,boundHuor=dichVuChinh.thoiGian)}</Text>
            ))}
            
            <Text style={styles.boldText}>Chi tiết công việc</Text>
            <Text>Khối lượng công việc: {dichVuChinh.moTaDichVu}</Text>
            <Text>Dịch vụ thêm: {dichVuThem.map(item => item?.tenDichVu).join(', ')}</Text>
            <Text>Nhà có vật nuôi: {vatNuoi}</Text>
        </View>
        <Heading text='Phương thức thanh toán'/>
        <View style={styles.box}>
            <Text>tiền mặt {'>'}  |  Khuyến mãi {'>'}</Text> 
        </View>
        <Text style={styles.boldText}>Tổng cộng: {numeral(tongTien).format('0,0')} VND</Text>

        <TouchableOpacity onPress={press}>
            <Text style={styles.confirmBtn}>Đăng việc</Text>   
        </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
    box: {
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