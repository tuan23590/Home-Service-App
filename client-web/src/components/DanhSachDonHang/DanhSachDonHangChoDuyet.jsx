import React, { useEffect, useState } from 'react';
import { Outlet, useLoaderData, useNavigate} from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box
} from '@mui/material';
import ChiThietDonHangChoDuyet from '../ChiTietDonHang/ChiThietDonHangChoDuyet';

const DanhSachDonHangChoDuyet = () => {
    const {data} = useLoaderData();
    const navigate = useNavigate();
    const formatDate = (epochTime) => {
      // Tạo một đối tượng Date từ thời gian Epoch (milliseconds)
      const date = new Date(epochTime * 1000);
    
      // Lấy thông tin về giờ, phút, ngày, tháng và năm từ đối tượng Date
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần cộng thêm 1
      const year = date.getFullYear();
    
      // Tạo chuỗi định dạng ngày giờ
      const formattedDateTime = `${hours}:${minutes} ${day}/${month}/${year}`;
    
      return formattedDateTime;
    };

    const [selectedItem, setSelectedItem] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const handleRowClick = (item) => {
      setSelectedItem(item);
      navigate('./ChiThietDonHangChoDuyet');
    };
  
    const handleCloseModal = () => {
      setModalOpen(false);
    };

    return (
      <Box sx={{marginTop: '15px'}}>
        <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mã Đơn Hàng</TableCell>
            <TableCell>Ngày Đặt Hàng</TableCell>
            <TableCell>Ngày Bắt Đầu</TableCell>
            <TableCell>Ngày Kết Thúc</TableCell>
            <TableCell>Số Giờ Thực Hiện</TableCell>
            <TableCell>Trạng Thái Đơn Hàng</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.DonHangDangChoDuyet.map((row) => (
            <TableRow
            key={row.id}
            onClick={() => handleRowClick(row)}
              sx={{
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                }
              }}
            >
              <TableCell>{row.maDonHang}</TableCell>
              <TableCell>{formatDate(row.ngayDatHang)}</TableCell>
              <TableCell>{formatDate(row.ngayBatDau)}</TableCell>
              <TableCell>{formatDate(row.ngayKetThuc)}</TableCell>
              <TableCell>{row.soGioThucHien}</TableCell>
              <TableCell>{row.trangThaiDonHang}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      <Outlet context={selectedItem}/>
      </Box>
    );
};

export default DanhSachDonHangChoDuyet;