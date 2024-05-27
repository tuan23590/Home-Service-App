import { Button, CardContent, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Box, Tooltip, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { apiTuChoiDonHang, themNhanVienVaoDonHang } from '../../../utils/DonHangUtils';
import { apiDanhSachNhanVienNhanDonHang } from '../../../utils/NhanVienUtils';
import { styled } from '@mui/material/styles';
import { Card } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
const ChiThietDonHangChoDuyet = ({ open, handleClose, item }) => {
  const selectedOrder = useOutletContext();
  const [danhSachNhanVienNhanDonHang, setDanhSachNhanVienNhanDonHang] = useState([]);
  const [nhanVienDaChon, setNhanVienDaChon] = useState(null);
  const navigate = useNavigate();
  const formatDate = (epochTime) => {
    // Tạo một đối tượng Date từ thời gian Epoch (milliseconds)
    const date = new Date(epochTime * 1000);

    // Lấy thông tin về giờ, phút, ngày, tháng và năm từ đối tượng Date
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần cộng thêm 1
    const year = date.getFullYear();
    const formattedDateTime = `${hours}:${minutes} ${day}/${month}/${year}`;

    return formattedDateTime;
  };
  useEffect(() => {
    const fetchData = async () => {
      if (selectedOrder && selectedOrder.id) {
        try {
          const { data } = await apiDanhSachNhanVienNhanDonHang(selectedOrder.id);
          setDanhSachNhanVienNhanDonHang(data.DanhSachNhanVienTrongViec);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [selectedOrder]);
  const StyledCard = styled(Card)(({ selected }) => ({
    cursor: 'pointer',
    margin: '10px',
    border: selected ? '2px solid #3f51b5' : '1px solid #ccc',
    boxShadow: selected ? '0 0 10px rgba(63, 81, 181, 0.5)' : 'none',
  }));

  const EmployeeCard = ({ employee, onSelect, selected }) => {
    return (
      <StyledCard onClick={() => onSelect(employee.id)} selected={selected}>
        <CardContent>
          <Typography variant="h5">{employee.tenNhanVien}</Typography>
          <Typography variant="body2">Giới tính: {employee.gioiTinh}</Typography>
          <Typography variant="body2">Ngày sinh: {employee.ngaySinh}</Typography>
          <Typography variant="body2">Số điện thoại: {employee.soDienThoai}</Typography>
          <Typography variant="body2">Email: {employee.email}</Typography>
          <Typography variant="body2">Chuyên môn: {employee.dichVu.map(dv => dv.tenDichVu).join(', ')}</Typography>
          <Typography variant="body2">Ghi chú: {employee.ghiChu}</Typography>
          <Typography variant="body2">Đánh giá: {employee.danhGia}</Typography>
          <Typography variant="body2">Trạng thái: {employee.trangThaiHienTai}</Typography>
        </CardContent>
      </StyledCard>
    );
  };

  const EmployeeList = ({ employees, onSelect, selectedEmployeeId }) => {
    return (
      <Grid container>
        {employees.map((employee) => (
          <Grid item xs={12} sm={6} md={4} key={employee.id}>
            <EmployeeCard
              employee={employee}
              onSelect={onSelect}
              selected={employee.id === selectedEmployeeId}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  const duyetDonHang = async () => {
    const { data } = await themNhanVienVaoDonHang(selectedOrder.id, [nhanVienDaChon]);
    if (data.themNhanVienVaoDonHang !== null) {
      alert('Duyệt đơn hàng thành công');
      window.location.reload();
    } else {
      alert('Duyệt đơn hàng thất bại');
    }
  };
  const TuChoiDonHang = async () => {
    const confirmAction = window.confirm('Bạn có chắc chắn muốn từ chối đơn hàng không?');
    if (confirmAction) {
      const data = await apiTuChoiDonHang(selectedOrder.id);
      if (data !== null) {
        alert('Từ chối đơn hàng thành công');
        window.location.reload();
      }
    }
  };
  const HandelClose = () => {
    navigate('../');
  }
  return (
    <Box sx={{ position: 'absolute', top: '3vh', left: '38vh', backgroundColor: 'white' }}>
      <Box sx={{
        backgroundColor: '#000000',
        opacity: 0.8,
        padding: '5px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
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
          height: '83vh',
          overflow: 'auto',
          padding: '20px'
        }}
      >

        {selectedOrder && (
          <div>
            <Typography variant='h6'>Thông tin đơn hàng</Typography>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>
                  Mã đơn hàng: {selectedOrder.maDonHang}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  Thời gian tạo đơn: {formatDate(selectedOrder.ngayDatHang)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  Số giờ thực hiện: {selectedOrder.soGioThucHien} giờ
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  Thời gian bắt đầu: {formatDate(selectedOrder.ngayBatDau)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  Thời gian kết thúc: {formatDate(selectedOrder.ngayKetThuc)}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  Địa chỉ: {[
                    selectedOrder.diaChi.soNhaTenDuong,
                    selectedOrder.diaChi.xaPhuong,
                    selectedOrder.diaChi.quanHuyen,
                    selectedOrder.diaChi.tinhTP,
                  ].join(', ')}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  Ghi chú địa chỉ: {selectedOrder.diaChi.ghiChu}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  Vật nuôi: {selectedOrder.vatNuoi}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  Ghi chú đon hàng: {selectedOrder.ghiChu}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  Trạng thái đơn hàng: {selectedOrder.trangThaiDonHang}
                </Typography>
              </Grid>

            </Grid>
            <hr />


            <Typography variant="h6">
              Thông tin khách hàng:
            </Typography>
            <br />
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography>
                  Tên khách hàng: {selectedOrder.khachHang.tenKhachHang}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  Số điện thoại: {selectedOrder.khachHang.soDienThoai}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography>
                  Email: {selectedOrder.khachHang.email}
                </Typography>
              </Grid>
            </Grid>
            <Divider style={{ margin: '20px 0' }} />
            <Typography variant="h6" gutterBottom>
              Dịch vụ đã đặt
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên Dịch vụ</TableCell>
                    <TableCell>Loại Dịch Vụ</TableCell>
                    <TableCell>Giá tiền</TableCell>
                    <TableCell>Số lần lập lại</TableCell>
                    <TableCell>Thành tiền</TableCell>
                    <TableCell>Ghi chú</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedOrder && Array.isArray(selectedOrder.danhSachDichVu) ? (
                    selectedOrder.danhSachDichVu.map((service, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          {service.tenDichVu}

                        </TableCell>
                        <TableCell>
                          {service.loaiDichVu === "DichVuThem" ? "Dịch vụ thêm" :
                            service.loaiDichVu === "CaLe" ? "Dich vụ chính" : service.loaiDichVu}
                        </TableCell>
                        <TableCell>
                          {service.loaiDichVu === "DichVuThem" && " + "}
                          {service.gia === null ? `${service.thoiGian} Giờ` : `${service.gia.toLocaleString('vi-VN')} VNĐ`}
                        </TableCell>
                        <TableCell>
                          {selectedOrder && selectedOrder.danhSachLichThucHien ? selectedOrder.danhSachLichThucHien.length : 0} lần
                        </TableCell>
                        <TableCell>
                          {service.loaiDichVu === "DichVuThem" && " + "}
                          {selectedOrder && selectedOrder.danhSachLichThucHien ?
                            (selectedOrder.danhSachLichThucHien.length * (service.gia === null ? service.thoiGian : service.gia)).toLocaleString('vi-VN') +
                            (service.gia === null ? " giờ" : " VNĐ")
                            : "0"}
                        </TableCell>
                        <TableCell>
                          {service.loaiDichVu !== "DichVuThem" && "(Dịch vụ chính)"}
                          {service.loaiDichVu === "DichVuThem" && service.thoiGian && " (Đã cộng vào dịch vụ chính)"}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7}>Không có dịch vụ đã đặt</TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>




            <div>
              <Typography variant="h4" gutterBottom>Danh sách nhân viên</Typography>
              <EmployeeList
                employees={danhSachNhanVienNhanDonHang}
                onSelect={setNhanVienDaChon}
                selectedEmployeeId={nhanVienDaChon}
              />
            </div>




            <Typography>Tổng tiền: {selectedOrder.tongTien.toLocaleString('vi-VN')} VNĐ</Typography>
            <Button variant="contained" color="success" onClick={duyetDonHang}>Duyệt Đơn Hàng</Button>
            <Button variant="contained" onClick={TuChoiDonHang}>Từ Chối Đơn Hàng</Button>
          </div>
        )}
      </Paper>
    </Box>
  );
};

export default ChiThietDonHangChoDuyet;