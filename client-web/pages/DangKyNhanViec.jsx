// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { AppBar, Toolbar, Container, Typography, TextField, FormControl, InputLabel, Select, MenuItem, Button, Checkbox, FormControlLabel, Grid, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

const cities = ['TP HCM', 'Đà Nẵng', 'Hà Nội', 'Cần Thơ', 'Long An', 'Vĩnh Long'];

export default function JobApplication() {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [age, setAge] = useState('');
  const [city, setCity] = useState('');
  const [agreeContact, setAgreeContact] = useState(false);

  const handleSubmit = () => {
    // Xử lý việc đăng ký nhận việc ở đây
    console.log('Đã đăng ký nhận việc');
  };

  const handleAgreeContactChange = (event) => {
    setAgreeContact(event.target.checked);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1 }}>
            Trang Chủ - Giúp việc nhà
          </Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <Typography variant="h5" sx={{ fontFamily: 'Tahoma', fontWeight: 'bold', fontSize: 30, my: 4 }}>
          Trở thành đối tác Dọn dẹp nhà
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Họ và tên"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Số điện thoại"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
            margin="normal"
          />
          <TextField
            fullWidth
            label="Tuổi"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
            margin="normal"
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="city-label">Thành phố đăng ký</InputLabel>
            <Select
              labelId="city-label"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            >
              {cities.map((city, index) => (
                <MenuItem key={index} value={city}>
                  {city}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControlLabel
            control={<Checkbox checked={agreeContact} onChange={handleAgreeContactChange} />}
            label="Tôi đồng ý việc đại diện từ công ty liên lạc với tôi thông qua số điện thoại mà tôi đăng ký"
          />
          <Button type="submit" variant="contained" color="primary" disabled={!agreeContact}>
            Đăng ký nhận việc
          </Button>
        </form>
        <Grid container spacing={3} style={{ marginTop: '2rem' }}>
          <Grid item xs={12} md={4}>
            <img src="/Image/1.png" alt="Image 1" style={{ maxWidth: '100%' }} />
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Tahoma', fontWeight: 'bold', fontSize: 24 }}>
            Lau chùi, dọn dẹp nhà
            </Typography>
            <Typography variant="body2">
            Đội ngũ nhân viên dọn dẹp sẽ thực hiện các công việc lau chùi, sắp xếp đồ đạc, quét dọn nhà cửa cho bạn. Nhờ đó, mang lại cho bạn và gia đình một không gian sống trong lành, thoáng mát và sạch sẽ.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <img src="/Image/2.png" alt="Image 2" style={{ maxWidth: '100%' }} />
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Tahoma', fontWeight: 'bold', fontSize: 24 }}>
            Giặt giũ, ủi đồ
            </Typography>
            <Typography variant="body2">
            Nhằm giúp khách hàng có nhiều thời gian nghỉ ngơi, tận hưởng cuộc sống với gia đình, bạn bè, dịch vụ dọn dẹp nhà mang đến giải pháp giặt ủi quần áo, chăn mền,… giúp tiết kiệm thời gian hiệu quả, nhanh chóng.            </Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <img src="/Image/3.png" alt="Image 3" style={{ maxWidth: '100%' }} />
            <Typography variant="h6" gutterBottom sx={{ fontFamily: 'Tahoma', fontWeight: 'bold', fontSize: 24 }}>
            Nấu ăn
            </Typography>
            <Typography variant="body2">
            Với mong muốn san sẻ bớt những vất vả, khó khăn của người phụ nữ trong gia đình, dịch vụ dọn dẹp vệ sinh nhà cửa còn hỗ trợ thêm công việc nấu ăn hàng ngày. Bạn sẽ được tận hưởng không gian sống thoáng mát, sạch sẽ với những bữa cơm thơm ngon, hấp dẫn nhất.            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ my: 4 }} />
        <Typography variant="h5" sx={{ fontFamily: 'Tahoma', fontWeight: 'bold', fontSize: 30, my: 4 }}>
          Các bước đăng ký
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={3}>
            <Typography variant="h6" align="center" gutterBottom>Bước 1</Typography>
            <Typography variant="body1" align="center">Tải ứng dụng , hoàn thành bài kiểm tra tổng hợp về kiến thức liên quan đến công việc</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" align="center" gutterBottom>Bước 2</Typography>
            <Typography variant="body1" align="center">Nộp hồ sơ và phỏng vấn tại văn phòng</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" align="center" gutterBottom>Bước 3</Typography>
            <Typography variant="body1" align="center">Hoàn thành tốt lần thử việc đầu tiên</Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h6" align="center" gutterBottom>Bước 4</Typography>
            <Typography variant="body1" align="center">Trở thành đối tác của Công ty và bắt đầu nhận việc</Typography>
          </Grid>
        </Grid>
        <Typography variant="h5" sx={{ fontFamily: 'Tahoma', fontWeight: 'bold', fontSize: 30, my: 4 }}>
        Những điều cần thiết khi đăng ký        </Typography>
        <Grid container spacing={3} style={{ marginTop: '2rem' }}>
  <Grid item xs={10} md={6}>
    <Typography variant="h5" sx={{ fontFamily: 'Tahoma', fontWeight: 'bold', fontSize: 30, my: 4 }}>
      Yêu cầu chung
    </Typography>
    <ul>
      <li>Có điện thoại di động thông minh.</li>
      <li>Có phương tiện xe máy di chuyển.</li>
      <li>Có ít nhất 01 năm kinh nghiệm về dọn dẹp nhà.</li>
      <li>Ưu tiên ứng viên có kinh nghiệm làm người giúp việc lâu năm.</li>
    </ul>
  </Grid>
  <Grid item xs={12} md={6}>
    <Typography variant="h5" sx={{ fontFamily: 'Tahoma', fontWeight: 'bold', fontSize: 30, my: 4 }}>
      Hồ sơ yêu cầu
    </Typography>
    <ul>
      <li>01 bản photo công chứng Chứng minh nhân dân.</li>
      <li>01 bản photocopy công chứng Hộ khẩu.</li>
      <li>01 bản sơ yếu lí lịch có công chứng.</li>
      <li>01 giấy Xác Nhận Hạnh Kiểm tại Công An Phường hoặc giấy Lý Lịch Tư Pháp tại Sở Tư Pháp Thành Phố. (Các giấy tờ phải được chứng thực không quá 06 tháng)</li>
    </ul>
  </Grid>
</Grid>

      </Container>
      
    </div>
  );
}
