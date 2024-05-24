// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Snackbar,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { apiDanhSachNhanVienNhanDonHang } from '../utils/NhanVienUtils';
import { Card, CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import { themNhanVienVaoDonHang } from '../utils/DonHangUtils';

export default function OrderAllocation() {
  const [selectedStatus, setSelectedStatus] = useState('Chờ duyệt');
  const [selectedOrder, setSelectedOrder] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [orders, setOrders] = useState([]);
  const [addEmployeeDialogOpen, setAddEmployeeDialogOpen] = useState(false);
  const [danhSachNhanVienNhanDonHang, setDanhSachNhanVienNhanDonHang] = useState([]);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);
  const [nhanVienDaChon, setNhanVienDaChon] = useState(null);


  const {data} = useLoaderData();

  useEffect(() => {
    if (data && data.DonHangs) {
      setOrders(data.DonHangs);
    }
  }, [data]);


  const handleSelectOrder = async (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
    const {data} = await apiDanhSachNhanVienNhanDonHang(order.id);
    setDanhSachNhanVienNhanDonHang(data.DanhSachNhanVienTrongViec);
  };

  const formatDate = (date) => {
    const options = { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

 

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
          <Typography variant="body2">Dịch vụ có thể thực hiện: {employee.dichVu.map(dv => dv.tenDichVu).join(', ')}</Typography>
          <Typography variant="body2">Ghi chú: {employee.ghiChu}</Typography>
          <Typography variant="body2">Đánh giá: {employee.danhGia}</Typography>
          <Typography variant="body2">Trạng thái hiện tại: {employee.trangThaiHienTai}</Typography>
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
    const data = await themNhanVienVaoDonHang(selectedOrder.id, [nhanVienDaChon]);
    console.log("Data: ",data);
  };
  const XoaDonHang = () => {

  };
  const filteredOrders = orders.filter(order => order?.trangThaiDonHang === selectedStatus);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/">
            Trang chủ
          </Typography>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" onClick={() => setSelectedStatus('Chờ duyệt')}>
              Chờ duyệt
            </Button>
            <Button color="inherit" onClick={() => setSelectedStatus('Đã phân bổ')}>
              Đã phân bổ
            </Button>
            <Button color="inherit" onClick={() => setSelectedStatus('Đang thực hiện')}>
              Đang thực hiện
            </Button>
            <Button color="inherit" onClick={() => setSelectedStatus('Đã hoàn thành')}>
              Đã hoàn thành
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Container>
        {['Chờ duyệt', 'Đã phân bổ', 'Đang thực hiện', 'Đã hoàn thành'].includes(selectedStatus) && (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <div style={{ padding: 20, border: '1px solid black', height: '92vh', overflow: 'auto' }}>
                <Typography variant="h5" gutterBottom>
                  Danh sách đơn hàng {selectedStatus}
                </Typography>
                <List>
                  {orders.map((order) => (
                    <ListItem button key={order.id} onClick={() => handleSelectOrder(order)}>
                      <ListItemText primary={`Đơn hàng:  ${order.maDonHang}`} />
                    </ListItem>
                  ))}
                </List>
              </div>
            </Grid>
            <Grid item xs={12} sm={8}>
              <Paper style={{ padding: 20, border: '1px solid black', height: '92vh', overflow: 'auto' }}>
                <Typography variant="h5" gutterBottom>
                  Thông tin đơn hàng
                </Typography>
                {selectedOrder && (
                  <div>
                    <Typography variant="body1" gutterBottom>
                      Mã đơn hàng: {selectedOrder.maDonHang}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Ngày đặt: {formatDate(selectedOrder.ngayDatHang)}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Địa chỉ: {[
                        selectedOrder.diaChi.soNhaTenDuong,
                        selectedOrder.diaChi.xaPhuong,
                        selectedOrder.diaChi.quanHuyen,
                        selectedOrder.diaChi.tinhTP,
                      ].join(', ')}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Ghi chú địa chỉ: {selectedOrder.diaChi.ghiChu}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                      Thông tin khách hàng:
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Tên khách hàng: {selectedOrder.khachHang.tenKhachHang}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Số điện thoại: {selectedOrder.khachHang.soDienThoai}
                    </Typography>
                   
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
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedOrder && Array.isArray(selectedOrder.danhSachDichVu) ? (
                            selectedOrder.danhSachDichVu.map((service, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  {service.tenDichVu} {service.loaiDichVu !== "DichVuThem" && "(Dịch vụ chính)"}
                                </TableCell>
                                <TableCell>
                                  {service.loaiDichVu === "DichVuThem" ? "Dịch vụ thêm" : 
                                  service.loaiDichVu === "CaLe" ? "Ca lẽ" : service.loaiDichVu}
                                </TableCell>
                                <TableCell>
                                  {service.loaiDichVu === "DichVuThem" && " + "}
                                  {service.gia === null ? `${service.thoiGian} Giờ` : `${service.gia.toLocaleString('vi-VN')} VNĐ`}
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
                    <Button variant="contained" onClick={XoaDonHang}>Xóa Đơn Hàng</Button>
                  </div>
                )}
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose} message={snackbarMessage} />
      <Dialog open={addEmployeeDialogOpen} onClose={() => setAddEmployeeDialogOpen(false)}>
        <DialogTitle>Chọn Cộng Tác Viên</DialogTitle>
        <DialogContent>
          <List>
            {/* {employees.map((employee) => (
              <ListItem key={employee.id} button onClick={() => handleEmployeeSelection(employee)}>
                <ListItemText primary={employee.ten} />
              </ListItem>
            ))} */}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddEmployeeDialogOpen(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
