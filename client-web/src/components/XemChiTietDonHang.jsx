import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Divider, Paper, Typography, Box, Tooltip, IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useOutletContext } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import ThongTinDonHang from './ChiTietDonHang/ThongTinDonHang';
import ThongTinKhachHang from './ChiTietDonHang/ThongTinKhachHang';

export default function XemChiTietDonHang() {
  const donHang = useLoaderData();
  const navigate = useNavigate();
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
        left: '20vh',
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
          Chi tiết đơn hàng
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
            <ThongTinDonHang donHang={donHang} />

            <Divider sx={{ margin: '15px' }} />

            <ThongTinKhachHang donHang={donHang}/>

            <Divider sx={{ margin: '15px' }} />


            <Paper elevation={3} sx={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='h5' sx={{ width: '50%' }}>Tổng tiền: {donHang.tongTien.toLocaleString('vi-VN')} VNĐ</Typography>
            </Paper>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

