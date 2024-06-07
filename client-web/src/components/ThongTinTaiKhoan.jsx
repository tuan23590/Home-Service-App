import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { Avatar, Box, Menu, MenuItem, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const ThongTinTaiKhoan = () => {
    const {user,nhanVien} = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const navigate = useNavigate();
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
    return (
        <>
        <Box sx={{display: 'flex'}} onClick={xuLyNhan}>
            <Avatar alt='Avatar' src={user?.photoURL}  sx={{width:'25px',height: '25px', marginRight: '5px'}}/>
            <Typography>{user?.displayName}</Typography>
        </Box>
        <Menu  
        id='basic-menu'
        anchorEl={anchorEl} 
        open={open} 
        onClose={xuLyDongMenu}>
            {nhanVien?.phanQuyen === 'Tasker' && (
                <MenuItem>
                    <Link style={{ textDecoration: 'none', color: '#000000'}}  to='/LichLamViec'>Lịch Làm Việc</Link>
                </MenuItem>
            )}
             {nhanVien?.phanQuyen === 'NVQL' && (
                <MenuItem>
                    <Link style={{ textDecoration: 'none', color: '#000000'}}  to='/QuanLyDonHang'>Quản lý đơn hàng</Link>
                </MenuItem>
            )}
            {!user?.uid ? (
                <MenuItem>
                    <Link style={{ textDecoration: 'none', color: '#000000'}}  to='/DangNhap'>Đăng Nhập</Link>
                </MenuItem>
            ):(
                <MenuItem onClick={xuLyDangXuat}>
                <Typography>Đăng xuất</Typography>
                </MenuItem>
            )}
           
        </Menu>
        </>
    );
};
export default ThongTinTaiKhoan;