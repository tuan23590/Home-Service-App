import { Box, Button, CircularProgress, Divider, Grid, Paper, Tooltip, Typography } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { apiQuanHuyen, apiTinhTP, apiXaPhuong, apiXoaDiaChi } from '../../../utils/DiaChiUtil';
import EditProfileDialog from './EditProfileDialog';
import EditAddressDialog from './EditAddressDialog';
import {apiTimKhachHangTheoId } from '../../../utils/KhachHangUtils';
const ThongTinVaDiaChi = () => {
    const { khachHang } = useContext(AuthContext);
    const [diaChiSelected, setDiaChiSelected] = useState(null);
    const [thongTinKhachHang, setThongTinKhachHang] = useState(null);
    const [loading, setLoading] = useState(false);
    const fetchData = async () => {
        setLoading(true);
        const data = await apiTimKhachHangTheoId(khachHang.id);
        if (data) {
            setThongTinKhachHang(data);
        }
        setLoading(false);
    };

    useEffect(() => {
        if(khachHang){
            fetchData();
        }
    }, [khachHang]);



    const [isEditProfileDialogOpen, setIsEditProfileDialogOpen] = useState(false);
    const [isEditAddressDialogOpen, setIsEditAddressDialogOpen] = useState(false);
    const openEditAddressDialog = (diaChi) => {
        setDiaChiSelected(diaChi);
        setIsEditAddressDialogOpen(true);
    };
    const openEditProfileDialog = () => {
        setIsEditProfileDialogOpen(true);
    };
    const closeEditDialog = () => {
        setIsEditProfileDialogOpen(false);
        setIsEditAddressDialogOpen(false);
        setDiaChiSelected(null);
    };
    const handleDeleteAddress = async (diaChi) => {
        const conform = window.confirm('Bạn có chắc chắn muốn xóa địa chỉ này không?');
        if (conform) {
            const data = await apiXoaDiaChi(diaChi.id,thongTinKhachHang.id);
            console.log(data);
            if (data) {
                alert('Xóa địa chỉ thành công');
                fetchData();
            }else{
                alert('Xóa địa chỉ thất bại');
            }
        }
    };
    return (
        loading ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
            </Box>
        ) : (
        <Grid spacing={2}>
            <Grid item xs={12} md={6}>
                <Paper sx={{ padding: '20px' }}>
                    <Typography variant='h6'>Thông tin cá nhân</Typography>
                    <Divider sx={{ marginY: '10px' }} />
                    <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Box >
                    <Typography><strong>Họ tên: </strong>{thongTinKhachHang?.tenKhachHang}</Typography>
                    <Typography><strong>Số điện thoại: </strong>{thongTinKhachHang?.soDienThoai} </Typography>
                    <Typography><strong>Email: </strong>{thongTinKhachHang?.email}</Typography>
                    </Box>
                    <Tooltip title='Chỉnh sửa thong tin cá nhân' onClick={openEditProfileDialog}>
                    <Typography sx={{ display: 'flex', alignItems: 'center', marginX: '10px' ,cursor: 'pointer'}} color={'#039be5'} >
                        <DriveFileRenameOutlineIcon sx={{ marginRight: '3px', fontSize: '20px' }} /> Sửa
                    </Typography>
                    </Tooltip>
                    </Box>
                </Paper>
                <Paper sx={{ padding: '20px', marginTop: '20px' }}>
                    <Typography variant='h6'>Địa chỉ</Typography>
                    <Divider sx={{ marginY: '10px' }} />
                    <Box sx={{overflowY: 'auto', maxHeight:'60vh'}}>
                    {thongTinKhachHang?.danhSachDiaChi != [] ? (
                        thongTinKhachHang?.danhSachDiaChi.map((diaChi, index) => (
                            <>
                                <Box sx={{ marginY: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Box>
                                        <Typography key={index}>(Ghi chú: {diaChi.ghiChu}) {diaChi.soNhaTenDuong},{diaChi.xaPhuong},{diaChi.quanHuyen},{diaChi.tinhTP}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex' }}>
                                        <Tooltip title='Chỉnh sửa địa chỉ' onClick={()=>openEditAddressDialog(diaChi)}>
                                            <Typography sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' ,cursor: 'pointer'}} color={'#039be5'} >
                                                <DriveFileRenameOutlineIcon sx={{ marginRight: '3px', fontSize: '20px' }} /> Sửa
                                            </Typography>
                                        </Tooltip>

                                        <Tooltip title='Xóa địa chỉ' onClick={()=>{handleDeleteAddress(diaChi)}}>
                                            <Typography sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' ,cursor: 'pointer'}} color={'#e57373'} >
                                                <DeleteIcon sx={{ marginRight: '3px', fontSize: '20px' }} /> Xóa
                                            </Typography>
                                        </Tooltip>
                                    </Box>
                                </Box>
                                <Divider sx={{ marginY: '10px' }} />
                            </>
                        ))
                    ) : (
                        <Typography>Chưa có địa chỉ</Typography>
                    )}
                    </Box>
                   <Box>
                   <Tooltip title='Thêm địa chỉ mới' onClick={()=>openEditAddressDialog(null)}>
                   <Typography sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer', color: '#039be5',justifyContent: 'center',padding: '5px' }}>
                        <AddCircleOutlineIcon sx={{ marginRight: '3px', fontSize: '20px' }} /> Thêm địa chỉ
                    </Typography>
                   </Tooltip>
                   </Box>
                </Paper>
            </Grid>
            <EditProfileDialog data= {{ isEditProfileDialogOpen, closeEditDialog,thongTinKhachHang ,fetchData}} />
            <EditAddressDialog data= {{ isEditAddressDialogOpen, closeEditDialog,diaChiSelected ,fetchData,thongTinKhachHang}} />
        </Grid>
        )
    );
};

export default ThongTinVaDiaChi;