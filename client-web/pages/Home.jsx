// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Container, Button, Menu, MenuItem, Card, CardContent, CardMedia, Grid } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

export default function Home() {
  const [anchorElAboutUs, setAnchorElAboutUs] = useState(null);
  const [anchorElServices, setAnchorElServices] = useState(null);
  const [anchorElBecomePartner, setAnchorElBecomePartner] = useState(null);
  const [anchorElManage, setAnchorElManage] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState('');
  const [hoveredCard, setHoveredCard] = useState(null);


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

  const handleLogout = () => { 
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const renderCard = (index, image, title, description) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
      <Card
        elevation={hoveredCard === index ? 8 : 1} // Nâng cao card lên khi hover
        onMouseEnter={() => setHoveredCard(index)}
        onMouseLeave={() => setHoveredCard(null)}
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          <Button component={Link} to="/learn-more" color="primary">
            Tìm hiểu thêm
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );

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
              <MenuItem component={Link} to="/dv1">Giúp việc theo giờ</MenuItem>
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
            {isLoggedIn ? (
              <div>
                <Typography variant="body1" sx={{ mr: 2 }}>Xin chào {currentUser}</Typography>
                <Button onClick={handleLogout} color="inherit">Đăng Xuất</Button>
              </div>
            ) : (
              <div>
                <Button component={Link} to="/login" color="inherit">Đăng Nhập</Button>
                <Button component={Link} to="/" color="inherit">Đăng Ký</Button>
              </div>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Container>
        <Slide
          duration={2000}   
          transitionDuration={1000} 
          indicators={true}
          arrows={false} 
          style={{ width: '100%', textAlign: 'center' }} 
        >
          <div className="each-slide">
            <img src="/Image/giupviecnha.jpg" alt="Image 1" style={{ width: '100%' }} />
          </div>
          <div className="each-slide">
            <img src="/Image/giupviecnha1.jpg" alt="Image 2" style={{ width: '100%' }} />
          </div>
        </Slide>
        <Typography variant="h5" sx={{ fontFamily: 'Tahoma', fontWeight: 'bold', fontSize: 24, my: 4 }}>
          Tất cả những tiện ích gia đình mà bạn cần
        </Typography>
        <Grid container spacing={2}>
          {renderCard(0, "/Image/giupviecnhatheogio.jpg", "Giúp việc nhà theo giờ", "Giờ đây công việc dọn dẹp không còn là nỗi bận tâm, bạn sẽ có nhiều thời gian nghỉ ngơi")}
          {renderCard(1, "/Image/tongvesinh.png", "Tổng vệ sinh", "Xử lý chuyên sâu vết bẩn trong căn nhà của bạn, giúp nhà bạn trở nên sạch sẽ và gọn gàng hơn")}
          {renderCard(2, "/Image/Dicho.png", "Đi chợ", "Việc mua sắm thực phẩm và đồ dùng gia đình trở nên tiện lợi hơn bao giờ hết. Giao hàng tận nơi chỉ sau 1h.")}
          {renderCard(3, "/Image/vesinhmaylanh.png", "Vệ sinh máy lạnh", "Giúp cải thiện chất lượng không khí, giảm mức tiêu thụ điện năng và tăng tuổi thọ máy lạnh tại nhà của bạn.")}
          {renderCard(4, "/Image/giatdo.png", "Giặt ủi", "Giúp bạn làm sạch quần áo nhanh chóng, cùng tiện ích giao nhận tận nơi.")}
          {renderCard(5, "/Image/dondepremnem.png", "Vệ sinh rèm nệm", "Đánh bay vết bẩn và mầm bệnh gây hại từ chính sofa, nệm hay rèm cửa nhà bạn.")}
          {renderCard(6, "/Image/dondepbuongphong.png", "Dọn dẹp buồng phòng", "Đánh bay vết bẩn và mầm bệnh gây hại từ chính buồng, phòng nhà bạn đang có.")}
          {renderCard(7, "/Image/nauangiadinh.png", "Nấu ăn gia đình", "Mang đến bữa ăn gia đình ấm áp , tròn vị ngon trong cuộc sống khi mà bạn quá bận rộn")}
        </Grid>
      </Container>
      <Toolbar>
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            © 2024 Your Company Name. All rights reserved.
          </Typography>
          <Button color="inherit">Privacy Policy</Button>
          <Button color="inherit">Terms of Use</Button>
        </Toolbar>
    </div>
  );
}
