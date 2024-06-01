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
import { Snackbar, Alert } from '@mui/material';
import { EPOCHTODATE } from './../../function/index';


const DanhSachDonHangChoDuyet = () => {
  const { data } = useLoaderData();
  const danhSachDonHang = data.DonHangDangChoDuyet;
  const navigate = useNavigate();

  const [chonDonHang, setChonDonHang] = useState(danhSachDonHang[0]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const handleRowClick = (item) => {
    setChonDonHang(item);
    console.log(item);
    navigate(`./${item.id}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
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
                  <TableCell>{EPOCHTODATE(row.ngayDatHang)}</TableCell>
                  <TableCell>{EPOCHTODATE(row.ngayBatDau)}</TableCell>
                  <TableCell>{EPOCHTODATE(row.ngayKetThuc)}</TableCell>
                  <TableCell>{row.soGioThucHien} giờ</TableCell>
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
      <Outlet context={{ setSnackbar }} />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default DanhSachDonHangChoDuyet;
