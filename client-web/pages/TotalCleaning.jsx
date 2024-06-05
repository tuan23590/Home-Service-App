import React, { useState, useEffect, useContext } from 'react';
import {
  AppBar,
  Toolbar,
  Container,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Snackbar,
  Grid,
  Checkbox,
  TextField,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { getGeocode, getLatLng } from 'use-places-autocomplete';
import './TotalCleaning.css';
import { DonHangContext } from '../src/context/DonHangProvider';
// import { NhanVienLoader } from '../utils/NhanVienUtils';

export default function TotalCleaning() {
  const [selectedArea, setSelectedArea] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const [selected, setSelected] = useState(null);
  const [workDays, setWorkDays] = useState(Array(7).fill(false));
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [repeatCount, setRepeatCount] = useState(1);
  const [repeatWeekly, setRepeatWeekly] = useState(false);
  const [petPreference, setPetPreference] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [nhanViens, setNhanViens] = useState([]);
  const { donHangs } = useContext(DonHangContext);
  const [selectedNhanVien, setSelectedNhanVien] = useState('');


  useEffect(() => {
    loadNhanViens();
    calculateTotalPrice();
  }, [selectedArea, repeatCount, repeatWeekly, petPreference]);

  const handleNhanVienChange = (event) => {
    setSelectedNhanVien(event.target.value);
  };

  
  // const loadNhanViens = async () => {
  //   const nhanViensData = await NhanVienLoader();
  //   setNhanViens(nhanViensData);
  //   console.log(["data : ", nhanViensData ]);
  // };

  const handleAreaChange = (event) => {
    setSelectedArea(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  const handleRepeatCountChange = (event) => {
    setRepeatCount(parseInt(event.target.value) || 1);
  };

  const handleRepeatChange = (event) => {
    setRepeatWeekly(event.target.checked);
  };

  const handleWorkDaysChange = (index) => {
    setWorkDays((prevDays) =>
      prevDays.map((day, i) => (i === index ? !day : day))
    );
  };

  const handlePetPreferenceChange = (event) => {
    setPetPreference(event.target.value);
  };

  const calculateTotalPrice = () => {
    let basePrice = 0;
    switch (selectedArea) {
      case '60m2':
        basePrice = 600000;
        break;
      case '80m2':
        basePrice = 800000;
        break;
      case '100m2':
        basePrice = 900000;
        break;
      case '150m2':
        basePrice = 1200000;
        break;
      default:
        break;
    }

    let additionalPrice = 0;

    const totalPrice = (basePrice + additionalPrice) * repeatCount;
    setTotalPrice(totalPrice);
  };

  const handleSubmit = () => {
    console.log('Đã đăng ký dịch vụ');
    setShowSnackbar(true);
  };

  const handleSnackbarClose = () => {
    setShowSnackbar(false);
  };

  const handleSearch = async () => {
    try {
      const results = await getGeocode({ address: searchValue });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected({ lat, lng });
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
        <Typography variant="h4" gutterBottom sx={{ fontFamily: 'Tahoma' }}>
          Đăng ký tổng vệ sinh
        </Typography>
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
              className="search-input"
            />
            <button
              onClick={handleSearch}
              className="search-button"
            >
              Tìm kiếm
            </button>
          </div>
        </div>

        <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Tahoma' }}>
          Vui lòng ước tính chính xác diện tích cần dọn dẹp.
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <FormControl fullWidth>
            <InputLabel id="area-label">Diện tích</InputLabel>
              <Select
                labelId="area-label"
                value={selectedArea}
                onChange={handleAreaChange}
              >
                <MenuItem value="60m2">Tối đa 60m2 - Giá 600.000 VND</MenuItem>
                <MenuItem value="80m2">Tối đa 80m2 - Giá 800.000 VND</MenuItem>
                <MenuItem value="100m2">Tối đa 100m2 - Giá 900.000 VND</MenuItem>
                <MenuItem value="150m2">Tối đa 150m2 - Giá 1.200.000 VND</MenuItem>
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
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="pet-label">Nhà có vật nuôi</InputLabel>
              <Select
                labelId="pet-label"
                value={petPreference}
                onChange={handlePetPreferenceChange}
              >
                <MenuItem value="">Không</MenuItem>
                <MenuItem value="dog">Chó</MenuItem>
                <MenuItem value="cat">Mèo</MenuItem>
                <MenuItem value="other">Khác</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel id="nhanvien-label">Chọn nhân viên</InputLabel>
              <Select
                labelId="nhanvien-label"
                value={selectedNhanVien}
                onChange={handleNhanVienChange}
              >
                  {Array.isArray(nhanViens) && nhanViens.map((nhanVien) => (
                  <MenuItem key={nhanVien.id} value={nhanVien.id}>
                    {nhanVien.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Button component={Link} to="/hienthithongtin2" variant="contained" color="primary" onClick={handleSubmit}>
          Tiếp Theo
        </Button>
        <Typography variant="h6" sx={{ mt: 2 }}>
          Tổng cộng: {totalPrice.toLocaleString('vi-VN')} VND
        </Typography>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        />
      </Container>
    </div>
  );
}
