import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';

const ThongTinNhanVien = ({nhanVienDaChon}) => {
    return (
        <Paper elevation={3} sx={{ padding: '20px'}}>
        <Typography variant="h5" gutterBottom>Thông tin nhân viên</Typography>
        
        <Box sx={{display: 'flex', justifyContent: 'space-around'}}>
        <Box
          component="img"
          sx={{
            height: 150,
            width: 150,
            borderRadius: '8px', // Làm cho góc bo tròn
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Thêm bóng đổ nhẹ
            border: '2px solid #ddd', // Thêm viền nhạt
            transition: 'transform 0.2s, box-shadow 0.2s', // Thêm hiệu ứng chuyển đổi khi di chuột
          }}
          alt="The house from the offer."
          src={nhanVienDaChon && nhanVienDaChon.anhDaiDien}
        />
        <Box>
          {nhanVienDaChon && (
            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ display: 'flex' }}>
                <Typography sx={{ width: '20%' }}>
                  <strong>Tên nhân viên: </strong>
                </Typography>
                <Typography sx={{ width: '80%' }}>
                  {nhanVienDaChon.tenNhanVien}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex' }}>
                <Typography sx={{ width: '20%' }}>
                  <strong>Giới tính: </strong>
                </Typography>
                <Typography sx={{ width: '80%' }}>
                  {nhanVienDaChon.gioiTinh}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex' }}>
                <Typography sx={{ width: '20%' }}>
                  <strong>CCCD: </strong>
                </Typography>
                <Typography sx={{ width: '80%' }}>
                  {nhanVienDaChon.cccd}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex' }}>
                <Typography sx={{ width: '20%' }}>
                  <strong>Ngày sinh: </strong>
                </Typography>
                <Typography sx={{ width: '80%' }}>
                  {nhanVienDaChon.ngaySinh}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex' }}>
                <Typography sx={{ width: '20%' }}>
                  <strong>Đánh giá: </strong>
                </Typography>
                <Typography sx={{ width: '80%' }}>
                  {nhanVienDaChon.danhGia}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex' }}>
                <Typography sx={{ width: '20%' }}>
                  <strong>Chuyên môn: </strong>
                </Typography>
                <Typography sx={{ width: '80%' }}>
                  {nhanVienDaChon.dichVu.map(dv => dv.tenDichVu).join(', ')}
                </Typography>
              </Grid>
              <Grid item xs={6} sx={{ display: 'flex' }}>
                <Typography sx={{ width: '20%' }}>
                  <strong>Ghi chú: </strong>
                </Typography>
                <Typography sx={{ width: '80%' }}>
                  {nhanVienDaChon.ghiChu}
                </Typography>
              </Grid>
              
            </Grid>
          )}
        </Box>
        </Box>
    </Paper>
    );
};

export default ThongTinNhanVien;