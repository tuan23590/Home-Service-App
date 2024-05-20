// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

const fetchData = async (query) => {
  const res = await fetch('https://api-ap-southeast-2.hygraph.com/v2/clv4uoiq108fp07w7579676h9/master', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ query })
  });

  const data = await res.json();
  if (data.errors) {
    throw new Error('Failed to fetch data');
  }
  return data.data;
};

const DonHangLoader = () => {
  const query = `query MyQuery {
    donHangs {
      id
      maDonHang
      makhachHang
      tenKhachHang
      diaChi
      soDienThoai
      ngayDatHang
      dichVus {
        id
        tenDichVu
        giaTien
        thoiGianBatDau
        thoiGianKetThuc
      }
      thoiLuongLamViec
      thu
      nhanVien
      thanhToan
      thoiGianThucHien {
        thoiGianBatDau
        thoiGianKetThuc
        trangThai
      }
      tongTien
      trangThaiDonHang
      vatNuoi
    }
  }`;

  return fetchData(query);
};

const NhanVienLoader = () => {
  const query = `query MyQuery {
    nhanViens {
      id
      ten
      hinhAnh {
        id
      }
    }
  }`;

  return fetchData(query);
};

export default function OrderAllocation() {
  const [selectedStatus, setSelectedStatus] = useState('Chờ duyệt');
  const [selectedOrder, setSelectedOrder] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [orders, setOrders] = useState([]);
  const [addEmployeeDialogOpen, setAddEmployeeDialogOpen] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await DonHangLoader();
        setOrders(data.donHangs);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchNhanViens = async () => {
      try {
        const data = await NhanVienLoader();
        setEmployees(data.nhanViens);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchNhanViens();
  }, []);

  const handleSelectOrder = (order) => {
    setSelectedOrder(order);
    setDialogOpen(true);
  };

  const formatDate = (date) => {
    const options = { hour: '2-digit', minute: '2-digit', year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Date(date).toLocaleDateString('en-GB', options);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleApproveService = (index) => {
    const updatedServices = [...selectedOrder.dichVus];
    updatedServices[index].isApproved = true;
    setSelectedOrder(prevState => ({
      ...prevState,
      dichVus: updatedServices
    }));
  };

  const handleAddEmployeeClick = (index) => {
    setSelectedServiceIndex(index);
    setAddEmployeeDialogOpen(true);
  };

  const handleEmployeeSelection = (employee) => {
    const updatedOrder = { ...selectedOrder };
    updatedOrder.dichVus[selectedServiceIndex].nhanVien = employee.ten;
    setSelectedOrder(updatedOrder);
    setAddEmployeeDialogOpen(false);
  };

  const handleOrderApproval = () => {
    const updatedOrders = orders.map(order => 
      order.id === selectedOrder.id ? { ...order, trangThaiDonHang: 'Đã phân bổ' } : order
    );
    setOrders(updatedOrders);
    setSelectedOrder(null);
    setDialogOpen(false);
    setSnackbarMessage('Đơn hàng đã được duyệt');
    setSnackbarOpen(true);
  };

  const filteredOrders = orders.filter(order => order.trangThaiDonHang === selectedStatus);

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
                  {filteredOrders.map((order) => (
                    <ListItem button key={order.id} onClick={() => handleSelectOrder(order)}>
                      <ListItemText primary={`Đơn hàng số ${order.maDonHang}`} />
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
                      Số đơn hàng: {selectedOrder.maDonHang}
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      Ngày đặt: {formatDate(selectedOrder.ngayDatHang)}
                    </Typography>
                    <Typography variant="h5" gutterBottom>
                      Thông tin khách hàng:
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Mã khách hàng: {selectedOrder.makhachHang}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Tên khách hàng: {selectedOrder.tenKhachHang}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Số điện thoại: {selectedOrder.soDienThoai}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Địa chỉ: {selectedOrder.diaChi}
                    </Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="h6" gutterBottom>
                      Dịch vụ đã đặt
                    </Typography>
                    <TableContainer component={Paper}>
                      <Table>
                        <TableHead>
                          <TableRow>
                            <TableCell>Duyệt</TableCell>
                            <TableCell>Mã Dịch vụ</TableCell>
                            <TableCell>Tên Dịch vụ</TableCell>
                            <TableCell>Thời Gian Bắt đầu</TableCell>
                            <TableCell>Thời Gian Kết Thúc</TableCell>
                            <TableCell>Giá tiền</TableCell>
                            <TableCell>Cộng tác viên</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {selectedOrder && Array.isArray(selectedOrder.dichVus) ? (
                            selectedOrder.dichVus.map((service, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  {service.isApproved ? (
                                    <span>Đã duyệt</span>
                                  ) : (
                                    <Button onClick={() => handleApproveService(index)}>Duyệt</Button>
                                  )}
                                </TableCell>
                                <TableCell>{service.id}</TableCell>
                                <TableCell>{service.tenDichVu}</TableCell>
                                <TableCell>{formatDate(service.thoiGianBatDau)}</TableCell>
                                <TableCell>{formatDate(service.thoiGianKetThuc)}</TableCell>
                                <TableCell>{service.giaTien}</TableCell>
                                <TableCell>
                                  {service.nhanVien ? (
                                    <Typography>{service.nhanVien}</Typography>
                                  ) : (
                                    <Button onClick={() => handleAddEmployeeClick(index)}>Thêm CTV</Button>
                                  )}
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
                    <Button onClick={handleOrderApproval}>Duyệt Đơn Hàng</Button>
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
            {employees.map((employee) => (
              <ListItem key={employee.id} button onClick={() => handleEmployeeSelection(employee)}>
                <ListItemText primary={employee.ten} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAddEmployeeDialogOpen(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
