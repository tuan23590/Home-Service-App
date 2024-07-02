import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons';
import Heading from '../../Compunents/Heading';
import Colors from '../../Utils/Colors';
import numeral from 'numeral';
import { DonHangContext } from '../../Provider/DonHangProvider';
import GlobalAPI from '../../Utils/GlobalAPI';
import { Alert } from 'react-native';
import { ModalContext } from './../../Provider/ModalProvider';

export default function ChiTietDonHang({hideModal}) {
    const {vatNuoi,dichVuThem,dichVuChinh,gioLam,lichLamViec,tongTien,uuTienTasker,ghiChu,khachHang,diaChi} = useContext(DonHangContext);
    const {setModal1Visible,setModal2Visible,setModal3Visible} = useContext(ModalContext);
    console.log('ghiChu',ghiChu);
    const formatDateWithTime = (dateString, boundHour = 0) => {
      const date = new Date(dateString);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      const hour = date.getHours() + boundHour;
      const minute = date.getMinutes();
  
      // Helper function to add leading zero if needed
      const addLeadingZero = (number) => {
          return number < 10 ? `0${number}` : number.toString();
      };
  
      return `${addLeadingZero(hour)}:${addLeadingZero(minute)} - ${day}/${month}`;
  };
  
  const press = () => {
    const donHangdata = {
      lichLamViec,
      dichVuChinh,
      vatNuoi,
      ghiChu,
      tongTien,
      khachHang,
      diaChi
    };
    
    const fetchData = async () => {
      try {
        const data = await GlobalAPI.apiThemDonHang(donHangdata);
        // Kiểm tra kết quả từ API và hiển thị thông báo nếu thành công
        if (data) {
          Alert.alert("Thông báo", "Thêm đơn hàng thành công");
          setModal1Visible(false);
          setModal2Visible(false);
          setModal3Visible(false);
          hideModal();
        }
      } catch (error) {
        console.error("Error fetching:", error);
        // Xử lý lỗi khi gọi API
        Alert.alert("Lỗi", "Thêm đơn hàng thất bại");
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
      </TouchableOpacity>
      <Heading text='Vị trí làm việc'/>
      <View style={styles.box}>
      <Text style={styles.boldText}>Thông tin cá nhân</Text>
        <Text>Họ và tên: {khachHang.tenKhachHang}</Text>
        <Text>Số Điện thoại: {khachHang.soDienThoai}</Text>
        <Text>Email: {khachHang.email}</Text>
        <Text style={styles.boldText}>Chi tiết địa chỉ</Text>
        <Text>({diaChi?.ghiChu}){diaChi?.soNhaTenDuong}, {diaChi?.xaPhuong}, {diaChi?.quanHuyen}, {diaChi?.tinhTP}</Text>
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
            {/* <Text>Dịch vụ thêm: {ghiChu}</Text>  */}
            {vatNuoi && (
              <>
              
              <Text>Nhà có vật nuôi: {vatNuoi}</Text>
              <Text>Ghi chú: {ghiChu}</Text>
              </>
            )}
        </View>
        <Heading text='Phương thức thanh toán'/>
        <View style={styles.box}>
            <Text></Text> 
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