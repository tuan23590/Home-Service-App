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
    });
    const danhSachGia = [{ lable: '0 VNĐ', value: 0 },{ lable: '50.000 VNĐ', value: 50000 }, { lable: '60.000 VNĐ', value: 60000 }, { lable: '70.000 VNĐ', value: 70000 }, { lable: '80.000 VNĐ', value: 80000 }, { lable: '90.000 VNĐ', value: 90000 }, { lable: '100.000 VNĐ', value: 100000 }, { lable: '110.000 VNĐ', value: 110000 }, { lable: '120.000 VNĐ', value: 120000 }, { lable: '130.000 VNĐ', value: 130000 }, { lable: '140.000 VNĐ', value: 140000 }, { lable: '150.000 VNĐ', value: 150000 }, { lable: '160.000 VNĐ', value: 160000 }, { lable: '170.000 VNĐ', value: 170000 }, { lable: '180.000 VNĐ', value: 180000 }, { lable: '190.000 VNĐ', value: 190000 }, { lable: '200.000 VNĐ', value: 200000 }, { lable: '210.000 VNĐ', value: 210000 }, { lable: '220.000 VNĐ', value: 220000 }, { lable: '230.000 VNĐ', value: 230000 }, { lable: '240.000 VNĐ', value: 240000 }, { lable: '250.000 VNĐ', value: 250000 }, { lable: '260.000 VNĐ', value: 260000 }, { lable: '270.000 VNĐ', value: 270000 }, { lable: '280.000 VNĐ', value: 280000 }, { lable: '290.000 VNĐ', value: 290000 }, { lable: '300.000 VNĐ', value: 300000 }, { lable: '310.000 VNĐ', value: 310000 }, { lable: '320.000 VNĐ', value: 320000 }, { lable: '330.000 VNĐ', value: 330000 }, { lable: '340.000 VNĐ', value: 340000 }, { lable: '350.000 VNĐ', value: 350000 }, { lable: '360.000 VNĐ', value: 360000 }, { lable: '370.000 VNĐ', value: 370000 }, { lable: '380.000 VNĐ', value: 380000 }, { lable: '390.000 VNĐ', value: 390000 }, { lable: '400.000 VNĐ', value: 400000 }, { lable: '410.000 VNĐ', value: 410000 }, { lable: '420.000 VNĐ', value: 420000 }, { lable: '430.000 VNĐ', value: 430000 }, { lable: '440.000 VNĐ', value: 440000 }, { lable: '450.000 VNĐ', value: 450000 }, { lable: '460.000 VNĐ', value: 460000 }, { lable: '470.000 VNĐ', value: 470000 }, { lable: '480.000 VNĐ', value: 480000 }, { lable: '490.000 VNĐ', value: 490000 }, { lable: '500.000 VNĐ', value: 500000 }, { lable: '510.000 VNĐ', value: 510000 }, { lable: '520.000 VNĐ', value: 520000 }, { lable: '530.000 VNĐ', value: 530000 }, { lable: '540.000 VNĐ', value: 540000 }, { lable: '550.000 VNĐ', value: 550000 }, { lable: '560.000 VNĐ', value: 560000 }, { lable: '570.000 VNĐ', value: 570000 }, { lable: '580.000 VNĐ', value: 580000 }, { lable: '590.000 VNĐ', value: 590000 }, { lable: '600.000 VNĐ', value: 600000 }, { lable: '610.000 VNĐ', value: 610000 }, { lable: '620.000 VNĐ', value: 620000 }, { lable: '630.000 VNĐ', value: 630000 }, { lable: '640.000 VNĐ', value: 640000 }, { lable: '650.000 VNĐ', value: 650000 }, { lable: '660.000 VNĐ', value: 660000 }, { lable: '670.000 VNĐ', value: 670000 }, { lable: '680.000 VNĐ', value: 680000 }, { lable: '690.000 VNĐ', value: 690000 }, { lable: '700.000 VNĐ', value: 700000 }, { lable: '710.000 VNĐ', value: 710000 }, { lable: '720.000 VNĐ', value: 720000 }, { lable: '730.000 VNĐ', value: 730000 }, { lable: '740.000 VNĐ', value: 740000 }, { lable: '750.000 VNĐ', value: 750000 }, { lable: '760.000 VNĐ', value: 760000 }, { lable: '770.000 VNĐ', value: 770000 }, { lable: '780.000 VNĐ', value: 780000 }, { lable: '790.000 VNĐ', value: 790000 }, { lable: '800.000 VNĐ', value: 800000 }]
    const danhSachGioThucHien = [{ lable: '0 giờ', value: 0 },{ lable: '1 giờ', value: 1 }, { lable: '2 giờ', value: 2 }, { lable: '3 giờ', value: 3 }, { lable: '4 giờ', value: 4 }]
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
                        <TableCell>Giá</TableCell>
                        <TableCell>Thời Gian</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {services.map((dichVu) => (
                        <TableRow key={dichVu.id}>
                            <TableCell>{dichVu.tenDichVu}</TableCell>
                            <TableCell>{dichVu.khoiLuongCongViec}</TableCell>
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
                                <Grid item xs={12}>
                                    <TextField
                                        label="Nhập tên dịch vụ"
                                        name="tenDichVu"
                                        value={dichVuData.tenDichVu}
                                        onChange={handleInputChange}
                                        fullWidth
                                        size='small'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label="Nhập thông tin khối lượng công việc"
                                        name="khoiLuongCongViec"
                                        value={dichVuData.khoiLuongCongViec}
                                        onChange={handleInputChange}
                                        fullWidth
                                        size='small'
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        required
                                        getOptionLabel={(option) => option.lable}
                                        options={danhSachGia}
                                        value={dichVuData.gia}
                                        onChange={(event, newValue) => { setDichVuData({ ...dichVuData, gia: newValue }) }}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                label="Chọn giá dịch vụ (VND)"
                                                variant="outlined"
                                                size="small"
                                                fullWidth
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Autocomplete
                                        required
                                        getOptionLabel={(option) => option.lable}
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
