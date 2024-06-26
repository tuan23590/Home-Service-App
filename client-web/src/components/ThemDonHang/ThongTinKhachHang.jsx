import { Autocomplete, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { apiDanhSachKhachHang } from '../../../utils/KhachHangUtils';

const ThongTinKhachHang = ({data}) => {
    const {khachHangData, setKhachHangData} = data;
    const [danhSachKhachHang, setDanhSachKhachHang] = useState([]);
    // const addNewKhachHang = khachHangData.tenKhachHang === 'Thêm khách hàng mới';
    // console.log('addNewKhachHang', addNewKhachHang);
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
        if(value.tenKhachHang === 'Thêm khách hàng mới'){
            setKhachHangData({
                ...khachHangData,
                id: null,
                tenKhachHang: '',
                soDienThoai: '',
                email: '',
                danhSachDiaChi: []
            });
        }
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
                        if (option.id !== undefined) {
                            return `Tên KH: ${option.tenKhachHang} - SĐT: ${option.soDienThoai}`;
                        } else {
                            return `${option.tenKhachHang}`;
                        }
                    }}
                    options={danhSachKhachHang}
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
            <>
             <Grid item xs={6}>
            <TextField
                fullWidth

                required
                disabled = {khachHangData.id ==null ? false : true}
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
                disabled = {khachHangData.id ==null ? false : true}
                label="Số điện thoại"
                name="soDienThoai"
                variant="outlined"
                size="small"
                value={khachHangData.soDienThoai}
                onChange={handleChangeKhachHang}
                InputLabelProps={{
                    shrink: true,
                  }}
            />
        </Grid>
        <Grid item xs={6}>
            <TextField
                fullWidth
                required
                disabled = {khachHangData.id ==null ? false : true}
                label="Email"
                name="email"
                variant="outlined"
                size="small"
                value={khachHangData.email}
                onChange={handleChangeKhachHang}
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