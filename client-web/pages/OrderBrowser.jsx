// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  CircularProgress,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';

const DonHangLoader = async () => {
  const query = `query MyQuery {
    donHangs {
      id
      khachHang
      maDonHang
      ngayDatHang
      dichVu
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

  const res = await fetch('https://api-ap-southeast-2.hygraph.com/v2/clv4uoiq108fp07w7579676h9/master', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ query })
  });

  const data = await res.json();
  return data;
};

const NhanVienLoader = async () => {
  const query = `query MyQuery {
    nhanViens {
      id
      ten
      hinhAnh {
        id
      }
    }
  }`;

  const res = await fetch('https://api-ap-southeast-2.hygraph.com/v2/clv4uoiq108fp07w7579676h9/master', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({ query })
  });

  const data = await res.json();
  return data;
};

export default function OrderBrowser() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [nhanViens, setNhanViens] = useState([]);
  const [selectedNhanViens, setSelectedNhanViens] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseData = await DonHangLoader();
        setData(responseData.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching order data:', error);
        setLoading(false);
      }
    };

    fetchData();

    const fetchNhanViens = async () => {
      try {
        const responseData = await NhanVienLoader();
        setNhanViens(responseData.data.nhanViens);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchNhanViens();
  }, []);

  const handleDuyetDonHang = async (maDonHang) => {
    try {
      const donHang = data.donHangs.find((donHang) => donHang.maDonHang === maDonHang);
      if (donHang.trangThaiDonHang === 'Đã xác nhận') {
        console.error('Đơn hàng này đã được duyệt.');
        return;
      }

      if (!selectedNhanViens[maDonHang]) {
        console.error('Vui lòng chọn nhân viên cho đơn hàng này.');
        return;
      }

      console.log('Duyệt đơn hàng với mã:', maDonHang);
      console.log('Nhân viên được chọn:', selectedNhanViens[maDonHang]);

      // Cập nhật trạng thái đơn hàng thành "Đã xác nhận"
      const updatedData = {
        ...data,
        donHangs: data.donHangs.map((item) => {
          if (item.maDonHang === maDonHang) {
            return {
              ...item,
              trangThaiDonHang: 'Đã xác nhận'
            };
          }
          return item;
        })
      };
      setData(updatedData);
      setConfirmDialogOpen(true);
    } catch (error) {
      console.error('Lỗi khi duyệt đơn hàng:', error);
    }
  };

  const handleCloseConfirmDialog = () => {
    setConfirmDialogOpen(false);
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1 }}>
            Trang Chủ - Giúp việc nhà
          </Typography>
          <Button component={Link} to="/login" color="inherit">Đăng Nhập</Button>
          <Button component={Link} to="/register" color="inherit">Đăng Ký</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h5" sx={{ my: 4 }}>Quản Lý Xét Duyệt</Typography>
        {data && data.donHangs.map((donHang, index) => (
          <Card key={index} style={{ marginBottom: '20px' }}>
            <CardContent>
              <Typography variant="body1" gutterBottom>
                <strong>Khách hàng:</strong> {donHang.khachHang}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Mã đơn hàng:</strong> {donHang.maDonHang}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Ngày đặt hàng:</strong> {donHang.ngayDatHang}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Dịch vụ:</strong> {donHang.dichVu}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Nhân viên:</strong> {donHang.nhanVien}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Thanh toán:</strong> {donHang.thanhToan}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Thời gian thực hiện:</strong> {donHang.thoiGianThucHien.thoiGianBatDau} - {donHang.thoiGianThucHien.thoiGianKetThuc}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Trạng thái:</strong> {donHang.thoiGianThucHien.trangThai}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Tổng tiền:</strong> {donHang.tongTien}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Trạng thái đơn hàng:</strong> {donHang.trangThaiDonHang}
              </Typography>
              <Typography variant="body1" gutterBottom>
                <strong>Vật nuôi:</strong> {donHang.vatNuoi}
              </Typography>
              <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id={`nhan-vien-label-${index}`}>Chọn Nhân Viên</InputLabel>
                <Select
                  labelId={`nhan-vien-label-${index}`}
                  id={`nhan-vien-select-${index}`}
                  value={selectedNhanViens[donHang.maDonHang] || ''}
                  onChange={(e) => setSelectedNhanViens({ ...selectedNhanViens, [donHang.maDonHang]: e.target.value })}
                >
                  {nhanViens.map((nhanVien) => (
                    <MenuItem key={nhanVien.id} value={nhanVien.id}>
                      {nhanVien.ten}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handleDuyetDonHang(donHang.maDonHang)}
                disabled={donHang.trangThaiDonHang === 'Đã xác nhận'}
                style={{ marginTop: '10px' }}
              >
                Duyệt Đơn
              </Button>
            </CardContent>
          </Card>
        ))}
        <Dialog
          open={confirmDialogOpen}
          onClose={handleCloseConfirmDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Đã xác nhận đơn hàng!"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Đơn hàng đã được xác nhận thành công.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseConfirmDialog} autoFocus>
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </div>
  );
}
