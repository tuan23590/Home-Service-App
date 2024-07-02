import React, { useEffect, useState } from 'react';
import { Text, FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalAPI from '../../Utils/GlobalAPI';
import { FIREBASE_AUTH } from '../../fireBase/config';
import ChiTietDonHangModal from './ChiTietDonHangModal'; // Import modal component
import { ScrollView } from 'react-native-virtualized-view'
import { onAuthStateChanged } from 'firebase/auth';

const DanhSachDonHang = () => {
    const [danhSachDonHang, setDanhSachDonHang] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // State to hold selected order
    const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility
    const auth = FIREBASE_AUTH.currentUser;


    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
          if (!user) {
            setDanhSachDonHang([]);
          }else{
            fetchData();
          }
        });
      }, [FIREBASE_AUTH]);

    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        const { TimNhanVienTheoEmail } = await GlobalAPI.apiNhanVienTheoEmail(auth.email);
        const { DanhSachDonHangChoXacNhanTheoNhanVien } = await GlobalAPI.apiDanhSachDonHangChoNhan(TimNhanVienTheoEmail.id);
        setDanhSachDonHang(DanhSachDonHangChoXacNhanTheoNhanVien);
    }

    const handleOrderPress = (order) => {
        setSelectedOrder(order);
        setModalVisible(true);
    }

    const renderDonHangItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleOrderPress(item)}>
            <View style={styles.item}>
                <Text><Text style={styles.boldText}>Mã đơn hàng:</Text> {item.maDonHang}</Text>
                <Text><Text style={styles.boldText}>Ngày đặt hàng:</Text> {new Date(item.ngayDatHang).toLocaleDateString()}</Text>
                <Text><Text style={styles.boldText}>Tổng tiền:</Text> {item.tongTien} VNĐ</Text>
                <Text><Text style={styles.boldText}>Trạng thái đơn hàng:</Text> {item.trangThaiDonHang}</Text>
                <Text><Text style={styles.boldText}>Khách hàng:</Text> {item.khachHang.tenKhachHang}</Text>
                <Text><Text style={styles.boldText}>Địa chỉ:</Text> ({item.diaChi.ghiChu}) {item.diaChi.soNhaTenDuong}, {item.diaChi.quanHuyen}, {item.diaChi.tinhTP}</Text>
                <Text><Text style={styles.boldText}>Vật nuôi:</Text> {item.vatNuoi || "Không có vật nuôi"}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Danh sách đơn hàng</Text>
            <FlatList
                data={danhSachDonHang}
                renderItem={renderDonHangItem}
                keyExtractor={item => item.id}
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
});

export default DanhSachDonHang;
