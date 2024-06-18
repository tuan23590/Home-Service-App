import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { apiDanhSachDonHangDaXacNhanTheoNhanVien } from '../../utils/DonHangUtils';
import { Box, Grid, Typography } from '@mui/material';
import DSLamViecThuGon from './LichLamViec/DSDonHangThuGon';

export default function DanhSachDonHangDaXacNhan({ data }) {
  const { nhanVien } = data;
  const [danhSachDonHang, setDanhSachDonHang] = useState([]);
  useEffect(() => {
    const fetchDanhSachDonHangDaXacNhanTheoNhanVien = async () => {
      const data = await apiDanhSachDonHangDaXacNhanTheoNhanVien(nhanVien.id);
      setDanhSachDonHang(data);
    }
    if (nhanVien?.id) {
      fetchDanhSachDonHangDaXacNhanTheoNhanVien();
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
            <Typography variant="h4" align="center" sx={{paddingBottom: '15px'}}>Danh sách đơn hàng đã xác nhận</Typography>
            <Box sx={{marginLeft: "15px"}}>
            <DSLamViecThuGon data={{danhSachDonHang}}/>
            </Box>
          </Box>
        )}

      </Grid>
    </>
  )
}