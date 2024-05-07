// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext,useMemo } from 'react';
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
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { DonHangContext } from '../src/context/DonHangProvider';
import { NhanVienLoader } from '../utils/NhanVienUtils';
import "@reach/combobox/styles.css";
// eslint-disable-next-line no-unused-vars
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import "@reach/combobox/styles.css";


export default function ServiceRegistration() {
  // const [selectedDuration, setSelectedDuration] = useState('');
  // const [workDays, setWorkDays] = useState(Array(7).fill(false));
  // const [repeatWeekly, setRepeatWeekly] = useState(false);
  // const [repeatCount, setRepeatCount] = useState(1);
  // const [startDate, setStartDate] = useState('');
  // const [endDate, setEndDate] = useState('');
  // const [openDialog, setOpenDialog] = useState(false);
  // const [showSnackbar, setShowSnackbar] = useState(false);
  // const [totalPrice, setTotalPrice] = useState(0);
  // const [nhanViens, setNhanViens] = useState([]);
  // const [selectedEmployee, setSelectedEmployee] = useState(null);
  // const [employeeSelectionSuccess, setEmployeeSelectionSuccess] = useState(false);
  // const [selectedPlace, setSelectedPlace] = useState(null);

  // const [serviceOptions, setServiceOptions] = useState({
  //   laundry: false,
  //   cooking: false,
  //   equipmentDelivery: false,
  //   vacuumCleaning: false,
  // });
  // const [petPreference, setPetPreference] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [selected, setSelected] = useState(null);

  const {
    selectedDuration,
    setSelectedDuration,
    workDays,
    setWorkDays,
    repeatWeekly,
    setRepeatWeekly,
    repeatCount,
    setRepeatCount,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    openDialog,
    setOpenDialog,
    showSnackbar,
    setShowSnackbar,
    totalPrice,
    setTotalPrice,
    nhanViens,
    setNhanViens,
    selectedEmployee,
    setSelectedEmployee,
    employeeSelectionSuccess,
    setEmployeeSelectionSuccess,
    selectedPlace,
    serviceOptions,
    setServiceOptions,
    petPreference,
    setPetPreference,
  } = useContext(DonHangContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const {data} = await NhanVienLoader();
          setNhanViens(data.nhanViens);
      } catch (error) {
          console.error('Error fetching service data:', error);
      }
  };
  fetchData();
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

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmDialog = () => {
    setShowSnackbar(true);
    setOpenDialog(false);
    setEmployeeSelectionSuccess(true);

    calculateTotalPrice();
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  // eslint-disable-next-line no-unused-vars
  const handlePlaceSelect = () => {
    const addressObject = selectedPlace.getPlace();
    const address = addressObject.formatted_address;
    console.log(address);
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

    if (selectedEmployee) additionalPrice += 20000;

    const totalPrice = (basePrice + additionalPrice) * repeatCount;
    setTotalPrice(totalPrice);

  };

  const handleSubmit = () => {
    console.log('Đã đăng ký dịch vụ');
  };

  const handleSearch = async () => {
    try {
      const results = await getGeocode({ address: searchValue });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng });
      setSearchValue(results[0].formatted_address); 
    } catch (error) {
      console.error('Error searching address:', error);
    }
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
         <LoadScript
          googleMapsApiKey="AIzaSyBWugvX95LUjtIpZif_CGjwKzOCFufBJtc"
        >
          <GoogleMap
            zoom={10}
            center={selected ? selected : { lat: 10.8231, lng: 106.6297 }} 
            mapContainerStyle={{ height: '400px', width: '100%' }}
            onClick={(e) => {
              const lat = e.latLng.lat();
              const lng = e.latLng.lng();
              setSelected({ lat, lng });
            }}
          >
            {selected && <Marker position={selected} />}
          </GoogleMap>
        </LoadScript>
        <div className="places-container">
          <div>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Enter an address"
            />
            <button onClick={handleSearch}>Search</button>
          </div>
        </div>
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
            <FormControlLabel
              control={
                <Checkbox
                  checked={openDialog}
                  onChange={(event) => setOpenDialog(event.target.checked)}
                />
              }
              label="Chọn nhân viên"
            />
          </Grid>
          <Grid item>
            <Button component={Link} to="/hienthithongtin" variant="contained" color="primary" onClick={handleSubmit}>
              Tiếp Theo
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
async function getAndSetAddress({ lat, lng, setSearchValue }) {
  try {
    const results = await getGeocode({ location: { lat, lng } });
    if (results && results[0]) {
      setSearchValue(results[0].formatted_address); 
    }
  } catch (error) {
    console.error('Error getting address from latlng:', error);
  }
}
