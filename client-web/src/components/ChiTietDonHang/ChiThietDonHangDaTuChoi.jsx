import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,TableContainer ,TableBody ,Table ,TableCell ,TableHead , TableRow ,Button, Divider, Paper, Typography, Box, Tooltip, IconButton, TextField, Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { apiTuChoiDonHang, themNhanVienVaoDonHang } from '../../../utils/DonHangUtils';
import CloseIcon from '@mui/icons-material/Close';
import ThongTinKhachHang from './ThongTinKhachHang';
import { EPOCHTODATE } from '../../function';

const ChiThietDonHangDaTuChoi = () => {
  const donHang = useLoaderData();
  const navigate = useNavigate();
  const HandelClose = () => {
    navigate('../');
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      HandelClose();
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '5vh',
        left: '39vh',
        backgroundColor: 'white',
      }}
    >
      <Box sx={{
        backgroundColor: '#000000',
        opacity: 0.8,
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Typography variant="h6" sx={{ color: 'white', paddingLeft: '10px' }}>
          Đơn hàng đã từ chối
        </Typography>
        <Tooltip title="Đóng" onClick={HandelClose} >
          <IconButton>
            <CloseIcon style={{ color: 'white' }} />
          </IconButton>
        </Tooltip>

      </Box>
      <Paper
        sx={{
          width: '155vh',
          height: '80vh',
          overflow: 'auto',
          padding: '20px',
        }}
      >
        {donHang && (
          <Box>
            <Paper elevation={3} sx={{ padding: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6'>Thông tin đơn hàng</Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Mã đơn hàng:</strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {donHang.maDonHang}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Thời gian bắt đầu: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {EPOCHTODATE(donHang.ngayBatDau)}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Tên dịch vụ: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {donHang.dichVuChinh?.tenDichVu}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Thời gian kết thúc: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {EPOCHTODATE(donHang.ngayKetThuc)}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Khối lượng CV: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {donHang.dichVuChinh?.khoiLuongCongViec}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Vật nuôi: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {donHang.vatNuoi}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Thời gian tạo đơn: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {EPOCHTODATE(donHang.ngayDatHang)}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Trạng thái ĐH: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {donHang.trangThaiDonHang}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Số giờ thực hiện: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {donHang.soGioThucHien} giờ
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Thành tiền: </strong>
            </Typography>
            <Typography color={'red'} sx={{ width: '80%' }}>
              <strong>{donHang.tongTien?.toLocaleString('vi-VN')} VNĐ</strong>
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Ghi chú ĐH: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {donHang.ghiChu}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
                  <Typography sx={{ width: '20%' }}>
                    <strong>Lý do từ chối DH:</strong>
                  </Typography>
                  <Typography sx={{ width: '80%' }}>
                    {donHang.lyDoTuChoi === null ? '' : donHang.lyDoTuChoi}
                  </Typography>
                </Grid>
        </Grid>

        <Divider sx={{ margin: '20px 0' }} />
        <Box display={'flex'} justifyContent={'space-between'} >
          <Box sx={{ width: '48%' }}>
            <Typography variant="h6" gutterBottom>
              Danh sách dịch vụ thêm
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên Dịch vụ</TableCell>
                    <TableCell>Biểu phí</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {donHang && Array.isArray(donHang.danhSachDichVu) ? (
                    donHang.danhSachDichVu?.map((service, index) => (
                      service.loaiDichVu === "DichVuThem" && (
                        <TableRow key={index}>
                          <TableCell>
                            {service?.tenDichVu}
                          </TableCell>
                          <TableCell>
                            {service.gia === null ? `+ ${service.thoiGian} Giờ` : `+ ${service.gia.toLocaleString('vi-VN')} VNĐ`}
                          </TableCell>
                        </TableRow>
                      )
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2}>Không có dịch vụ đã đặt</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
          <Box sx={{ width: '49.5%' }}>
            <Typography variant="h6" gutterBottom>
              Danh sách lịch thực hiện
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Thời gian bắt đầu</TableCell>
                    <TableCell>Thời gian kết thúc</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {donHang.danhSachLichThucHien?.map((schedule, index) => (
                    <TableRow key={index}>
                      <TableCell>{EPOCHTODATE(schedule.thoiGianBatDauLich)}</TableCell>
                      <TableCell>{EPOCHTODATE(schedule.thoiGianKetThucLich)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Paper>
            <Divider sx={{ margin: '15px' }} />

            <ThongTinKhachHang donHang={donHang}/>

            <Divider sx={{ margin: '15px' }} />
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ChiThietDonHangDaTuChoi;