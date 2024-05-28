// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLoaderData, useNavigate } from 'react-router-dom';
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
  const data = useLoaderData(); 
  const navigate = useNavigate();


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
            {'link':'DanhSachDonHangDaHuy','text':'Danh sách đã hủy'},
            ]} />
    </Grid>
    <Grid item xs={10} sx={{height: '100%'}}>
    <Outlet />
    </Grid>
    </Grid>
    
     
      
    </>
  );
}
