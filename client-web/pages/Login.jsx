// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { TextField, Button, Checkbox, FormControlLabel, Snackbar, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [userRole, setUserRole] = useState('');
  const [anchorElManage, setAnchorElManage] = useState(null); // State for management menu

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleManageClick = (event) => {
    setAnchorElManage(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElManage(null);
  };

  const TaiKhoanLoader = async () => {
    const query = `query MyQuery {
      taiKhoans {
        id
        taiKhoan
        matKhau
        phanQuyen
      }
    }`;

    const res = await fetch('https://api-ap-southeast-2.hygraph.com/v2/clv4uoiq108fp07w7579676h9/master', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ query })
    });

    const data = await res.json();
    return data;
  };

  const authenticateUser = async () => {
    try {
      const data = await TaiKhoanLoader();
      const taiKhoans = data.data.taiKhoans;
      
      const currentUser = taiKhoans.find(taiKhoan => taiKhoan.taiKhoan === username && taiKhoan.matKhau === password);

      if (currentUser) {
        return currentUser.phanQuyen;
      } else {
        throw new Error('Invalid credentials');
      }
    } catch (error) {
      console.error('Error authenticating user:', error);
      throw error;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const role = await authenticateUser();
      setUserRole(role);
      setSnackbarOpen(true);
      setSnackbarMessage('Đăng nhập thành công!');
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
      setSnackbarOpen(true);
      setSnackbarMessage('Đăng nhập thất bại. Vui lòng thử lại.');
    }
  };

  const handleRememberMeChange = () => {
    setRememberMe(!rememberMe);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const handleForgotPasswordClick = () => {
    console.log('Forgot password clicked');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ width: '300px' }}>
        <h2>Đăng Nhập</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <TextField
              id="username"
              label="Username"
              value={username}
              onChange={handleUsernameChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <TextField
              id="password"
              label="Password"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              variant="outlined"
              fullWidth
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={rememberMe}
                  onChange={handleRememberMeChange}
                  id="rememberMe"
                />
              }
              label="Remember me"
            />
          </div>
          <Button type="submit" variant="contained" fullWidth>Đăng Nhập</Button>
          <div>
            <Button
              variant="text"
              onClick={handleForgotPasswordClick}
              style={{ marginRight: '10px' }}
            >
              Quên Mật Khẩu
            </Button>
            <Button component={Link} to="/register" variant="text">Đăng Ký</Button>
          </div>
        </form>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          message={snackbarMessage}
        />
      </div>
      {userRole === 'Quản Lý' && (
        <div>
          <Button
            aria-controls="menu-manage"
            aria-haspopup="true"
            onClick={handleManageClick}
            color="inherit"
            sx={{ '&:hover': { backgroundColor: 'transparent' } }}
          >
            Quản lý
          </Button>
          <Menu
            id="menu-manage"
            anchorEl={anchorElManage}
            open={Boolean(anchorElManage)}
            onClose={handleClose}
          >
            <MenuItem component={Link} to="/order" onClick={handleClose}>Quản lý Xét Duyệt</MenuItem>
            <MenuItem component={Link} to="/themdonhang" onClick={handleClose}>Thêm Đơn Hàng</MenuItem>
            <MenuItem component={Link} to="/manage/salary" onClick={handleClose}>Quản lý Lương</MenuItem>
            <MenuItem component={Link} to="/manage/statistics" onClick={handleClose}>Thống kê</MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
};

export default Login;
