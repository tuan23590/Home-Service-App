import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Tooltip, IconButton, Pagination, TextField, Input } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useOutletContext } from 'react-router-dom';
import { apiHuyDonHang } from '../../../utils/DonHangUtils';
import CloseIcon from '@mui/icons-material/Close';
import { apiNgungLichThucHien, apiTiepTucLichThucHien } from '../../../utils/LichThucHienUtils';
import ThongTinNhanVien from './ThongTinNhanVien';
import ThongTinKhachHang from './ThongTinKhachHang';
import DanhSachNhanVienPhuHop from './DanhSachNhanVienPhuHop';
import { apiThayDoiNhanVien } from '../../../utils/NhanVienUtils';

const ChiThietDonHangChoDuyet = () => {
  const data = useOutletContext();
  const setSnackbar = data.setSnackbar;
  const donHang = data.chonDonHang;
  const [nhanVienDaChon, setNhanVienDaChon] = useState(null);
  const navigate = useNavigate();
  

  const formatDateTimeToTime = (epochBatDau, epochKetThuc) => {
    const daysOfWeek = [
      'CN', 'T2', 'T3', 'T4',
      'T5', 'T6', 'T7'
    ];
  
    const formatTime = (date) => {
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    };
  
    const formatDate = (date) => {
      const dayOfWeek = daysOfWeek[date.getDay()];
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${dayOfWeek}, ${day}/${month}/${year}`;
    };
  
    const dateBatDau = new Date(epochBatDau * 1000);
    const dateKetThuc = new Date(epochKetThuc * 1000);
  
    const formattedDate = formatDate(dateBatDau);
    const formattedTimeBatDau = formatTime(dateBatDau);
    const formattedTimeKetThuc = formatTime(dateKetThuc);
  
    return `${formattedDate} - ${formattedTimeBatDau} đến ${formattedTimeKetThuc}`;
  };


  const formatDate = (epochTime) => {
    const daysOfWeek = [
      'CN', 'T2', 'T3', 'T4',
      'T5', 'T6', 'T7'
    ];
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
  const thayDoiNhanVien = async () => {
    const data = await apiThayDoiNhanVien(donHang.id, donHang.nhanVien[0].id, nhanVienDaChon.id);
    if(data === null){
      setSnackbar({ open: true, message: 'Thay đổi nhân viên thất bại', severity: 'error' });
    }else{
      setSnackbar({ open: true, message: 'Thay đổi nhân viên thành công', severity: 'success' });
      window.location.reload();
    }
  };
  const dungLichThucHien = async () => { 
    const data = await apiNgungLichThucHien(idLichNgung, lyDoDungLich);
    if (data !== null) {
      setSnackbar({ open: true, message: 'Ngưng lịch thực hiện thành công', severity: 'success' });
      window.location.reload();
    } else {
      setSnackbar({ open: true, message: 'Ngưng lịch thực hiện thất bại', severity: 'error' });
    }
  };
  const tiepTucLichThucHien = async (idLich) => {
    const data = await apiTiepTucLichThucHien(idLich);
    if (data !== null) {
      setSnackbar({ open: true, message: 'Tiếp tục lịch thực hiện thành công', severity: 'success' });
      window.location.reload();
    } else {
      setSnackbar({ open: true, message: 'Tiếp tục lịch thực hiện thất bại', severity: 'error' });
    }
  }
  const huyDonHang = async () => {
    const data = await apiHuyDonHang(donHang.id, lyDoHuyDonHang);
    if (data !== null) {
      setSnackbar({ open: true, message: 'Hủy đơn hàng thành công', severity: 'success' });
      navigate('../');
    } else {
      setSnackbar({ open: true, message: 'Hủy đơn hàng thất bại', severity: 'error' });
    }
  };
  const xyLyDongTrang = () => {
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
  const [trangThaiLyDoHuyDon, setTrangThaiLyDoHuyDon] = useState(false);
  const [trangThaiLyDoDungLich, setTrangThaiLyDoDungLich] = useState(false);
  const [trangThaiDoiNhanVien, setTrangThaiDoiNhanVien] = useState(false);
  const [lyDoHuyDonHang, setLyDoTuChoi] = useState('');
  const [lyDoDungLich, setLyDoDungLich] = useState('');
  const [idLichNgung, setIdLichNgung] = useState(null);
  const xyLyMoLyDoHuyDon = () => {
    setTrangThaiLyDoHuyDon(true);
  };

  const xuLyDongLyDoHuyDon = () => {
    setTrangThaiLyDoHuyDon(false);
  }
  const handleKeyPress = (event) => {
    if (event.key == 'Enter' && trangThaiLyDoHuyDon === true) {
      setTrangThaiLyDoHuyDon(false);
      huyDonHang();
    }else if (event.key == 'Enter' && trangThaiLyDoDungLich === true) {
      setTrangThaiLyDoDungLich(false);
      dungLichThucHien();
    }
  };
  const xuLyMoLyDoDungLich = (idLich) => {
    setTrangThaiLyDoDungLich(true);
    setIdLichNgung(idLich);
  }
  const xuLyDongLyDoDungLich = () => {
    setTrangThaiLyDoDungLich(false);
  }
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
        <Tooltip title="Đóng" onClick={xyLyDongTrang} >
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
              <strong>Thành tiền: </strong>
            </Typography>
            <Typography color={'red'} sx={{ width: '80%' }}>
              <strong>{donHang.tongTien.toLocaleString('vi-VN')} VNĐ</strong>
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
                          <TableCell>Thời gian thực hiện</TableCell>
                          <TableCell>Trạng thái</TableCell>
                          <TableCell>Ghi chú</TableCell>
                          <TableCell>Thao tác</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {donHang.danhSachLichThucHien.map((lichThucHien, index) => (
                          <TableRow key={index}>
                            <TableCell>{formatDateTimeToTime(lichThucHien.thoiGianBatDauLich,lichThucHien.thoiGianKetThucLich)}</TableCell>
                            <TableCell>{lichThucHien.trangThaiLich} </TableCell>
                            <TableCell>{lichThucHien.lyDoDungLich}</TableCell>
                            
                            <TableCell>
                                {lichThucHien.trangThaiLich === "Đã dừng lịch" ? (
                                  <Button
                                    size='small'
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => tiepTucLichThucHien(lichThucHien.id)}
                                  >
                                    Tiếp tục lịch
                                  </Button>
                                ) : (
                                  <Button
                                    size='small'
                                    variant="outlined"
                                    color="error"
                                    onClick={() => xuLyMoLyDoDungLich(lichThucHien.id)}
                                  >
                                    Dừng lịch
                                  </Button>
                                )}
                              </TableCell>


                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Box>
              </Box>
            </Paper>

            <Divider sx={{ margin: '15px' }} />

            <ThongTinKhachHang donHang={donHang} />

            <Divider sx={{ margin: '15px' }} />


            {trangThaiDoiNhanVien ? (
                <DanhSachNhanVienPhuHop data={{ nhanVienDaChon, setNhanVienDaChon, donHang }} />
            ) : (
                <ThongTinNhanVien nhanVienDaChon={donHang.nhanVien[0]} />
            )}

            <Divider sx={{ margin: '15px' }} />

            <Paper elevation={3} sx={{ padding: '20px', display: 'flex', justifyContent: 'flex-end' }}>

              {trangThaiDoiNhanVien ? (
                  <Box sx={{ display: 'flex', justifyContent: 'space-around'}}>
                    <Button variant="contained" color='success' sx={{marginInline: '20px'}} onClick={thayDoiNhanVien}>Thay đổi nhân viên</Button>
                    <Button variant="contained" color='error' onClick={()=>setTrangThaiDoiNhanVien(!trangThaiDoiNhanVien)}>Hủy Thay đổi nhân viên</Button>
                  </Box>
                ) : ( 
                <Box>
                  <Button variant="contained" color='success' sx={{marginInline: '20px'}}  onClick={()=>setTrangThaiDoiNhanVien(!trangThaiDoiNhanVien)}>Thay đổi nhân viên</Button>
                  <Button variant="contained" onClick={xyLyMoLyDoHuyDon}>hủy đơn hàng</Button>
                </Box>
                )
                }
               
            </Paper>
          </Box>
        )}
      </Paper>

      <Box>
        <Dialog open={trangThaiLyDoHuyDon} onClose={xuLyDongLyDoHuyDon} disableRestoreFocus onKeyPress={handleKeyPress}>
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
            <Button onClick={xuLyDongLyDoHuyDon} color="primary">
              Hủy bỏ
            </Button>
            <Button onClick={huyDonHang} color="primary">
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
        

        <Dialog open={trangThaiLyDoDungLich} onClose={xuLyDongLyDoDungLich} disableRestoreFocus onKeyPress={handleKeyPress}>
          <DialogTitle>Dừng lịch thực hiện</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Vui lòng nhập lý do dừng lịch thực hiện:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Lý do dừng lịch"
              type="text"
              fullWidth
              variant="standard"
              value={lyDoDungLich}
              onChange={(e) => setLyDoDungLich(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={xuLyDongLyDoDungLich} color="primary">
              Hủy bỏ
            </Button>
            <Button onClick={dungLichThucHien} color="primary">
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>


        <Box sx={{position: 'absolute', top: '15%',left: '15%',width: '70%'}}>
        {/* <Box sx={{
        backgroundColor: '#000000',
        opacity: 0.8,
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Typography variant="h6" sx={{ color: 'white', paddingLeft: '10px' }}>
          Duyệt đơn hàng
        </Typography>
        <Tooltip title="Đóng" onClick={HandelClose} >
          <IconButton>
            <CloseIcon style={{ color: 'white' }} />
          </IconButton>
        </Tooltip>
      </Box> */}
        <Outlet/>
        </Box>


      </Box>






    </Box>
  );
};

export default ChiThietDonHangChoDuyet;