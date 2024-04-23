import React from 'react';
import { Link, Outlet, useLoaderData } from 'react-router-dom';
import { Button, Card, CardContent, Typography } from '@mui/material';

export default function Test() {
  const loader = useLoaderData();
  const donHangs = loader.data.donHangs;
  return (
    <div>
      <h2>Danh sách đơn hàng</h2>
      {donHangs.map((donHang, index) => (
        <Card key={index} style={{ marginBottom: '20px' }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Đơn hàng {donHang.maDonHang}
            </Typography>
            <Typography variant="body2" component="p">
              Trạng thái: {donHang.thoiGianThucHien.trangThai}
            </Typography>
            <Typography variant="body2" component="p">
              Tổng tiền: {donHang.tongTien}
            </Typography>
            <Typography variant="body2" component="p">
              Thanh toán: {donHang.thanhToan}
            </Typography>
            <Link
           to={{
            pathname: `DonHang/${donHang.maDonHang}`,
            state: { donHang }
          }}
            >Chi tiết</Link>
          </CardContent>
        </Card>
      ))}
      <Outlet dataText='Hello from ParentComponent!'/>
    </div>
  );
}
