import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from './../src/context/AuthProvider';
import { apiDanhSachDonHangTheoKhachHang } from '../utils/DonHangUtils';
import { Box, Button, Container, Divider, Grid, Paper, Typography, } from '@mui/material';
import ThongTinTaiKhoan from './../src/components/ThongTinTaiKhoan';
import { EPOCHTODATE, EPOCHTODATETIMETOTIME } from './../src/function/index';
import { Outlet, useNavigate } from 'react-router-dom';

const TraCuuDonHang = () => {
    const { khachHang } = useContext(AuthContext);
    const [danhSachDonHang, setDanhSachDonHang] = useState([]);
    const navigate = useNavigate();
    const fetchData = async () => {
        const data = await apiDanhSachDonHangTheoKhachHang(khachHang.id);
        setDanhSachDonHang(data);
    };
    useEffect(() => {
        if (khachHang)
            fetchData();
    }, [khachHang]);
    return (
        <Container>
            <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                <Box sx={{width: '30%', display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                    <Box><ThongTinTaiKhoan /></Box>
                </Box>

                <Box sx={{width: '69%',height: '98vh', overflowX: 'auto', paddingRight: '10px'}}>
                    <Typography variant="h6">Danh sách đơn hàng</Typography>
                    <Divider />
                    {danhSachDonHang.map((donHang, index) => (
                        <Paper key={index} sx={{padding: 2, marginTop: 2,
                            '&:hover': {
                                backgroundColor: '#f5f5f5',
                                cursor: 'pointer'
                            }

                        }} onClick={()=>{navigate(`./${donHang.id}`)}}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between' }} >
                                <Typography><strong>Đơn hàng:</strong> {donHang?.maDonHang}</Typography>
                                <Typography>{donHang.trangThaiDonHang}</Typography>
                            </Box>
                            <Divider sx={{marginY: '10px'}} />
                            <Typography><strong>Ngày đặt hàng:</strong> {EPOCHTODATE(donHang.ngayDatHang)}</Typography>
                            <Typography><strong>Thời gian thực hiện:</strong> {EPOCHTODATETIMETOTIME(donHang.ngayBatDau,donHang.ngayKetThuc)}</Typography>
                            <Typography>
                                <strong>Dịch vụ: </strong>
                                {donHang.danhSachDichVu.map((dichVu, index) => (
                                    index === donHang.danhSachDichVu.length - 1
                                        ? dichVu.tenDichVu
                                        : `${dichVu.tenDichVu}, `
                                ))}
                            </Typography>
                            {
                                donHang.trangThaiDonHang === 'Đã hoàn thành' && (
                                    <Typography><strong>Đánh giá đơn hàng: </strong> {donHang.saoDanhGia? (`${donHang.saoDanhGia} sao`):('Chưa đánh giá')}</Typography>
                                )
                            }
                            <Typography><strong>Tổng tiền: </strong> <span style={{fontSize: '25px'}}>{donHang.tongTien.toLocaleString()} VNĐ</span></Typography>   
                            
                            <Divider sx={{marginY: '10px'}} />
                            <Typography textAlign={'center'}><i>Nhấn vào để xem chi tiết đơn hàng</i></Typography>
                        </Paper>

                    ))}
                </Box>
            </Box>
            <Outlet />
        </Container>
    );
};

export default TraCuuDonHang;