import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, sendPasswordResetEmail } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { Checkbox, FormControlLabel } from '@mui/material';

const defaultTheme = createTheme();

export default function DangNhap() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState(localStorage.getItem('email') || '');
  const [password, setPassword] = React.useState(localStorage.getItem('password') || '');
  const [rememberMe, setRememberMe] = React.useState(localStorage.getItem('rememberMe') === 'true');
  const [loading, setLoading] = React.useState(false); // Loading state
  const [forgotPassword, setForgotPassword] = React.useState(false); // State to toggle between forms
  const [showPassword, setShowPassword] = React.useState(false); // State to toggle password visibility

  const handleLoginWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    setLoading(true); // Start loading
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Đăng nhập thất bại');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert('Vui lòng nhập đầy đủ thông tin !');
      return;
    }

    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    if (!isValidEmail(email)) {
      alert('Vui lòng nhập một địa chỉ email hợp lệ !');
      return;
    }


    const auth = getAuth();
    setLoading(true); // Start loading
    try {
      await signInWithEmailAndPassword(auth, email, password);
      if (rememberMe) {
        localStorage.setItem('email', email);
        localStorage.setItem('password', password);
        localStorage.setItem('rememberMe', true);
      } else {
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.removeItem('rememberMe');
      }
      navigate('/');
    } catch (error) {
      setLoading(false);
      console.error(error.code);
      if (error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-email') {
        alert('Tài khoản hoặc mật khẩu không đúng !');
      } else if (error.code === 'auth/too-many-requests') {
        alert('Quá nhiều lần thử đăng nhập, vui lòng thử lại sau 1 phút !');
      } else {
        alert('Đăng nhập thất bại');
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    if (!email) {
      alert('Vui lòng nhập email để lấy lại mật khẩu!');
      return;
    }
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };
    if (!isValidEmail(email)) {
      alert('Vui lòng nhập một địa chỉ email hợp lệ để lấy lại mật khẩu!');
      return;
    }
    setLoading(true); // Start loading
    try {
      await sendPasswordResetEmail(auth, email);
      alert('Vui lòng kiểm tra email để đặt lại mật khẩu của bạn.');
      setForgotPassword(false); // Switch back to login form
    } catch (error) {
      console.error(error);
      alert('Đặt lại mật khẩu thất bại.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://unsplash.it/1920/1080?random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: '#2196f3' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              {forgotPassword ? 'Đặt lại mật khẩu' : 'Đăng Nhập'}
            </Typography>
            <Box component="form" noValidate onSubmit={forgotPassword ? handleResetPassword : handleLoginWithEmail} sx={{ mt: 1 ,width: '77%'}}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {!forgotPassword && (
                <>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    autoFocus={email.length > 0}
                    name="password"
                    label="Mật khẩu"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <FormControlLabel
                    control={<Checkbox value="remember" color="primary" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />}
                    label="Lưu tài khoản"
                  />
                </>
              )}
              <Box>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    backgroundColor: '#2196f3 !important',
                    '&:hover': {
                      backgroundColor: '#2196f3 !important',
                      opacity: 0.9
                    },
                    marginY: '10px'
                  }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : (forgotPassword ? 'Đặt lại mật khẩu' : 'Đăng nhập')}
                </Button>
                {!forgotPassword && (
                  <Button variant='outlined' fullWidth onClick={handleLoginWithGoogle} className="google" disabled={loading}>
                    <GoogleIcon sx={{ marginRight: '10px' }} />
                    Đăng nhập bằng Google
                  </Button>
                )}
              </Box>
              <Grid container>
                <Grid item xs>
                  {forgotPassword ? (
                    <Link href="#" variant="body2" onClick={() => setForgotPassword(false)}>
                      Quay lại đăng nhập
                    </Link>
                  ) : (
                    <Link href="#" variant="body2" onClick={() => setForgotPassword(true)}>
                      Đặt lại mật khẩu
                    </Link>
                  )}
                </Grid>
                {/* <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid> */}
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
