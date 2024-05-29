import { Box, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import React from 'react';

const ThongTinDonHang = ({donHang}) => {
    const formatDate = (epochTime) => {
        const daysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
        const date = new Date(epochTime * 1000);
        const dayOfWeek = daysOfWeek[date.getDay()];
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Tháng bắt đầu từ 0 nên cần cộng thêm 1
        const year = date.getFullYear();
        const formattedDateTime = `${dayOfWeek}, ${day}/${month}/${year} - ${hours}:${minutes}`;
        return formattedDateTime;
      };
    return (
        
        <Paper elevation={3} sx={{ padding: '20px' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6'>Thông tin đơn hàng</Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Mã đơn hàng:</strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {donHang.maDonHang}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Thời gian bắt đầu: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {formatDate(donHang.ngayBatDau)}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Tên dịch vụ: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {donHang.danhSachDichVu[donHang.danhSachDichVu.length - 1].tenDichVu}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Thời gian kết thúc: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {formatDate(donHang.ngayKetThuc)}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Khối lượng CV: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {donHang.danhSachDichVu[donHang.danhSachDichVu.length - 1].khoiLuongCongViec}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Vật nuôi: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {donHang.vatNuoi}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Thời gian tạo đơn: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {formatDate(donHang.ngayDatHang)}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Trạng thái ĐH: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {donHang.trangThaiDonHang}
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Số giờ thực hiện: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {donHang.soGioThucHien} giờ
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Thành tiền: </strong>
            </Typography>
            <Typography color={'red'} sx={{ width: '80%' }}>
              <strong>{donHang.tongTien.toLocaleString('vi-VN')} VNĐ</strong>
            </Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex' }}>
            <Typography sx={{ width: '20%' }}>
              <strong>Ghi chú ĐH: </strong>
            </Typography>
            <Typography sx={{ width: '80%' }}>
              {donHang.ghiChu}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ margin: '20px 0' }} />
        <Box display={'flex'} justifyContent={'space-between'} >
          <Box sx={{ width: '48%' }}>
            <Typography variant="h6" gutterBottom>
              Danh sách dịch vụ thêm
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Tên Dịch vụ</TableCell>
                    <TableCell>Biểu phí</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {donHang && Array.isArray(donHang.danhSachDichVu) ? (
                    donHang.danhSachDichVu.map((service, index) => (
                      service.loaiDichVu === "DichVuThem" && (
                        <TableRow key={index}>
                          <TableCell>
                            {service.tenDichVu}
                          </TableCell>
                          <TableCell>
                            {service.gia === null ? `+ ${service.thoiGian} Giờ` : `+ ${service.gia.toLocaleString('vi-VN')} VNĐ`}
                          </TableCell>
                        </TableRow>
                      )
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={2}>Không có dịch vụ đã đặt</TableCell>
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
                    <TableCell>Thời gian bắt đầu</TableCell>
                    <TableCell>Thời gian kết thúc</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {donHang.danhSachLichThucHien.map((schedule, index) => (
                    <TableRow key={index}>
                      <TableCell>{formatDate(schedule.thoiGianBatDauLich)}</TableCell>
                      <TableCell>{formatDate(schedule.thoiGianKetThucLich)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Paper>
    );
};

export default ThongTinDonHang;