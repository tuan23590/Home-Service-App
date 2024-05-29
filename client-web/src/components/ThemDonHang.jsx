import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

const ThemDonHang = () => {
    const [donHangData, setDonHangData] = useState({
        soGioThucHien: '',
        danhSachLichThucHien: [''],
        khachHang: '',
        dichVuChinh: '',
        danhSachDichVuThem: [''],
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
        tinhTp: '',
        quanHuyen: '',
        xaPhuong: '',
        soNhaTenDuong: '',
        ghiChu: ''
    });

    const dichVuChinhOptions = ['Dịch vụ A', 'Dịch vụ B', 'Dịch vụ C'];
    const tinhTpOptions = ['Thành phố Hồ Chí Minh', 'Hà Nội', 'Đà Nẵng'];
    const quanHuyenOptions = ['Quận 1', 'Quận 2', 'Quận 3'];
    const xaPhuongOptions = ['Phường 1', 'Phường 2', 'Phường 3'];

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

    const handleChangeDiaChi = (e) => {
        setDiaChiData({
            ...diaChiData,
            [e.target.name]: e.target.value
        });
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
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel>Dịch vụ chính</InputLabel>
                            <Select
                                name="dichVuChinh"
                                value={donHangData.dichVuChinh}
                                onChange={handleChangeDonHang}
                                label="Dịch vụ chính"
                            >
                                {dichVuChinhOptions.map((option, index) => (
                                    <MenuItem key={index} value={option}>{option}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            label="Danh sách dịch vụ thêm"
                            name="danhSachDichVuThem"
                            variant="outlined"
                            size="small"
                            value={donHangData.danhSachDichVuThem}
                            onChange={handleChangeDonHang}
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
                        <TextField
                            fullWidth
                            label="Ghi chú"
                            name="ghiChu"
                            variant="outlined"
                            size="small"
                            value={donHangData.ghiChu}
                            onChange={handleChangeDonHang}
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
                        <Typography variant="h6">Địa chỉ chi tiết</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel>Tỉnh/Thành phố</InputLabel>
                            <Select
                                name="tinhTp"
                                value={diaChiData.tinhTp}
                                onChange={handleChangeDiaChi}
                                label="Tỉnh/Thành phố"
                            >
                                {tinhTpOptions.map((option, index) => (
                                    <MenuItem key={index} value={option}>{option}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel>Quận/Huyện</InputLabel>
                            <Select
                                name="quanHuyen"
                                value={diaChiData.quanHuyen}
                                onChange={handleChangeDiaChi}
                                label="Quận/Huyện"
                            >
                                {quanHuyenOptions.map((option, index) => (
                                    <MenuItem key={index} value={option}>{option}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth variant="outlined" size="small">
                            <InputLabel>Xã/Phường</InputLabel>
                            <Select
                                name="xaPhuong"
                                value={diaChiData.xaPhuong}
                                onChange={handleChangeDiaChi}
                                label="Xã/Phường"
                            >
                                {xaPhuongOptions.map((option, index) => (
                                    <MenuItem key={index} value={option}>{option}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
