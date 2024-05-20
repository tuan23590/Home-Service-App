// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import './ServiceRegistration.css'; 
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
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { dichVuLoader } from './../utils/DichVuUtils';

const ServiceRegistration = () => {
  const [searchValue, setSearchValue] = useState('');
  const [checkedIds, setCheckedIds] = useState([]);
  const [loadingServices, setLoadingServices] = useState(true);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [error, setError] = useState(null);

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
    petPreference,
    setPetPreference,
    selectedPlace, 
    setSelectedPlace,
    dichVus,
    setDichVus,
  } = useContext(DonHangContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await dichVuLoader();
        if (data && data.dichVus) {
          setDichVus(data.dichVus);
        } else {
          console.error('Error fetching service data: DichVus data not found');
          setError('Error fetching service data');
        }
      } catch (error) {
        console.error('Error fetching service data:', error);
        setError('Error fetching service data');
      } finally {
        setLoadingServices(false);
      }
    };
    fetchData();
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await NhanVienLoader();
        setNhanViens(data.nhanViens);
      } catch (error) {
        console.error('Error fetching employee data:', error);
        setError('Error fetching employee data');
      } finally {
        setLoadingEmployees(false);
      }
    };
    fetchData();
  }, [setNhanViens]);

  useEffect(() => {
    calculateTotalPrice();
  }, [selectedDuration, repeatCount, checkedIds, petPreference, selectedEmployee]);

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

  const handleCheckboxChange = (id) => {
    setCheckedIds((prevIds) =>
      prevIds.includes(id)
        ? prevIds.filter((prevId) => prevId !== id)
        : [...prevIds, id]
    );
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
    if (selectedEmployee && selectedEmployee.id) {
      additionalPrice += 20000;
    }
  
    let servicePrice = 0;
    if (checkedIds.length > 0) {
      servicePrice = checkedIds.reduce((total, id) => {
        const selectedService = dichVus.find(service => service.id === id);
        if (selectedService && selectedService.giaTien) {
          total += selectedService.giaTien;
        }
        return total;
      }, 0);
    }
  
    const totalPrice = (basePrice + additionalPrice + servicePrice) * repeatCount || 0;
    setTotalPrice(totalPrice);
  };
  

  const handleSearch = async () => {
    try {
      const results = await getGeocode({ address: searchValue });
      const { lat, lng } = await getLatLng(results[0]);
      setSelectedPlace({ lat, lng });
      setSearchValue(results[0].formatted_address);
    } catch (error) {
      console.error('Error searching address:', error);    }
  };

  const handlePetPreferenceChange = (event) => {
    const { value, checked } = event.target;
    setPetPreference((prevPreferences) =>
      checked
        ? [...prevPreferences, value]
        : prevPreferences.filter((preference) => preference !== value)
    );
  };

  const handleSubmit = () => {
    console.log('Đã đăng ký dịch vụ');
  };

  const handleClick = async (event) => {
    try {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      const results = await getGeocode({ location: { lat, lng } });
      setSelectedPlace(results[0].formatted_address);
    } catch (error) {
      console.error('Lỗi khi tìm địa chỉ:', error);
      setError('Error fetching location');
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
        <LoadScript googleMapsApiKey="AIzaSyBWugvX95LUjtIpZif_CGjwKzOCFufBJtc">
          <GoogleMap
            zoom={10}
            center={selectedPlace || { lat: 10.8231, lng: 106.6297 }}
            mapContainerStyle={{ height: '400px', width: '100%' }}
            onClick={handleClick}
          >
            {selectedPlace && <Marker position={selectedPlace} />}
          </GoogleMap>
        </LoadScript>
        <div className="places-container">
          <div>
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Enter an address"
              style={{ width: '300px', height: '40px', fontSize: '16px' }}
            />
            <button
              onClick={handleSearch}
              style={{ fontSize: '16px', padding: '10px 20px' }}
            >
              Search
            </button>
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
            <TextField fullWidth type="date" value={startDate} onChange={handleStartDateChange} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1" gutterBottom>Ngày kết thúc</Typography>
            <TextField fullWidth type="date" value={endDate} onChange={handleEndDateChange} />
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
          {loadingServices ? (
            <Typography>Loading services...</Typography>
          ) : (
            <div>
              {dichVus.map((dichVu) => (
                <div key={dichVu.id}>
                  <input
                    type="checkbox"
                    id={dichVu.id}
                    checked={checkedIds.includes(dichVu.id)}
                    onChange={() => handleCheckboxChange(dichVu.id)}
                  />
                  <label htmlFor={dichVu.id}>{dichVu.tenDichVu}</label>
                </div>
              ))}
            </div>
          )}
        </FormGroup>
        <FormGroup sx={{ my: 1 }}>
  <Typography variant="subtitle1" gutterBottom>
    Chọn vật nuôi
  </Typography>
  <div>
    {['Không có vật nuôi', 'Chó', 'Mèo', 'Khác'].map((pet) => (
      <FormControlLabel
        key={pet}
        control={
          <Checkbox
            value={pet}
            checked={petPreference.includes(pet)}
            onChange={handlePetPreferenceChange}
          />
        }
        label={pet}
      />
    ))}
  </div>
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
            {loadingEmployees ? (
              <Typography>Loading employees...</Typography>
            ) : (
              nhanViens.map((employee) => (
                <div key={employee.id}>
                  <FormControlLabel
                    control={<Checkbox />}
                    label={employee.ten}
                    checked={selectedEmployee && selectedEmployee.id === employee.id}
                    onChange={() => setSelectedEmployee(employee)}
                  />
                </div>
              ))
            )}
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
        {error && <Typography color="error">{error}</Typography>}
      </Container>
    </div>
  );
}

export default ServiceRegistration;
