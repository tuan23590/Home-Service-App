// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Box, Button } from '@mui/material';
import { DBDataDichVu } from '../utils/DichVuUtils';
import { DonHangContext } from '../src/context/DonHangProvider';
import './CustomerInfo.css';
import { Link } from 'react-router-dom';

const CustomerInfo = () => {
  const {
    selectedDuration,
    workDays,
    repeatWeekly,
    repeatCount,
    startDate,
    endDate,
    totalPrice,
    nhanViens,
    selectedPlace,
    serviceOptions,
    petPreference,
  } = useContext(DonHangContext);

  const [dichVus, setDichVus] = useState([]);
  const [selectedDichVu, setSelectedDichVu] = useState(''); // Thêm state cho selectedDichVu
  const [formData, setFormData] = useState({
    maDonHang: '',
    khachHang: '',  
    ngayDatHang: '',
    nhanVien: '',
    thoiGianThucHien: '',
    trangThai: '',
    trangThaiDonHang: '',
    tongTien: '',
    vatNuoi: '',
    dichVu: '',
    ghiChu: ''
});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await DBDataDichVu();
        setDichVus(data.dichVus);
      } catch (error) {
        console.error('Error fetching service data:', error);
      }
    };
    fetchData();
  }, []);

  // Chuyển đổi ngày làm việc thành danh sách các ngày
  const daysOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy'];
  const selectedWorkDays = workDays.reduce((acc, curr, index) => {
    if (curr) {
      acc.push(daysOfWeek[index]);
    }
    return acc;
  }, []);

  const selectedEmployeeNames = nhanViens.map((nhanVien) => nhanVien.ten);
  const selectedEmployeeDisplay = selectedEmployeeNames.length > 0 ? selectedEmployeeNames.join(', ') : 'Chưa chọn';

  const selectedServices = Object.entries(serviceOptions)
    .filter(([key, value]) => value)
    .map(([key]) => {
      switch (key) {
        case 'laundry':
          return 'Giặt ủi';
        case 'cooking':
          return 'Nấu ăn';
        case 'equipmentDelivery':
          return 'Mang dụng cụ theo';
        case 'vacuumCleaning':
          return 'Hút bụi';
        default:
          return '';
      }
    });

  const petType = petPreference === 'dog' ? 'Chó' : 'Mèo';

  const handlePost = async () => {
    // Lấy dữ liệu cần thiết từ context và dịch vụ từ DBDataDichVu
    const selectedServiceName = dichVus.find(dichVu => dichVu.id === selectedDichVu)?.tenDichVu;

    // Thực hiện logic đăng tin
    console.log('Đã đăng tin');
    console.log('Địa điểm đã chọn:', selectedPlace);
    console.log('Ngày làm việc:', selectedWorkDays.join(', '));
    console.log('Thời lượng được chọn:', selectedDuration, 'giờ');
    console.log('Lặp lại hàng tuần:', repeatWeekly ? 'Có' : 'Không');
    console.log('Số lần trong tuần:', repeatCount);
    console.log('Ngày bắt đầu:', startDate);
    console.log('Ngày kết thúc:', endDate);
    console.log('Nhân viên được chọn:', selectedEmployeeDisplay);
    console.log('Dịch vụ thêm:', selectedServices.join(', '));
    console.log('Thú cưng:', petType);
    console.log('Tổng tiền:', totalPrice, 'VNĐ');
    console.log('Dịch vụ đã chọn:', selectedServiceName);
  };

  return (
    <Box >
      <div >
        <Typography variant="h6">Thông tin đơn hàng</Typography>
        <List>
          <ListItem>
            <ListItemText primary={`Địa điểm đã chọn: ${selectedPlace}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Ngày làm việc: ${selectedWorkDays.join(', ')}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Thời lượng được chọn: ${selectedDuration} giờ`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Lặp lại hàng tuần: ${repeatWeekly ? 'Có' : 'Không'}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Số lần trong tuần: ${repeatCount}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Ngày bắt đầu: ${startDate}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Ngày kết thúc: ${endDate}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Nhân Viên được chọn: ${selectedEmployeeDisplay}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Dịch vụ thêm: ${selectedServices.join(', ')}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Vật Nuôi: ${petType}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Tổng tiền: ${totalPrice} VNĐ`} />
          </ListItem>
        </List>
        <Button variant="contained" color="primary" onClick={handlePost}>
          Đăng tin
        </Button>

        <Button variant="contained" color="primary" component={Link} to="/dv1">
  Trở về
</Button>
      </div>
    </Box>
  );
};

export default CustomerInfo;
