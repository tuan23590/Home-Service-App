import React, { useState } from 'react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  TablePagination
} from '@mui/material';

const DanhSachDonHangChoDuyet = () => {
  const { data } = useLoaderData();
  const danhSachDonHang = data.DonHangDangChoDuyet;
  const navigate = useNavigate();
  const formatDate = (epochTime) => {
    const date = new Date(epochTime * 1000);
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formattedDateTime = `${hours}:${minutes} ${day}/${month}/${year}`;
    return formattedDateTime;
  };

  const [chonDonHang, setChonDonHang] = useState(danhSachDonHang[0]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleRowClick = (item) => {
    setChonDonHang(item);
    navigate('./ChiThietDonHangChoDuyet');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Box sx={{ margin: '15px' }}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Thứ tự</TableCell>
              <TableCell>Mã Đơn Hàng</TableCell>
              <TableCell>Ngày Đặt Hàng</TableCell>
              <TableCell>Ngày Bắt Đầu</TableCell>
              <TableCell>Ngày Kết Thúc</TableCell>
              <TableCell>Số Giờ Thực Hiện</TableCell>
              <TableCell>Trạng Thái Đơn Hàng</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {danhSachDonHang
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow
                  key={row.id}
                  onClick={() => handleRowClick(row)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#bec2cc',
                    },
                  }}
                >
                  <TableCell>{page * rowsPerPage + index + 1}</TableCell>
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
        <TablePagination
          component="div"
          count={danhSachDonHang.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[10,15,20,30,50,100]}
          labelRowsPerPage="Số hàng mỗi trang"
        />
      </TableContainer>
      <Outlet context={chonDonHang} />
    </Box>
  );
};

export default DanhSachDonHangChoDuyet;
