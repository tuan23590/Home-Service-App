// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { AppBar, Toolbar, Typography, Container, Button, Menu, MenuItem, CircularProgress, Card, CardContent } from '@mui/material';

export default function OrderBrowser() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api-ap-southeast-2.hygraph.com/v2/clv4uoiq108fp07w7579676h9/master', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({
            query: `query MyQuery {
              donHangs {
                id
                maDonHang
                khachHang
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
            }`,
          }),
        });
        const responseData = await response.json();
        setData(responseData.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
              <Typography variant="h6">Đơn hàng: {donHang.maDonHang}</Typography>
              <Typography variant="body1"><strong>Khách hàng:</strong> {donHang.khachHang}</Typography>
              <Typography variant="body1"><strong>Ngày đặt hàng:</strong> {donHang.ngayDatHang}</Typography>
              <Typography variant="body1"><strong>Dịch vụ:</strong> {donHang.dichVu}</Typography>
              <Typography variant="body1"><strong>Nhân viên:</strong> {donHang.nhanVien}</Typography>
              <Typography variant="body1"><strong>Thanh toán:</strong> {donHang.thanhToan}</Typography>
              <Typography variant="body1"><strong>Thời gian bắt đầu:</strong> {donHang.thoiGianThucHien.thoiGianBatDau}</Typography>
              <Typography variant="body1"><strong>Thời gian kết thúc:</strong> {donHang.thoiGianThucHien.thoiGianKetThuc}</Typography>
              <Typography variant="body1"><strong>Trạng Thái:</strong> {donHang.thoiGianThucHien.trangThai}</Typography>
              <Typography variant="body1"><strong>Tổng tiền:</strong> {donHang.tongTien}</Typography>
              <Typography variant="body1"><strong>Trạng thái đơn hàng:</strong> {donHang.trangThaiDonHang}</Typography>
              <Typography variant="body1"><strong>Vật nuôi:</strong> {donHang.vatNuoi}</Typography>
              <Button variant="contained" color="primary" component={Link} to={`/order/${donHang.maDonHang}`} style={{ marginTop: '10px' }}>Xem Chi Tiết</Button>
            </CardContent>
          </Card>
        ))}
      </Container>
    </div>
  );
}
