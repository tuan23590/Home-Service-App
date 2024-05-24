import { Grid, List, ListItem, ListItemText, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Outlet, useLoaderData, useNavigate} from 'react-router-dom';


const DanhSachDonHangDaTuChoi = () => {
    const [chonDonHang,setChonDonHang] = useState(null);

    const {data} = useLoaderData();

    const navigate = useNavigate();

    useEffect(() => {
      if (chonDonHang===null) {
        setChonDonHang(data.DonHangDaTuChoi[0]);
        navigate("./ChiTietDonHang")
      }
    }, [data]);

    const handlePress = (donHang) => {
        setChonDonHang(donHang);
        navigate("./ChiTietDonHang")
    }
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <div style={{ padding: 20, border: '1px solid black', height: '92vh', overflow: 'auto' }}>
              <Typography variant="h5" gutterBottom>
                Danh sách đơn hàng đã từ chối
              </Typography>
              {data.DonHangDaTuChoi && data.DonHangDaTuChoi.length > 0 ? (
                <List>
                  {data.DonHangDaTuChoi.map((donHang) => (
                    <ListItem button key={donHang.id} onClick={() => handlePress(donHang)}>
                      <ListItemText primary={`Đơn hàng:  ${donHang.maDonHang}`} />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body1">Danh sách trống</Typography>
              )}
            </div>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Outlet context={chonDonHang} />
          </Grid>
        </Grid>
      </div>
    );
};

export default DanhSachDonHangDaTuChoi;