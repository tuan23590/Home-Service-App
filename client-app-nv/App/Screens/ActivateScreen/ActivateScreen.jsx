import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import GlobalAPI from '../../Utils/GlobalAPI';
import { FIREBASE_AUTH } from '../../fireBase/config';
import ChiTietDonHangModal from '../TrangChu/ChiTietDonHangModal';
import {User, onAuthStateChanged } from 'firebase/auth';
import { EPOCHTODATE, EPOCHTODATETIMETOTIME } from '../../function';


const ActivateScreen = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const auth = FIREBASE_AUTH.currentUser;
  const [lichLamViec, setLichLamViec] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState(null); 
  const [modalVisible, setModalVisible] = useState(false); 

  const fetchData = async (user) => {
    const { TimNhanVienTheoEmail } = await GlobalAPI.apiNhanVienTheoEmail(user.email);
    const lichLamViecNhanVien = TimNhanVienTheoEmail.lichLamViec.filter(item => item.trangThaiLich === "Đang thực hiện");
    setLichLamViec(lichLamViecNhanVien);
    console.log("TimNhanVienTheoEmail.lichLamViec: ",TimNhanVienTheoEmail.lichLamViec);
  }

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
        if(user){
            fetchData(user);
        }else{
          setLichLamViec([]);
        }
      });
}, [User,FIREBASE_AUTH]);

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    setSelectedDay(null); 
  };

  const goToCurrentMonth = () => {
    setCurrentDate(new Date());
    setSelectedDay(null); // Reset selected day when going to current month
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    setSelectedDay(null); // Reset selected day when changing month
  };

  const weekDays = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

  const numberOfDaysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

  const daysOfMonth = [];
  for (let day = 1; day <= numberOfDaysInMonth; day++) {
    daysOfMonth.push(day);
  }

  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();

  for (let i = 0; i < firstDayOfMonth; i++) {
    daysOfMonth.unshift('');
  }

  const isWorkDay = (day) => {
    const timestampOfDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), day).getTime();
    return lichLamViec.some(item => {
      const startTime = new Date(item.thoiGianBatDauLich).setHours(0, 0, 0, 0);
      return startTime === timestampOfDay;
    });
  }

  const selectedDaySchedule = lichLamViec.filter(item => {
    const dayOfMonth = new Date(item.thoiGianBatDauLich).getDate();
    return dayOfMonth === selectedDay;
  });

  const handleDayPress = (day) => {
    setSelectedDay(day);
  };
  
  const xemChiTiet = async (item) => {
    const {DonHangTheoId} = await GlobalAPI.apiChiTietDonHang(item.donHang.id);
    setSelectedOrder(DonHangTheoId);
    setModalVisible(true);
  };


  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <Text style={styles.title}>Các ngày trong tháng {currentDate.getMonth() + 1}/{currentDate.getFullYear()}</Text>
        <View style={styles.weekDaysContainer}>
          {weekDays.map((day, index) => (
            <View key={index} style={styles.weekDayItem}>
              <Text style={styles.weekDayText}>{day}</Text>
            </View>
          ))}
        </View>
        <View style={styles.daysContainer}>
          {daysOfMonth.map((day, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayItem, 
                day === '' && styles.nonCurrentMonthDayItem, 
                isWorkDay(day) && styles.workDayItem, 
                day === selectedDay && styles.selectedDayItem
              ]}
              onPress={() => handleDayPress(day)}
            >
              {day !== '' && (
                <Text style={[
                  styles.dayText, 
                  isWorkDay(day) && styles.workDayText
                ]}>
                  {day}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={goToPreviousMonth}>
            <Text>Tháng trước</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={goToCurrentMonth}>
            <Text>Ngày hiện tại</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={goToNextMonth}>
            <Text>Tháng sau</Text>
          </TouchableOpacity>
        </View>
        {selectedDay !== null && (
          <View style={styles.selectedDayInfo}>
            <Text style={styles.selectedDayTitle}>Thông tin lịch làm việc ngày {selectedDay}</Text>
            {selectedDaySchedule.map((item, index) => (
              <TouchableOpacity key={index} onPress={() => xemChiTiet(item)}>
                <View style={styles.scheduleItem}>
                  <Text style={styles.scheduleText}>Mã đơn hàng: {item.donHang?.maDonHang}</Text>
                  <Text style={styles.scheduleText}>Ngày làm việc: {EPOCHTODATE(item.thoiGianBatDauLich)}</Text>
                  <Text style={styles.scheduleText}>Làm trong: {EPOCHTODATETIMETOTIME(item.thoiGianBatDauLich,item.thoiGianKetThucLich)}</Text>
                  <Text style={styles.scheduleText}>Trạng thái lịch: {item.trangThaiLich}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
            <ChiTietDonHangModal
                visible={modalVisible}
                closeModal={() => setModalVisible(false)}
                order={selectedOrder}
                fetchData={fetchData}
            />
            </ScrollView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 5,
  },
  weekDayItem: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  weekDayText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  daysContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    height: 420,
  },
  dayItem: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
  },
  nonCurrentMonthDayItem: {
    borderColor: 'transparent',
  },
  workDayItem: {
    backgroundColor: '#b3e6ff',
  },
  selectedDayItem: {
    backgroundColor: '#ffc266', 
  },
  dayText: {
    fontSize: 18,
  },
  workDayText: {
    fontWeight: 'bold',
    color: '#333', // Màu chữ cho ngày làm việc
  },
  selectedDayInfo: {
    marginTop: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: '100%',
  },
  selectedDayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  scheduleItem: {
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
  },
  scheduleText: {
    fontSize: 15,
  },
});

export default ActivateScreen;
