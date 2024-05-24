// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const auth = getAuth();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Redirect to home page after successful login
    } catch (error) {
      setError(error.message);
    }
  };


  const handleLoginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google Sign In:', user);
      // Redirect to home page after successful login with Google
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container">
      <Typography variant="h6">Đăng nhập</Typography>
      <div className="form">
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Mật khẩu"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="button-group">
        <Button variant="contained" onClick={handleLogin}>Đăng nhập</Button>    
        <Button variant="contained" color="primary" onClick={handleLoginWithGoogle}>Đăng nhập bằng Google</Button>
      </div>
      {error && <Typography className="error">{error}</Typography>}
      <Typography className="link" variant="body2">
        Chưa có tài khoản? <Link to="/dktk">Đăng ký ngay</Link>
      </Typography>
    </div>
  );
};

export default Login;
