import React from 'react';
import { useLoaderData } from 'react-router-dom';
import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    TextField,
    Button,
    Autocomplete
} from '@mui/material';
import { useState } from 'react';
import { apiThemDichVu } from '../../utils/DichVuUtils';

const QuanLyDichVu = () => {
    const data = useLoaderData();
    const danhSachDichVu = data;
    const [dichVuData, setDichVuData] = useState({
        tenDichVu: '',
        khoiLuongCongViec: '',
        gia: null,
        thoiGian: null,
        loaiDichVu: null
    });
    const danhSachGioThucHien = [{ label: '0 giờ', value: 0 },{ label: '1 giờ', value: 1 }, { label: '2 giờ', value: 2 }, { label: '3 giờ', value: 3 }, { label: '4 giờ', value: 4 }]
    const danhSachLoaiDichVu = ['Dịch vụ cho gia đình','Dịch vụ chăm sóc và hỗ trợ','Dịch vụ bảo dưỡng điện máy','Dịch vụ dành cho doanh nghiệp','Dịch vụ tiện ích nâng cao']
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setDichVuData({
            ...dichVuData,
            [name]: value,
        });
    };

    const renderTable = (title, services) => (
        <Paper sx={{ width: '100%', overflow: 'hidden', marginBottom: '20px' }}>
            <Typography sx={{ margin: '10px' }} variant='h4'>{title}</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Tên Dịch Vụ</TableCell>
                        <TableCell>Khối Lượng Công Việc</TableCell>
                        <TableCell>Loại dịch vụ</TableCell>
                        <TableCell>Giá</TableCell>
                        <TableCell>Thời Gian</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {services.map((dichVu) => (
                        <TableRow key={dichVu.id}>
                            <TableCell>{dichVu.tenDichVu}</TableCell>
                            <TableCell>{dichVu.khoiLuongCongViec}</TableCell>
                            <TableCell>{dichVu.loaiDichVu}</TableCell>
                            <TableCell>{dichVu.gia ? `${dichVu.gia.toLocaleString('vi-VN')} VND` : 'N/A'}</TableCell>
                            <TableCell>{dichVu.thoiGian} giờ</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
    const xuLyThemDichVu = async () => {
        try {
            const data = await apiThemDichVu(dichVuData);
            if (data) {
                alert('Thêm dịch vụ thành công');
                window.location.reload();
            }
        } catch (error) {
            alert('Thêm dịch vụ thất bại');
        }
    };
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper sx={{ padding: '20px', marginTop: '20px' }}>
                        <Typography variant='h5' gutterBottom>Nhập thông tin dịch vụ</Typography>
                        <form>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Nhập tên dịch vụ"
                                        name="tenDichVu"
                                        value={dichVuData.tenDichVu}
                                        onChange={handleInputChange}
                                        fullWidth
                                        size='small'
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField
                                        label="Nhập thông tin khối lượng công việc"
                                        name="khoiLuongCongViec"
                                        value={dichVuData.khoiLuongCongViec}
                                        onChange={handleInputChange}
                                        fullWidth
                                        size='small'
                                    />
                                </Grid>
                               
                                <Grid item xs={6}>
                                    <Autocomplete
                                        required
                                        getOptionLabel={(option) => option.label}
                                        options={danhSachGioThucHien}
                                        value={dichVuData.thoiGian}
                                        onChange={(event, newValue) => { setDichVuData({ ...dichVuData, thoiGian: newValue }) }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Chọn thời gian thực hiện (giờ)"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                                
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                <TextField
                                        label="Nhập giá dịch vụ (VND)"
                                        name="gia"
                                        value={dichVuData.gia}
                                        onChange={handleInputChange}
                                        fullWidth
                                        size='small'
                                        type="number"
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Autocomplete
                                        required
                                        getOptionLabel={(option) => option}
                                        options={danhSachLoaiDichVu}
                                        value={dichVuData.loaiDichVu}
                                        onChange={(event, newValue) => { setDichVuData({ ...dichVuData, loaiDichVu: newValue }) }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Chọn loại dịch vụ"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>




                            <Button variant="contained" color='success' sx={{ marginTop: '20px' }} onClick={xuLyThemDichVu}>
                                Thêm dịch vụ mới
                            </Button>
                        </form>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={12}>
                    {renderTable('Danh sách dịch vụ', danhSachDichVu)}
                </Grid>
            </Grid>
        </>
    );
};

export default QuanLyDichVu;
