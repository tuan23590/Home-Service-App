// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import './SignUp.css';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const auth = getAuth();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError('Mật khẩu và xác nhận mật khẩu không khớp.');
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signup-container">
    <h2 className="signup-heading">Đăng ký</h2>
    <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="signup-input" />
    <input type="password" placeholder="Mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} className="signup-input" />
    <input type="password" placeholder="Xác nhận mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="signup-input" />
    <button onClick={handleSignUp} className="signup-button">Đăng ký</button>
    {error && <p className="signup-error">{error}</p>}
    <p className="signup-login">Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link></p>
  </div>
  );
};

export default SignUp;
