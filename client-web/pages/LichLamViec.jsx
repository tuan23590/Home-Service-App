import React, { useEffect, useState } from 'react';
import { apiThongTinNhanVien } from '../utils/NhanVienUtils';
import { Box, Grid, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

export default function LichLamViec() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [open, setOpen] = useState(false);
    const [lichLamViec, setLichLamViec] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await apiThongTinNhanVien();
            setLichLamViec(data.NhanVienTheoId.lichLamViec);
        };
        fetchData();
    }, []);

    console.log(lichLamViec);

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();

    const handlePreviousMonth = () => {
        setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1));
    };

    const handleNextMonth = () => {
        setCurrentDate(prevDate => new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1));
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
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'center', marginBottom: 2 }}>
                <Typography variant="h5" align="center">
                    <strong>Lịch làm việc {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}</strong>
                </Typography>
            </Box>
            <Grid container spacing={2}>
                {['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'].map((day, index) => (
                    <Grid item xs={1.71} key={index}>
                        <Typography variant="h6" align="center">{day}</Typography>
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={2}>
                {days.map((day, index) => (
                    <Grid item xs={1.71} key={index} onClick={() => day && handleClickOpen(day)}>
                        <Box
                            sx={{
                                height: 50,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: day 
                                    ? isHighlighted(day) 
                                        ? '#ffc107' // Màu nổi bật cho ngày có lịch
                                        : (day === today.getDate() && month === today.getMonth() && year === today.getFullYear() ? '#90caf9' : '#f0f0f0')
                                    : 'transparent',
                                cursor: day ? 'pointer' : 'default'
                            }}
                        >
                            {day && <Typography>{day}</Typography>}
                        </Box>
                    </Grid>
                ))}
            </Grid>
            <Box sx={{display: 'flex', justifyContent:'space-between',marginTop: '20px'}}>
            <Button variant="contained" onClick={handlePreviousMonth}>Tháng Trước</Button>
            <Button variant="contained" onClick={handleNextMonth}>Tháng Sau</Button>
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
    );
}
