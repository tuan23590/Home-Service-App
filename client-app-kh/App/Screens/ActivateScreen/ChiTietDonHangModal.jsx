import React, { useEffect, useRef, useState } from 'react';
import { Modal, Text, View, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert, TouchableWithoutFeedback } from 'react-native';
import GlobalAPI from '../../Utils/GlobalAPI';
import Icon from 'react-native-vector-icons/Ionicons';
import { EPOCHTODATE, EPOCHTODATETIMETOTIME } from '../../function/index';

const ChiTietDonHangModal = ({ visible, closeModal, order}) => {
    const [rejectReason, setRejectReason] = useState('');
    const [showRejectReason, setShowRejectReason] = useState(false);
    const [rating, setRating] = useState(0);
    const [reviewContent, setReviewContent] = useState('');
    const scrollViewRef = useRef();

    useEffect(() => {
        if (showRejectReason && scrollViewRef.current) {
            scrollViewRef.current.scrollToEnd({ animated: true });
        }
    }, [showRejectReason]);

    const danhGiaDonHang = async () => {
        if (rating === 0) {
            Alert.alert('Đánh giá', 'Vui lòng chọn số sao đánh giá');
            return;
        }
        const { danhGiaDonHang } = await GlobalAPI.apiDanhGiaDonHang(order.id, rating, reviewContent);
        if (danhGiaDonHang) {
            Alert.alert('Thành công', 'Đánh giá đơn hàng thành công');
            closeModal();
        } else {
            Alert.alert('Thất bại', 'Đánh giá đơn hàng thất bại');
        }
    };

    if (!visible) return null;
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={closeModal}
        >
            <TouchableWithoutFeedback onPress={closeModal}>
                <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                        <View style={styles.modalContent}>
                            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                                <Icon name="close" size={30} color="#000" />
                            </TouchableOpacity>
                            <ScrollView
                                ref={scrollViewRef}
                                showsVerticalScrollIndicator={false}
                                contentContainerStyle={styles.scrollViewContent}
                            >
                                <View style={styles.box}>
                                    <Text style={styles.title}>Thông tin đơn hàng:</Text>
                                    <Text><Text style={styles.boldText}>Mã đơn hàng:</Text> {order.maDonHang}</Text>
                                    <Text><Text style={styles.boldText}>Ngày đặt hàng:</Text> {new Date(order.ngayDatHang).toLocaleDateString()}</Text>
                                    <Text><Text style={styles.boldText}>Tổng tiền:</Text> {order.tongTien?.toLocaleString()} VNĐ</Text>
                                    <Text><Text style={styles.boldText}>Trạng thái đơn hàng:</Text> {order.trangThaiDonHang}</Text>
                                    {order.lyDoTuChoi && (<Text><Text style={styles.boldText}>Lý do từ chối:</Text> {order.lyDoTuChoi}</Text>)}
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
                                                <Text style={[styles.tableCell, { flex: 2 }]}>{dichVu.gia?.toLocaleString()} VNĐ</Text>
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

                               {order.trangThaiDonHang !== 'Đã từ chối' && (
                                 <View style={styles.box}>
                                 <Text style={styles.title}>Thông tin nhân viên:</Text>
                                 <Text><Text style={styles.boldText}>Tên nhân viên:</Text> {order.nhanVien[0]?.tenNhanVien}</Text>
                                 <Text><Text style={styles.boldText}>Chuyên môn:</Text> {order.nhanVien[0]?.soDienThoai}</Text>
                                 <Text><Text style={styles.boldText}>Số điện thoại:</Text> {order.nhanVien[0]?.email}</Text>
                                 <Text><Text style={styles.boldText}>Email:</Text> {order.nhanVien[0]?.email}</Text>
                             </View>)

                               }

                                {
                                    order.trangThaiDonHang === 'Đã hoàn thành' && !order.saoDanhGia && (
                                        <View style={styles.box}>
                                            <Text style={styles.title}>Đánh giá đơn hàng:</Text>
                                            <View style={styles.ratingContainer}>
                                                {[1, 2, 3, 4, 5].map((star, index) => (
                                                    <TouchableOpacity
                                                        key={index}
                                                        onPress={() => setRating(star)}
                                                        style={styles.starButton}
                                                    >
                                                        <Icon
                                                            name={star <= rating ? 'star' : 'star-outline'}
                                                            size={30}
                                                            color={star <= rating ? '#FFD700' : '#ccc'}
                                                        />
                                                    </TouchableOpacity>
                                                ))}
                                            </View>
                                            <TextInput
                                                style={styles.inputReview}
                                                multiline
                                                placeholder="Nhập nội dung đánh giá..."
                                                value={reviewContent}
                                                onChangeText={text => setReviewContent(text)}
                                            />
                                            <TouchableOpacity style={styles.buttonReview} onPress={danhGiaDonHang}>
                                                <Text>Đánh giá</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                }
                            </ScrollView>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
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
        borderRadius: 10,
        padding: 20,
        width: '90%',
        maxHeight: '90%',
    },
    closeButton: {
        alignItems: 'flex-end',
    },
    scrollViewContent: {
        flexGrow: 1,
    },
    box: {
        backgroundColor: '#e0e0e0',
        marginVertical: 5,
        padding: 10,
        borderRadius: 8,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    boldText: {
        fontWeight: 'bold',
    },
    tableContainer: {
        marginTop: 5,
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
    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
    },
    starButton: {
        marginHorizontal: 2,
    },
    inputReview: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
        minHeight: 50,
        textAlignVertical: 'top',
        marginBottom: 10,
    },
    buttonReview: {
        backgroundColor: '#f0f0f0',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
});

export default ChiTietDonHangModal;
