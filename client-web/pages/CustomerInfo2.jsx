// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Grid,
  Button,
} from '@mui/material';
import { Link } from 'react-router-dom';

const CustomerInfo2 = ({
  selectedArea,
  workDays,
  startDate,
  endDate,
  repeatCount,
  repeatWeekly,
  petPreference,
  totalPrice,
  searchValue,
}) => {
  const daysOfWeek = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'];
  const selectedWorkDays = (workDays || []).reduce((acc, curr, index) => {
    if (curr) {
      acc.push(daysOfWeek[index]);
    }
    return acc;
  }, []);

  const petTypeDisplay =
    petPreference && petPreference.length > 0
      ? petPreference.map((pet) => (pet === 'dog' ? 'Chó' : 'Mèo')).join(', ')
      : 'Không có';

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h6">Thông tin đơn hàng</Typography>
      </Grid>
      <Grid item xs={12}>
        <List>
          <ListItem>
            <ListItemText primary={`Địa điểm đã chọn: ${searchValue}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Diện tích đã chọn: ${selectedArea}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Ngày làm việc: ${selectedWorkDays.join(', ')}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Ngày bắt đầu: ${startDate}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Ngày kết thúc: ${endDate}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Số lần trong tuần: ${repeatCount}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Lặp lại hàng tuần: ${repeatWeekly ? 'Có' : 'Không'}`} />
          </ListItem>
          <ListItem>
            <ListItemText primary={`Loại vật nuôi: ${petTypeDisplay}`} />
          </ListItem>
                    <Typography variant="h6" sx={{ mt: 2 }}>
            Tổng cộng: {totalPrice !== undefined && totalPrice.toLocaleString('vi-VN')} VND
            </Typography>

        </List>
      </Grid>
      <Grid item xs={12}>
        <Button variant="contained" color="primary" component={Link} to="/tongvesinh">
          Trở về
        </Button>
      </Grid>
    </Grid>
  );
};

export default CustomerInfo2;
