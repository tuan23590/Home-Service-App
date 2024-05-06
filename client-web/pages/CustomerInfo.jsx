import React, { useContext, useEffect, useState } from 'react';
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';

import { DonHangContext } from '../src/context/DonHangProvider';

const CustomerInfo = () => {

  const {
    selectedDuration,
    workDays,
    repeatWeekly,
    repeatCount,
    startDate,
    endDate,
    openDialog,
    showSnackbar,
    totalPrice,
    nhanViens,
    selectedEmployee,
    employeeSelectionSuccess,
    selectedPlace,
    serviceOptions,
    petPreference,
  } = useContext(DonHangContext);

  // const {data} = useContext(DonHangContext);


  // console.log(data);

  // const [loaiDichVuS, setLoaiDichVuS] = useState([]);

  // useEffect(() => {
  //   const fetchLoaiDichVuS = async () => {
  //     try {
  //       const query = `
  //         query MyQuery {
  //           loaiDichVuS {
  //             id
  //             tenKhachHang
  //             soDienThoai
  //             diaChi
  //             tenDichVu
  //             thoiLuongLamViec
  //             ngayLamViec
  //             ngayBatDau
  //             ngayKetThuc
  //             soLanTrongTuan
  //             lapLaiTrongTuan
  //             dichVuThem
  //             vatNuoi
  //             nhanVien
  //             tongCon
  //           }
  //         }
  //       `;

  //       const res = await fetch('https://api-ap-southeast-2.hygraph.com/v2/clv4uoiq108fp07w7579676h9/master', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //           'Accept': 'application/json'
  //         },
  //         body: JSON.stringify({ query })
  //       });

  //       const data = await res.json();
  //       setLoaiDichVuS(data.data.loaiDichVuS);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchLoaiDichVuS();
  // }, []);

  return (
    // <div>
    //   <Typography variant="h4" gutterBottom>Thông tin của khách hàng</Typography>
    //   <List>
    //     {loaiDichVuS.map((item) => (
    //       <React.Fragment key={item.id}>
    //         <Divider />
    //         <ListItem>
    //           <ListItemText primary={`Tên khách hàng: ${item.tenKhachHang}`} />
    //         </ListItem>
    //         <Divider />
    //         <ListItem>
    //           <ListItemText primary={`Số điện thoại: ${item.soDienThoai}`} />
    //         </ListItem>
    //         <Divider />
    //         <ListItem>
    //           <ListItemText primary={`Địa chỉ: ${item.diaChi}`} />
    //         </ListItem>
    //         <Divider />
    //         <ListItem>
    //           <ListItemText primary={`Tên dịch vụ: ${item.tenDichVu}`} />
    //         </ListItem>
    //         <Divider />
    //         <ListItem>
    //           <ListItemText primary={`Thời lượng làm việc: ${item.thoiLuongLamViec}`} />
    //         </ListItem>
    //         <Divider />
    //         <ListItem>
    //           <ListItemText primary={`Ngày làm việc: ${item.ngayLamViec}`} />
    //         </ListItem>
    //         <Divider />
    //         <ListItem>
    //           <ListItemText primary={`Ngày bắt đầu: ${item.ngayBatDau}`} />
    //         </ListItem>
    //         <Divider />
    //         <ListItem>
    //           <ListItemText primary={`Ngày kết thúc: ${item.ngayKetThuc}`} />
    //         </ListItem>
    //         <Divider />
    //         <ListItem>
    //           <ListItemText primary={`Số lần trong tuần: ${item.soLanTrongTuan}`} />
    //         </ListItem>
    //         <Divider />
    //         <ListItem>
    //           <ListItemText primary={`Lặp lại hàng tuần: ${item.lapLaiTrongTuan ? 'Có' : 'Không'}`} />
    //         </ListItem>
    //         <Divider />
    //         <ListItem>
    //           <ListItemText primary={`Dịch vụ thêm: ${item.dichVuThem}`} />
    //         </ListItem>
    //         <Divider />
    //         <ListItem>
    //           <ListItemText primary={`Vật nuôi: ${item.vatNuoi}`} />
    //         </ListItem>
    //         <Divider />
    //         <ListItem>
    //           <ListItemText primary={`Nhân viên: ${item.nhanVien}`} />
    //         </ListItem>
    //         <Divider />
    //         <ListItem>
    //           <ListItemText primary={`Tổng cộng: ${item.tongCon} VNĐ`} />
    //         </ListItem>
    //         <Divider />
    //       </React.Fragment>
    //     ))}
    //   </List>
    // </div>
    <div>
      <p>Selected Duration: {selectedDuration}</p>
      <p>Work Days: {JSON.stringify(workDays)}</p>
      <p>Repeat Weekly: {repeatWeekly.toString()}</p>
      <p>Repeat Count: {repeatCount}</p>
      <p>Start Date: {startDate}</p>
      <p>End Date: {endDate}</p>
      <p>Open Dialog: {openDialog.toString()}</p>
      <p>Show Snackbar: {showSnackbar.toString()}</p>
      <p>Total Price: {totalPrice}</p>
      <p>Nhan Viens: {JSON.stringify(nhanViens)}</p>
      <p>Selected Employee: {selectedEmployee}</p>
      <p>Employee Selection Success: {employeeSelectionSuccess.toString()}</p>
      <p>Selected Place: {selectedPlace}</p>
      <p>Service Options: {JSON.stringify(serviceOptions)}</p>
      <p>Pet Preference: {petPreference}</p>
    </div>
  );
};

export default CustomerInfo;
