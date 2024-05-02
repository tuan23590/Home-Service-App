// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
} from '@mui/material';
import ListItemText from '@mui/material/ListItemText';

export default function ServiceRegistration() {
  const [duration, setDuration] = useState('');
  const [workTime, setWorkTime] = useState('');
  const [serviceOptions, setServiceOptions] = useState({
    laundry: false,
    cooking: false,
    equipmentDelivery: false,
    vacuumCleaning: false,
  });
  const [petPreference, setPetPreference] = useState('');
  const [notes, setNotes] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [roomCount, setRoomCount] = useState(0);
  const [squareMeter, setSquareMeter] = useState(0);
  const [address, setAddress] = useState('');
  const [workDays, setWorkDays] = useState([]);
  const [repeatWeekly, setRepeatWeekly] = useState(false);
  const [openDialog, setOpenDialog] = useState(false); 
  const [showSnackbar, setShowSnackbar] = useState(false); 

  const handleServiceOptionChange = (event) => {
    const { name, checked } = event.target;
    setServiceOptions((prevOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));
    calculateTotalPrice(duration, workTime, name, checked);
  };

  const handleDurationChange = (event) => {
    setDuration(event.target.value);
    calculateTotalPrice(event.target.value, workTime);
  };

  const handleWorkTimeChange = (event) => {
    setWorkTime(event.target.value);
    calculateTotalPrice(duration, event.target.value);
  };

  const handleRoomCountChange = (event) => {
    setRoomCount(event.target.value);
    calculateTotalPrice(duration, workTime);
  };

  const handleSquareMeterChange = (event) => {
    setSquareMeter(event.target.value);
    calculateTotalPrice(duration, workTime);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleWorkDaysChange = (event) => {
    setWorkDays(event.target.value);
  };

  const handleRepeatChange = (event) => {
    setRepeatWeekly(event.target.checked);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDialog = () => {
    setShowSnackbar(true);
    setOpenDialog(false);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const calculateTotalPrice = (selectedDuration, selectedHour) => {
    let totalPrice = 0;
    if (!isNaN(parseInt(selectedDuration))) {
      switch (selectedDuration) {
        case '2':
          totalPrice += 192000;
          break;
        case '3':
          totalPrice += 240000;
          break;
        case '4':
          totalPrice += 304000;
          break;
        default:
          break;
      }
    }

    if (!isNaN(parseInt(selectedHour))) {
      totalPrice += parseInt(selectedHour) * 20000;
    }

    if (!isNaN(parseInt(squareMeter)) && parseInt(squareMeter) > 0) {
      totalPrice += Math.ceil(parseInt(squareMeter) / 1) * 4000;
    }

    const additionalServicesPrice = Object.values(serviceOptions).filter((option) => option).length * 30000;

    totalPrice += additionalServicesPrice;

    setTotalPrice(totalPrice);
  };

  const handleSubmit = () => {
    console.log('Đã đăng ký dịch vụ');
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Đăng ký dịch vụ
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
       Dịch vụ cố định
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel id="duration-label">Thời lượng làm việc</InputLabel>
            <Select labelId="duration-label" value={duration} onChange={handleDurationChange}>
              <MenuItem value="2">2 giờ</MenuItem>
              <MenuItem value="3">3 giờ</MenuItem>
              <MenuItem value="4">4 giờ</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel id="work-time-label">Giờ làm việc</InputLabel>
            <Select labelId="work-time-label" value={workTime} onChange={handleWorkTimeChange}>
              <MenuItem value="morning">Sáng</MenuItem>
              <MenuItem value="afternoon">Chiều</MenuItem>
              <MenuItem value="evening">Tối</MenuItem>
            </Select>
          </FormControl>
        </Grid>
      </Grid>
      <Typography variant="subtitle1" gutterBottom>
        Vui lòng ước tính chính xác diện tích cần dọn dẹp
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <TextField
            fullWidth
            type="number"
            label="Số phòng"
            value={roomCount}
            onChange={handleRoomCountChange}
            sx={{ my: 1 }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField
            fullWidth
            type="number"
            label="Diện tích (m2)"
            value={squareMeter}
            onChange={handleSquareMeterChange}
            sx={{ my: 1 }}
          />
        </Grid>
        <Grid item xs={4}>
          <TextField fullWidth label="Địa chỉ" value={address} onChange={handleAddressChange} sx={{ my: 1 }} />
        </Grid>
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ my: 1 }}>
            <InputLabel id="work-days-label">Ngày làm việc</InputLabel>
            <Select
              labelId="work-days-label"
              multiple
              value={workDays}
              onChange={handleWorkDaysChange}
              renderValue={(selected) => selected.join(', ')}
            >
              {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'].map((day) => (
                <MenuItem key={day} value={day}>
                  <Checkbox checked={workDays.indexOf(day) > -1} />
                  <ListItemText primary={day} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <FormGroup sx={{ my: 1 }}>
          <Typography variant="subtitle1" gutterBottom>
            Lặp lại hàng tuần:
          </Typography>
          <FormControlLabel
            control={<Checkbox checked={repeatWeekly} onChange={handleRepeatChange} />}
            label="Lặp lại hàng tuần"
          />
        </FormGroup>
      </Grid>
      <FormGroup sx={{ my: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          Dịch vụ thêm
        </Typography>
        <FormControlLabel
          control={<Checkbox />}
          label="Ủi đồ"
          name="laundry"
          checked={serviceOptions.laundry}
          onChange={handleServiceOptionChange}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Nấu ăn"
          name="cooking"
          checked={serviceOptions.cooking}
          onChange={handleServiceOptionChange}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Mang dụng cụ theo"
          name="equipmentDelivery"
          checked={serviceOptions.equipmentDelivery}
          onChange={handleServiceOptionChange}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Mang máy hút bụi"
          name="vacuumCleaning"
          checked={serviceOptions.vacuumCleaning}
          onChange={handleServiceOptionChange}
        />
      </FormGroup>
      <FormGroup sx={{ my: 1 }}>
        <Typography variant="subtitle1" gutterBottom>
          Nhà có vật nuôi:
        </Typography>
        <FormControlLabel
          control={<Checkbox />}
          label="Chó"
          checked={petPreference === 'dog'}
          onChange={() => setPetPreference('dog')}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Mèo"
          checked={petPreference === 'cat'}
          onChange={() => setPetPreference('cat')}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Khác"
          checked={petPreference === 'other'}
          onChange={() => setPetPreference('other')}
        />
      </FormGroup>
      <TextField
        fullWidth
        multiline
        rows={4}
        label="Ghi chú"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        sx={{ my: 1 }}
      />

        <Button variant="contained" color="primary" onClick={handleOpenDialog} sx={{ my: 1 }}>
        Tự chọn người giúp việc (+20,000 VND)
        </Button>

        <div style={{ marginBottom: '16px' }}></div>

        <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Xác nhận</DialogTitle>
        <DialogContent>
            <Typography>Bạn có muốn tự chọn người giúp việc?</Typography>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleCloseDialog}>Hủy bỏ</Button>
            <Button onClick={handleConfirmDialog} color="primary">
            Đồng ý
            </Button>
        </DialogActions>
        </Dialog>

      <Button variant="contained" color="primary" onClick={handleSubmit} sx={{ my: 1 }}>
        Đăng ký
      </Button>

      <Typography variant="h6" sx={{ mt: 2 }}>
        Tổng cộng: {totalPrice.toLocaleString('vi-VN')} VND
      </Typography>

      <Snackbar
        open={showSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Danh sách nhân viên sẽ được hiển thị ở đây"
      />
    </Container>
  );
}
