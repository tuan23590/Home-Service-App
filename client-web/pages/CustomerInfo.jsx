import React, { useContext, useEffect, useState } from 'react';
import { Typography, List, ListItem, ListItemText, Box, Button, Grid, TextField, FormControlLabel, Checkbox, MenuItem } from '@mui/material';
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
    paymentMethod: 'cash', // Mặc định là thanh toán bằng tiền mặt
  });
  const [showCreditCardFields, setShowCreditCardFields] = useState(false);

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
    if (paymentInfo.paymentMethod === 'cash') {
      // Xử lý thanh toán bằng tiền mặt
      console.log('Xử lý thanh toán bằng tiền mặt');
    } else if (paymentInfo.paymentMethod === 'creditCard') {
      // Xử lý thanh toán bằng thẻ ngân hàng
      console.log('Xử lý thanh toán bằng thẻ ngân hàng');
    }
  };
  
  return (
    <Box className="customer-info-container">
      <Typography variant="h6">Thông tin đơn hàng</Typography>
      <List>
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
        <ListItem>
          <ListItemText primary={`Nhân Viên được chọn: ${selectedEmployee?.ten}`} />
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

      <Box mt={2}>
        <Typography variant="h6">Thông tin thanh toán</Typography>
        <List>
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
          <ListItem>
            <ListItemText primary={`Nhân Viên được chọn: ${selectedEmployee?.ten}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Dịch vụ thêm: ${selectedServices.join(', ')}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Vật Nuôi: ${petType}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Tổng tiền: ${totalPrice} VNĐ`} />
=======
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
                  <MenuItem value="creditCard">Thẻ ngân hàng</MenuItem>
                </TextField>
              }
            />
          </ListItem>
          {showCreditCardFields && (
            <>
              <ListItem>
                <ListItemText primary="Số tài khoản ngân hàng" />
                <TextField
                  value={paymentInfo.bankAccountNumber}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, bankAccountNumber: e.target.value })}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Ngày hết hạn thẻ" />
                <TextField
                  value={paymentInfo.expirationDate}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, expirationDate: e.target.value })}
                />
              </ListItem>
              <ListItem>
                <ListItemText primary="Mã PIN" />
                <TextField
                  value={paymentInfo.pin}
                  onChange={(e) => setPaymentInfo({ ...paymentInfo, pin: e.target.value })}
                />
              </ListItem>
              <ListItem>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={paymentInfo.saveCardInfo}
                      onChange={(e) => setPaymentInfo({ ...paymentInfo, saveCardInfo: e.target.checked })}
                    />
                  }
                  label="Lưu thông tin thẻ"
                />
              </ListItem>
            </>
          )}
        </List>
      </Box>

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
