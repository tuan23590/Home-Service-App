// eslint-disable-next-line no-unused-vars
import React from 'react';
import { AppBar, Toolbar, Typography, Container, Paper, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import './GioiThieu.css';

export default function AboutUs() {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component={Link} to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            Trang chủ
          </Typography>
        
        </Toolbar>
      </AppBar>
      <Container>
        <Paper style={{ padding: 20, marginTop: 20 }}>
          <Typography variant="h4" gutterBottom>
            Giới thiệu về chúng tôi
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <img src="/Image/btaskee-luon-san-sang-ho-tro-ban.png" alt="About Us" style={{ width: '100%', borderRadius: '8px' }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" paragraph>
                Chúng tôi là TTGroup
                Công ty TNHH được thành lập vào ngày 30 tháng 03 năm 2016 bởi CEO – Founder Nathan Do (Trần Văn T).
                TTGroup là doanh nghiệp tiên phong trong việc ứng dụng công nghệ vào ngành giúp việc nhà ở Việt Nam. Chúng tôi cung cấp đa dịch vụ tiện ích như: dọn dẹp nhà, vệ sinh máy lạnh, đi chợ, … tại Đông Nam Á. Thông qua ứng dụng đặt lịch dành cho khách hàng TTgroup và ứng dụng nhận việc của cộng tác viên TTgroup Partner, khách hàng và cộng tác viên có thể chủ động đăng và nhận việc trực tiếp trên ứng dụng.
              </Typography>
              <Typography variant="body1" paragraph>
                Sứ mệnh của chúng tôi là đem đến những giá trị tốt nhất cho khách hàng thông qua các dịch vụ chuyên nghiệp và tận tâm. Chúng tôi luôn lắng nghe và hiểu rõ nhu cầu của từng khách hàng để đưa ra giải pháp phù hợp nhất.
              </Typography>
              <Typography variant="body1" paragraph>
                Đội ngũ nhân viên của chúng tôi được đào tạo bài bản và giàu kinh nghiệm, luôn sẵn sàng phục vụ quý khách với thái độ nhiệt tình và chuyên nghiệp. Chúng tôi tin rằng, với sự nỗ lực không ngừng, chúng tôi sẽ ngày càng hoàn thiện và phát triển để đáp ứng mọi yêu cầu của khách hàng.
              </Typography>
              <Typography variant="body1" paragraph>
                Cảm ơn quý khách đã tin tưởng và sử dụng dịch vụ của chúng tôi. Chúng tôi mong muốn được đồng hành cùng quý khách trong những dự án sắp tới.
              </Typography>
              <Typography variant="body1" paragraph>
                Phát triển nhiều hơn nữa
                Tại Việt Nam, tính đến nay, TTgroup đã giúp hơn 7000 người giúp việc có thu nhập ổn định và đáp ứng nhu cầu chăm sóc nhà cửa cho hơn 350,000 khách hàng. Với mục tiêu mang đến cho khách hàng những trải nghiệm dịch vụ tốt nhất, TTgroup không ngừng cải thiện chất lượng dịch vụ, ứng dụng.
              </Typography>
              
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </div>
  );
}
