// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './DangNhap.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const auth = getAuth();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Vui lòng điền thông tin tài khoản');
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        setError('Email không hợp lệ');
      } else if (error.code === 'auth/wrong-password') {
        setError('Mật khẩu không đúng');
      } else {
        setError('Đã có lỗi xảy ra khi đăng nhập');
      }
    }
  };

  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google Sign In:', user);
    } catch (error) {
      setError('Đã có lỗi xảy ra khi đăng nhập bằng Google');
    }
  };

  return (
    <div className="login-container">
      <div className="image-container">
        <img src="/Image/girl.jpg" alt="Login background image" />
      </div>
      <div className="form-container">
        <Typography variant="h6" sx={{ fontFamily: 'Tahoma', fontWeight: 'bold' }}>
          ĐĂNG NHẬP
        </Typography>
      <div className="form">
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="TextField-root"
          fullWidth
          required
        />
        <TextField
          label="Mật khẩu"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="TextField-root"
          fullWidth
          required
        />
      </div>
      {error && <Typography className="error">{error}</Typography>}

      <Typography className="link" variant="body2">
        <Link to="/qmk">Quên mật khẩu?</Link>
      </Typography>
      
      <div className="button-group">
        <Button variant="contained" onClick={handleLogin} className="primary" sx={{ mt: 2, mb: 1 }}>Đăng nhập</Button>    
        <Button variant="contained" onClick={handleLoginWithGoogle} className="google" sx={{ mt: 1, mb: 2, bgcolor: '#DB4437', color: 'white' }}>Đăng nhập bằng Google</Button>
      </div>     
      <Typography className="link" variant="body2">
        Chưa có tài khoản? <Link to="/dktk">Đăng ký ngay</Link>
      </Typography>
       </div>
    </div>
  );
};

export default Login;