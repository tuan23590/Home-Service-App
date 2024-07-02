import React, { useEffect, useRef, useState } from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import GlobalAPI from '../../Utils/GlobalAPI';
import Icon from 'react-native-vector-icons/Ionicons';
import { EPOCHTODATE, EPOCHTODATETIMETOTIME } from '../../function/index';

const ChiTietDonHangModal = ({ visible, closeModal, order,fetchData }) => {
    const [rejectReason, setRejectReason] = useState('');
    const [showRejectReason, setShowRejectReason] = useState(false);
    const scrollViewRef = useRef();

    useEffect(() => {
        if (showRejectReason && scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [showRejectReason]);


    const handleReject = () => {
        setShowRejectReason(true); 
    };
    const handleCancelReject = () => {
        setShowRejectReason(false);
        setRejectReason(''); 
    };
    const nhanDonHang = async () => {
        Alert.alert(
            'Xác nhận nhận',
            'Bạn có chắc muốn nhận đơn hàng này?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý',
                    onPress: async () => {
                        const {nhanVienXacNhanCongViec} = await GlobalAPI.apiNhanVienXacNhanCongViec(order.id);
                        if(nhanVienXacNhanCongViec){
                            Alert.alert('Thành công', 'Nhận đơn hàng thành công');
                            fetchData();
                            closeModal();
                        } else {
                            Alert.alert('Thất bại', 'Nhận đơn hàng thất bại');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };
    const huyDonHang = async () => {
        if (!rejectReason) {
            Alert.alert('Nhập lý do','Vui lòng nhập lý do từ chối đơn hàng');    
        }
        Alert.alert(
            'Xác nhận từ chối',
            'Bạn có chắc muốn từ chối đơn hàng này?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý',
                    onPress: async () => {
                        const {nhanVienTuChoiCongViec} = await GlobalAPI.apiNhanVienTuChoiCongViec(order.id, rejectReason);
                        if(nhanVienTuChoiCongViec){
                            Alert.alert('Thành công', 'Từ chối đơn hàng thành công');
                            fetchData();
                            closeModal();
                        } else {
                            Alert.alert('Thất bại', 'Từ chối đơn hàng thất bại');
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    }
    if (!visible) return null;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <Icon name="close" size={30} color="#000" />
                    </TouchableOpacity>
                    <ScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={styles.scrollViewContent}
                    onContentSizeChange={() => {
                        if (showRejectReason && scrollViewRef.current) {
                            scrollViewRef.current.scrollToEnd({ animated: true });
                        }
                    }}
                    >
                        <View style={styles.box}>
                            <Text style={styles.title}>Thông tin đơn hàng:</Text>
                            <Text><Text style={styles.boldText}>Mã đơn hàng:</Text> {order.maDonHang}</Text>
                            <Text><Text style={styles.boldText}>Ngày đặt hàng:</Text> {new Date(order.ngayDatHang).toLocaleDateString()}</Text>
                            <Text><Text style={styles.boldText}>Tổng tiền:</Text> {order.tongTien.toLocaleString()} VNĐ</Text>
                            <Text><Text style={styles.boldText}>Trạng thái đơn hàng:</Text> {order.trangThaiDonHang}</Text>
                            <Text><Text style={styles.boldText}>Khách hàng:</Text> {order.khachHang?.tenKhachHang}</Text>
                            <Text><Text style={styles.boldText}>Địa chỉ:</Text> ({order.diaChi?.ghiChu}) {order.diaChi?.soNhaTenDuong}, {order.diaChi?.quanHuyen}, {order.diaChi?.tinhTP}</Text>
                            <Text><Text style={styles.boldText}>Vật nuôi:</Text> {order.vatNuoi || "Không có vật nuôi"}</Text>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.title}>Danh sách lịch thực hiện:</Text>
                            <View style={styles.tableContainer}>
                                <View style={styles.tableRow}>
                                    <Text style={[styles.tableHeader, { flex: 2 }]}>Ngày làm việc</Text>
                                    <Text style={[styles.tableHeader, { flex: 3 }]}>Làm trong</Text>
                                    <Text style={[styles.tableHeader, { flex: 2 }]}>Trạng thái lịch</Text>
                                </View>
                                {order.danhSachLichThucHien.map((lich, index) => (
                                    <View key={index} style={styles.tableRow}>
                                        <Text style={[styles.tableCell, { flex: 2 }]}>{EPOCHTODATE(lich.thoiGianBatDauLich)}</Text>
                                        <Text style={[styles.tableCell, { flex: 3 }]}>{EPOCHTODATETIMETOTIME(lich.thoiGianBatDauLich,lich.thoiGianKetThucLich)}</Text>
                                        <Text style={[styles.tableCell, { flex: 2 }]}>{lich.trangThaiLich}</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.title}>Danh sách dịch vụ:</Text>
                            <View style={styles.tableContainer}>
                                <View style={styles.tableRow}>
                                    <Text style={[styles.tableHeader, { flex: 2 }]}>Loại dịch vụ</Text>
                                    <Text style={[styles.tableHeader, { flex: 2 }]}>Tên dịch vụ</Text>
                                    <Text style={[styles.tableHeader, { flex: 1 }]}>Giờ</Text>
                                    <Text style={[styles.tableHeader, { flex: 2 }]}>Giá</Text>
                                </View>
                                {order.danhSachDichVu.map((dichVu, index) => (
                                    <View key={index} style={styles.tableRow}>
                                        <Text style={[styles.tableCell, { flex: 2 }]}>{dichVu.loaiDichVu}</Text>
                                        <Text style={[styles.tableCell, { flex: 2 }]}>{dichVu.tenDichVu}</Text>
                                        <Text style={[styles.tableCell, { flex: 1 }]}>{dichVu.thoiGian}</Text>
                                        <Text style={[styles.tableCell, { flex: 2 }]}>{dichVu.gia.toLocaleString()} VNĐ</Text>
                                    </View>
                                ))}
                            </View>
                        </View>
                        <View style={styles.box}>
                            <Text style={styles.title}>Thông tin khách hàng:</Text>
                            <Text><Text style={styles.boldText}>Tên Khách Hàng:</Text> {order.khachHang?.tenKhachHang}</Text>
                            <Text><Text style={styles.boldText}>Số điện thoại:</Text> {order.khachHang?.soDienThoai}</Text>
                            <Text><Text style={styles.boldText}>Email:</Text> {order.khachHang?.email}</Text>
                        </View>
                        {showRejectReason && (
                            <View style={styles.box}>
                                <Text style={styles.title}>Lý do từ chối:</Text>
                                <TextInput
                                    style={styles.inputReason}
                                    multiline
                                    autoFocus
                                    numberOfLines={4}
                                    value={rejectReason}
                                    onChangeText={text => setRejectReason(text)}
                                />
                            </View>
                        )}
                        {
                            order.trangThaiDonHang === 'Chờ xác nhận' && (
                                <View style={styles.buttonContainer}>
                                {showRejectReason ? (
                                    <>
                                    <TouchableOpacity style={styles.button_cancel} onPress={handleCancelReject}>
                                        <Text>Hủy bỏ từ chối</Text>
                                    </TouchableOpacity>
                                     <TouchableOpacity style={styles.button_accept} onPress={huyDonHang}>
                                     <Text>Xác nhận từ chối đơn hàng</Text>
                                 </TouchableOpacity>
                                    </>
                                ) : (
                                    <>
                                    <TouchableOpacity style={styles.button_cancel} onPress={handleReject}>
                                        <Text>Từ chối đơn hàng</Text>
                                    </TouchableOpacity>
                                     <TouchableOpacity style={styles.button_accept} onPress={nhanDonHang}>
                                     <Text>Xác nhận nhận đơn hàng</Text>
                                 </TouchableOpacity>
                                    </>
                                )}
                                   
                                </View>
                            )
                        }
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 10,
        width: '90%',
        maxHeight: '80%', // Set maximum height to 80% of screen height
    },
    boldText: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 5,
    },
    tableContainer: {
        marginTop: 5,
    },
    box: {
        backgroundColor: '#e0e0e0',
        marginVertical: 5,
        padding: 10,
        borderRadius: 8,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        paddingVertical: 5,
    },
    tableHeader: {
        fontWeight: 'bold',
        flex: 1,
    },
    tableCell: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    button_accept: {
        backgroundColor: '#007bff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        textAlign: 'center',
    },
    button_cancel: {
        backgroundColor: '#dc3545',
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 5,
        textAlign: 'center',
    },
    inputReason: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
        marginBottom: 10,
        height: 50,
    },
    closeButton: {
        alignItems: 'flex-end',
    },
});

export default ChiTietDonHangModal;
