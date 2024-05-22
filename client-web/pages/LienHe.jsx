// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Container, Paper, TextField, Button} from '@mui/material';
import { Link } from 'react-router-dom';
import './LienHe.css';

export default function ContactUs() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // handle form submission, e.g., send data to the server
    console.log('Form submitted', form);
    setForm({
      name: '',
      phone: '',
      email: '',
      message: ''
    });
  };

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
        <Paper className="contact-container">
          <Typography variant="h4" gutterBottom className="contact-heading">
            Liên hệ
          </Typography>
          <form className="contact-form" onSubmit={handleSubmit}>
            <TextField
              label="Họ tên"
              variant="outlined"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Số điện thoại"
              variant="outlined"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <TextField
              label="Thông tin góp ý kiến"
              variant="outlined"
              name="message"
              value={form.message}
              onChange={handleChange}
              multiline
              rows={4}
              required
            />
            <Button variant="contained" color="primary" type="submit">
              Gửi phản hồi
            </Button>
          </form>
          <div className="contact-info">
            <Typography variant="h6" gutterBottom>
              Email: support@ttgroup.com
            </Typography>
            <Typography variant="h6">
              Điện thoại: 1900.223.223
            </Typography>
          </div>
        </Paper>
      </Container>
    </div>
  );
}
