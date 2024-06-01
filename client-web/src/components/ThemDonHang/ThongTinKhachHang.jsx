import { Autocomplete, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { apiDanhSachKhachHang } from '../../../utils/KhachHangUtil';

const ThongTinKhachHang = ({data}) => {
    const {khachHangData, setKhachHangData} = data;
    const [danhSachKhachHang, setDanhSachKhachHang] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const dsKhachHang = await apiDanhSachKhachHang();
                setDanhSachKhachHang(dsKhachHang.data.KhachHangs);
                dsKhachHang.data.KhachHangs.unshift({tenKhachHang: 'Thêm khách hàng mới'});
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);


    const handleChangeKhachHang = (e) => {
        setKhachHangData({
            ...khachHangData,
            [e.target.name]: e.target.value
        });
    }
    const handleChangeAutocompleteKhachHang = (event,value) => {
        setKhachHangData({
            ...khachHangData,
            id: value.id,
            tenKhachHang: value.tenKhachHang,
            soDienThoai: value.soDienThoai,
            email: value.email,
            danhSachDiaChi: value.danhSachDiaChi
        });
    }
    return (
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography variant="h6">Thông tin khách hàng</Typography>
        </Grid>
        <Grid item xs={12}>
                <Autocomplete
                    required
                    getOptionLabel={(option) => {
                        if (!option.tenKhachHang) {
                            return '';
                        }
                        return option.soDienThoai 
                            ? `Tên KH: ${option.tenKhachHang} - SĐT: ${option.soDienThoai}` 
                            : `${option.tenKhachHang}`;
                    }}
                    options={danhSachKhachHang}
                    value={khachHangData}
                    onChange={(event,value) => handleChangeAutocompleteKhachHang(event,value)}
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
        {khachHangData.tenKhachHang === 'Khách hàng mới' && (
            <>
             <Grid item xs={6}>
            <TextField
                fullWidth
                required
                autoFocus
                label="Tên khách hàng"
                name="tenKhachHang"
                variant="outlined"
                size="small"
                value={khachHangData.tenKhachHang === 'Khách hàng mới' ? '' : khachHangData.tenKhachHang}
                onChange={handleChangeKhachHang}
            />
        </Grid>
        <Grid item xs={6}>
            <TextField
                fullWidth
                required
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
                required
                label="Email"
                name="email"
                variant="outlined"
                size="small"
                value={khachHangData.email}
                onChange={handleChangeKhachHang}
            />
        </Grid>
            </>
        )}
    </Grid>
    );
};

export default ThongTinKhachHang;