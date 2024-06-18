import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Divider, Paper, Typography, Box, Tooltip, IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLoaderData, useNavigate, useOutletContext } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import ThongTinDonHang from './ChiTietDonHang/ThongTinDonHang';
import ThongTinKhachHang from './ChiTietDonHang/ThongTinKhachHang';
import { apiNhanVienTuChoiCongViec, apiNhanVienXacNhanCongViec } from '../../utils/DonHangUtils';

export default function XemChiTietDonHang() {
  const donHang = useLoaderData();
  const [open, setOpen] = useState(false);
  const [lyDoNhanVienTuChoiDonHang, setLyDoNhanVienTuChoiDonHang] = useState('');
  console.log(donHang);
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
  
    const xuLyXacNhanDon = async () => {
        const isConfirmed = window.confirm('Bạn có chắc chắn muốn xác nhận đơn hàng không?');
        if (isConfirmed) {
            const data = apiNhanVienXacNhanCongViec(donHang.id);
            if (data) {
                alert('Xác nhận đơn hàng thành công');
                navigate('../');
                window.location.reload();
            } else {
                alert('Xác nhận đơn hàng thất bại');
            }
        }
    };
    const xuLyTuChoiDon = () => {
        if (lyDoNhanVienTuChoiDonHang === '') {
            alert('Vui lòng nhập lý do từ chối đơn hàng');
            return;
        }
        const isConfirmed = window.confirm('Bạn có chắc chắn muốn từ chối đơn hàng không?');
        if (isConfirmed) {
            const data = apiNhanVienTuChoiCongViec(donHang.id, lyDoNhanVienTuChoiDonHang);
            if (data) {
                alert('Từ chối đơn hàng thành công');
                navigate('../');
                window.location.reload();
            } else {
                alert('Từ chối đơn hàng thất bại');
            }
        }
    };
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


            { donHang.trangThaiDonHang === 'Chờ xác nhận' && (
              <Paper elevation={3} sx={{ padding: '10px', display: 'flex', justifyContent: 'end' }}>
               {open ? (
                        <>
                            <TextField autoFocus sx={{ width: '50%' }} onChange={(event) => { setLyDoNhanVienTuChoiDonHang(event.target.value) }}></TextField>
                            <Button variant="contained" color='warning' sx={{ margin: '10px' }} onClick={xuLyTuChoiDon}>Xác nhận từ chối</Button>
                            <Button variant="contained" color='error' sx={{ margin: '10px' }} onClick={() => setOpen(false)}>Hủy</Button>
                        </>
                    ) : (
                        <>
                            <Button variant="contained" color="success" sx={{ margin: '10px' }} onClick={xuLyXacNhanDon}>Xác nhận đơn hàng</Button>
                            <Button variant="contained" color='warning' sx={{ margin: '10px' }} onClick={() => { setOpen(true) }}>Từ chối đơn hàng</Button>
                        </>
                    )}
            </Paper>
            )
            }
          </Box>
        )}
      </Paper>
    </Box>
  );
};

