import { Box, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import React, { useState } from 'react';
import { EPOCHTODATE, EPOCHTODATETIME, EPOCHTODATETIMETOTIME, EPOCHTODATETODAY } from '../../function/index';

const ThongTinDonHang = ({ donHang }) => {
  console.log(donHang);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const groupServices = (services) => {
    const grouped = services.reduce((acc, service) => {
      const existingService = acc.find(s => s.tenDichVu === service.tenDichVu);
      if (existingService) {
        existingService.soLanThucHien += 1;
      } else {
        acc.push({ ...service, soLanThucHien: 1 });
      }
      return acc;
    }, []);
    return grouped;
  };

  const groupedServices = donHang && donHang.danhSachDichVu ? groupServices(donHang.danhSachDichVu) : [];

  return (
    <Paper elevation={3} sx={{ padding: '20px' }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant='h6'>Thông tin đơn hàng</Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex' }}>
          <Typography sx={{ width: '30%' }}>
            <strong>Mã đơn hàng:</strong>
          </Typography>
          <Typography sx={{ width: '70%' }}>
            {donHang.maDonHang}
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex' }}>
          <Typography sx={{ width: '30%' }}>
            <strong>TG bắt đầu: </strong>
          </Typography>
          <Typography sx={{ width: '70%' }}>
            {EPOCHTODATE(donHang.ngayBatDau)}
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex' }}>
          <Typography sx={{ width: '30%' }}>
            <strong>TG kết thúc: </strong>
          </Typography>
          <Typography sx={{ width: '70%' }}>
            {EPOCHTODATE(donHang.ngayKetThuc)}
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex' }}>
          <Typography sx={{ width: '30%' }}>
            <strong>Vật nuôi: </strong>
          </Typography>
          <Typography sx={{ width: '70%' }}>
            {donHang.vatNuoi || 'Không có vật nuôi'}
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex' }}>
          <Typography sx={{ width: '30%' }}>
            <strong>TG tạo đơn: </strong>
          </Typography>
          <Typography sx={{ width: '70%' }}>
            {EPOCHTODATETIME(donHang.ngayDatHang)}
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex' }}>
          <Typography sx={{ width: '30%' }}>
            <strong>Trạng thái ĐH: </strong>
          </Typography>
          <Typography sx={{ width: '70%' }}>
            {donHang.trangThaiDonHang}
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex' }}>
          <Typography sx={{ width: '30%' }}>
            <strong>Số giờ thực hiện: </strong>
          </Typography>
          <Typography sx={{ width: '70%' }}>
            {donHang.soGioThucHien} giờ
          </Typography>
        </Grid>
        {donHang.lyDoNhanVienTuChoiDonHang && (
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '30%' }}>
              <strong>Lý do NV từ chối DH: </strong>
            </Typography>
            <Typography sx={{ width: '70%' }}>
              {donHang.lyDoNhanVienTuChoiDonHang}
            </Typography>
          </Grid>
        )}
        {donHang.lyDoTuChoi && (
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '30%' }}>
              <strong>Lý do NV từ chối DH: </strong>
            </Typography>
            <Typography sx={{ width: '70%' }}>
              {donHang.lyDoTuChoi}
            </Typography>
          </Grid>
        )}
        <Grid item xs={6} sx={{ display: 'flex' }}>
          <Typography sx={{ width: '30%' }}>
            <strong>Thành tiền: </strong>
          </Typography>
          <Typography color={'red'} sx={{ width: '70%' }}>
            <strong>{donHang.tongTien.toLocaleString('vi-VN')} VNĐ</strong>
          </Typography>
        </Grid>
        <Grid item xs={6} sx={{ display: 'flex' }}>
          <Typography sx={{ width: '30%' }}>
            <strong>Ghi chú ĐH: </strong>
          </Typography>
          <Typography sx={{ width: '70%' }}>
            {donHang.ghiChu || 'Không có ghi chú'}
          </Typography>
        </Grid>
      </Grid>

      <Divider sx={{ margin: '20px 0' }} />
      <Box display={'flex'} justifyContent={'space-between'}>
        <Box sx={{ width: '48%' }}>
          <Typography variant="h6" gutterBottom>
            Danh sách dịch vụ thực hiện
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Tên Dịch vụ</TableCell>
                  <TableCell>Giá tiền</TableCell>
                  <TableCell>Thời gian</TableCell>
                  <TableCell>Số lần thực hiện</TableCell>
                  <TableCell>Loại dịch vụ</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {groupedServices.length > 0 ? (
                  groupedServices.map((service, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {service.tenDichVu}
                      </TableCell>
                      <TableCell>
                        {service.gia.toLocaleString('vi-VN')} VNĐ
                      </TableCell>
                      <TableCell>
                        {service.thoiGian} giờ
                      </TableCell>
                      <TableCell>
                        {service.soLanThucHien} lần
                      </TableCell>
                      <TableCell>
                        {service.loaiDichVu}
                      </TableCell>
                      
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>Không có dịch vụ đã đặt</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box sx={{ width: '49.5%' }}>
          <Typography variant="h6" gutterBottom>
            Danh sách lịch thực hiện
          </Typography>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Ngày làm việc</TableCell>
                  <TableCell>Làm trong</TableCell>
                  <TableCell>Trạng thái</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {donHang.danhSachLichThucHien
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#bec2cc',
                        },
                      }}
                    >
                      <TableCell>{EPOCHTODATETODAY(row.thoiGianBatDauLich)}</TableCell>
                      <TableCell>{EPOCHTODATETIMETOTIME(row.thoiGianBatDauLich, row.thoiGianKetThucLich)}</TableCell>
                      <TableCell>{row.trangThaiLich}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              component="div"
              count={donHang.danhSachLichThucHien.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 15, 20, 30, 50, 100]}
              labelRowsPerPage="Số hàng mỗi trang"
            />
          </TableContainer>
        </Box>
      </Box>
    </Paper>
  );
};

export default ThongTinDonHang;
