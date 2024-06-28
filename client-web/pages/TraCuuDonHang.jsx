import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../src/context/AuthProvider';
import { apiDanhSachDonHangTheoKhachHang } from '../utils/DonHangUtils';
import { Box, Button, CircularProgress, Container, Link, List, ListItem, Paper, Typography } from '@mui/material';
import ThongTinTaiKhoan from '../src/components/ThongTinTaiKhoan';
import DonHangDaMua from '../src/components/TraCuuDonHang/DonHangDaMua';
import ThongTinVaDiaChi from '../src/components/TraCuuDonHang/ThongTinVaDiaChi';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import ContactEmergencyIcon from '@mui/icons-material/ContactEmergency';
import { Outlet, useNavigate } from 'react-router-dom';

const TraCuuDonHang = () => {
    const { khachHang } = useContext(AuthContext);
    const [danhSachDonHang, setDanhSachDonHang] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState('Danh sách đơn hàng');
    const navigate = useNavigate();

    const fetchData = async () => {
        setLoading(true);
       
        const data = await apiDanhSachDonHangTheoKhachHang(khachHang.id);
        if (data) {
            const sortedData = data.sort((a, b) => b.ngayDatHang - a.ngayDatHang);
            setDanhSachDonHang(sortedData);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (khachHang) 
            fetchData();
    }, [khachHang]);

    const handleItemClick = (itemLabel) => {
        setSelectedItem(itemLabel);
    };

    return (
        !khachHang ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <Typography variant='h4' sx={{marginRight: '20px'}}>Đang tải ...</Typography>
                <CircularProgress />
            </Box>
        ) : (
            <Box sx={{ backgroundColor: '#eeeeee', boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' ,height: '98vh'}}>
            <Container>
                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <Box sx={{ width: '30%', display: 'flex', justifyContent: 'center', paddingTop: '20px' }}>
                       
                        <Box>
                            <ThongTinTaiKhoan />
                            <List>
                                {[
                                    { label: 'Danh sách đơn hàng', icon: StickyNote2Icon },
                                    { label: 'Thông tin và địa chỉ', icon: ContactEmergencyIcon }
                                ].map((item, index) => (
                                    <ListItem
                                        key={index}
                                        disablePadding
                                        sx={{
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            margin: '5px 0',
                                            boxSizing: 'border-box',
                                            border: selectedItem === item.label ? 1 : 'none',
                                            ':hover': {
                                                cursor: 'pointer',
                                                backgroundColor: '#e0e0e0'
                                            }
                                        }}
                                        onClick={() => handleItemClick(item.label)}
                                    >
                                        <Paper sx={{ display: 'flex', alignItems: 'center', width: '100%', padding: '10px' }}>
                                            <item.icon sx={{color :selectedItem === item.label ? '#0288d1' : '#e0e0e0'}}/>
                                            <Typography sx={{ marginLeft: '10px',  color :selectedItem === item.label ? '#0288d1' : '#e0e0e0',fontWeight: '500'  }}>{item.label}</Typography>
                                        </Paper>
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>

                    <Box sx={{ width: '69%', paddingRight: '10px', marginTop: '20px' }}>
                        {selectedItem === 'Danh sách đơn hàng' && <DonHangDaMua data={{ danhSachDonHang, loading,fetchData }} />}
                        {selectedItem === 'Thông tin và địa chỉ' && <ThongTinVaDiaChi />}
                    </Box>
                </Box>
            </Container>
            <Outlet />
        </Box>              
        )
    );
};

export default TraCuuDonHang;
