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
        khachHang: '',
        ngayDatHang: '', // Thêm ngày đặt hàng
        dichVu: '', // Thêm dịch vụ
        nhanVien: '', // Thêm nhân viên
        thanhToan: '', // Thêm thanh toán
        thoiGianThucHien: '', // Thêm thời gian thực hiện
        trangThai: '', // Thêm trạng thái
        tongTien: '',
        trangThaiDonHang: '',
        vatNuoi: '',
        ghiChu: ''
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
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <TextField
                                name="maDonHang"
                                label="Mã đơn hàng"
                                value={formData.maDonHang}
                                onChange={handleChange}
                            />
                            <TextField
                                name="khachHang"
                                label="Khách hàng"
                                value={formData.khachHang}
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <TextField
                                name="ngayDatHang" 
                                label="Ngày đặt hàng"
                                value={formData.ngayDatHang}
                                onChange={handleChange} 
                                type="date"
                                InputLabelProps={{ shrink: true }} 
                            />
                            <FormControl>
                                <InputLabel id="dich-vu-label">Dịch vụ</InputLabel>
                                <Select
                                    labelId="dich-vu-label"
                                    id="dich-vu-select"
                                    name='dichVu'
                                    value={formData.dichVu}
                                    onChange={handleChange}
                                >
                                    {dichVus.map((dichVu) => (
                                        <MenuItem key={dichVu.tenDichVu} value={dichVu.tenDichVu}>
                                            {dichVu.tenDichVu}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <TextField
                                name="nhanVien" // Thêm nhân viên
                                label="Nhân viên" // Thêm nhân viên
                                value={formData.nhanVien} // Thêm nhân viên
                                onChange={handleChange} // Thêm nhân viên
                            />
                            <TextField
                                name="thanhToan" // Thêm thanh toán
                                label="Thanh toán" // Thêm thanh toán
                                value={formData.thanhToan} // Thêm thanh toán
                                onChange={handleChange} // Thêm thanh toán
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <TextField
                                name="thoiGianThucHien" // Thêm thời gian thực hiện
                                label="Thời gian thực hiện" // Thêm thời gian thực hiện
                                value={formData.thoiGianThucHien} // Thêm thời gian thực hiện
                                onChange={handleChange} // Thêm thời gian thực hiện
                                type="datetime-local" // Thêm thời gian thực hiện
                                InputLabelProps={{ shrink: true }} // Thêm thời gian thực hiện
                            />
                            <TextField
                                name="trangThai" // Thêm trạng thái
                                label="Trạng thái" // Thêm trạng thái
                                value={formData.trangThai} // Thêm trạng thái
                                onChange={handleChange} // Thêm trạng thái
                            />
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <TextField
                                name="tongTien"
                                label="Tổng tiền"
                                value={formData.tongTien}
                                onChange={handleChange}
                            />
                            <TextField
                                name="trangThaiDonHang"
                                label="Trạng thái đơn hàng"
                                value={formData.trangThaiDonHang}
                                onChange={handleChange}
                            />
                            <TextField
                                name="vatNuoi"
                                label="Vật nuôi"
                                value={formData.vatNuoi}
                                onChange={handleChange}
                            />
                            <TextField
                                name="ghiChu"
                                label="Ghi chú"
                                value={formData.ghiChu}
                                onChange={handleChange}
                            />
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Tạo đơn hàng
                            </Button>
                        </div>
                    </form>
                </div>
            </Container>
        </>
    );
}
