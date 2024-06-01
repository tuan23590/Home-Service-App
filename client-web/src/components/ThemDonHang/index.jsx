import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Select, MenuItem, FormControl, InputLabel, Autocomplete, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, Box } from '@mui/material';
import { apiQuanHuyen, apiTinhTP, apiXaPhuong } from '../../../utils/DiaChiUtil';
import { dichVuLoader, apiDanhSachDichVuChinh } from '../../../utils/DichVuUtils';
import { apiThemDonHang } from '../../../utils/DonHangUtils';
import ThongTinKhachHang from './ThongTinKhachHang';
import DiaChiLamViec from './DiaChiLamViec';
import ThongTinDonHang from './ThongTinDonHang';

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
        giaDichVuTheoYeuCauCuaKhachHang: undefined,
    });
    const [khachHangData, setKhachHangData] = useState({
        id: '',
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

    useEffect(() => {
        const tongTien = (parseInt(donHangData.giaDichVuTheoYeuCauCuaKhachHang) + donHangData.dichVuChinh?.gia || 0) + donHangData.danhSachDichVuThem.reduce((total, dichVu) => total + (dichVu.gia || 0), 0);
        setDonHangData((prevData) => ({
            ...prevData,
            tongTien: tongTien * donHangData.danhSachLichThucHien.length || tongTien
        }));
    }, [donHangData.dichVuChinh, donHangData.danhSachDichVuThem, donHangData.soThangLapLai, donHangData.giaDichVuTheoYeuCauCuaKhachHang, donHangData.danhSachLichThucHien]);



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

        const getDatesWithSameDayOfWeek = (startDate, dayOfWeek, days, workingHours) => {
            const dates = [];
            const currentDate = new Date(startDate);
            const endDate = new Date(startDate);
            endDate.setDate(endDate.getDate() + days);


            while (currentDate <= endDate) {
                if (currentDate.getDay() === dayOfWeek) {
                    const startTime = currentDate.getTime();
                    const endTime = startTime + workingHours * 3600000;
                    dates.push({
                        thoiGianBatDau: startTime,
                        thoiGianKetThuc: endTime
                    });
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }

            return dates;
        };

        const combinedDateTime = combineDateAndTime(donHangData.ngayBatDau?.nextDay, donHangData.gioBatDau?.startHour);


        const dayOfWeek = combinedDateTime.getDay();


        const soGioLamViec = donHangData.dichVuChinh?.thoiGian || 1;


        const matchingDates = getDatesWithSameDayOfWeek(combinedDateTime, dayOfWeek, donHangData.soThangLapLai?.value * 30, soGioLamViec);

        console.log(matchingDates);
        setDonHangData(prevData => ({
            ...prevData,
            danhSachLichThucHien: matchingDates
        }));

    }, [donHangData.ngayBatDau, donHangData.gioBatDau, donHangData.soThangLapLai?.value]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await apiThemDonHang(donHangData);
            console.log(data);
            alert('Tạo đơn hàng thành công')
        } catch (error) {
            alert('Tạo đơn hàng thất bại')
        }
        ;
    };
    return (
        <Paper sx={{ padding: '20px', marginTop: '15px', height: '93%', overflow: 'auto' }} >
            <form onSubmit={handleSubmit}>
                <ThongTinDonHang data={{ donHangData, setDonHangData }} />
                <br />
                <ThongTinKhachHang data={{ khachHangData, setKhachHangData }} />
                <br />
                <DiaChiLamViec data={{ diaChiData, setDiaChiData }} />
                <br />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant='h5' sx={{ color: 'red' }}>Tổng tiền: {donHangData.tongTien.toLocaleString('vi-VN')} VNĐ</Typography>
                    <Button type="submit" variant="contained" color='success'>Tạo đơn hàng</Button>
                </Box>
            </form>
        </Paper>
    );
};

export default ThemDonHang;
