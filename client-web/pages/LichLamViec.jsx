import React, { useEffect, useState } from 'react';
import { apiThongTinNhanVien } from '../utils/NhanVienUtils';
import { Box, Grid, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import ThongTinNhanVien from '../src/components/ChiTietDonHang/ThongTinNhanVien';

export default function LichLamViec() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [open, setOpen] = useState(false);
    const [thongTinNhanVien, setThongTinNhanVien] = useState([]);
    const lichLamViec = thongTinNhanVien.lichLamViec || [];

    useEffect(() => {
        const fetchData = async () => {
            const data = await apiThongTinNhanVien('6656a528a06300b51a80064c');
            setThongTinNhanVien(data);
        };
        fetchData();
    }, []);

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const handlePreviousMonth = () => {
        setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
    };

    const handleToday = () => {
        setCurrentDate(new Date());
    };

    const handleClickOpen = (day) => {
        setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const today = new Date();

    const days = [];
    const firstDay = firstDayOfMonth(year, month);
    const totalDays = daysInMonth(year, month);

    for (let i = 0; i < firstDay; i++) {
        days.push(null); // Thêm khoảng trống cho các ngày trước ngày 1
    }
    for (let i = 1; i <= totalDays; i++) {
        days.push(i);
    }

    const isHighlighted = (day) => {
        if (!day) return false;
        const dayDate = new Date(year, month, day).toLocaleDateString();
        return lichLamViec.some(lich => new Date(lich.thoiGianBatDauLich).toLocaleDateString() === dayDate);
    };

    return (
        <>
            <ThongTinNhanVien nhanVienDaChon={thongTinNhanVien} />
            <Box sx={{ flexGrow: 1, padding: 2 }}>
                <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                    <Typography variant="h5" align="center">
                        <strong>Lịch làm việc {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</strong>
                    </Typography>
                </Box>
                <Grid container spacing={2} sx={{ marginBottom: '20px' }}>
                    {['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'].map((day, index) => (
                        <Grid item xs={1.71} key={index}>
                            <Typography variant="h6" align="center">{day}</Typography>
                        </Grid>
                    ))}
                </Grid>
                <Grid container spacing={2} sx={{ height: '55vh' }}>
                    {days.map((day, index) => {
                        const dayDate = new Date(year, month, day);
                        const formattedDate = dayDate.toLocaleDateString();
                        const lichLamViecOfDay = lichLamViec.filter(lich => new Date(lich.thoiGianBatDauLich).toLocaleDateString() === formattedDate);

                        return (
                            <Grid item xs={1.71} key={index} onClick={() => day && handleClickOpen(day)}>
                                <Box
                                    sx={{
                                        height: 80,
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
                                                ? '#4dabf5' // Màu nổi bật cho ngày có lịch
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
                                                            {new Date(lich.thoiGianBatDauLich).getHours().toString().padStart(2, '0')}:{new Date(lich.thoiGianBatDauLich).getMinutes().toString().padStart(2, '0')} - {new Date(lich.thoiGianKetThucLich).getHours().toString().padStart(2, '0')}:{new Date(lich.thoiGianKetThucLich).getMinutes().toString().padStart(2, '0')} ({lich.trangThaiLich})
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
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Thông Tin Ngày</DialogTitle>
                    <DialogContent>
                        <Typography>{selectedDate && selectedDate.toDateString()}</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Đóng</Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </>
    );
}
