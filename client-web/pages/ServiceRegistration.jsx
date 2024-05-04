// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
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
import { Link } from 'react-router-dom';

export default function ServiceRegistration() {
  const [selectedDuration, setSelectedDuration] = useState('');
  const [workDays, setWorkDays] = useState(Array(7).fill(false));
  const [repeatWeekly, setRepeatWeekly] = useState(false);
  const [repeatCount, setRepeatCount] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [nhanViens, setNhanViens] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeSelectionSuccess, setEmployeeSelectionSuccess] = useState(false);

  const [serviceOptions, setServiceOptions] = useState({
    laundry: false,
    cooking: false,
    equipmentDelivery: false,
    vacuumCleaning: false,
  });
  const [petPreference, setPetPreference] = useState('');

  useEffect(() => {
    const NhanVienLoader = async () => {
      const query = `query MyQuery {
        nhanViens {
          id
          ten
          hinhAnh {
            id
          }
        }
      }`;

      const res = await fetch('https://api-ap-southeast-2.hygraph.com/v2/clv4uoiq108fp07w7579676h9/master', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ query })
      });

      const data = await res.json();
      return data;
    };

    const fetchNhanViens = async () => {
      try {
        const responseData = await NhanVienLoader();
        setNhanViens(responseData.data.nhanViens);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchNhanViens();
  }, []);

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedDuration, repeatCount, serviceOptions]);

  const handleDurationChange = (event) => {
    setSelectedDuration(event.target.value);
  };

  const handleWorkDaysChange = (index) => {
    setWorkDays((prevDays) =>
      prevDays.map((day, i) => (i === index ? !day : day))
    );
  };

  const handleRepeatChange = (event) => {
    setRepeatWeekly(event.target.checked);
  };

  const handleRepeatCountChange = (event) => {
    setRepeatCount(parseInt(event.target.value) || 1);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleServiceOptionChange = (event) => {
    const { name, checked } = event.target;
    setServiceOptions((prevOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));
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
    setEmployeeSelectionSuccess(true);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const calculateTotalPrice = () => {
    let basePrice = 0;
    switch (selectedDuration) {
      case '7-9':
      case '14-16':
      case '15-17':
      case '16-18':
        basePrice = 192000;
        break;
      case '7-10':
      case '14-17':
      case '15-18':
        basePrice = 240000;
        break;
      case '7-11':
      case '14-18':
        basePrice = 304000;
        break;
      default:
        break;
    }

    let additionalPrice = 0;
    if (serviceOptions.laundry) additionalPrice += 48000;
    if (serviceOptions.cooking) additionalPrice += 48000;
    if (serviceOptions.equipmentDelivery) additionalPrice += 30000;
    if (serviceOptions.vacuumCleaning) additionalPrice += 30000;

    const totalPrice = (basePrice + additionalPrice) * repeatCount;
    setTotalPrice(totalPrice);
  };

  const handleSubmit = () => {
    console.log('Đã đăng ký dịch vụ');
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1 }}>
            Trang Chủ - Giúp việc nhà
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h5" gutterBottom>Đăng ký dịch vụ</Typography>
        <Typography variant="subtitle1" gutterBottom>Dịch vụ cố định</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
              <InputLabel id="duration-label">Thời lượng làm việc</InputLabel>
              <Select
                labelId="duration-label"
                value={selectedDuration}
                onChange={handleDurationChange}
              >
                <MenuItem value="7-9">7 - 9 giờ</MenuItem>
                <MenuItem value="7-10">7 - 10 giờ</MenuItem>
                <MenuItem value="7-11">7 - 11 giờ</MenuItem>
                <MenuItem value="14-16">14 - 16 giờ</MenuItem>
                <MenuItem value="14-17">14 - 17 giờ</MenuItem>
                <MenuItem value="15-17">15 - 17 giờ</MenuItem>
                <MenuItem value="15-18">15 - 18 giờ</MenuItem>
                <MenuItem value="16-18">16 - 18 giờ</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Typography variant="subtitle1" gutterBottom>Ngày làm việc</Typography>
              {['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'].map((day, index) => (
                <FormGroup key={day} row>
                  <FormControlLabel
                    control={<Checkbox checked={workDays[index]} onChange={() => handleWorkDaysChange(index)} />}
                    label={day}
                  />
                </FormGroup>
              ))}
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" gutterBottom>Ngày bắt đầu</Typography>
            <TextField fullWidth label="" type="date" value={startDate} onChange={handleStartDateChange} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" gutterBottom>Ngày kết thúc</Typography>
            <TextField fullWidth label="" type="date" value={endDate} onChange={handleEndDateChange} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" gutterBottom>Số lần trong tuần</Typography>
            <TextField type="number" value={repeatCount} onChange={handleRepeatCountChange} />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <FormControlLabel control={<Checkbox checked={repeatWeekly} onChange={handleRepeatChange} />} label="Lặp lại hàng tuần" />
            </FormControl>
          </Grid>
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
        <Grid container spacing={2}>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleOpenDialog}>
              Chọn nhân viên
            </Button>
          </Grid>
          <Grid item>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Đăng ký
            </Button>
          </Grid>
        </Grid>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>Xác nhận</DialogTitle>
          <DialogContent>
            <Typography>Bạn có muốn tự chọn người giúp việc?</Typography>
            <Typography variant="caption" color="textSecondary">
              Lưu ý: Chọn người giúp việc sẽ tăng phí dịch vụ thêm 20,000 VND.
            </Typography>
            {nhanViens.map((employee) => (
              <div key={employee.id}>
                <FormControlLabel
                  control={<Checkbox />}
                  label={employee.ten}
                  checked={selectedEmployee === employee.id}
                  onChange={() => setSelectedEmployee(employee.id)}
                />
              </div>
            ))}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Hủy bỏ</Button>
            <Button onClick={handleConfirmDialog} color="primary">Đồng ý</Button>
          </DialogActions>
        </Dialog>

        <Typography variant="h6" sx={{ mt: 2 }}>
          Tổng cộng: {totalPrice.toLocaleString('vi-VN')} VND
        </Typography>
        <Snackbar
          open={showSnackbar || employeeSelectionSuccess} 
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
          message="Đã chọn nhân viên thành công"
        />
      </Container>
    </div>
  );
}
