import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { apiDanhSachDonHangChoXacNhanTheoNhanVien } from '../../utils/DonHangUtils';
import { Box, Grid, Typography } from '@mui/material';
import DSDonHangThuGon from './LichLamViec/DSDonHangThuGon';

export default function XacNhanCongViec({ data }) {
  const { nhanVien } = data;
  const [danhSachDonHang, setDanhSachLichLamViec] = useState([]);
  useEffect(() => {
    const fetchDanhSachDonHangChoXacNhanTheoNhanVien = async () => {
      const data = await apiDanhSachDonHangChoXacNhanTheoNhanVien(nhanVien.id);
      setDanhSachLichLamViec(data);
    }
    if (nhanVien?.id) {
      fetchDanhSachDonHangChoXacNhanTheoNhanVien();
    }
  }, [nhanVien?.id]);
  return (
    <>
      <Grid container spacing={2}>
        {danhSachDonHang.length === 0 ? (
          <>
            <Box sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '50vh',
              width: '100%',
            }}>
              <Typography

                variant='h4'
              >Không có đơn hàng</Typography>
            </Box>
          </>
        ) : (
          <Box sx={{marginTop: '20px'}}>
            <Typography variant="h4" align="center" sx={{paddingBottom: '15px'}}>Danh sách đơn hàng chờ xác nhận</Typography>
            <Box sx={{marginLeft: "15px"}}>
            <DSDonHangThuGon data={{danhSachDonHang}}/>
            </Box>
          </Box>
        )}

      </Grid>
    </>
  )
}