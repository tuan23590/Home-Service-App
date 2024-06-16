import { Box, Button, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography, TablePagination } from '@mui/material';
import { EPOCHTODATE } from '../function';
import { apiNhanVienTuChoiCongViec, apiNhanVienXacNhanCongViec } from '../../utils/DonHangUtils';
import { useState } from 'react';


export default function DonHangChoXacNhan({ donHang }) {
    const [open, setOpen] = useState(false);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [lyDoNhanVienTuChoiDonHang, setLyDoNhanVienTuChoiDonHang] = useState('');
    const xuLyXacNhanDon = async () => {
        const isConfirmed = window.confirm('Bạn có chắc chắn muốn xác nhận đơn hàng không?');
        if (isConfirmed) {
            const data = apiNhanVienXacNhanCongViec(donHang.id);
            if (data) {
                alert('Xác nhận đơn hàng thành công');
                window.location.reload();
            } else {
                alert('Xác nhận đơn hàng thất bại');
            }
        }
    };
    const xuLyTuChoiDon = () => {
        if (lyDoNhanVienTuChoiDonHang === '') {
            alert('Vui lòng nhập lý do từ chối đơn hàng');
            return;
        }
        const isConfirmed = window.confirm('Bạn có chắc chắn muốn từ chối đơn hàng không?');
        if (isConfirmed) {
            const data = apiNhanVienTuChoiCongViec(donHang.id, lyDoNhanVienTuChoiDonHang);
            if (data) {
                alert('Từ chối đơn hàng thành công');
                window.location.reload();
            } else {
                alert('Từ chối đơn hàng thất bại');
            }
        }
    };
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return (
        <Box
            sx={{
                backgroundColor: 'white',
                border: 1,
            }}
        >
            <Box sx={{
                backgroundColor: '#000000',
                opacity: 0.8,
                padding: '5px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}>
                <Typography variant="h6" sx={{ color: 'white', paddingLeft: '10px' }}>
                    Đơn hàng chờ xác nhận
                </Typography>
            </Box>
            <Paper
                sx={{
                    overflow: 'auto',
                    padding: '20px',
                }}
            >
                {donHang && (
                    <Box>
                        <Paper elevation={3} sx={{ padding: '20px' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant='h6'>Thông tin đơn hàng</Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ width: '40%' }}>
                                        <strong>Mã đơn hàng:</strong>
                                    </Typography>
                                    <Typography sx={{ width: '60%' }}>
                                        {donHang.maDonHang}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ width: '40%' }}>
                                        <strong>Thời gian bắt đầu: </strong>
                                    </Typography>
                                    <Typography sx={{ width: '60%' }}>
                                        {EPOCHTODATE(donHang.ngayBatDau)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ width: '40%' }}>
                                        <strong>Tên dịch vụ: </strong>
                                    </Typography>
                                    <Typography sx={{ width: '60%' }}>
                                        {donHang.dichVuChinh?.tenDichVu}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ width: '40%' }}>
                                        <strong>Thời gian kết thúc: </strong>
                                    </Typography>
                                    <Typography sx={{ width: '60%' }}>
                                        {EPOCHTODATE(donHang.ngayKetThuc)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ width: '40%' }}>
                                        <strong>Khối lượng CV: </strong>
                                    </Typography>
                                    <Typography sx={{ width: '60%' }}>
                                        {donHang.dichVuChinh?.khoiLuongCongViec}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ width: '40%' }}>
                                        <strong>Vật nuôi: </strong>
                                    </Typography>
                                    <Typography sx={{ width: '60%' }}>
                                        {donHang.vatNuoi}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ width: '40%' }}>
                                        <strong>Thời gian tạo đơn: </strong>
                                    </Typography>
                                    <Typography sx={{ width: '60%' }}>
                                        {EPOCHTODATE(donHang.ngayDatHang)}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ width: '40%' }}>
                                        <strong>Trạng thái ĐH: </strong>
                                    </Typography>
                                    <Typography sx={{ width: '60%' }}>
                                        {donHang.trangThaiDonHang}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ width: '40%' }}>
                                        <strong>Số giờ thực hiện: </strong>
                                    </Typography>
                                    <Typography sx={{ width: '60%' }}>
                                        {donHang.soGioThucHien} giờ
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ width: '40%' }}>
                                        <strong>Thành tiền: </strong>
                                    </Typography>
                                    <Typography color={'red'} sx={{ width: '60%' }}>
                                        <strong>{donHang.tongTien?.toLocaleString('vi-VN')} VNĐ</strong>
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ width: '40%' }}>
                                        <strong>Ghi chú ĐH: </strong>
                                    </Typography>
                                    <Typography sx={{ width: '60%' }}>
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
                                                    donHang.danhSachDichVu?.map((service, index) => (
                                                        service.loaiDichVu === "DichVuThem" && (
                                                            <TableRow key={index}>
                                                                <TableCell>
                                                                    {service?.tenDichVu}
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
                                                {/* Sử dụng slice để chia nhỏ mảng dữ liệu hiện tại */}
                                                {donHang.danhSachLichThucHien?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((schedule, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{EPOCHTODATE(schedule.thoiGianBatDauLich)}</TableCell>
                                                        <TableCell>{EPOCHTODATE(schedule.thoiGianKetThucLich)}</TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                        <TablePagination
                                            rowsPerPageOptions={[5, 10, 25]} // Các tùy chọn số lượng phần tử trên mỗi trang
                                            component="div"
                                            count={donHang.danhSachLichThucHien?.length} // Tổng số phần tử
                                            rowsPerPage={rowsPerPage}
                                            page={page}
                                            onPageChange={handleChangePage}
                                            onRowsPerPageChange={handleChangeRowsPerPage}
                                        />
                                    </TableContainer>

                                </Box>
                            </Box>
                        </Paper>
                        <Divider sx={{ margin: '15px' }} />

                        <Paper elevation={3} sx={{ padding: '20px' }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <Typography variant="h5">
                                        Thông tin khách hàng
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ width: '40%' }}>
                                        <strong>Tên khách hàng: </strong>
                                    </Typography>
                                    <Typography sx={{ width: '60%' }}>
                                        {donHang.khachHang?.tenKhachHang}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ width: '40%' }}>
                                        <strong>Địa chỉ: </strong>
                                    </Typography>
                                    <Typography sx={{ width: '60%' }}>
                                        {[
                                            donHang.diaChi?.soNhaTenDuong,
                                            donHang.diaChi?.xaPhuong,
                                            donHang.diaChi?.quanHuyen,
                                            donHang.diaChi?.tinhTP,
                                        ].join(', ')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ width: '40%' }}>
                                        <strong>Số điện thoại: </strong>
                                    </Typography>
                                    <Typography sx={{ width: '60%' }}>
                                        {donHang.khachHang?.soDienThoai}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ width: '40%' }}>
                                        <strong>Ghi chú địa chỉ: </strong>
                                    </Typography>
                                    <Typography sx={{ width: '60%' }}>
                                        {donHang.diaChi?.ghiChu}
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} sx={{ display: 'flex' }}>
                                    <Typography sx={{ width: '40%' }}>
                                        <strong>Email: </strong>
                                    </Typography>
                                    <Typography sx={{ width: '60%' }}>
                                        {donHang.khachHang?.email}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Paper>

                        <Divider sx={{ margin: '15px' }} />
                    </Box>
                )}
                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                    {open ? (
                        <>
                            <TextField autoFocus sx={{ width: '50%' }} onChange={(event) => { setLyDoNhanVienTuChoiDonHang(event.target.value) }}></TextField>
                            <Button variant="contained" color='warning' sx={{ margin: '10px' }} onClick={xuLyTuChoiDon}>Xác nhận từ chối</Button>
                            <Button variant="contained" color='error' sx={{ margin: '10px' }} onClick={() => setOpen(false)}>Hủy</Button>
                        </>
                    ) : (
                        <>
                            <Button variant="contained" color="success" sx={{ margin: '10px' }} onClick={xuLyXacNhanDon}>Xác nhận đơn hàng</Button>
                            <Button variant="contained" color='warning' sx={{ margin: '10px' }} onClick={() => { setOpen(true) }}>Từ chối đơn hàng</Button>
                        </>
                    )}
                </Box>
            </Paper>

        </Box>
    );
}