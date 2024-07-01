import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import GlobalAPI from '../Utils/GlobalAPI';
import { DonHangContext } from '../Provider/DonHangProvider';
import { FIREBASE_AUTH } from '../fireBase/config';

export default function MapPicker({ hideModal }) {
    const [tinhTP, setTinhTP] = useState([]);
    const [quanHuyen, setQuanHuyen] = useState([]);
    const [xaPhuong, setXaPhuong] = useState([]);
    const [selectedTinhTP, setSelectedTinhTP] = useState('');
    const [selectedTinhTPName, setSelectedTinhTPName] = useState('');
    const [selectedQuanHuyen, setSelectedQuanHuyen] = useState('');
    const [selectedQuanHuyenName, setSelectedQuanHuyenName] = useState('');
    const [selectedXaPhuong, setSelectedXaPhuong] = useState('');
    const [selectedXaPhuongName, setSelectedXaPhuongName] = useState('');
    const [soNhaTenDuong, setSoNhaTenDuong] = useState('');
    const [ghiChuDiaChi, setGhiChuDiaChi] = useState('');
    const [danhSachDiaChi, setDanhSachDiaChi] = useState([]);
    const [selectedDiaChi, setSelectedDiaChi] = useState('');
    const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
    const { diaChi, setDiaChi, khachHang, setKhachHang} = useContext(DonHangContext);
    const user = FIREBASE_AUTH.currentUser;

    useEffect(() => {
        fetchData();
    }, []);


    useEffect(() => {
        const fetchQuanHuyen = async () => {
            if (selectedTinhTP) {
                const data = await GlobalAPI.apiQuanHuyen(selectedTinhTP);
                setQuanHuyen(data.DanhSachQuanHuyen);
            }
        };
        fetchQuanHuyen();
    }, [selectedTinhTP]);

    useEffect(() => {
        const fetchXaPhuong = async () => {
            if (selectedQuanHuyen) {
                const data = await GlobalAPI.apiXaPhuong(selectedQuanHuyen);
                setXaPhuong(data.DanhSachXaPhuong);
            }
        };
        fetchXaPhuong();
    }, [selectedQuanHuyen]);


    const fetchData = async () => {
        const { TimKhachHangTheoUid } = await GlobalAPI.apiKhachHangTheoUid(user?.uid);
        const data = await GlobalAPI.apiTinhTP();
        const dataDC = await GlobalAPI.apiDanhSachDiaChi(TimKhachHangTheoUid.id);
        setTinhTP(data.DanhSachTinhTp);
        setKhachHang(dataDC.TimKhachHangTheoId);
        setDanhSachDiaChi(dataDC.TimKhachHangTheoId.danhSachDiaChi);
    };



    const handleSaveAddress = async () => {
        if (!selectedTinhTP || !selectedQuanHuyen || !selectedXaPhuong || !soNhaTenDuong) {
            Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin địa chỉ");
            return;
        }
        const address = {
            tinhTPName: selectedTinhTPName,
            quanHuyenName: selectedQuanHuyenName,
            xaPhuongName: selectedXaPhuongName,
            soNhaTenDuong: soNhaTenDuong,
            ghiChuDiaChi: ghiChuDiaChi,
            khachHangId: khachHang.id,
        };
        const data = await GlobalAPI.apiThemDiaChi(address);
        console.log(data);
        if (data.themDiaChi) {
            Alert.alert("Thông báo", "Lưu địa chỉ thành công");
            setIsAddingNewAddress(false);
            fetchData();
            setDiaChi(data.themDiaChi);
            hideModal();
        } else {
            Alert.alert("Lỗi", "Lưu địa chỉ thất bại");
        }
    };

    const handleSelectedDiaChiChange = (itemValue) => {
        setSelectedDiaChi(itemValue);
        const selectedAddress = danhSachDiaChi.find(item => item.id === itemValue);
        if (selectedAddress) {
            setDiaChi(selectedAddress);
        }
    };

    return (
        <ScrollView>
            <TouchableOpacity onPress={() => hideModal()}>
                <Ionicons name="chevron-back-sharp" size={24} color="black" />
                <Text>{diaChi?.soNhaTenDuong}, {diaChi?.xaPhuong}, {diaChi?.quanHuyen}, {diaChi?.tinhTP}</Text>
            </TouchableOpacity>
            <View style={styles.container}>
                <Text style={styles.label}>Chọn địa chỉ có sẵn:</Text>
                <Picker
                    selectedValue={selectedDiaChi}
                    style={styles.picker}
                    onValueChange={handleSelectedDiaChiChange}
                >
                    {danhSachDiaChi.map((item) => (
                        <Picker.Item key={item.id} label={`${item.soNhaTenDuong}, ${item.xaPhuong}, ${item.quanHuyen}, ${item.tinhTP}`} value={item.id} />
                    ))}
                </Picker>
            </View>
            <TouchableOpacity style={styles.button2} onPress={() => {hideModal()}}>
                <Text style={styles.buttonText}>Xác nhận chọn địa chỉ</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => setIsAddingNewAddress(!isAddingNewAddress)}>
                <Text style={styles.buttonText}>{isAddingNewAddress ? "Hủy thêm mới địa chỉ" : "Thêm mới địa chỉ"}</Text>
            </TouchableOpacity>
            {isAddingNewAddress && (
                <>
                    <View style={styles.container}>
                        <Text style={styles.label}>Chọn tỉnh/thành phố:</Text>
                        <Picker
                            selectedValue={selectedTinhTP}
                            style={styles.picker}
                            onValueChange={(itemValue, itemIndex) => {
                                setSelectedTinhTP(itemValue);
                                setSelectedTinhTPName(tinhTP[itemIndex].name_with_type);
                                setSelectedQuanHuyen(''); // Reset selectedQuanHuyen when tinhTP changes
                                setSelectedXaPhuong(''); // Reset selectedXaPhuong when tinhTP changes
                            }}
                        >
                            {tinhTP.map((item) => (
                                <Picker.Item key={item.code} label={item.name_with_type} value={item.code} />
                            ))}
                        </Picker>
                    </View>
                    {selectedTinhTP && (
                        <View style={styles.container}>
                            <Text style={styles.label}>Chọn quận/huyện:</Text>
                            <Picker
                                selectedValue={selectedQuanHuyen}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedQuanHuyen(itemValue);
                                    setSelectedQuanHuyenName(quanHuyen[itemIndex].name_with_type);
                                    setSelectedXaPhuong(''); // Reset selectedXaPhuong when quanHuyen changes
                                }}
                            >
                                {quanHuyen.map((item) => (
                                    <Picker.Item key={item.code} label={item.name_with_type} value={item.code} />
                                ))}
                            </Picker>
                        </View>
                    )}
                    {selectedQuanHuyen && (
                        <View style={styles.container}>
                            <Text style={styles.label}>Chọn xã/phường:</Text>
                            <Picker
                                selectedValue={selectedXaPhuong}
                                style={styles.picker}
                                onValueChange={(itemValue, itemIndex) => {
                                    setSelectedXaPhuong(itemValue);
                                    setSelectedXaPhuongName(xaPhuong[itemIndex].name_with_type);
                                }}
                            >
                                {xaPhuong.map((item) => (
                                    <Picker.Item key={item.code} label={item.name_with_type} value={item.code} />
                                ))}
                            </Picker>
                        </View>
                    )}
                    <View style={styles.container}>
                        <Text style={styles.label}>Số nhà tên đường:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setSoNhaTenDuong(text)}
                            value={soNhaTenDuong}
                            placeholder="Nhập số nhà tên đường"
                        />
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.label}>Ghi chú địa chỉ:</Text>
                        <TextInput
                            style={styles.input}
                            onChangeText={(text) => setGhiChuDiaChi(text)}
                            value={ghiChuDiaChi}
                            placeholder="Nhập ghi chú địa chỉ"
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSaveAddress}>
                        <Text style={styles.buttonText}>Lưu địa chỉ</Text>
                    </TouchableOpacity>
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10

    },
    button: {
        marginTop: 20,
        backgroundColor: '#2196F3',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    button2: {
        marginTop: 20,
        backgroundColor: '#000300',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginHorizontal: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});
