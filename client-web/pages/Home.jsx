// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect  } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton,Divider, Typography, Container, Button, Menu, MenuItem, Card, CardContent, CardMedia, Grid, Box } from '@mui/material';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { getAuth } from 'firebase/auth';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'; // Import GoogleMap, LoadScript và Marker từ react-google-maps/api
import './Home.css';
import ThongTinTaiKhoan from '../src/components/ThongTinTaiKhoan';
import BotChat from '../src/components/BotChat';

export default function Home() {
  const [anchorElAboutUs, setAnchorElAboutUs] = useState(null);
  const [anchorElServices, setAnchorElServices] = useState(null);
  const [anchorElBecomePartner, setAnchorElBecomePartner] = useState(null);
  const [anchorElManage, setAnchorElManage] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  // eslint-disable-next-line no-unused-vars
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

 
  const renderCard = (index, image, title, description) => (
    <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
      <Card
        elevation={hoveredCard === index ? 8 : 1} 
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
      useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged(user => {
          if (user) {
            setIsLoggedIn(true);
            setCurrentUser(user);
          } else {
            setIsLoggedIn(false);
            setCurrentUser(null);
          }
        });

        return unsubscribe;
      }, []);

      const handleLogout = () => {
        const auth = getAuth();
        auth.signOut().then(() => {
          setIsLoggedIn(false);
          setCurrentUser(null);
        }).catch(error => {
          console.error('Error signing out:', error);
        });
      };
  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between', display: 'flex'}}>
          <IconButton component={Link} to="/" color="inherit">
          </IconButton>
          <div>
            
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
              <MenuItem component={Link} to="/gioithieu">Giới thiệu</MenuItem>
              <MenuItem component={Link} to="/lh">Liên hệ</MenuItem>
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
              <MenuItem component={Link} to="/tongvesinh">Tổng vệ sinh</MenuItem>
              <MenuItem component={Link} to="/dicho">Đi chợ</MenuItem>
              <MenuItem component={Link} to="/services/service4">Vệ sinh máy lạnh</MenuItem>
              <MenuItem component={Link} to="/services/service5">Giặt ủi</MenuItem>
              <MenuItem component={Link} to="/services/service6">Vệ sinh rèm nệm</MenuItem>
              <MenuItem component={Link} to="/services/service7">Dọn dẹp buồng phòng</MenuItem>
              <MenuItem component={Link} to="/services/service8">Nấu ăn gia đình</MenuItem>
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
              <MenuItem component={Link} to="/dangkynhanviec">Cộng tác viên giúp việc</MenuItem>
              <MenuItem component={Link} to="/dangkynauan">Cộng tác viên nấu ăn</MenuItem>
              <MenuItem component={Link} to="/">Cộng tác viên dọn dẹp buồng phòng</MenuItem>
              <MenuItem component={Link} to="/">Cộng tác viên giặt ủi</MenuItem>
            </Menu>

          </div>
                <ThongTinTaiKhoan/>
             

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
          <div className="each-slide">
            <img src="/Image/22.jpg" alt="Image 3" style={{ width: '100%' }} />
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
      <Divider />
      <LoadScript
        googleMapsApiKey="AIzaSyBWugvX95LUjtIpZif_CGjwKzOCFufBJtc"
      >
         <GoogleMap
          mapContainerStyle={{ height: '400px', width: '100%' }}
          center={{ lat: 10.8231, lng: 106.6297 }} 
          zoom={10}
        >
          <Marker position={{ lat: 10.8231, lng: 106.6297 }} /> 
        </GoogleMap>
      </LoadScript>
      {/* Kết thúc phần Google Map */}
      <Toolbar>
          <Typography variant="body1" sx={{ flexGrow: 1 }}>
            © 2024  TTCo., Ltd.
          </Typography>
          <Button color="inherit">Privacy Policy</Button>
          <Button color="inherit">Terms of Use</Button>
        </Toolbar>

        <Box sx={{position: 'fixed', bottom: '10vh', right: '10vw'}}>
          <BotChat/>
        </Box>
    </div>
  );
}
