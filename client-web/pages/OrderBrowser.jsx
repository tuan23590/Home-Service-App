// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button
} from '@mui/material';

export default function OrderAllocation() {
  const [selectedStatus, setSelectedStatus] = useState('DanhSachDonHangChoDuyet');
  const data = useLoaderData(); 
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`./${selectedStatus}`);
  }, [selectedStatus]);
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/">
            Trang chủ
          </Typography>
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
            <Button color="inherit" onClick={() => setSelectedStatus('DanhSachDonHangChoDuyet')}>
              Chờ duyệt
            </Button>
            <Button color="inherit" onClick={() => setSelectedStatus('DanhSachDonHangDaDuyet')}>
              Đã Duyệt
            </Button>
            <Button color="inherit" onClick={() => setSelectedStatus('Đang thực hiện')}>
              Đang thực hiện
            </Button>
            <Button color="inherit" onClick={() => setSelectedStatus('Đã hoàn thành')}>
              Đã hoàn thành
            </Button>
            <Button color="inherit" onClick={() => setSelectedStatus('DanhSachDonHangDaTuChoi')}>
              Đã từ chối
            </Button>
          </div>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
}
