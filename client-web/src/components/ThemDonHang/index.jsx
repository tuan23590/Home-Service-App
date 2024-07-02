import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Select, MenuItem, FormControl, InputLabel, Autocomplete, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Box, Snackbar, Alert } from '@mui/material';
import { apiThemDonHang } from '../../../utils/DonHangUtils';
import ThongTinKhachHang from './ThongTinKhachHang';
import DiaChiLamViec from './DiaChiLamViec';
import ThongTinDonHang from './ThongTinDonHang';

const ThemDonHang = () => {
    const [donHangData, setDonHangData] = useState({
        danhSachLichThucHien: [],
        khachHang: '',
        danhSachDichVu: [],
        ngayBatDau: null,
        gioBatDau: null,
        soThangLapLai: null,
        vatNuoi: '',
        ghiChu: '',
        diaChi: '',
        tongTien: 0,
        soGioThucHien: 0,
    });
    const [khachHangData, setKhachHangData] = useState({
        id: null,
        tenKhachHang: null,
        soDienThoai: null,
        email: null
    });
    const [diaChiData, setDiaChiData] = useState({
        tinhTp: null,
        quanHuyen: null,
        xaPhuong: null,
        soNhaTenDuong: '',
        ghiChu: ''
    });
    const [chonNgayLamViecTrongTuan, setChonNgayLamViecTrongTuan] = useState([]);
    const tongTien = donHangData.danhSachDichVu.reduce((acc, curr) => acc + curr.gia * curr.soLanSuDung, 0);

    useEffect(() => {
        console.log();
        setDonHangData((prevData) => ({
            ...prevData,
            tongTien: tongTien * (donHangData.danhSachLichThucHien.length || 1)
        }));
    }, [donHangData.dichVuChinh, donHangData.danhSachDichVu, donHangData.soThangLapLai, donHangData.danhSachLichThucHien]);
    



    useEffect(() => {
        setDonHangData(prevData => ({
            ...prevData,
            diaChi: diaChiData,
            khachHang: khachHangData
        }));
    }, [diaChiData, diaChiData]);

    useEffect(() => {
        const combineDateAndTime = (dateString, hourString) => {
            const date = new Date(dateString);
            date.setHours(hourString);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            return date;
        };

        const getDatesWithSameDaysOfWeek = (startDate, daysOfWeek, days, workingHours) => {
            const dates = [];
            const currentDate = new Date(startDate);
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + days);

            while (currentDate <= endDate) {
                if (daysOfWeek.includes(currentDate.getDay())) {
                    const startTime = currentDate.getTime();
                    const endTime = startTime + workingHours * 3600000; // 3600000 ms = 1 hour
                    dates.push({
                        thoiGianBatDau: startTime,
                        thoiGianKetThuc: endTime
                    });
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }

            return dates;
        };

        const combinedDateTime = combineDateAndTime(donHangData.ngayBatDau, donHangData.gioBatDau?.startHour);

        const daysOfWeek = chonNgayLamViecTrongTuan;

        const soGioLamViec = donHangData.dichVuChinh?.thoiGian || 1;

        const daysToRepeat = donHangData.soThangLapLai?.value ? donHangData.soThangLapLai.value * 30 : 6;

        const matchingDates = getDatesWithSameDaysOfWeek(combinedDateTime, daysOfWeek, daysToRepeat, soGioLamViec);
        if (donHangData.ngayBatDau !== null) {
            setDonHangData(prevData => ({
                ...prevData,
                danhSachLichThucHien: matchingDates
            }));
        }

    }, [donHangData.ngayBatDau, donHangData.gioBatDau, donHangData.soThangLapLai?.value, chonNgayLamViecTrongTuan]);

    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const handleCloseSnackbar = () => {
      setSnackbar({ ...snackbar, open: false });
    };

    useEffect(() => {
        if (diaChiData.id === undefined) {
            window.scrollTo(0, document.body.scrollHeight);
        }
    }, [diaChiData]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (donHangData.danhSachLichThucHien.length === 0) {
            setSnackbar({ open: true, message: 'Vui lòng chọn ngày làm việc', severity: 'error' });
            return;
        }
        if (donHangData.khachHang === '') {
            setSnackbar({ open: true, message: 'Vui lòng chọn khách hàng', severity: 'error' });
            return;
        }
        if (donHangData.diaChi.quanHuyen === null) {
            setSnackbar({ open: true, message: 'Vui lòng chọn địa chỉ làm việc', severity: 'error' });
            return;
        }
        if (donHangData.danhSachDichVu.length === 0) {
            setSnackbar({ open: true, message: 'Vui lòng chọn dịch vụ', severity: 'error' });
            return;
        }
        if (khachHangData.soDienThoai === null) {
            setSnackbar({ open: true, message: 'Vui lòng chọn khách hàng', severity: 'error' });
            return;
        }
        try {
            const data = await apiThemDonHang(donHangData);
            if(data){
                alert('Tạo đơn hàng thành công');
                window.location.reload();
            }else{
                alert('Tạo đơn hàng thất bại');
            }
        } catch (error) {
            alert('Tạo đơn hàng thất bại')
        }
        ;
    };
    return (
        <Paper sx={{ padding: '20px', height: '93%', overflow: 'auto' }} >
            <form onSubmit={handleSubmit}>
                <Paper sx={{padding: '20px'}}>
                <ThongTinDonHang data={{ donHangData, setDonHangData, chonNgayLamViecTrongTuan, setChonNgayLamViecTrongTuan,setSnackbar}} />
                </Paper>
                <br />
                <Paper sx={{padding: '20px'}}>
                <ThongTinKhachHang data={{ khachHangData, setKhachHangData }} />
                </Paper>
                <br />
                <Paper sx={{padding: '20px'}}>
                <DiaChiLamViec data={{ diaChiData, setDiaChiData, khachHangData }} />
                </Paper>
                <br />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h5' sx={{ color: 'red' }}>Tổng tiền: {tongTien.toLocaleString('vi-VN')} VNĐ x {donHangData.danhSachLichThucHien.length||0} ngày = {donHangData.tongTien.toLocaleString('vi-VN')} VNĐ</Typography>
                    <Button type="submit" variant="contained" color='success'>Tạo đơn hàng</Button>
                </Box>
            </form>
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Paper>
    );
};

export default ThemDonHang;
