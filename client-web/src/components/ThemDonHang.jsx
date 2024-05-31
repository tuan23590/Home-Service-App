import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Select, MenuItem, FormControl, InputLabel, Autocomplete, Table, TableHead, TableRow, TableCell, TableBody, Checkbox } from '@mui/material';
import { apiQuanHuyen, apiTinhTP, apiXaPhuong } from '../../utils/DiaChiUtil';
import { dichVuLoader, apiDanhSachDichVuChinh } from '../../utils/DichVuUtils';

const ThemDonHang = () => {
    const [errors, setErrors] = useState({});
    const [donHangData, setDonHangData] = useState({
        soGioThucHien: '',
        danhSachLichThucHien: [''],
        khachHang: '',
        dichVuChinh: null,
        danhSachDichVuThem: [''],
        ngayBatDau: null,
        soThangLapLai: null,
        vatNuoi: '',
        ghiChu: '',
        uuTienTasker: '',
        diaChi: '',
        tongTien: ''
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

    const [danhSachDichVuChinh, setDanhSachDichVuChinh] = useState([]);
    const [danhSachDichVuThem, setDanhSachDichVuThem] = useState([]);
    const [dichVuThemSelected, setDichVuThemSelected] = useState([]);
    const [danhSachTinhTp, setDanhSachTinhTp] = useState([]);
    const [danhSachQuanHuyen, setDanhSachQuanHuyen] = useState([]);
    const [danhSachXaPhuong, setDanhSachXaPhuong] = useState([]);
    const [danhSachNgayThucHien, setDanhSachNgayThucHien] = useState([]);
    const [danhSachGioThucHien, setDanhSachGioThucHien] = useState([]);


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
            daysArray.push(formattedDate);
          }
          return daysArray;
        };
    
        const next30Days = generateNext30Days();
        setDanhSachNgayThucHien(next30Days);
      }, []);


      useEffect(() => {
        const generateTimeRanges = (interval) => {
          const timesArray = [];
          for (let hour = 0; hour < 24; hour += interval) {
            const startHour = hour.toString().padStart(2, '0');
            const endHour = (hour + interval).toString().padStart(2, '0');
            if (hour + interval <= 24) {
              const timeString = `${startHour}:00 đến ${endHour}:00`;
              timesArray.push(timeString);
            }
          }
          return timesArray;
        };
    
        const interval = donHangData.dichVuChinh.thoiGian || 1;
        const timeRanges = generateTimeRanges(interval);
        setDanhSachGioThucHien(timeRanges);
      }, [donHangData.dichVuChinh.thoiGian]);


      
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await apiTinhTP();
                setDanhSachTinhTp(data.DanhSachTinhTp)
                const dataDanhSachDichvuThem = await dichVuLoader();
                setDanhSachDichVuThem(dataDanhSachDichvuThem.data.DichVuThem);
                const dataDanhSachDichVuChinh = await apiDanhSachDichVuChinh();
                setDanhSachDichVuChinh(dataDanhSachDichVuChinh.data.DichVuCaLe);
                console.log("dataDanhSachDichVuChinh", dataDanhSachDichVuChinh);
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
        setDonHangData({
            ...donHangData,
            [e.target.name]: e.target.value
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


    const handleSelect = (id) => {
        const newSelectedDichVu = [...selectedDichVu];
        if (newSelectedDichVu.includes(id)) {
            const index = newSelectedDichVu.indexOf(id);
            newSelectedDichVu.splice(index, 1);
        } else {
            newSelectedDichVu.push(id);
        }
        setSelectedDichVu(newSelectedDichVu);

        // Cập nhật danhSachDichVuThem
        const newDanhSachDichVuThem = danhSachDichVuThem.map(dichVu => ({
            ...dichVu,
            selected: newSelectedDichVu.includes(dichVu.id)
        }));
        setDanhSachDichVuThem(newDanhSachDichVuThem);
    };




    const handleSubmit = (e) => {
        e.preventDefault();
        // Thực hiện logic khi submit form
    };

    return (
        <Paper sx={{ padding: '20px', marginTop: '15px' }}>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Thông tin đơn hàng</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Autocomplete
                            getOptionLabel={(option) => option.tenDichVu}
                            options={danhSachDichVuChinh}
                            value={donHangData.dichVuChinh}
                            onChange={(event, newValue) => handleChangeDonHang({ target: { name: 'dichVuChinh', value: newValue } })}
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
                                    }} onClick={() => handleSelect(dichVu.id)}>
                                        <TableCell>
                                            <Checkbox
                                                checked={selectedDichVu.includes(dichVu.id)}
                                                onChange={() => handleSelect(dichVu.id)}
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
                        <Autocomplete
                            options={danhSachNgayThucHien}
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
                            // getOptionLabel={(option) => option.tenDichVu}
                            options={danhSachGioThucHien}
                            // value={donHangData.dichVuChinh}
                            // onChange={(event, newValue) => handleChangeDonHang({ target: { name: 'dichVuChinh', value: newValue } })}
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
                </Grid>
                <br />
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h6">Thông tin khách hàng</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
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
                <Button type="submit" variant="contained" color="primary">Submit</Button>
            </form>
        </Paper>
    );
};

export default ThemDonHang;
