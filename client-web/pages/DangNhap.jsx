import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import GoogleIcon from '@mui/icons-material/Google';
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const defaultTheme = createTheme();

export default function DangNhap() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false); // Loading state

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
    const auth = getAuth();
    setLoading(true); // Start loading
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      setLoading(false);
      if (error.code === 'auth/invalid-credential') {
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
              Đăng Nhập
            </Typography>
            <Box component="form" noValidate onSubmit={handleLoginWithEmail} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mật khẩu"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Lưu tài khoản"
              />
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
                  disabled={loading} // Disable button while loading
                >
                  {loading ? <CircularProgress size={24} sx={{ color: 'white' }} /> : 'Đăng nhập'}
                </Button>
                <Button variant='outlined' fullWidth onClick={handleLoginWithGoogle} className="google">
                  <GoogleIcon sx={{ marginRight: '10px' }} />
                  Đăng nhập bằng Google
                </Button>
              </Box>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Quên mật khẩu?
                  </Link>
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
