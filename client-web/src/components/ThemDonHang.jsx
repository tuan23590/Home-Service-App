import React, { useEffect, useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Select, MenuItem, FormControl, InputLabel, Autocomplete } from '@mui/material';
import { apiQuanHuyen, apiTinhTP, apiXaPhuong } from '../../utils/DiaChiUtil';

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
        tinhTp: null,
        quanHuyen: null,
        xaPhuong: null,
        soNhaTenDuong: '',
        ghiChu: ''
    });

    const [danhSachDichVuChinh, setDanhSachDichVuChinh] = useState(['Dịch vụ A', 'Dịch vụ B', 'Dịch vụ C']);
    const [danhSachTinhTp, setDanhSachTinhTp] = useState([]);
    const [danhSachQuanHuyen, setDanhSachQuanHuyen] = useState([]);
    const [danhSachXaPhuong, setDanhSachXaPhuong] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await apiTinhTP();
                setDanhSachTinhTp(data.DanhSachTinhTp)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            try {
               if(diaChiData.tinhTp?.code) {
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
                if(diaChiData.quanHuyen?.code) {
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
            }
            if (name === 'quanHuyen') {
                newData.xaPhuong = null;
                newData.soNhaTenDuong = '';
                newData.ghiChu = '';
            }
            if (name === 'xaPhuong') {
                newData.soNhaTenDuong = '';
                newData.ghiChu = '';
            }
            
            return newData;
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
                        <Autocomplete
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
