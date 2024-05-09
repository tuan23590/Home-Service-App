// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { TextField, Button, InputLabel, Select, MenuItem, FormControl, Container, AppBar, Toolbar, Typography } from '@mui/material';
import { themDonHang } from '../utils/DonHangUtils';
import { DBDataDichVu } from '../utils/DichVuUtils';
import { Link } from 'react-router-dom';

export default function ThemDonHang() {
    const [dichVus, setDichVus] = useState([]);
    const [formData, setFormData] = useState({
        maDonHang: '',
        ngayDatHang: '',
        maKhachHang: '',
        tenKhachHang: '',
        soDienThoai: '',
        diaChi: '',
        tenDichVu: '',
        danhSachDichVu: [],
        thoiGian: '',
        ngayLamViec: '',
        giaTien: '',
        nhanVien: ''
    });
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };
    
    const handleSubmit = async () => {
        const data = await themDonHang(formData);
        console.log(data);
        alert('Đã thêm đơn hàng');
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await DBDataDichVu();
                setDichVus(data.dichVus);
            } catch (error) {
                console.error('Error fetching service data:', error);
            }
        };
        fetchData();
    }, []);
    
    return (
        <>
            <AppBar position="static">
                <Toolbar style={{ justifyContent: 'space-between' }}>
                    <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1 }}>
                        Trang Chủ - Giúp việc nhà
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
                        <TextField
                            name="maDonHang"
                            label="Mã đơn hàng"
                            value={formData.maDonHang}
                            onChange={handleChange}
                        />
                        <TextField
                            name="ngayDatHang" 
                            label="Ngày đặt hàng"
                            value={formData.ngayDatHang}
                            onChange={handleChange} 
                            type="date"
                            InputLabelProps={{ shrink: true }} 
                        />
                        <TextField
                            name="maKhachHang"
                            label="Mã khách hàng"
                            value={formData.maKhachHang}
                            onChange={handleChange}
                        />
                        <TextField
                            name="tenKhachHang"
                            label="Tên khách hàng"
                            value={formData.tenKhachHang}
                            onChange={handleChange}
                        />
                        <TextField
                            name="soDienThoai"
                            label="Số điện thoại"
                            value={formData.soDienThoai}
                            onChange={handleChange}
                        />
                        <TextField
                            name="diaChi"
                            label="Địa chỉ"
                            value={formData.diaChi}
                            onChange={handleChange}
                        />
                        <FormControl>
                            <InputLabel id="dich-vu-label">Tên dịch vụ</InputLabel>
                            <Select
                                labelId="dich-vu-label"
                                id="dich-vu-select"
                                name='tenDichVu'
                                value={formData.tenDichVu}
                                onChange={handleChange}
                            >
                                {dichVus.map((dichVu) => (
                                    <MenuItem key={dichVu.tenDichVu} value={dichVu.tenDichVu}>
                                        {dichVu.tenDichVu}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <TextField
                            name="thoiGian"
                            label="Thời gian"
                            value={formData.thoiGian}
                            onChange={handleChange}
                        />
                        <TextField
                            name="ngayLamViec"
                            label="Ngày làm việc"
                            value={formData.ngayLamViec}
                            onChange={handleChange}
                            type="date"
                            InputLabelProps={{ shrink: true }} 
                        />
                        <TextField
                            name="giaTien"
                            label="Giá tiền"
                            value={formData.giaTien}
                            onChange={handleChange}
                        />
                        <TextField
                            name="nhanVien"
                            label="Nhân viên"
                            value={formData.nhanVien}
                            onChange={handleChange}
                        />
                        <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Tạo đơn hàng
                        </Button>
                    </form>
                </div>
            </Container>
        </>
    );
}
