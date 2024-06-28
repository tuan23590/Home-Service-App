import { Box, Button, Divider, Paper, Typography } from '@mui/material'
import React from 'react'
import { EPOCHTODATETIMETOTIME, EPOCHTODATETODAY } from '../../function'
import { useNavigate } from 'react-router-dom';
import { apiHoanThanhLichThucHien } from '../../../utils/LichThucHienUtils';

export default function DSDonHangThuGon({ data }) {
    const { danhSachDonHang, matchingItems } = data;
    const navigate = useNavigate();
    const handleCompleteOrder = async (matchingItemId) => {
        const confirmComplete = window.confirm("Bạn có chắc chắn muốn hoàn thành lịch thực hiện?");
    
        if (confirmComplete) {
                const data = await apiHoanThanhLichThucHien(matchingItemId);
                    alert('Đã hoàn thành lịch thực hiện!');
                    window.location.reload();
               
        }
    };
    
    
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}>
            {danhSachDonHang.map((donHang, index) => (
                
                <Paper key={index} sx={{
                    marginBottom: '10px',
                    padding: '15px',
                    border: 1,
                    cursor: 'pointer',
                    width: '590px',
                    marginLeft: '10px',
                    ':hover': {
                        backgroundColor: '#f0f0f0',
                    }
                }} >
                    <Box onClick={() => { navigate(`./${donHang.id}`) }}>
                    <Typography>
                        <strong>Mã đơn hàng: </strong> {donHang.maDonHang}
                    </Typography>
                    <Typography>
                        <strong>Trạng thái đơn hàng: </strong> {donHang.trangThaiDonHang}
                    </Typography>
                    <Typography>
                        <strong>Khách hàng: </strong> {donHang?.khachHang?.tenKhachHang}
                    </Typography>
                    <Typography>
                        <strong>SĐT của KH: </strong> {donHang?.khachHang?.soDienThoai}
                    </Typography>
                    <Typography>
                        <strong>Địa chỉ: </strong> {donHang?.diaChi?.soNhaTenDuong}, {donHang.diaChi?.xaPhuong}, {donHang.diaChi?.quanHuyen}, {donHang.diaChi?.tinhTP}
                    </Typography>
                    <Typography>
                        <strong>Dịch vụ thực hiện: </strong> {donHang.danhSachDichVu.map(dichVu => dichVu.tenDichVu).join(', ')}
                    </Typography>
                    {matchingItems ? (
                        <>
                            <Typography>
                                <strong>Ngày làm việc: </strong> {EPOCHTODATETODAY(matchingItems[index]?.thoiGianBatDauLich || donHang.thoiGianBatDauLich)}
                            </Typography>
                            <Typography>
                                <strong>Làm trong: </strong> {EPOCHTODATETIMETOTIME(matchingItems[index]?.thoiGianBatDauLich, matchingItems[index]?.thoiGianKetThucLich)}
                            </Typography>
                        </>
                    ) : (
                        <>

                        </>
                    )}
                    <Typography>
                        <strong>Vật nuôi: </strong> {donHang.vatNuoi}
                    </Typography>
                    <Typography>
                        <strong>Ghi chú: </strong> {donHang.ghiChu || 'Không có ghi chú'}
                    </Typography>
                    <Divider />
                    <Typography align='center' sx={{ marginTop: '10px', opacity: '0.8' }}>
                        Nhấn vào để xem chi tiết
                    </Typography>
                    </Box>
                    {donHang.trangThaiDonHang === "Đang thực hiện" && matchingItems && (
    <Button fullWidth>
        {Date.now() > matchingItems[index]?.thoiGianBatDauLich && (
           <Button
           fullWidth
           variant='outlined'
           sx={{ marginTop: '5px' }}
           onClick={() => handleCompleteOrder(matchingItems[index]?.id)}
       >
           Đã hoàn thành đơn hàng
       </Button>
       
        )}
    </Button>
)}
                </Paper>
            ))}
        </Box>
    )
}