import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { apiDanhSachDonHangTheoNhanVien } from '../../utils/DonHangUtils';
import { useNavigate } from 'react-router-dom';
import DonHangChoXacNhan from './DonHangChoXacNhan';
import { Box, Grid, Typography } from '@mui/material';

export default function XacNhanCongViec({ data }) {
  const { nhanVien } = data;
  const [danhSachDonHangTheoNhanVien, setDanhSachDonHangTheoNhanVien] = useState([]);
  useEffect(() => {
    const fetchDanhSachDonHangTheoNhanVien = async () => {
      const data = await apiDanhSachDonHangTheoNhanVien(nhanVien.id);
      setDanhSachDonHangTheoNhanVien(data);
      console.log(data);
    }
    if (nhanVien?.id) {
      fetchDanhSachDonHangTheoNhanVien();
    }
  }, [nhanVien?.id]);
  return (
    <>
      <Grid container spacing={2}>
        {danhSachDonHangTheoNhanVien.length === 0 ? (
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
          <>
            {danhSachDonHangTheoNhanVien.map((donHang, index) => (
              <Grid item xs={6}>
                <DonHangChoXacNhan donHang={donHang} />
              </Grid>
            ))}
          </>
        )}

      </Grid>
    </>
  )
}