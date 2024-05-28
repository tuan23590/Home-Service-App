import React, { useEffect, useState } from 'react';
import { apiDanhSachNhanVienNhanDonHang } from '../../utils/NhanVienUtils';
import { Avatar, Box, Grid, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

const ChonNhanVienTrong = ({idDonHang, setChonNhanVien}) => {
    const [danhSachNhanVienNhanDonHang, setDanhSachNhanVienNhanDonHang] = useState([]);
    const [nhanVienDaChon, setNhanVienDaChon] = useState(null);
    const [page, setPage] = useState(1);
    const rowsPerPage = 5;
    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const indexOfLastRow = page * rowsPerPage;
    const indexOfFirstRow = indexOfLastRow - rowsPerPage;
    const currentRows = danhSachNhanVienNhanDonHang.slice(indexOfFirstRow, indexOfLastRow);
    const data = useLoaderData();

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await apiDanhSachNhanVienNhanDonHang('66555bb181e0144f1b22ec97');
            setDanhSachNhanVienNhanDonHang(data.DanhSachNhanVienTrongViec);
            console.log('[data]:', data)
        };
        fetchData();
    }, [data]);
    console.log(danhSachNhanVienNhanDonHang)
    return (
        <Paper elevation={3} sx={{ padding: '20px', display: 'flex', justifyContent: 'space-between'}}>
              <Box sx={{ width: '48%' }}>
                <Typography variant="h5" gutterBottom>Danh sách nhân viên phù hợp</Typography>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Tên nhân viên</TableCell>
                        <TableCell>Giới tính</TableCell>
                        <TableCell>Ngày sinh</TableCell>
                        <TableCell>Chuyên môn</TableCell>
                        <TableCell>Đánh giá</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentRows.map((employee, index) => (
                        <TableRow
                          key={index}
                          onClick={() => setNhanVienDaChon(employee)}
                          selected={nhanVienDaChon === employee}
                        >
                          <TableCell sx={{display: 'flex', alignItems: 'center',justifyContent: 'space-around'}}><Avatar src={employee.anhDaiDien}/> {employee.tenNhanVien}</TableCell>
                          <TableCell>{employee.gioiTinh}</TableCell>
                          <TableCell>{employee.ngaySinh}</TableCell>
                          <TableCell>{employee.dichVu.map(dv => dv.tenDichVu).join(', ')}</TableCell>
                          <TableCell>{employee.danhGia}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Pagination
                  count={Math.ceil(danhSachNhanVienNhanDonHang.length / rowsPerPage)}
                  page={page}
                  onChange={handleChangePage}
                  sx={{ marginTop: 2, justifyContent: 'center', display: 'flex' }}
                />
              </Box>
              <Box sx={{ width: '49.5%' }}>
                <Typography variant="h5" gutterBottom>Thông tin nhân viên</Typography>
                <Box>
                  {nhanVienDaChon && (
                    <Grid container spacing={2}>
                      <Grid item xs={6} sx={{ display: 'flex' }}>
                        <Typography sx={{ width: '35%' }}>
                          <strong>Tên nhân viên: </strong>
                        </Typography>
                        <Typography sx={{ width: '65%' }}>
                          {nhanVienDaChon.tenNhanVien}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex' }}>
                        <Typography sx={{ width: '35%' }}>
                          <strong>Giới tính: </strong>
                        </Typography>
                        <Typography sx={{ width: '65%' }}>
                          {nhanVienDaChon.gioiTinh}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex' }}>
                        <Typography sx={{ width: '35%' }}>
                          <strong>CCCD: </strong>
                        </Typography>
                        <Typography sx={{ width: '65%' }}>
                          {nhanVienDaChon.cccd}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex' }}>
                        <Typography sx={{ width: '35%' }}>
                          <strong>Ngày sinh: </strong>
                        </Typography>
                        <Typography sx={{ width: '65%' }}>
                          {nhanVienDaChon.ngaySinh}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex' }}>
                        <Typography sx={{ width: '35%' }}>
                          <strong>Đánh giá: </strong>
                        </Typography>
                        <Typography sx={{ width: '65%' }}>
                          {nhanVienDaChon.danhGia}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex' }}>
                        <Typography sx={{ width: '35%' }}>
                          <strong>Chuyên môn: </strong>
                        </Typography>
                        <Typography sx={{ width: '65%' }}>
                          {nhanVienDaChon.dichVu.map(dv => dv.tenDichVu).join(', ')}
                        </Typography>
                      </Grid>
                      <Grid item xs={6} sx={{ display: 'flex' }}>
                        <Typography sx={{ width: '35%' }}>
                          <strong>Ghi chú: </strong>
                        </Typography>
                        <Typography sx={{ width: '65%' }}>
                          {nhanVienDaChon.ghiChu}
                        </Typography>
                      </Grid>
                     
                    </Grid>
                  )}
                </Box>
              </Box>
            </Paper>
    );
};

export default ChonNhanVienTrong;