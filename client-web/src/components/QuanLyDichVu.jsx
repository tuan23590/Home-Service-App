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
    const danhSachGia = [{ label: '0 VNĐ', value: 0 },{ label: '50.000 VNĐ', value: 50000 }, { label: '60.000 VNĐ', value: 60000 }, { label: '70.000 VNĐ', value: 70000 }, { label: '80.000 VNĐ', value: 80000 }, { label: '90.000 VNĐ', value: 90000 }, { label: '100.000 VNĐ', value: 100000 }, { label: '110.000 VNĐ', value: 110000 }, { label: '120.000 VNĐ', value: 120000 }, { label: '130.000 VNĐ', value: 130000 }, { label: '140.000 VNĐ', value: 140000 }, { label: '150.000 VNĐ', value: 150000 }, { label: '160.000 VNĐ', value: 160000 }, { label: '170.000 VNĐ', value: 170000 }, { label: '180.000 VNĐ', value: 180000 }, { label: '190.000 VNĐ', value: 190000 }, { label: '200.000 VNĐ', value: 200000 }, { label: '210.000 VNĐ', value: 210000 }, { label: '220.000 VNĐ', value: 220000 }, { label: '230.000 VNĐ', value: 230000 }, { label: '240.000 VNĐ', value: 240000 }, { label: '250.000 VNĐ', value: 250000 }, { label: '260.000 VNĐ', value: 260000 }, { label: '270.000 VNĐ', value: 270000 }, { label: '280.000 VNĐ', value: 280000 }, { label: '290.000 VNĐ', value: 290000 }, { label: '300.000 VNĐ', value: 300000 }, { label: '310.000 VNĐ', value: 310000 }, { label: '320.000 VNĐ', value: 320000 }, { label: '330.000 VNĐ', value: 330000 }, { label: '340.000 VNĐ', value: 340000 }, { label: '350.000 VNĐ', value: 350000 }, { label: '360.000 VNĐ', value: 360000 }, { label: '370.000 VNĐ', value: 370000 }, { label: '380.000 VNĐ', value: 380000 }, { label: '390.000 VNĐ', value: 390000 }, { label: '400.000 VNĐ', value: 400000 }, { label: '410.000 VNĐ', value: 410000 }, { label: '420.000 VNĐ', value: 420000 }, { label: '430.000 VNĐ', value: 430000 }, { label: '440.000 VNĐ', value: 440000 }, { label: '450.000 VNĐ', value: 450000 }, { label: '460.000 VNĐ', value: 460000 }, { label: '470.000 VNĐ', value: 470000 }, { label: '480.000 VNĐ', value: 480000 }, { label: '490.000 VNĐ', value: 490000 }, { label: '500.000 VNĐ', value: 500000 }, { label: '510.000 VNĐ', value: 510000 }, { label: '520.000 VNĐ', value: 520000 }, { label: '530.000 VNĐ', value: 530000 }, { label: '540.000 VNĐ', value: 540000 }, { label: '550.000 VNĐ', value: 550000 }, { label: '560.000 VNĐ', value: 560000 }, { label: '570.000 VNĐ', value: 570000 }, { label: '580.000 VNĐ', value: 580000 }, { label: '590.000 VNĐ', value: 590000 }, { label: '600.000 VNĐ', value: 600000 }, { label: '610.000 VNĐ', value: 610000 }, { label: '620.000 VNĐ', value: 620000 }, { label: '630.000 VNĐ', value: 630000 }, { label: '640.000 VNĐ', value: 640000 }, { label: '650.000 VNĐ', value: 650000 }, { label: '660.000 VNĐ', value: 660000 }, { label: '670.000 VNĐ', value: 670000 }, { label: '680.000 VNĐ', value: 680000 }, { label: '690.000 VNĐ', value: 690000 }, { label: '700.000 VNĐ', value: 700000 }, { label: '710.000 VNĐ', value: 710000 }, { label: '720.000 VNĐ', value: 720000 }, { label: '730.000 VNĐ', value: 730000 }, { label: '740.000 VNĐ', value: 740000 }, { label: '750.000 VNĐ', value: 750000 }, { label: '760.000 VNĐ', value: 760000 }, { label: '770.000 VNĐ', value: 770000 }, { label: '780.000 VNĐ', value: 780000 }, { label: '790.000 VNĐ', value: 790000 }, { label: '800.000 VNĐ', value: 800000 }]
    const danhSachGioThucHien = [{ label: 'cả ngày', value: 8 },{ label: '0 giờ', value: 0 },{ label: '1 giờ', value: 1 }, { label: '2 giờ', value: 2 }, { label: '3 giờ', value: 3 }, { label: '4 giờ', value: 4 }]
    const danhSachLoaiDichVu = ['Dịch vụ có lập lại','Dịch vụ không lập lại']
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
