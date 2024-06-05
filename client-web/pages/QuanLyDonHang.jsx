// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Grid,
  Box,
  List,
  Card,
  CardContent
} from '@mui/material';
import SideBarList from '../src/components/SideBarList';




export default function QuanLyDonHang() {
  return (
    <>
        <Grid container sx={{
            height: '98vh',
            backgroundColor: '#f5f5f5',
            }}>
    <Grid item xs={2} sx={{height: '99vh'}}>
         <SideBarList listItem={[
            {'link':'DanhSachDonHangChoDuyet','text':'Danh sách chờ duyệt'},
            {'link':'DanhSachDonHangDaDuyet','text':'Danh sách đã duyệt'},
            {'link':'DanhSachDonHangDaTuChoi','text':'Danh sách đã từ chối'},
            {'link':'ThemDonHang','text':'Thêm đơn hàng'},
            {'link':'QuanLyDichVu','text':'Quản lý dịch vụ'},
            {'link':'','text':'Quản lý người dùng'},
            ]} />
    </Grid>
    <Grid item xs={10} sx={{height: '101%', paddingTop: '15px',paddingRight: '15px'}}>
    <Outlet />
    </Grid>
    </Grid>
    
     
      
    </>
  );
}
