import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Select, MenuItem, FormControl, InputLabel, Autocomplete, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Box } from '@mui/material';
import { apiQuanHuyen, apiTinhTP, apiXaPhuong } from '../../utils/DiaChiUtil';
import { dichVuLoader, apiDanhSachDichVuChinh } from '../../utils/DichVuUtils';
import { apiThemDonHang } from '../../utils/DonHangUtils';

const ThemDonHang = () => {
    const [donHangData, setDonHangData] = useState({
        danhSachLichThucHien: [],
        khachHang: '',
        dichVuChinh: null,
        danhSachDichVuThem: [],
        ngayBatDau: null,
        gioBatDau: null,
        soThangLapLai: null,
        vatNuoi: '',
        ghiChu: '',
        diaChi: '',
        tongTien: 0,
        dichVuTheoYeuCauCuaKhachHang: '',
        giaDichVuTheoYeuCauCuaKhachHang: 0,
    });
    const [khachHangData, setKhachHangData] = useState({
        tenKhachHang: '',
        soDienThoai: '',
        email: ''
    });
    const [diaChiData, setDiaChiData] = useState({
        tinhTp: null,
        quanHuyen: null,
        xaPhuong: null,
        soNhaTenDuong: '',
        ghiChu: ''
    });
    const [lichThucHienData, setLichThucHienData] = useState({
        ngayThucHien: '',
        gioThucHien: ''
    });

    const [danhSachDichVuChinh, setDanhSachDichVuChinh] = useState([]);
    const [danhSachDichVuThem, setDanhSachDichVuThem] = useState([]);
    const [dichVuThemSelected, setDichVuThemSelected] = useState([]);
    const [danhSachTinhTp, setDanhSachTinhTp] = useState([]);
    const [danhSachQuanHuyen, setDanhSachQuanHuyen] = useState([]);
    const [danhSachXaPhuong, setDanhSachXaPhuong] = useState([]);
    const [danhSachNgayThucHien, setDanhSachNgayThucHien] = useState([]);
    const [danhSachGioThucHien, setDanhSachGioThucHien] = useState([]);
    const [dichVuChinh, setDichVuChinh] = useState(null);
    const danhSachThangLapLai = [{ value: 1, label: '1 tháng' }, { value: 2, label: '2 tháng' }, { value: 3, label: '3 tháng' }, { value: 4, label: '4 tháng' }, { value: 5, label: '5 tháng' }, { value: 6, label: '6 tháng' }, { value: 7, label: '7 tháng' }, { value: 8, label: '8 tháng' }, { value: 9, label: '9 tháng' }, { value: 10, label: '10 tháng' }, { value: 11, label: '11 tháng' }, { value: 12, label: '12 tháng' }];


    useEffect(() => {
        const daysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
      
        // Function to generate an array of the next 30 days with day of the week
        const generateNext30Days = () => {
          const today = new Date();
          const daysArray = [];
          for (let i = 0; i < 30; i++) {
            const nextDay = new Date(today);
            nextDay.setDate(today.getDate() + i + 1);
            const dayOfWeek = daysOfWeek[nextDay.getDay()];
      
            // Format date to dd-MM-yyyy
            const day = nextDay.getDate().toString().padStart(2, '0');
            const month = (nextDay.getMonth() + 1).toString().padStart(2, '0');
            const year = nextDay.getFullYear();
            const formattedDate = `${day}-${month}-${year} (${dayOfWeek})`;
      
            daysArray.push({ formattedDate, nextDay });
          }
          return daysArray;
        };
      
        const next30Days = generateNext30Days();
        setDanhSachNgayThucHien(next30Days);
      }, []);

      useEffect(() => {
        const generateTimeRanges = (interval) => {
          const timesArray = [];
          const businessStart = 9; // Business hours start at 9:00 AM
          const businessEnd = 17; // Business hours end at 5:00 PM
      
          for (let hour = businessStart; hour + interval <= businessEnd; hour++) {
            const startHour = hour.toString().padStart(2, '0');
            const endHour = (hour + interval).toString().padStart(2, '0');
      
            const timeString = `${startHour}:00 đến ${endHour}:00 (làm trong ${interval} giờ)`;
            
            timesArray.push({ timeString, startHour, interval });
          }
      
          return timesArray;
        };
      
        const interval = donHangData.dichVuChinh?.thoiGian || 1;
        const timeRanges = generateTimeRanges(interval);
        setDanhSachGioThucHien(timeRanges);
      }, [donHangData.dichVuChinh]);
      
      

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await apiTinhTP();
                setDanhSachTinhTp(data.DanhSachTinhTp)
                const dataDanhSachDichvuThem = await dichVuLoader();
                setDanhSachDichVuThem(dataDanhSachDichvuThem.data.DichVuThem);
                const dataDanhSachDichVuChinh = await apiDanhSachDichVuChinh();
                setDanhSachDichVuChinh(dataDanhSachDichVuChinh.data.DichVuCaLe);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (diaChiData.tinhTp?.code) {
                    const { data } = await apiQuanHuyen(diaChiData.tinhTp?.code);
                    setDanhSachQuanHuyen(data.DanhSachQuanHuyen)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [diaChiData.tinhTp]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (diaChiData.quanHuyen?.code) {
                    const { data } = await apiXaPhuong(diaChiData.quanHuyen?.code);
                    setDanhSachXaPhuong(data.DanhSachXaPhuong)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [diaChiData.quanHuyen]);


    const handleChangeDonHang = (e) => {
        const { name, value } = e.target;

        setDonHangData((prevData) => {
            const newData = { ...prevData, [name]: value };
            if (name === 'dichVuChinh') {
                newData.gioBatDau = null;
                newData.ngayBatDau = null;
            }
            return newData;
        });
    };

    const handleChangeKhachHang = (e) => {
        setKhachHangData({
            ...khachHangData,
            [e.target.name]: e.target.value
        });
    };

    const handleChangeDiaChi = (event) => {
        const { name, value } = event.target;

        setDiaChiData((prevData) => {
            const newData = { ...prevData, [name]: value };

            // Reset các trường khác khi tinhTp thay đổi
            if (name === 'tinhTp') {
                newData.quanHuyen = null;
                newData.xaPhuong = null;
                newData.soNhaTenDuong = '';
                newData.ghiChu = '';
                setDanhSachQuanHuyen([]);
                setDanhSachXaPhuong([]);
            }
            if (name === 'quanHuyen') {
                newData.xaPhuong = null;
                newData.soNhaTenDuong = '';
                newData.ghiChu = '';
                setDanhSachXaPhuong([]);
            }
            if (name === 'xaPhuong') {
                newData.soNhaTenDuong = '';
                newData.ghiChu = '';
            }

            return newData;
        });
    };

    const [selectedDichVu, setSelectedDichVu] = useState([]);
      

    const handleSelect = (item) => {
        if (selectedDichVu.includes(item)) {
            setSelectedDichVu(selectedDichVu.filter((dichVu) => dichVu !== item));
        } else {
            if ((dichVuChinh.thoiGian || 0) + selectedDichVu.reduce((total, dichVu) => total + (dichVu.thoiGian || 0), 0) < 4 || item.thoiGian === null) {
                setSelectedDichVu([...selectedDichVu, item]);
            } else {
                alert("Không thể thêm dịch vụ vì đã đạt tối đa thời gian.");
            }
        }
        
    };
    
    useEffect(() => {
        const totalThoiGian = (dichVuChinh?.thoiGian || 0) + selectedDichVu.reduce((total, dichVu) => total + (dichVu.thoiGian || 0), 0);
        const dichVuChinhMoi = danhSachDichVuChinh.find(item => item.thoiGian === totalThoiGian);
        setDonHangData((prevData) => ({
            ...prevData,
            dichVuChinh: dichVuChinhMoi,
            danhSachDichVuThem: selectedDichVu,
            gioBatDau: null,
        }));
    }, [selectedDichVu]);
    
    useEffect(() => {
        const tongTien = (parseInt(donHangData.giaDichVuTheoYeuCauCuaKhachHang)+donHangData.dichVuChinh?.gia || 0) + donHangData.danhSachDichVuThem.reduce((total, dichVu) => total + (dichVu.gia || 0), 0);
        setDonHangData((prevData) => ({
            ...prevData,
            tongTien: tongTien
        }));
    }, [donHangData.dichVuChinh,donHangData.danhSachDichVuThem,donHangData.soThangLapLai,donHangData.giaDichVuTheoYeuCauCuaKhachHang]);

    useEffect(() => {
            setDonHangData(prevData => ({
                ...prevData,
                dichVuChinh: dichVuChinh
            }));
            setSelectedDichVu([]);
    }, [dichVuChinh]);

    useEffect(() => {
        setDonHangData(prevData => ({
            ...prevData,
            diaChi: diaChiData,
            khachHang: khachHangData
        }));
    }, [diaChiData,diaChiData]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        // const data = await apiThemDonHang(donHangData);
        // console.log(data);
    };

    const formatDate = (epochTime) => {
        const daysOfWeek = [
          'CN', 'T2', 'T3', 'T4',
          'T5', 'T6', 'T7'
        ];
        const date = new Date(epochTime * 1000);
        const dayOfWeek = daysOfWeek[date.getDay()];
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        const year = date.getFullYear();
        const formattedDateTime = `${dayOfWeek}, ${day}/${month}/${year} - ${hours}:${minutes}`;
        return formattedDateTime;
      };

    useEffect(() => {
        const combineDateAndTime = (dateString, hourString) => {
            const date = new Date(dateString);
            date.setHours(hourString);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            return date;
        };
        
        const combinedDateTime = combineDateAndTime(donHangData.ngayBatDau?.nextDay, donHangData.gioBatDau?.startHour);
        console.log(combinedDateTime);
        const epochDate = combinedDateTime.getTime();
       //console.log(formatDate(epochDate));
    }, [donHangData.ngayBatDau, donHangData.gioBatDau, donHangData.soThangLapLai?.value]);
    
    
    
    
    
      
    return (
        <Paper sx={{ padding: '20px', marginTop: '15px' ,height: '93%', overflow: 'auto'}} >
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Thông tin đơn hàng</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            required
                            getOptionLabel={(option) => option.tenDichVu}
                            options={danhSachDichVuChinh}
                            value={donHangData.dichVuChinh}
                            onChange={(event, newValue) => setDichVuChinh(newValue)}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Dịch vụ chính"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Vật nuôi"
                            name="vatNuoi"
                            variant="outlined"
                            size="small"
                            value={donHangData.vatNuoi}
                            onChange={handleChangeDonHang}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Typography><strong>Danh sách dich vụ thêm</strong></Typography>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Chọn</TableCell>
                                    <TableCell>Tên Dịch Vụ</TableCell>
                                    <TableCell>Giá</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {danhSachDichVuThem.map((dichVu) => (
                                    <TableRow key={dichVu.id} sx={{
                                        cursor: 'pointer',
                                        '&:hover': {
                                            backgroundColor: '#bec2cc',
                                        },
                                    }} onClick={() => handleSelect(dichVu)}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedDichVu.includes(dichVu)}
                                                onChange={() => handleSelect(dichVu)}
                                            />
                                        </TableCell>
                                        <TableCell>{dichVu.tenDichVu}</TableCell>
                                        <TableCell>{dichVu.gia !== null ? '+ ' + dichVu.gia + ' VNĐ' : '+ ' + dichVu.thoiGian + ' giờ'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Ghi chú"
                            name="ghiChu"
                            variant="outlined"
                            size="small"
                            multiline
                            minRows={6}
                            value={donHangData.ghiChu}
                            onChange={handleChangeDonHang}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Dịch vụ theo yêu cầu của khách hàng"
                            name="dichVuTheoYeuCauCuaKhachHang"
                            variant="outlined"
                            size="small"
                            value={donHangData.dichVuTheoYeuCauCuaKhachHang}
                            onChange={handleChangeDonHang}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Giá DV theo yêu cầu của khách hàng"
                            name="giaDichVuTheoYeuCauCuaKhachHang"
                            variant="outlined"
                            size="small"
                            type='number'
                            value={donHangData.giaDichVuTheoYeuCauCuaKhachHang}
                            onChange={handleChangeDonHang}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            options={danhSachNgayThucHien}
                            getOptionLabel={(option) => option.formattedDate}
                            value={donHangData.ngayBatDau}
                            onChange={(event, newValue) => handleChangeDonHang({ target: { name: 'ngayBatDau', value: newValue } })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Chọn ngày thực hiện"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            required
                            getOptionLabel={(option) => option.timeString}
                            options={danhSachGioThucHien}
                            value={donHangData.gioBatDau}
                            onChange={(event, newValue) => handleChangeDonHang({ target: { name: 'gioBatDau', value: newValue } })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Chọn giờ bắt đầu và kết thúc"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            required
                            getOptionLabel={(option) => option.label}
                            options={danhSachThangLapLai}
                            value={donHangData.soThangLapLai}
                            onChange={(event, newValue) => handleChangeDonHang({ target: { name: 'soThangLapLai', value: newValue } })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Chọn số tháng lặp lại"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Thông tin khách hàng</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            required
                            label="Tên khách hàng"
                            name="tenKhachHang"
                            variant="outlined"
                            size="small"
                            value={khachHangData.tenKhachHang}
                            onChange={handleChangeKhachHang}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            required
                            label="Số điện thoại"
                            name="soDienThoai"
                            variant="outlined"
                            size="small"
                            value={khachHangData.soDienThoai}
                            onChange={handleChangeKhachHang}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            required
                            label="Email"
                            name="email"
                            variant="outlined"
                            size="small"
                            value={khachHangData.email}
                            onChange={handleChangeKhachHang}
                        />
                    </Grid>
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Địa chỉ làm việc</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            options={danhSachTinhTp}
                            getOptionLabel={(option) => option.name_with_type}
                            value={diaChiData.tinhTp}
                            onChange={(event, newValue) => handleChangeDiaChi({ target: { name: 'tinhTp', value: newValue } })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Tỉnh/Thành phố"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                        required
                            options={danhSachQuanHuyen}
                            getOptionLabel={(option) => option.name_with_type}
                            value={diaChiData.quanHuyen}
                            onChange={(event, newValue) => handleChangeDiaChi({ target: { name: 'quanHuyen', value: newValue } })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Quận/Huyện"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                        required
                            options={danhSachXaPhuong}
                            getOptionLabel={(option) => option.name_with_type}
                            value={diaChiData.xaPhuong}
                            onChange={(event, newValue) => handleChangeDiaChi({ target: { name: 'xaPhuong', value: newValue } })}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Xã/Phường"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                        required
                            fullWidth
                            label="Số nhà/Tên đường"
                            name="soNhaTenDuong"
                            variant="outlined"
                            size="small"
                            value={diaChiData.soNhaTenDuong}
                            onChange={handleChangeDiaChi}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Ghi chú địa chỉ"
                            name="ghiChu"
                            variant="outlined"
                            size="small"
                            value={diaChiData.ghiChu}
                            onChange={handleChangeDiaChi}
                        />
                    </Grid>
                </Grid>
                <br />
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Typography variant='h5' sx={{color: 'red'}}>Tổng tiền: {donHangData.tongTien.toLocaleString('vi-VN')} VNĐ</Typography>
                <Button  type="submit" variant="contained" color='success'>Tạo đơn hàng</Button>
                </Box>
            </form>
        </Paper>
    );
};

export default ThemDonHang;
