import { Grid, Paper, Typography } from '@mui/material';
import React from 'react';

const ThongTinKhachHang = ({donHang}) => {
    return (
        <Paper elevation={3} sx={{ padding: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">
              Thông tin khách hàng
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Tên khách hàng: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {donHang.khachHang.tenKhachHang}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Địa chỉ: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {[
                donHang.diaChi.soNhaTenDuong,
                donHang.diaChi.xaPhuong,
                donHang.diaChi.quanHuyen,
                donHang.diaChi.tinhTP,
              ].join(', ')}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Số điện thoại: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {donHang.khachHang.soDienThoai}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Ghi chú địa chỉ: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {donHang.diaChi.ghiChu}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Email: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {donHang.khachHang.email}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    );
};

export default ThongTinKhachHang;