import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import GlobalAPI from '../../Utils/GlobalAPI';
import { FIREBASE_AUTH } from '../../fireBase/config';
import { onAuthStateChanged } from 'firebase/auth';
import ChiTietDonHangModal from '../TrangChu/ChiTietDonHangModal';

export default function NotifyScreen() {
  const [danhSachDonHang, setDanhSachDonHang] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false); 


  const fetchData = async (user) => {
    const { TimNhanVienTheoEmail } = await GlobalAPI.apiNhanVienTheoEmail(user.email);
    const { DanhSachDonHangDaXacNhanTheoNhanVien } = await GlobalAPI.apiDanhSachDonHangDaXacNhanTheoNhanVien(TimNhanVienTheoEmail.id);
    setDanhSachDonHang(DanhSachDonHangDaXacNhanTheoNhanVien);
  }

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        fetchData(user);
      } else {
        setDanhSachDonHang([]);
      }
    });
  }, []);

  const renderItem = ({ item }) => {
    let trangThaiStyle = styles.default; // mặc định sử dụng style default

    // Xác định style dựa vào trạng thái đơn hàng
    switch (item.trangThaiDonHang) {
      case 'Đang thực hiện':
        trangThaiStyle = styles.dangThucHien;
        break;
      case 'Đã hoàn thành':
        trangThaiStyle = styles.daHoanThanh;
      break;
      default:
        trangThaiStyle = styles.default;
        break;
    }
    const handlePress = async (item) => {
      const {DonHangTheoId} = await GlobalAPI.apiChiTietDonHang(item.id);
      setSelectedOrder(DonHangTheoId);
      console.log(DonHangTheoId.khachHang);
      setModalVisible(true);
    }
    return (
      <TouchableOpacity onPress={()=>handlePress(item)}>
        <View style={[styles.item, { backgroundColor: '#e0e0e0' }]}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Mã đơn hàng: {item.maDonHang}</Text>
        <Text>Ngày đặt hàng: {new Date(item.ngayDatHang).toLocaleDateString()}</Text>
        <Text>Khách hàng: {item.khachHang.tenKhachHang}</Text>
        <Text>Địa chỉ: {item.diaChi.soNhaTenDuong}, {item.diaChi.quanHuyen}, {item.diaChi.tinhTP}</Text>
        <Text>Tổng tiền: {item.tongTien} VNĐ</Text>
        <Text style={trangThaiStyle}>{`Trạng thái: ${item.trangThaiDonHang}`}</Text>
      </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>Danh sách đơn hàng đã xác nhận</Text>
      <FlatList
        data={danhSachDonHang}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
            <ChiTietDonHangModal
                visible={modalVisible}
                closeModal={() => setModalVisible(false)}
                order={selectedOrder}
                fetchData={fetchData}
            />
            </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  default: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000000', // màu mặc định
  },
  dangThucHien: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4caf50', // màu cho Đang thực hiện và Đang chờ duyệt
  },
  daHoanThanh: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#03a9f4', // màu cho Đã hoàn thành
  },
});
