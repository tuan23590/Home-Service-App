// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Box, Button, Grid, TextField, FormControlLabel, MenuItem } from '@mui/material';
import { DonHangContext } from '../src/context/DonHangProvider';
import { DBDataDichVu } from '../utils/DichVuUtils';
import { Link } from 'react-router-dom';
import './CustomerInfo.css';

const CustomerInfo = () => {
  const {
    searchValue,
    selectedDuration,
    workDays,
    repeatWeekly,
    repeatCount,
    startDate,
    endDate,
    totalPrice,
    nhanViens,
    serviceOptions,
    petPreference,
    selectedEmployee,
  } = useContext(DonHangContext);

  const [dichVus, setDichVus] = useState([]);
  const [paymentInfo, setPaymentInfo] = useState({
    bankAccountNumber: '',
    expirationDate: '',
    pin: '',
    saveCardInfo: false,
    paymentMethod: 'cash', 
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

  const daysOfWeek = [ 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy','Chủ nhật'];
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
  .map(([key, value]) => {
    const foundService = dichVus.find((dichVu) => dichVu.id === key);
    return foundService ? foundService.tenDichVu : '';
  });



  const petType = petPreference === 'dog' ? 'Chó' : 'Mèo';

  const handlePost = async () => {
    if (paymentInfo.paymentMethod === 'cash') {
      console.log('Xử lý thanh toán bằng tiền mặt');
    } else if (paymentInfo.paymentMethod === 'creditCard') {
      console.log('Xử lý thanh toán chuyển ngân hàng');
    }
  };
  
  return (
    <Box className="customer-info-container">
      <Typography variant="h6">Thông tin đơn hàng</Typography>
      <List>
      <ListItem >
      <ListItemText primary={`Tên Dịch Vụ: `} />
        </ListItem>
        <ListItem>
        <ListItemText primary={`Địa điểm đã chọn: ${searchValue}`} />
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
          <ListItem >
       <ListItemText primary={`Dịch Vụ thêm : ${selectedServices.join(', ')}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Nhân Viên được chọn: ${selectedEmployee ? selectedEmployee.ten : "Không chọn"}`} />
        </ListItem>
        <ListItem>
        <ListItemText primary={`Vật Nuôi: ${petPreference ? (petPreference === 'dog' ? 'Chó' : 'Mèo') : 'Không có'}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Tổng tiền: ${totalPrice} VNĐ`} />
        </ListItem>
      </List>
            <ListItemText primary="Phương thức thanh toán" />
            <FormControlLabel
              sx={{ marginLeft: 0 }}
              control={
                <TextField
                  select
                  value={paymentInfo.paymentMethod}
                  onChange={(e) => {
                    setPaymentInfo({ ...paymentInfo, paymentMethod: e.target.value });
                    setShowCreditCardFields(e.target.value === 'creditCard');
                  }}
                >
                  <MenuItem value="cash">Tiền mặt</MenuItem>
                  <MenuItem value="creditCard">Chuyển khoản ngân hàng</MenuItem>
                </TextField>
              }
            />
      <Grid container spacing={2}>
        <Grid item>
          <Button variant="contained" color="primary" onClick={handlePost}>
            Đăng tin
          </Button>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" component={Link} to="/dv1">
            Trở về
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CustomerInfo;
