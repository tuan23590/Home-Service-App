import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Divider, Paper, Typography, Box, Tooltip, IconButton, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { apiTuChoiDonHang, themNhanVienVaoDonHang } from '../../../utils/DonHangUtils';
import CloseIcon from '@mui/icons-material/Close';
import ThongTinDonHang from './ThongTinDonHang';
import ThongTinKhachHang from './ThongTinKhachHang';
import DanhSachNhanVienPhuHop from './DanhSachNhanVienPhuHop';

const ChiThietDonHangChoDuyet = () => {
  const data = useOutletContext();
  const setSnackbar = data.setSnackbar;
  const donHang = data.chonDonHang;
  const [nhanVienDaChon, setNhanVienDaChon] = useState(null);
  const navigate = useNavigate();

  const duyetDonHang = async () => {
    const { data } = await themNhanVienVaoDonHang(donHang.id, [nhanVienDaChon.id]);
    if (data.themNhanVienVaoDonHang !== null) {
      setSnackbar({ open: true, message: 'Duyệt đơn hàng thành công', severity: 'success' });
      navigate('../');
    } else {
      setSnackbar({ open: true, message: 'Duyệt đơn hàng thất bại', severity: 'error' });
    }
  };

  const TuChoiDonHang = async () => {
    const data = await apiTuChoiDonHang(donHang.id, lyDoTuChoi);
    if (data !== null) {
      setSnackbar({ open: true, message: 'Từ chối đơn hàng thành công', severity: 'success' });
      navigate('../');
    } else {
      setSnackbar({ open: true, message: 'Từ chối đơn hàng thất bại', severity: 'error' });
    }
  };
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
  const [open, setOpen] = useState(false);
  const [lyDoTuChoi, setLyDoTuChoi] = useState('');
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  }
  const handleKeyPress = (event) => {
    if (event.key == 'Enter') {
      setOpen(false);
      TuChoiDonHang();
    }
  };
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '5vh',
        left: '39vh',
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
          Duyệt đơn hàng
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


            <DanhSachNhanVienPhuHop data = {{nhanVienDaChon,setNhanVienDaChon,donHang}}/>

            <Divider sx={{ margin: '15px' }} />

            <Paper elevation={3} sx={{ padding: '20px', display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant='h5' sx={{ width: '50%' }}>Tổng tiền: {donHang.tongTien.toLocaleString('vi-VN')} VNĐ</Typography>
              <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '25%' }}>
                <Button variant="contained" color="success" onClick={duyetDonHang}>Duyệt Đơn Hàng</Button>
                <Button variant="contained" onClick={handleClickOpen}>Từ Chối Đơn Hàng</Button>
              </Box>
            </Paper>
          </Box>
        )}
      </Paper>

      <Box>
        <Dialog open={open} onClose={handleClose} disableRestoreFocus onKeyPress={handleKeyPress}>
          <DialogTitle>Từ chối đơn hàng</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Vui lòng nhập lý do từ chối đơn hàng:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              label="Lý do từ chối"
              type="text"
              fullWidth
              variant="standard"
              value={lyDoTuChoi}
              onChange={(e) => setLyDoTuChoi(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Hủy bỏ
            </Button>
            <Button onClick={TuChoiDonHang} color="primary">
              Xác nhận
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default ChiThietDonHangChoDuyet;