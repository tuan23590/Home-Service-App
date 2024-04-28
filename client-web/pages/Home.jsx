import React from 'react';
import { Link } from 'react-router-dom';
// eslint-disable-next-line no-unused-vars
import { AppBar, Toolbar,IconButton, Typography, Container, Button, Menu, MenuItem, CircularProgress } from '@mui/material';
// import { useLoaderData } from 'react-router-dom'; 
import HomeIcon from '@mui/icons-material/Home';

export default function Home() {
  const [anchorElAboutUs, setAnchorElAboutUs] = React.useState(null);
  const [anchorElServices, setAnchorElServices] = React.useState(null);
  const [anchorElBecomePartner, setAnchorElBecomePartner] = React.useState(null); 
  const [anchorElManage, setAnchorElManage] = React.useState(null);


  const handleAboutUsClick = (event) => {
    setAnchorElAboutUs(event.currentTarget);
  };

  const handleServicesClick = (event) => {
    setAnchorElServices(event.currentTarget);
  };

  const handleBecomePartnerClick = (event) => { 
    setAnchorElBecomePartner(event.currentTarget);
  };

  const handleManageClick = (event) => {
    setAnchorElManage(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorElAboutUs(null);
    setAnchorElServices(null);
    setAnchorElBecomePartner(null); 
    setAnchorElManage(null);

  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between', display: 'flex'}}>
          <IconButton component={Link} to="/" color="inherit">
            <HomeIcon /> 
          </IconButton>
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
              <MenuItem component={Link} to="/manage/employees" onClick={handleClose}>Quản lý Nhân viên</MenuItem>
              <MenuItem component={Link} to="/manage/salary" onClick={handleClose}>Quản lý Lương</MenuItem>
              <MenuItem component={Link} to="/manage/statistics" onClick={handleClose}>Thống kê</MenuItem>
            </Menu>
            <Button
              aria-controls="menu-about-us"
              aria-haspopup="true"
              onClick={handleAboutUsClick}
              color="inherit"
              sx={{ '&:hover': { backgroundColor: 'transparent' } }}
            >
              Về chúng tôi
            </Button>
            <Menu
              id="menu-about-us"
              anchorEl={anchorElAboutUs}
              open={Boolean(anchorElAboutUs)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/about">Giới thiệu</MenuItem>
              <MenuItem component={Link} to="/press">Thông tin báo chí</MenuItem>
              <MenuItem component={Link} to="/contact">Liên hệ</MenuItem>
            </Menu>
            <Button
              aria-controls="menu-services"
              aria-haspopup="true"
              onClick={handleServicesClick}
              color="inherit"
              sx={{ '&:hover': { backgroundColor: 'transparent' } }}
            >
              Dịch Vụ
            </Button>
            <Menu
              id="menu-services"
              anchorEl={anchorElServices}
              open={Boolean(anchorElServices)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/services/service1">Dịch Vụ 1</MenuItem>
              <MenuItem component={Link} to="/services/service2">Dịch Vụ 2</MenuItem>
              <MenuItem component={Link} to="/services/service3">Dịch Vụ 3</MenuItem>
              <MenuItem component={Link} to="/services/service4">Dịch Vụ 4</MenuItem>
              <MenuItem component={Link} to="/services/service5">Dịch Vụ 5</MenuItem>
              <MenuItem component={Link} to="/services/service6">Dịch Vụ 6</MenuItem>
              <MenuItem component={Link} to="/services/service7">Dịch Vụ 7</MenuItem>
              <MenuItem component={Link} to="/services/service8">Dịch Vụ 8</MenuItem>
            </Menu>
          <Button
              aria-controls="menu-become-partner"
              aria-haspopup="true"
              onClick={handleBecomePartnerClick}
              color="inherit"
              sx={{ '&:hover': { backgroundColor: 'transparent' } }}
            >
              Trở thành đối tác
            </Button>
            <Menu
              id="menu-become-partner"
              anchorEl={anchorElBecomePartner}
              open={Boolean(anchorElBecomePartner)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/">Cộng tác viên giúp việc</MenuItem>
              <MenuItem component={Link} to="/">Cộng tác viên nấu ăn</MenuItem>
              <MenuItem component={Link} to="/">Cộng tác viên dọn dẹp buồng phòng</MenuItem>
              <MenuItem component={Link} to="/">Cộng tác viên giặt ủi</MenuItem>
            </Menu>
            </div>
          <div>
            <Button component={Link} to="/login" color="inherit">Đăng Nhập</Button>
            <Button component={Link} to="/" color="inherit">Đăng Ký</Button>
            
          </div>
        </Toolbar>
      </AppBar>
      <Container>
        { (
          <Typography variant="h2" sx={{ my: 4 }}>Chào mừng bạn đến với Trang Chủ</Typography>
        )}
      </Container>
    </div>
  );
}
