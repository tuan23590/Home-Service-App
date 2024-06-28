import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Avatar, Box, Menu, MenuItem, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import DehazeIcon from '@mui/icons-material/Dehaze';
import { apiCapNhatSoDienThoaiKhachHang } from '../../utils/KhachHangUtils';
import { IMAGE_SERVER } from '../../utils/constants';

const ThongTinTaiKhoan = () => {
    const { user, nhanVien, khachHang } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [soDienThoai, setSoDienThoai] = useState('');
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    useEffect(() => {
        if (khachHang && khachHang.soDienThoai === null) {
            setOpenDialog(true);
        }
    }, [khachHang]);

    const xuLyDangXuat = () => {
        user.auth.signOut();
        navigate('/DangNhap');
    }
    const xuLyDongMenu = () => {
        setAnchorEl(null);
    }
    const xuLyNhan = (event) => {
        setAnchorEl(event.currentTarget);
    }
    const xuLyDongDialog = () => {
        setOpenDialog(false);
    }
    const xuLyLuuSoDienThoai = async () => {
        const data = await apiCapNhatSoDienThoaiKhachHang(khachHang.id, soDienThoai);
        console.log(data);
        if (data) {
            alert('Cập nhật số điện thoại thành công');
        }
        xuLyDongDialog();
    }

    return (
        <>
            <Box sx={{ display: 'flex' }} onClick={xuLyNhan}>
                <Avatar alt='Avatar' src={user?.photoURL||`${IMAGE_SERVER}${nhanVien?.anhDaiDien}`} sx={{ width: '25px', height: '25px', marginRight: '5px' }} />
                <Typography>{user?.displayName||nhanVien?.tenNhanVien||khachHang?.TenKhachHang}</Typography>
                <DehazeIcon sx={{ marginLeft: '20px' }} />
            </Box>
            <Menu
                id='basic-menu'
                anchorEl={anchorEl}
                open={open}
                onClose={xuLyDongMenu}>
                <MenuItem>
                    <Link style={{ textDecoration: 'none', color: '#000000', padding: '5px' }} to='/'>Trang chủ</Link>
                </MenuItem>
                {khachHang && (
                    <MenuItem>
                        <Link style={{ textDecoration: 'none', color: '#000000', padding: '5px' }} to='/TraCuuDonHang'>Tra cứu đơn hàng</Link>
                    </MenuItem>
                )}
                {nhanVien?.phanQuyen === 'Tasker' && (
                    <MenuItem>
                        <Link style={{ textDecoration: 'none', color: '#000000', padding: '5px' }} to='/ThongTinCongViec'>Lịch Làm Việc</Link>
                    </MenuItem>
                )}
                {nhanVien?.phanQuyen === 'NVCSKH' && (
                    <MenuItem>
                        <Link style={{ textDecoration: 'none', color: '#000000', padding: '5px' }} to='/QuanLy'>Quản lý đơn hàng</Link>
                    </MenuItem>
                )}{nhanVien?.phanQuyen === 'Admin' && (
                    <MenuItem>
                        <Link style={{ textDecoration: 'none', color: '#000000', padding: '5px' }} to='/QuanLy'>Quản lý hệ thống</Link>
                    </MenuItem>
                )}
                {!user?.uid ? (
                    <MenuItem>
                        <Link style={{ textDecoration: 'none', color: '#000000', padding: '5px' }} to='/DangNhap'>Đăng Nhập</Link>
                    </MenuItem>
                ) : (
                    <MenuItem onClick={xuLyDangXuat}>
                        <Typography>Đăng xuất</Typography>
                    </MenuItem>
                )}
            </Menu>

            <Dialog open={openDialog}>
                <DialogTitle>Bạn là người dùng mới</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Vui lòng nhập số điện thoại của bạn để hoàn tất đăng ký
                    </DialogContentText>
                    <TextField
    autoFocus
    margin="dense"
    id="soDienThoai"
    label="Số điện thoại"
    type="number"
    fullWidth
    variant="standard"
    value={soDienThoai}
    onChange={(e) => setSoDienThoai(e.target.value)}
    InputProps={{
        inputProps: { 
            style: { 
                MozAppearance: 'textfield'
            } 
        },
        sx: {
            '& input[type=number]': {
                MozAppearance: 'textfield', // Firefox
                '&::-webkit-outer-spin-button': {
                    WebkitAppearance: 'none',
                    margin: 0,
                },
                '&::-webkit-inner-spin-button': {
                    WebkitAppearance: 'none',
                    margin: 0,
                }
            }
        }
    }}
/>

                </DialogContent>
                <DialogActions>
                    <Button onClick={xuLyLuuSoDienThoai}>Lưu</Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ThongTinTaiKhoan;
