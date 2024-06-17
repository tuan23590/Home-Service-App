import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { apiTimDanhSachDonHangTheoDanhSachLichThucHien } from '../../utils/DonHangUtils';
import { EPOCHTODATETIMETOTIME, EPOCHTODATETODAY } from './../function'
import { Outlet, useNavigate } from 'react-router-dom';

export default function LichLamViec({ data }) {
    const { lichLamViec, selectedDate, setSelectedDate } = data;
    const lichLamViecNhanVien = lichLamViec.filter(item => item.trangThaiLich === "Nhân viên đã xác nhận công việc");
    const [matchingItems, setMatchingItems] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [danhSachDonHangTheoLichLamViec, setDanhSachDonHangTheoLichLamViec] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    useEffect(() => {
        setSelectedDate(currentDate);
    }, []);

    const handlePreviousMonth = () => {
        setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    const handleClickOpen = async (day) => {
        const selectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
        setSelectedDate(selectedDate);
        const matchingItems = lichLamViecNhanVien.filter(item => new Date(item.thoiGianBatDauLich).toLocaleDateString() === selectedDate.toLocaleDateString());
        setMatchingItems(matchingItems);

        setLoading(true); // Bắt đầu tải dữ liệu
        const data = await apiTimDanhSachDonHangTheoDanhSachLichThucHien(matchingItems.map(item => item.id));
        setDanhSachDonHangTheoLichLamViec(data);
        setLoading(false); // Kết thúc tải dữ liệu
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();

    const days = [];
    const firstDay = firstDayOfMonth(year, month);
    const totalDays = daysInMonth(year, month);

    for (let i = 0; i < firstDay; i++) {
        days.push(null);
    }
    for (let i = 1; i <= totalDays; i++) {
        days.push(i);
    }

    const isHighlighted = (day) => {
        if (!day) return false;
        const dayDate = new Date(year, month, day).toLocaleDateString();
        return lichLamViecNhanVien.some(lich => new Date(lich.thoiGianBatDauLich).toLocaleDateString() === dayDate);
    };

    return (
        <Grid container spacing={2} sx={{ padding: '10px' }}>
            <Grid item xs={8}>
                <Paper sx={{ padding: '30px' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                        <Typography variant="h5" align="center">
                            <strong>Lịch làm việc {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</strong>
                        </Typography>
                    </Box>
                    <Grid container spacing={2} sx={{ marginBottom: '10px' }}>
                        {['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'].map((day, index) => (
                            <Grid item xs={1.71} key={index}>
                                <Typography variant="h6" align="center">{day}</Typography>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid container spacing={2} sx={{ height: '40vh' }}>
                        {days.map((day, index) => {
                            const dayDate = new Date(year, month, day);
                            const formattedDate = dayDate.toLocaleDateString();
                            const lichLamViecOfDay = lichLamViecNhanVien.filter(lich => new Date(lich.thoiGianBatDauLich).toLocaleDateString() === formattedDate);
                            return (
                                <Grid item xs={1.71} key={index} onClick={() => day && handleClickOpen(day)}>
                                    <Box
                                        sx={{
                                            height: 60,
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxSizing: 'border-box',
                                            border: day ? '1px solid #000000' : '',
                                            borderRadius: '10px',
                                            '&:hover': {
                                                backgroundColor: day ? '#90caf9' : 'transparent'
                                            },
                                            backgroundColor: day
                                                ? isHighlighted(day)
                                                    ? '#4dabf5'
                                                    : (day === today.getDate() && month === today.getMonth() && year === today.getFullYear() ? '#33ab9f' : '')
                                                : 'transparent',
                                            cursor: day ? 'pointer' : 'default'
                                        }}
                                    >
                                        {day && (
                                            <>
                                                <Typography variant='h6'>{day}</Typography>
                                                {lichLamViecOfDay && (
                                                    <>
                                                        {lichLamViecOfDay.map((lich, index) => (
                                                            <Typography key={index} variant="body2">
                                                                {new Date(lich.thoiGianBatDauLich).getHours().toString().padStart(2, '0')}:{new Date(lich.thoiGianBatDauLich).getMinutes().toString().padStart(2, '0')} - {new Date(lich.thoiGianKetThucLich).getHours().toString().padStart(2, '0')}:{new Date(lich.thoiGianKetThucLich).getMinutes().toString().padStart(2, '0')}
                                                            </Typography>
                                                        ))}
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </Box>
                                </Grid>
                            );
                        })}
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                        <Button sx={{
                            marginInline: '5px', backgroundColor: '#000000 !important', '&:hover': {
                                backgroundColor: '#000000 !important',
                                opacity: 0.9
                            },
                        }} variant="contained" onClick={handlePreviousMonth}>Tháng Trước</Button>
                        <Button color='inherit' sx={{ marginInline: '5px', borderColor: '#000000 !important' }} variant='outlined' onClick={handleToday}>Ngày Hiện Tại</Button>
                        <Button sx={{
                            marginInline: '5px', backgroundColor: '#000000 !important', '&:hover': {
                                backgroundColor: '#000000 !important',
                                opacity: 0.9
                            },
                        }} variant="contained" onClick={handleNextMonth}>Tháng Sau</Button>
                    </Box>
                </Paper>
            </Grid>
            <Grid item xs={4}>
                <Paper sx={{ padding: '10px', height: "58vh" ,overflow: 'auto'}}>
                    <Box>
                        <Typography variant="h5" align="center">
                            <strong>
                                Danh sách công việc {
                                    selectedDate?.toDateString() === new Date().toDateString()
                                        ? 'hôm nay'
                                        : 'ngày ' + selectedDate?.toLocaleString('default', { day: 'numeric', month: 'long' })
                                }
                            </strong>
                        </Typography>
                        {loading ? (
                            <Typography variant="body1" align="center">
                                Đang tải...
                            </Typography>
                        ) : (
                            danhSachDonHangTheoLichLamViec.length === 0 ? (
                                <Typography variant="body1" align="center">
                                    Không có công việc nào trong ngày này
                                </Typography>
                            ) : (
                                danhSachDonHangTheoLichLamViec.map((donHang, index) => (
                                    <Paper key={index} sx={{ marginBottom: '10px', padding: '15px', border: 1 ,cursor: 'pointer',':hover':{
                                        backgroundColor: '#f0f0f0'
                                    }}} onClick={()=>{navigate(`./${donHang.id}`)}}>
                                        <Typography>
                                            <strong>Mã đơn hàng: </strong> {donHang.maDonHang}
                                        </Typography>
                                        <Typography>
                                            <strong>Khách hàng: </strong> {donHang.khachHang.tenKhachHang}
                                        </Typography>
                                        <Typography>
                                            <strong>SĐT của KH: </strong> {donHang.khachHang.soDienThoai}
                                        </Typography>
                                        <Typography>
                                            <strong>Địa chỉ: </strong> {donHang.diaChi.soNhaTenDuong}, {donHang.diaChi.xaPhuong}, {donHang.diaChi.quanHuyen}, {donHang.diaChi.tinhTP}
                                        </Typography>
                                        <Typography>
                                            <strong>Dịch vụ thực hiện: </strong> {donHang.danhSachDichVu.map(dichVu => dichVu.tenDichVu).join(', ')}
                                        </Typography>
                                        <Typography>
                                            <strong>Ngày làm việc: </strong> {EPOCHTODATETODAY(matchingItems[index]?.thoiGianBatDauLich)}
                                        </Typography>
                                        <Typography>
                                            <strong>Làm trong: </strong> {EPOCHTODATETIMETOTIME(matchingItems[index]?.thoiGianBatDauLich,matchingItems[index]?.thoiGianKetThucLich)}
                                        </Typography>
                                        <Typography>
                                            <strong>Vật nuôi: </strong> {donHang.vatNuoi}
                                        </Typography>
                                        <Typography>
                                            <strong>Ghi chú: </strong> {donHang.ghiChu || 'Không có ghi chú'}
                                        </Typography>
                                        
                                    </Paper>
                                ))
                            )
                        )}
                    </Box>
                </Paper>
            </Grid>
            <Outlet />
        </Grid>
    );
};
