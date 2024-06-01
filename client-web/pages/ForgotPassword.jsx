// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    const auth = getAuth();
    try {
      await sendPasswordResetEmail(auth, email);
      setMessage('Email để đặt lại mật khẩu đã được gửi.');
    } catch (error) {
      setMessage('Có lỗi xảy ra. Vui lòng thử lại sau.');
    }
  };

  return (
    <div className="container">
      <Typography variant="h6">Vui lòng nhập Email vào bên dưới</Typography>
      <div className="form">
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="TextField-root"
          fullWidth
          required
        />
      </div>
      <div className="button-group">
        <Button variant="contained" onClick={handleResetPassword} className="primary" sx={{ mt: 2, mb: 2 }}>Đặt lại mật khẩu</Button>
        <Typography className="message">{message}</Typography>
      </div>
      <Typography className="link" variant="body2">
        <Link to="/DangNhap">Quay lại đăng nhập</Link>
      </Typography>
    </div>
  );
};

export default ForgotPassword;
