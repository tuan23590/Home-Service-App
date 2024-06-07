// // eslint-disable-next-line no-unused-vars
// import React, { useContext, useEffect, useState } from 'react';
// import {
//   Typography,
//   List,
//   ListItem,
//   ListItemText,
//   Grid,
//   Button,
//   TextField,
//   FormControlLabel,
//   MenuItem,
// } from '@mui/material';
// import { DonHangContext } from '../src/context/DonHangProvider';
// import { apiDanhSachDichVu } from '../utils/DichVuUtils';
// import { Link } from 'react-router-dom';
// import './CustomerInfo.css';

// const CustomerInfo = () => {
//   const {
//     searchValue,
//     selectedDuration,
//     workDays,
//     repeatWeekly,
//     repeatCount,
//     startDate,
//     endDate,
//     totalPrice,
//     serviceOptions,
//     petPreference,
//     selectedEmployee,
//     dichVus,
//     setDichVus,
//   } = useContext(DonHangContext);

//   const [paymentInfo, setPaymentInfo] = useState({
//     bankAccountNumber: '',
//     expirationDate: '',
//     pin: '',
//     saveCardInfo: false,
//     paymentMethod: 'cash',
//   });

//   useEffect(() => {
//     console.log('[dichVus]: ', dichVus);
//     const fetchData = async () => {
//       try {
//         const { data } = await apiDanhSachDichVu();
//         console.log('Fetched dichVus:', data.dichVus);
//         setDichVus(data.dichVus);
//       } catch (error) {
//         console.error('Error fetching service data:', error);
//       }
//     };
//     fetchData();
//   }, [setDichVus]);

//   const daysOfWeek = ['Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm', 'Thứ sáu', 'Thứ bảy', 'Chủ nhật'];
//   const selectedWorkDays = workDays.reduce((acc, curr, index) => {
//     if (curr) {
//       acc.push(daysOfWeek[index]);
//     }
//     return acc;
//   }, []);

//   const selectedEmployeeDisplay = selectedEmployee ? selectedEmployee.ten : 'Không chọn';

//   console.log('serviceOptions:', serviceOptions);

//   const selectedServices = Object.entries(serviceOptions)
//     .filter(([, value]) => value)
//     .map(([key]) => {
//       const foundService = dichVus.find((dichVu) => dichVu.id === key);
//       console.log('Matching service for ID', key, ':', foundService);
//       return foundService ? foundService.tenDichVu : '';
//     });

//   const petTypeDisplay =
//     petPreference && petPreference.length > 0
//       ? petPreference.map((pet) => (pet === 'dog' ? 'Chó' : 'Mèo')).join(', ')
//       : 'Không có';

//   const handlePost = async () => {
//     if (paymentInfo.paymentMethod === 'cash') {
//       console.log('Xử lý thanh toán bằng tiền mặt');
//     } else if (paymentInfo.paymentMethod === 'creditCard') {
//       console.log('Xử lý thanh toán chuyển ngân hàng');
//     }
//   };

//   return (
//     <Grid container spacing={2} className="customer-info-container">
//       <Grid item xs={12}>
//         <Typography variant="h6">Thông tin đơn hàng</Typography>
//       </Grid>
//       <Grid item xs={12}>
//         <List>
//           <ListItem>
//             <ListItemText primary={`Địa điểm đã chọn: ${searchValue}`} />
//           </ListItem>
//           <ListItem>
//             <ListItemText primary={`Ngày làm việc: ${selectedWorkDays.join(', ')}`} />
//           </ListItem>
//           <ListItem>
//             <ListItemText primary={`Thời lượng được chọn: ${selectedDuration} giờ`} />
//           </ListItem>
//           <ListItem>
//             <ListItemText primary={`Lặp lại hàng tuần: ${repeatWeekly ? 'Có' : 'Không'}`} />
//           </ListItem>
//           <ListItem>
//             <ListItemText primary={`Số lần trong tuần: ${repeatCount}`} />
//           </ListItem>
//           <ListItem>
//             <ListItemText primary={`Ngày bắt đầu: ${startDate}`} />
//           </ListItem>
//           <ListItem>
//             <ListItemText primary={`Ngày kết thúc: ${endDate}`} />
//           </ListItem>
//           <ListItem>
//             <ListItemText primary={`Dịch vụ thêm: ${dichVus.map((dv) => dv.tenDichVu).join(', ')}`} />
//           </ListItem>
//           <ListItem>
//             <ListItemText primary={`Nhân viên được chọn: ${selectedEmployeeDisplay}`} />
//           </ListItem>
//           <ListItem>
//             <ListItemText primary={`Vật nuôi: ${petPreference}`} />
//           </ListItem>
//           <ListItem>
//             <ListItemText primary={`Tổng tiền: ${totalPrice.toLocaleString('vi-VN')} VNĐ`} />
//           </ListItem>
//         </List>
//       </Grid>
//       <Grid item xs={12}>
//         <ListItemText primary="Phương thức thanh toán" />
//         <FormControlLabel
//           sx={{ marginLeft: 0 }}
//           control={
//             <TextField
//               select
//               value={paymentInfo.paymentMethod}
//               onChange={(e) => {
//                 setPaymentInfo({ ...paymentInfo, paymentMethod: e.target.value });
//               }}
//             >
//               <MenuItem value="cash">Tiền mặt</MenuItem>
//               <MenuItem value="creditCard">Chuyển khoản ngân hàng</MenuItem>
//             </TextField>
//           }
//         />
//       </Grid>
//       <Grid item xs={12}>
//         <Grid container spacing={2}>
//           <Grid item>
//             <Button variant="contained" color="primary" onClick={handlePost}>
//               Đăng tin
//             </Button>
//           </Grid>
//           <Grid item>
//             <Button variant="contained" color="primary" component={Link} to="/dv1">
//               Trở về
//             </Button>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default CustomerInfo;
import React from 'react';

const CustomerInfo = () => {
  // Your code here

  return (
    <div>
      {/* Your JSX here */}
    </div>
  );
};

export default CustomerInfo;