import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, CardContent, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Tooltip, IconButton, Pagination, TextField, Input } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { apiHuyDonHang, apiTuChoiDonHang, themNhanVienVaoDonHang } from '../../../utils/DonHangUtils';
import { apiDanhSachNhanVienNhanDonHang } from '../../../utils/NhanVienUtils';
import CloseIcon from '@mui/icons-material/Close';

const ChiThietDonHangChoDuyet = () => {
  const data = useOutletContext();
  const setSnackbar = data.setSnackbar;
  const donHang = data.chonDonHang;

  console.log(donHang);
  const [danhSachNhanVienNhanDonHang, setDanhSachNhanVienNhanDonHang] = useState([]);
  const nhanVienDaChon = donHang.nhanVien[0];
  const navigate = useNavigate();

  const formatDate = (epochTime) => {
    const daysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    const date = new Date(epochTime * 1000);
    const dayOfWeek = daysOfWeek[date.getDay()];
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    const year = date.getFullYear();
    const formattedDateTime = `${dayOfWeek}, ${day}/${month}/${year} - ${hours}:${minutes}`;
    return formattedDateTime;
  };
  useEffect(() => {
    const fetchData = async () => {
      if (donHang && donHang.id) {
        try {
          const { data } = await apiDanhSachNhanVienNhanDonHang(donHang.id);
          setDanhSachNhanVienNhanDonHang(data.DanhSachNhanVienTrongViec);
          setNhanVienDaChon(data.DanhSachNhanVienTrongViec[0]);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
  }, [donHang]);


  console.log(donHang);
  const handleThayDoiNhanVien = async () => {
    // const { data } = await themNhanVienVaoDonHang(donHang.id, [nhanVienDaChon.id]);
    // if (data.themNhanVienVaoDonHang !== null) {
    //   setSnackbar({ open: true, message: 'Duyệt đơn hàng thành công', severity: 'success' });
    //   navigate('../');
    // } else {
    //   setSnackbar({ open: true, message: 'Duyệt đơn hàng thất bại', severity: 'error' });
    // }
    setSnackbar({ open: true, message: 'Thay đổi nhân viên thành công', severity: 'success' });
    window.location.reload();
  };

  const huyDonHang = async () => {
    const data = await apiHuyDonHang(donHang.id, lyDoHuyDonHang);
    if (data !== null) {
      setSnackbar({ open: true, message: 'Hủy đơn hàng thành công', severity: 'success' });
      navigate('../');
    } else {
      setSnackbar({ open: true, message: 'Hủy đơn hàng thất bại', severity: 'error' });
    }
  };






  const HandelClose = () => {
    navigate('../');
  }
  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      navigate('../');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const indexOfLastRow = page * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = danhSachNhanVienNhanDonHang.slice(indexOfFirstRow, indexOfLastRow);
  const [open, setOpen] = useState(false);
  const [lyDoHuyDonHang, setLyDoTuChoi] = useState('');
  const handleOpend = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }
  const handleKeyPress = (event) => {
    if (event.key == 'Enter') {
      setOpen(false);
      huyDonHang();
    }
  };

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
          Đơn hàng đã duyệt
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
                  <Typography variant='h5'>Thông tin đơn hàng</Typography>
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
                    {formatDate(donHang.ngayBatDau)}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex' }}>
                  <Typography sx={{ width: '20%' }}>
                    <strong>Tên dịch vụ: </strong>
                  </Typography>
                  <Typography sx={{ width: '80%' }}>
                    {donHang.danhSachDichVu[donHang.danhSachDichVu.length - 1].tenDichVu}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex' }}>
                  <Typography sx={{ width: '20%' }}>
                    <strong>Thời gian kết thúc: </strong>
                  </Typography>
                  <Typography sx={{ width: '80%' }}>
                    {formatDate(donHang.ngayKetThuc)}
                  </Typography>
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex' }}>
                  <Typography sx={{ width: '20%' }}>
                    <strong>Khối lượng CV: </strong>
                  </Typography>
                  <Typography sx={{ width: '80%' }}>
                    {donHang.danhSachDichVu[donHang.danhSachDichVu.length - 1].khoiLuongCongViec}
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
                    {formatDate(donHang.ngayDatHang)}
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
                    <strong>Tổng tiền: </strong>
                  </Typography>
                  <Typography sx={{ width: '80%' }}>
                    {donHang.tongTien.toLocaleString('vi-VN')} VNĐ
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
                          donHang.danhSachDichVu.map((service, index) => (
                            service.loaiDichVu === "DichVuThem" && (
                              <TableRow key={index}>
                                <TableCell>
                                  {service.tenDichVu}
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
                          <TableCell>Thao tác</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {donHang.danhSachLichThucHien.map((schedule, index) => (
                          <TableRow key={index}>
                            <TableCell>{formatDate(schedule.thoiGianBatDauLich)}</TableCell>
                            <TableCell>{formatDate(schedule.thoiGianKetThucLich)}</TableCell>
                            <TableCell><Button variant="outlined" color="error">Ngưng lịch</Button></TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </Paper>

            <Divider sx={{ margin: '15px' }} />

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

            <Divider sx={{ margin: '15px' }} />


            <Paper elevation={3} sx={{ padding: '20px'}}>
                <Typography variant="h5" gutterBottom>Thông tin nhân viên</Typography>
                
                <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Box
                    component="img"
                    sx={{
                      height: 200,
                      width: 180,
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
                        <Typography sx={{ width: '35%' }}>
                          <strong>CCCD: </strong>
                        </Typography>
                        <Typography sx={{ width: '65%' }}>
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
                        <Typography sx={{ width: '35%' }}>
                          <strong>Ghi chú: </strong>
                        </Typography>
                        <Typography sx={{ width: '65%' }}>
                          {nhanVienDaChon.ghiChu}
                        </Typography>
                      </Grid>
                      
                    </Grid>
                  )}
                </Box>
                </Box>
            </Paper>

            <Divider sx={{ margin: '15px' }} />

            <Paper elevation={3} sx={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='h5' sx={{ width: '50%' }}> </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '25%' }}>
                <Button variant="contained" color="success" onClick={handleThayDoiNhanVien}>Thay đổi nhân viên</Button>
                <Button variant="contained" onClick={handleOpend}>hủy đơn hàng</Button>
              </Box>
            </Paper>
          </Box>
        )}
      </Paper>

      <Box>
        <Dialog open={open} onClose={handleClose} disableRestoreFocus onKeyPress={handleKeyPress}>
          <DialogTitle>hủy đơn hàng</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Vui lòng nhập lý do hủy đơn hàng:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Lý do hủy đơn hàng"
              type="text"
              fullWidth
              variant="standard"
              value={lyDoHuyDonHang}
              onChange={(e) => setLyDoTuChoi(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Hủy bỏ
            </Button>
            <Button onClick={huyDonHang} color="primary">
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </Box>






    </Box>
  );
};

export default ChiThietDonHangChoDuyet;