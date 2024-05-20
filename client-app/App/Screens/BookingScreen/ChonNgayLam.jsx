import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native';
import Colors from '../../Utils/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Switch } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';
import { formCaLeContext } from './BookingSingle';
import { DonHangContext } from '../../Provider/DonHangProvider';


export default function ChonNgayLam() {
    const {gioLam, setGioLam} = useContext(DonHangContext);
    const [showPicker, setShowPicker] = useState(false);
    const {lichLamViec, setLichLamViec,dichVuChinh} = useContext(DonHangContext);
    const [ngayLamViec, setNgayLamViec] = useState([]);

    const handleTimeChange = (event, selected) => {
        const currentTime = selected || gioLam;
        setShowPicker(false);
        setGioLam(currentTime);
    };

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time.toString();
    };
    const formatDate = (date) => {
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };
    const formatDateWithTime = (dateString,boundHuor = 0) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const hour = date.getHours() + boundHuor;
        const minute = date.getMinutes();
        return `${hour}:${minute} - ${day}/${month} `;
      };
      const handleDayPress = (dateItem) => {
        const year = dateItem.getFullYear();
        const month = dateItem.getMonth() + 1; // Tháng bắt đầu từ 0, nên cần cộng thêm 1
        const day = dateItem.getDate();
    
        // Lấy giờ, phút từ gioLam
        const hour = gioLam.getHours();
        const minute = gioLam.getMinutes();
    
        // Ghép ngày tháng năm với giờ phút
        const date = new Date(year, month - 1, day, hour, minute);
        const dateString = formatDate(date);
    
        // Chuyển mảng Date thành mảng string
        const lichLamViecStrings = lichLamViec.map(formatDate);
    
        // Kiểm tra xem date có tồn tại trong mảng không
        const dateIndex = lichLamViecStrings.indexOf(dateString);
    
        if (dateIndex !== -1) {
            const newLichLamViec = [...lichLamViec];
            newLichLamViec.splice(dateIndex, 1);
            setLichLamViec(newLichLamViec);
            setNgayLamViec(ngayLamViec.filter((d) => d !== dateString));
        } else {
            setLichLamViec([...lichLamViec, date]);
            setNgayLamViec([...ngayLamViec, dateString]);
        }
    };
    useEffect(() => {
        console.log("lichLamViec ",lichLamViec);
    }, [ngayLamViec]);

    const renderDayItem = ({ item }) => {
        const isSelected = ngayLamViec.includes(formatDate(item.date));
        return (
            <TouchableOpacity onPress={() => handleDayPress(item.date)}>
                <View style={[styles.boxDay, { backgroundColor: isSelected ? Colors.ORANGE : 'transparent' }]}>
                    <Text style={[styles.text, { color: isSelected ? Colors.WHITE : 'black' }]}>{item.dayOfWeek}</Text>
                    <Text style={{ color: isSelected ? Colors.WHITE : 'black' }}>{item.dayOfMonth}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    

    const getNext7Days = () => {
        const days = [];
        const today = new Date();
        const weekdays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        const addLeadingZero = (number) => {
            return number < 10 ? '0' + number : number.toString();
        };
        
        for (let i = 0; i < 7; i++) {
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + i + 1);
            const dayOfWeek = weekdays[nextDay.getDay()];
            const dayOfMonth = addLeadingZero(nextDay.getDate());
            days.push({ dayOfWeek: dayOfWeek, dayOfMonth: dayOfMonth, date: nextDay });
        }
        return days;
    };
    const renderItem = ({ item }) => (
        <View style={{ padding: 10 }}>
          <Text>{item}</Text>
        </View>
      );
    return (
        <View>
            <View style={styles.container}>
                <Text style={{ color: 'gray' }}>Chọn ngày làm</Text>
                <Text style={{ fontWeight: 'bold' }}>Tháng {new Date().getMonth() + 1}/{new Date().getFullYear()}</Text>
            </View>
            <FlatList
                style={{ marginTop: 10 }}
                data={getNext7Days()}
                renderItem={renderDayItem}
                keyExtractor={(item) => `${item.dayOfWeek}-${item.dayOfMonth}`}
                horizontal
                showsHorizontalScrollIndicator={false}
            />
            <TouchableOpacity onPress={() => setShowPicker(true)}>
                <View style={styles.timeContainer}>
                    <View style={styles.container}>
                        <AntDesign name="clockcircle" size={20} color={Colors.ORANGE} style={{ marginHorizontal: 10 }} />
                        <Text style={{ fontWeight: 'bold' }}>Chọn giờ làm</Text>
                    </View>
                    <Text style={styles.dateTime}>{formatTime(gioLam.getHours())} : {formatTime(gioLam.getMinutes())}</Text>
                </View>
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    value={gioLam}
                    mode="time"
                    is24Hour={true}
                    display="spinner"
                    onChange={handleTimeChange}
                />
            )}
            <View style={styles.container}>
            <FlatList
                data={lichLamViec}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <View style={{ padding: 10 }}>
                    <Text>Ngày Bắt đầu: {formatDateWithTime(item)} đến {formatDateWithTime(item,boundHuor=dichVuChinh.thoiGian)} </Text> 
                  </View>
                )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    boxDay: {
        width: 50,
        height: 70,
        borderWidth: 1,
        borderRadius: 5,
        marginHorizontal: 5,
        borderColor: Colors.GRAY,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    timeContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        borderColor: Colors.GRAY,
        marginVertical: 15,
    },
    dateTime: {
        backgroundColor: Colors.WHITEGRAY,
        padding: 8,
        borderRadius: 5,
        fontWeight: 'bold',
    },
});
