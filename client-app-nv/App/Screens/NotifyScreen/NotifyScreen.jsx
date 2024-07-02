import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import GlobalAPI from '../../Utils/GlobalAPI';
import { FIREBASE_AUTH } from '../../fireBase/config';
import { onAuthStateChanged } from 'firebase/auth';

export default function NotifyScreen() {
  const [danhSachDonHang, setDanhSachDonHang] = useState([]);

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
    let backgroundColor = '';
    switch (item.trangThaiDonHang) {
      case 'Đang chờ duyệt':
      case 'Đang thực hiện':
        backgroundColor = '#a5d6a7';
        break;
      case 'Nhân viên từ chối':
      case 'Đã từ chối':
        backgroundColor = '#ef9a9a';
        break;
      case 'Chờ xác nhận':
        backgroundColor = '#ffecb3';
        break;
      case 'Đã hoàn thành':
        backgroundColor = '#b3e5fc';
        break;
      default:
        backgroundColor = '#ffffff';
        break;
    }

    return (
      <View style={[styles.item, { backgroundColor }]}>
        <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Mã đơn hàng: {item.maDonHang}</Text>
        <Text>Ngày đặt hàng: {new Date(item.ngayDatHang).toLocaleDateString()}</Text>
        <Text>Khách hàng: {item.khachHang.tenKhachHang}</Text>
        <Text>Địa chỉ: {item.diaChi.soNhaTenDuong}, {item.diaChi.quanHuyen}, {item.diaChi.tinhTP}</Text>
        <Text>Tổng tiền: {item.tongTien} VNĐ</Text>
        <Text>Trạng thái: {item.trangThaiDonHang}</Text>
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
});
