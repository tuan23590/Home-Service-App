import React, { useEffect, useState } from 'react';
import { View, Text, Alert, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GlobalAPI from '../../Utils/GlobalAPI';
import { Ionicons } from '@expo/vector-icons'; // Assuming you are using Ionicons for star icons

const ActivateScreen = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [rating, setRating] = useState(0); // State for star rating (0 to 5 stars)
  const [reviewContent, setReviewContent] = useState(''); // State for review content

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await GlobalAPI.apiDanhSachDonHang();
        setOrders(data.DanhSachDonHangTheoKhachHang);
      } catch (error) {
        console.error("Error fetching:", error);
        Alert.alert("Lỗi", "Thêm đơn hàng thất bại");
      } 
    };
    fetchData();
  }, []);

  const handleOrderPress = (order) => {
    setSelectedOrder(order);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => handleOrderPress(item)} style={styles.orderItem}>
      <Text style={styles.orderText}>Mã đơn hàng: {item.maDonHang}</Text>
      <Text style={styles.orderText}>
  Ngày đặt hàng: {`${new Date(item.ngayDatHang).toLocaleDateString()} ${new Date(item.ngayDatHang).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`}
</Text>

      <Text style={styles.orderText}>Trạng thái đơn hàng: {item.trangThaiDonHang}</Text>
    </TouchableOpacity>
  );

  const handleRating = (stars) => {
    setRating(stars);
  };

  const handleSubmitReview = async () => {

    const danhGiaData = {
      idDonHang: selectedOrder.id,
      saoDanhGia: rating,
      ghiChuDanhGia: reviewContent,
    }
    const data = await GlobalAPI.apiDanhGiaDonHang(danhGiaData);
    if(data){
      Alert.alert("Thành công", "Đánh giá đơn hàng thành công");
      setRating(0);
      setReviewContent('');
      setSelectedOrder(null);
    }else{
      Alert.alert("Lỗi", "Đánh giá đơn hàng thất bại");
    }

  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Danh sách đơn hàng</Text>
      <FlatList
        data={orders}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
      {selectedOrder && (
        <View style={styles.selectedOrder}>
          <Text style={styles.selectedOrderText}>Chi tiết đơn hàng {selectedOrder.maDonHang}</Text>
          <View style={styles.detailItem}>
  <Text style={styles.detailLabel}>Ngày bắt đầu:</Text>
  <Text style={styles.detailValue}>
    {`${new Date(selectedOrder.ngayBatDau).toLocaleDateString()} ${new Date(selectedOrder.ngayBatDau).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`}
  </Text>
</View>
<View style={styles.detailItem}>
  <Text style={styles.detailLabel}>Ngày kết thúc:</Text>
  <Text style={styles.detailValue}>
    {`${new Date(selectedOrder.ngayKetThuc).toLocaleDateString()} ${new Date(selectedOrder.ngayKetThuc).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}`}
  </Text>
</View>

          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Địa chỉ:</Text>
            <Text style={styles.detailValue}>
              {selectedOrder.diaChi.soNhaTenDuong}, {selectedOrder.diaChi.xaPhuong}, {selectedOrder.diaChi.quanHuyen}, {selectedOrder.diaChi.tinhTP}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Dịch vụ:</Text>
            <Text style={styles.detailValue}>
              {Array.from(new Set(selectedOrder.danhSachDichVu.map(dv => dv.tenDichVu))).map((tenDichVu, index) => (
                <Text key={index}>{tenDichVu}, </Text>
              ))}
            </Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Tổng tiền:</Text>
            <Text style={styles.detailValue}>{selectedOrder.tongTien.toLocaleString()} VNĐ</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Số giờ thực hiện:</Text>
            <Text style={styles.detailValue}>{selectedOrder.soGioThucHien}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Lịch thực hiện:</Text>
            <Text style={styles.detailValue}>
  {selectedOrder.danhSachLichThucHien.map((lich, index) => (
    <React.Fragment key={index}>
      <Text>
        {`${new Date(lich.thoiGianBatDauLich).toLocaleDateString()} ${new Date(lich.thoiGianBatDauLich).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })} đến `}
        {`${new Date(lich.thoiGianKetThucLich).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}, `}
      </Text>
      {index !== selectedOrder.danhSachLichThucHien.length - 1 && <Text>{'\n'}</Text>}
    </React.Fragment>
  ))}
</Text>

          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Vật nuôi:</Text>
            <Text style={styles.detailValue}>{selectedOrder.vatNuoi}</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Ghi chú:</Text>
            <Text style={styles.detailValue}>{selectedOrder.ghiChu}</Text>
          </View>
          {selectedOrder.lyDoTuChoi && (
            <View style={styles.detailItem}>
              <Text style={styles.detailLabel}>Lý do từ chối:</Text>
              <Text style={styles.detailValue}>{selectedOrder.lyDoTuChoi}</Text>
            </View>
          )}
          {selectedOrder.trangThaiDonHang === 'Đã hoàn thành' && !selectedOrder.saoDanhGia && (
  <View style={styles.reviewContainer}>
    <Text style={styles.reviewLabel}>Đánh giá đơn hàng</Text>
    <View style={styles.ratingContainer}>
      {[1, 2, 3, 4, 5].map((star, index) => (
        <TouchableOpacity key={index} onPress={() => handleRating(star)}>
          <Ionicons
            name={star <= rating ? 'star' : 'star-outline'}
            size={30}
            color={star <= rating ? '#ffc107' : '#888'}
          />
        </TouchableOpacity>
      ))}
    </View>
    <TextInput
      style={styles.reviewInput}
      placeholder="Nhập nội dung đánh giá"
      value={reviewContent}
      onChangeText={text => setReviewContent(text)}
      multiline
    />
    <TouchableOpacity onPress={handleSubmitReview} style={styles.submitButton}>
      <Text style={styles.submitButtonText}>Gửi đánh giá</Text>
    </TouchableOpacity>
  </View>
)}

          <TouchableOpacity onPress={() => setSelectedOrder(null)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  orderItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    padding: 10,
  },
  orderText: {
    fontSize: 16,
  },
  selectedOrder: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#bcbcbc',
    borderRadius: 5,
  },
  selectedOrderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  detailLabel: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  detailValue: {
    flex: 1,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#dcdcdc',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-end',
  },
  closeButtonText: {
    color: '#333',
    fontWeight: 'bold',
  },
  reviewContainer: {
    marginTop: 20,
  },
  reviewLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  reviewInput: {
    borderWidth: 1,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    minHeight: 50, // Adjust height as needed
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ActivateScreen;
