import React, { useEffect, useState } from 'react';
import { Text, FlatList, View, StyleSheet, TouchableOpacity } from 'react-native';
import GlobalAPI from '../../Utils/GlobalAPI';
import { FIREBASE_AUTH } from '../../fireBase/config';
import ChiTietDonHangModal from './ChiTietDonHangModal'; // Import modal component
import { ScrollView } from 'react-native-virtualized-view'
import {User, onAuthStateChanged } from 'firebase/auth';

const DanhSachDonHang = () => {
    const [danhSachDonHang, setDanhSachDonHang] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null); // State to hold selected order
    const [modalVisible, setModalVisible] = useState(false); // State to control modal visibility



    useEffect(() => {
        onAuthStateChanged(FIREBASE_AUTH, (user) => {
            if(user){
                fetchData(user);
            }else{
                setDanhSachDonHang([]);
            }
          });
    }, [User,FIREBASE_AUTH]);

    const fetchData = async (user) => {
        try{
        const { TimNhanVienTheoEmail } = await GlobalAPI.apiNhanVienTheoEmail(user.email);
        const { DanhSachDonHangChoXacNhanTheoNhanVien } = await GlobalAPI.apiDanhSachDonHangChoNhan(TimNhanVienTheoEmail.id);
        setDanhSachDonHang(DanhSachDonHangChoXacNhanTheoNhanVien);
        }catch(e){
            console.error(e);
        }
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
            <Text style={styles.title}>Danh sách đơn hàng chờ xác nhận</Text>
           {danhSachDonHang.length > 0 ? (
             <FlatList
             data={danhSachDonHang}
             renderItem={renderDonHangItem}
             keyExtractor={item => item.id}
         />
           ):(
                <Text style={styles.text} >Không có đơn hàng nào</Text>
           )}
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
        fontSize: 20,
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
    text:{
        fontSize: 16,
        color: '#000000',
        textAlign: 'center',
    },
});

export default DanhSachDonHang;
