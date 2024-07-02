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
  TablePagination,
  Typography,
  TableSortLabel,
  Snackbar,
  Alert
} from '@mui/material';
import { EPOCHTODATE } from '../function/index';

const DanhSachDonHangChoDuyet = () => {
  const danhSachDonHang = useLoaderData();
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  // State để xử lý sắp xếp
  const [sortConfig, setSortConfig] = useState({ key: 'ngayDatHang', direction: 'desc' });

  const handleRowClick = (item) => {
    navigate(`./${item.id}`);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Hàm sắp xếp
  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  // Hàm sắp xếp dữ liệu
  const sortedData = () => {
    const sortableItems = [...danhSachDonHang];
    if (sortConfig.key !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  };

  const sortedDanhSachDonHang = sortedData();

  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'id'}
                  direction={sortConfig.key === 'id' ? sortConfig.direction : 'asc'}
                  onClick={() => requestSort('id')}
                >
                  Thứ tự
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'maDonHang'}
                  direction={sortConfig.key === 'maDonHang' ? sortConfig.direction : 'asc'}
                  onClick={() => requestSort('maDonHang')}
                >
                  Mã Đơn Hàng
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'ngayDatHang'}
                  direction={sortConfig.key === 'ngayDatHang' ? sortConfig.direction : 'asc'}
                  onClick={() => requestSort('ngayDatHang')}
                >
                  Ngày Đặt Hàng
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'ngayBatDau'}
                  direction={sortConfig.key === 'ngayBatDau' ? sortConfig.direction : 'asc'}
                  onClick={() => requestSort('ngayBatDau')}
                >
                  Ngày Bắt Đầu
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'ngayKetThuc'}
                  direction={sortConfig.key === 'ngayKetThuc' ? sortConfig.direction : 'asc'}
                  onClick={() => requestSort('ngayKetThuc')}
                >
                  Ngày Kết Thúc
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'soGioThucHien'}
                  direction={sortConfig.key === 'soGioThucHien' ? sortConfig.direction : 'asc'}
                  onClick={() => requestSort('soGioThucHien')}
                >
                  Số Giờ Thực Hiện
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={sortConfig.key === 'trangThaiDonHang'}
                  direction={sortConfig.key === 'trangThaiDonHang' ? sortConfig.direction : 'asc'}
                  onClick={() => requestSort('trangThaiDonHang')}
                >
                  Trạng Thái Đơn Hàng
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedDanhSachDonHang
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
                  <TableCell>
                    <Typography
                      sx={{
                        display: 'inline-block',
                        padding: '3px',
                        borderRadius: '5px',
                        backgroundColor:
                          row.trangThaiDonHang === 'Đang chờ duyệt'
                            ? '#a5d6a7'
                            : row.trangThaiDonHang === 'Nhân viên từ chối'
                              ? '#ef9a9a'
                              : row.trangThaiDonHang === 'Chờ xác nhận'
                              ? '#ffecb3'
                              : row.trangThaiDonHang === 'Đang thực hiện'
                              ? '#a5d6a7'
                              : row.trangThaiDonHang === 'Đã từ chối'
                              ? '#ef9a9a'
                              : row.trangThaiDonHang === 'Đã hoàn thành'
                              ? '#b3e5fc'
                              : ''
                      }}
                    >
                      {row.trangThaiDonHang}
                    </Typography>
                  </TableCell>
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
          rowsPerPageOptions={[10, 15, 20, 30, 50, 100]}
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
