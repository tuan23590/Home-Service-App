import React, { useContext, useEffect, useState } from 'react';
import { apiThongTinNhanVien } from '../utils/NhanVienUtils';
import { Box, Grid, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions, Tabs, Tab, Paper } from '@mui/material';
import ThongTinNhanVien from '../src/components/ChiTietDonHang/ThongTinNhanVien';
import ThongTinTaiKhoan from '../src/components/ThongTinTaiKhoan';
import { AuthContext } from '../src/context/AuthProvider';
import { Outlet, useNavigate } from 'react-router-dom';
import LichLamViec from '../src/components/LichLamViec/index';
import XacNhanCongViec from '../src/components/XacNhanCongViec';
import DanhSachDonHangDaXacNhan from '../src/components/DanhSachDonHangDaXacNhan';

export default function ThongTinCongViec() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [thongTinNhanVien, setThongTinNhanVien] = useState([]);
    const [tabValue, setTabValue] = useState(0); // State to manage active tab
    const lichLamViec = thongTinNhanVien.lichLamViec || [];
    const { nhanVien } = useContext(AuthContext);
    useEffect(() => {
        const fetchData = async () => {
            const data = await apiThongTinNhanVien(nhanVien.id);
            setThongTinNhanVien(data);
        };
        if (nhanVien?.id) {
            fetchData();
        }
    }, [nhanVien]);
    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };
    return (
        <>
            <ThongTinNhanVien nhanVienDaChon={thongTinNhanVien} />
            <Box sx={{ flexGrow: 1, paddingy: 2 }}>

                <ThongTinTaiKhoan />

                <Paper sx={{marginY: '10px'}}>
                    <Tabs value={tabValue} onChange={handleTabChange} centered>
                        <Tab label="Xác nhận công việc" />
                        <Tab label="Xem lịch làm việc" />
                        <Tab label="Danh sách đơn hàng đã xác nhận" />
                    </Tabs>
                </Paper>

                {tabValue === 0 && (

                    <XacNhanCongViec data={{nhanVien}}/>
                )}

                {tabValue === 1 && (
                    <LichLamViec data={{ lichLamViec, selectedDate, setSelectedDate }} />
                )}
                {tabValue === 2 && (
                    <DanhSachDonHangDaXacNhan data={{nhanVien}}/>
                )}
            </Box>
            <Outlet />
        </>
    );
}
