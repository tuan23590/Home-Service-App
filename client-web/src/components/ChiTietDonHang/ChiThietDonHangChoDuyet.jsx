import { Button, CardContent, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Tooltip, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { apiTuChoiDonHang, themNhanVienVaoDonHang } from '../../../utils/DonHangUtils';
import { apiDanhSachNhanVienNhanDonHang } from '../../../utils/NhanVienUtils';
import CloseIcon from '@mui/icons-material/Close';
const ChiThietDonHangChoDuyet = () => {
  const donHang = useOutletContext();
  const [danhSachNhanVienNhanDonHang, setDanhSachNhanVienNhanDonHang] = useState([]);
  const [nhanVienDaChon, setNhanVienDaChon] = useState(null);
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
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [donHang]);
  const duyetDonHang = async () => {
    const { data } = await themNhanVienVaoDonHang(donHang.id, [nhanVienDaChon]);
    if (data.themNhanVienVaoDonHang !== null) {
      alert('Duyệt đơn hàng thành công');
      navigate('../');
    } else {
      alert('Duyệt đơn hàng thất bại');
    }
  };
  const TuChoiDonHang = async () => {
    const confirmAction = window.confirm('Bạn có chắc chắn muốn từ chối đơn hàng không?');
    if (confirmAction) {
      const data = await apiTuChoiDonHang(donHang.id);
      if (data !== null) {
        alert('Từ chối đơn hàng thành công');
        navigate('../');
      }
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
          Duyệt đơn hàng
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
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {donHang.danhSachLichThucHien.map((schedule, index) => (
                        <TableRow key={index}>
                          <TableCell>{formatDate(schedule.thoiGianBatDauLich)}</TableCell>
                          <TableCell>{formatDate(schedule.thoiGianKetThucLich)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            </Box>
            <hr />
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
            <hr />
            <Box>
              <Typography variant="h5" gutterBottom>Danh sách nhân viên phù hợp</Typography>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Tên nhân viên</TableCell>
                      <TableCell>Giới tính</TableCell>
                      <TableCell>Ngày sinh</TableCell>
                      <TableCell>Số điện thoại</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>Chuyên môn</TableCell>
                      <TableCell>Ghi chú</TableCell>
                      <TableCell>Đánh giá</TableCell>
                      <TableCell>Trạng thái</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {danhSachNhanVienNhanDonHang.map((employee, index) => (
                      <TableRow key={index} onClick={() => setNhanVienDaChon(employee.id)} selected={nhanVienDaChon === employee.id}
                      >
                        <TableCell>{employee.tenNhanVien}</TableCell>
                        <TableCell>{employee.gioiTinh}</TableCell>
                        <TableCell>{employee.ngaySinh}</TableCell>
                        <TableCell>{employee.soDienThoai}</TableCell>
                        <TableCell>{employee.email}</TableCell>
                        <TableCell>{employee.dichVu.map(dv => dv.tenDichVu).join(', ')}</TableCell>
                        <TableCell>{employee.ghiChu}</TableCell>
                        <TableCell>{employee.danhGia}</TableCell>
                        <TableCell>{employee.trangThaiHienTai}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <hr />
            <Typography variant='h4' sx={{ width: '80%' }}>Tổng tiền: {donHang.tongTien.toLocaleString('vi-VN')} VNĐ</Typography>
            <Button variant="contained" color="success" onClick={duyetDonHang}>Duyệt Đơn Hàng</Button>
            <Button variant="contained" onClick={TuChoiDonHang}>Từ Chối Đơn Hàng</Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default ChiThietDonHangChoDuyet;