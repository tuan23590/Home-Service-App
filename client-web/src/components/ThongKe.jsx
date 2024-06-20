import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, CircularProgress } from '@mui/material';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import RequestQuoteIcon from '@mui/icons-material/RequestQuote';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import BieuDoCot from './BieuDoCot';
import { apiThongKe } from './../../utils/ThongKeUtil';

export default function ThongKe() {
  const [dataThongKe, setDataThongKe] = useState({});
  const [isLoading, setIsLoading] = useState(true); // State để theo dõi trạng thái loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await apiThongKe();
        setDataThongKe(data);
        setIsLoading(false); // Khi fetch thành công, set isLoading về false
      } catch (error) {
        console.log(error);
        setIsLoading(false); // Xử lý lỗi cũng cần set isLoading về false
      }
    };
    fetchData();
  }, []);

  return (
    <Paper sx={{ width: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          width: '97.5%',
          borderRadius: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <CircularProgress sx={{ m: 2 }} />
            </Box>
        ) : (
          <>
            <Paper
              sx={{
                width: '30%',
                boxSizing: 'border-box',
                height: '150px',
                borderRadius: 3,
                padding: 2,
                margin: 2,
                borderColor: '#fce4ec',
              }}
            >
              <Typography>
                Tổng Số Đơn Hàng Mới {new Date().toLocaleString('default', { month: 'long' })}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4">
                  {dataThongKe?.thongKeThangHienTai?.soDonHangThangHienTai} ĐƠN HÀNG
                </Typography>
                <LocalOfferIcon sx={{ fontSize: '40px', color: '#4a148c' }} />
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography
                  sx={{ marginRight: '5px' }}
                  color={dataThongKe?.thongKeThangHienTai?.phanTramSoDonHang >= 0 ? 'green' : 'red'}
                >
                  <strong>
                    {dataThongKe?.thongKeThangHienTai?.phanTramSoDonHang >= 0 ? 'Tăng' : 'Giảm'}{' '}
                    {Math.abs(dataThongKe?.thongKeThangHienTai?.phanTramSoDonHang)}%
                  </strong>
                </Typography>
                <Typography>
                  So Với{' '}
                  {new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('default', {
                    month: 'long',
                  })}
                </Typography>
              </Box>
            </Paper>
            <Paper
              sx={{
                width: '30%',
                boxSizing: 'border-box',
                height: '150px',
                borderRadius: 3,
                padding: 2,
                margin: 2,
                borderColor: '#fce4ec',
              }}
            >
              <Typography>Tổng Doanh Thu {new Date().toLocaleString('default', { month: 'long' })}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4">
                  {dataThongKe?.thongKeThangHienTai?.tongTienThangHienTai.toLocaleString()} VNĐ
                </Typography>
                <RequestQuoteIcon sx={{ fontSize: '40px', color: '#00bfa5' }} />
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography
                  sx={{ marginRight: '5px' }}
                  color={dataThongKe?.thongKeThangHienTai?.phanTramTongTien >= 0 ? 'green' : 'red'}
                >
                  <strong>
                    {dataThongKe?.thongKeThangHienTai?.phanTramTongTien >= 0 ? 'Tăng' : 'Giảm'}{' '}
                    {Math.abs(dataThongKe?.thongKeThangHienTai?.phanTramTongTien)}%
                  </strong>
                </Typography>
                <Typography>
                  So Với{' '}
                  {new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('default', {
                    month: 'long',
                  })}
                </Typography>
              </Box>
            </Paper>
            <Paper
              sx={{
                width: '30%',
                boxSizing: 'border-box',
                height: '150px',
                borderRadius: 3,
                padding: 2,
                margin: 2,
                borderColor: '#fce4ec',
              }}
            >
              <Typography>Tổng Khách Hàng Đăng ký mới {new Date().toLocaleString('default', { month: 'long' })}</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4">{dataThongKe?.thongKeThangHienTai?.soKhachHangMoi} KHÁCH HÀNG</Typography>
                <AssignmentIndIcon sx={{ fontSize: '40px', color: '#ffb300' }} />
              </Box>
              <Box sx={{ display: 'flex' }}>
                <Typography
                  sx={{ marginRight: '5px' }}
                  color={dataThongKe?.thongKeThangHienTai?.phanTramSoKhachHang >= 0 ? 'green' : 'red'}
                >
                  <strong>
                    {dataThongKe?.thongKeThangHienTai?.phanTramSoKhachHang >= 0 ? 'Tăng' : 'Giảm'}{' '}
                    {Math.abs(dataThongKe?.thongKeThangHienTai?.phanTramSoKhachHang)}%
                  </strong>
                </Typography>
                <Typography>
                  So Với{' '}
                  {new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('default', {
                    month: 'long',
                  })}
                </Typography>
              </Box>
            </Paper>
            <Paper sx={{ width: '96%', boxSizing: 'border-box', borderColor: '#fce4ec' }}>
              <BieuDoCot value={{ dataThongKe }} />
            </Paper>
          </>
        )}
      </Box>
    </Paper>
  );
}
