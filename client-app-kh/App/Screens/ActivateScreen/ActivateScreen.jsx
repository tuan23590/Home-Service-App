import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import GlobalAPI from '../../Utils/GlobalAPI';
import { FIREBASE_AUTH } from '../../fireBase/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import ChiTietDonHangModal from './ChiTietDonHangModal';

const ActivateScreen = () => {
  const user = FIREBASE_AUTH.currentUser;
  const [danhSachDonHang, setDanhSachDonHang] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null); // State to hold selected order
  const [modalVisible, setModalVisible] = useState(false);
  const [filter, setFilter] = useState('Tất cả'); // State to hold selected filter option

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user?.uid) {
        fetchData(user);
      } else {
        setDanhSachDonHang([]);
      }
    });
  }, [User,FIREBASE_AUTH]);

  const fetchData = async (user) => {
    try{
      const { TimKhachHangTheoUid } = await GlobalAPI.apiKhachHangTheoUid(user.uid);
    const { DanhSachDonHangTheoKhachHang } = await GlobalAPI.apiDanhSachDonHang(TimKhachHangTheoUid.id);
    DanhSachDonHangTheoKhachHang.sort((a, b) => new Date(b.ngayDatHang) - new Date(a.ngayDatHang));
    setDanhSachDonHang(DanhSachDonHangTheoKhachHang);
    }catch(error){
      console.log(error);
    }
  };
  
  const handleOrderPress = (order) => {
    setSelectedOrder(order);
    setModalVisible(true);
  };

  const renderDonHangItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleOrderPress(item)}>
      <View style={[styles.item, { backgroundColor: getStatusColor(item.trangThaiDonHang) }]}>
        <Text><Text style={styles.boldText}>Mã đơn hàng:</Text> {item.maDonHang}</Text>
        <Text><Text style={styles.boldText}>Ngày đặt hàng:</Text> {new Date(item.ngayDatHang).toLocaleDateString()}</Text>
        <Text><Text style={styles.boldText}>Tổng tiền:</Text> {item.tongTien} VNĐ</Text>
        <Text><Text style={styles.boldText}>Trạng thái đơn hàng:</Text> {item.trangThaiDonHang}</Text>
        <Text><Text style={styles.boldText}>Khách hàng:</Text> {item.khachHang?.tenKhachHang}</Text>
        <Text><Text style={styles.boldText}>Địa chỉ:</Text> ({item.diaChi.ghiChu}) {item.diaChi.soNhaTenDuong}, {item.diaChi.quanHuyen}, {item.diaChi.tinhTP}</Text>
        <Text><Text style={styles.boldText}>Vật nuôi:</Text> {item.vatNuoi || "Không có vật nuôi"}</Text>
        <Text><Text style={styles.boldText}>Sao đánh giá:</Text> {item.saoDanhGia ? (`${item.saoDanhGia} sao`):("Chưa có đánh giá")}</Text>
      </View>
    </TouchableOpacity>
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Đang chờ duyệt':
      case 'Nhân viên từ chối':
      case 'Chờ xác nhận':
      case 'Đang thực hiện':
      case 'Đã từ chối':
      case 'Đã hoàn thành':
        return getStatusColorByStatus(status);
      default:
        return '#e0e0e0'; // Default color
    }
  };
  
  const getStatusColorByStatus = (status) => {
    switch (status) {
      case 'Đang chờ duyệt':
      case 'Chờ xác nhận':
      case 'Đang thực hiện':
        return '#a5d6a7'; // Greenish
      case 'Nhân viên từ chối':
      case 'Đã từ chối':
        return '#ef9a9a'; // Reddish
      case 'Đã hoàn thành':
        return '#b3e5fc'; // Bluish
      default:
        return '#e0e0e0'; // Default color
    }
  };
  const filterOrders = (donHang) => {
    if (filter === 'Tất cả') return true;
    if (filter === 'Đang xử lý') return donHang.trangThaiDonHang === 'Đang chờ duyệt' || donHang.trangThaiDonHang === 'Chờ xác nhận';
    if (filter === 'Đang thực hiện') return donHang.trangThaiDonHang === 'Đang thực hiện';
    if (filter === 'Đã hoàn thành') return donHang.trangThaiDonHang === 'Đã hoàn thành';
    if (filter === 'Đã từ chối') return donHang.trangThaiDonHang === 'Đã từ chối';
    return false;
  };

  const filteredOrders = danhSachDonHang.filter(filterOrders);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Danh sách đơn hàng</Text>
      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Chọn trạng thái:</Text>
        <Picker
          selectedValue={filter}
          style={styles.picker}
          onValueChange={(itemValue) => setFilter(itemValue)}
        >
          {['Tất cả', 'Đang xử lý', 'Đang thực hiện', 'Đã hoàn thành', 'Đã từ chối'].map((option, index) => (
            <Picker.Item key={index} label={option} value={option} />
          ))}
        </Picker>
      </View>
      {filteredOrders.length > 0 ? (
        <FlatList
          data={filteredOrders}
          renderItem={renderDonHangItem}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Text style={styles.emptyText}>Không có đơn hàng nào hiện tại.</Text>
      )}
      <ChiTietDonHangModal
        visible={modalVisible}
        closeModal={() => setModalVisible(false)}
        order={selectedOrder}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  item: {
    backgroundColor: '#e0e0e0',
    padding: 20,
    marginVertical: 8,
    borderRadius: 10,
  },
  boldText: {
    fontWeight: 'bold',
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  picker: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  emptyText: {
    marginTop: 20,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default ActivateScreen;
