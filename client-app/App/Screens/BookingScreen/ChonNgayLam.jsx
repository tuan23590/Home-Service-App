import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Button } from 'react-native';
import Colors from '../../Utils/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Switch } from '@rneui/themed';
import { AntDesign } from '@expo/vector-icons';


export default function ChonNgayLam() {
    const [selectedTime, setSelectedTime] = useState(new Date());
    const [showPicker, setShowPicker] = useState(false);
    const [lapLaiHangTuan, setLapLaiHangTuan] = useState(false);
    const [selectedDates, setSelectedDates] = useState([]);

    const handleTimeChange = (event, selected) => {
        const currentTime = selected || selectedTime;
        setShowPicker(false);
        setSelectedTime(currentTime);
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
    const handleDayPress = (dateItem) => {
        const date = formatDate(dateItem);
        if (selectedDates.includes(date)) {
            setSelectedDates(selectedDates.filter((d) => d !== date));
        } else {
            setSelectedDates([...selectedDates, date]);
        }
        
    };
    useEffect(() => {
        console.log(selectedDates);
    }, [selectedDates]);

    const renderDayItem = ({ item }) => {
        const isSelected = selectedDates.includes(formatDate(item.date));
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
                    <Text style={styles.dateTime}>{formatTime(selectedTime.getHours())} : {formatTime(selectedTime.getMinutes())}</Text>
                </View>
            </TouchableOpacity>
            {showPicker && (
                <DateTimePicker
                    value={selectedTime}
                    mode="time"
                    is24Hour={true}
                    display="spinner"
                    onChange={handleTimeChange}
                />
            )}
            <View style={styles.container}>
                <Text style={{ color: 'gray' }}>LẬP LẠI HÀNG TUẦN</Text>
                <Switch
                    style={{ position: 'absolute', right: 0 }}
                    value={lapLaiHangTuan}
                    onValueChange={setLapLaiHangTuan}
                    trackColor={{ true: Colors.GREEN }}
                    thumbColor={lapLaiHangTuan ? Colors.GREEN : 'gray'}
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
