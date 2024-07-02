import { Autocomplete, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { apiDanhSachKhachHang } from '../../../utils/KhachHangUtils';

const ThongTinKhachHang = ({data}) => {
    const {khachHangData, setKhachHangData} = data;
    const [danhSachKhachHang, setDanhSachKhachHang] = useState([]);
    const [errors, setErrors] = useState({ email: '', soDienThoai: '' });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dsKhachHang = await apiDanhSachKhachHang();
                setDanhSachKhachHang(dsKhachHang);
                dsKhachHang.unshift({tenKhachHang: 'Thêm khách hàng mới'});
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePhoneNumber = (phoneNumber) => {
        const regex = /^(0|\+84)\d{9}$/;
        return regex.test(phoneNumber);
    };

    const handleChangeKhachHang = (e) => {
        const { name, value } = e.target;
        let newErrors = { ...errors };

        if (name === 'email' && !validateEmail(value)) {
            newErrors.email = 'Địa chỉ email không hợp lệ';
        } else {
            newErrors.email = '';
        }

        if (name === 'soDienThoai' && !validatePhoneNumber(value)) {
            newErrors.soDienThoai = 'Số điện thoại không hợp lệ';
        } else {
            newErrors.soDienThoai = '';
        }

        setErrors(newErrors);
        setKhachHangData({
            ...khachHangData,
            [name]: value
        });
    };

    const handleChangeAutocompleteKhachHang = (event, value) => {
        setKhachHangData({
            ...khachHangData,
            id: value.id,
            tenKhachHang: value.tenKhachHang,
            soDienThoai: value.soDienThoai,
            email: value.email,
            danhSachDiaChi: value.danhSachDiaChi
        });

        if (value.tenKhachHang === 'Thêm khách hàng mới') {
            setKhachHangData({
                ...khachHangData,
                id: null,
                tenKhachHang: '',
                soDienThoai: '',
                email: '',
                danhSachDiaChi: []
            });
        }
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Typography variant="h6">Thông tin khách hàng</Typography>
            </Grid>
            <Grid item xs={12}>
                <Autocomplete
                    required
                    getOptionLabel={(option) => {
                        if (option.id !== undefined) {
                            return `Tên KH: ${option.tenKhachHang} - SĐT: ${option.soDienThoai}`;
                        } else {
                            return `${option.tenKhachHang}`;
                        }
                    }}
                    options={danhSachKhachHang}
                    onChange={handleChangeAutocompleteKhachHang}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Danh sách khách hàng"
                            variant="outlined"
                            size="small"
                            fullWidth
                        />
                    )}
                />
            </Grid>
            <>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        required
                        disabled={khachHangData.id == null ? false : true}
                        value={khachHangData.tenKhachHang}
                        name="tenKhachHang"
                        variant="outlined"
                        size="small"
                        label="Tên khách hàng"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={handleChangeKhachHang}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        required
                        disabled={khachHangData.id == null ? false : true}
                        label="Số điện thoại"
                        name="soDienThoai"
                        variant="outlined"
                        size="small"
                        value={khachHangData.soDienThoai}
                        onChange={handleChangeKhachHang}
                        error={!!errors.soDienThoai}
                        helperText={errors.soDienThoai}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        required
                        disabled={khachHangData.id == null ? false : true}
                        label="Email"
                        name="email"
                        variant="outlined"
                        size="small"
                        value={khachHangData.email}
                        onChange={handleChangeKhachHang}
                        error={!!errors.email}
                        helperText={errors.email}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>
            </>
        </Grid>
    );
};

export default ThongTinKhachHang;
