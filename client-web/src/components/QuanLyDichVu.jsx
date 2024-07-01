import React, { useState } from 'react';
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
    Autocomplete,
    TablePagination
} from '@mui/material';
import { apiDungDichVu, apiThemDichVu, apiTiepTucDichVu } from '../../utils/DichVuUtils'; // Thay thế 'apiDungDichVu' và 'apiTiepTucDichVu' bằng các hàm thực thi API thích hợp

const QuanLyDichVu = () => {
    const data = useLoaderData();
    const [danhSachDichVu, setDanhSachDichVu] = useState(data);
    const [dichVuData, setDichVuData] = useState({
        tenDichVu: '',
        khoiLuongCongViec: '',
        gia: null,
        thoiGian: null,
        loaiDichVu: null
    });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const danhSachGioThucHien = [{ label: '1 giờ', value: 1 }, { label: '2 giờ', value: 2 }, { label: '3 giờ', value: 3 }, { label: '4 giờ', value: 4 }];
    const danhSachLoaiDichVu = ['Dịch vụ cho gia đình','Dịch vụ chăm sóc và hỗ trợ','Dịch vụ bảo dưỡng điện máy','Dịch vụ dành cho doanh nghiệp','Dịch vụ tiện ích nâng cao'];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const formattedValue = new Intl.NumberFormat('vi-VN').format(value.replace(/\D/g, ''));
        setDichVuData({
            ...dichVuData,
            [name]: name === 'gia' ? formattedValue : value,
        });
        console.log(formattedValue);
    };

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const xuLyDungDichVu = async (id) => {
        try {
            // Hiển thị hộp thoại xác nhận
            const confirmed = confirm('Bạn có chắc chắn muốn dừng dịch vụ này không?');
            
            if (confirmed) {
                const response = await apiDungDichVu(id); // Gọi API để dừng dịch vụ với id được cung cấp
                if (response) {
                    alert('Đã dừng dịch vụ thành công');
                    window.location.reload();
                }
            } else {
                alert('Bạn đã hủy bỏ thao tác dừng dịch vụ');
            }
        } catch (error) {
            alert('Đã xảy ra lỗi khi dừng dịch vụ');
        }
    };
    

    const xuLuTiepTucDichVu = async (id) => {
        try {
            const response = await apiTiepTucDichVu(id); // Gọi API để tiếp tục dịch vụ với id được cung cấp
            if (response) {
                alert('Đã tiếp tục dịch vụ thành công');
               window.location.reload();
            }
        } catch (error) {
            alert('Đã xảy ra lỗi khi tiếp tục dịch vụ');
        }
    };

    const renderTable = (title, services) => (
        <Paper sx={{ width: '100%', overflow: 'hidden', marginBottom: '20px' }}>
            <Typography sx={{ margin: '10px' }} variant='h4'>{title}</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Tên Dịch Vụ</TableCell>
                        <TableCell>Loại dịch vụ</TableCell>
                        <TableCell>Giá</TableCell>
                        <TableCell>Thời Gian</TableCell>
                        <TableCell>Trạng thái</TableCell>
                        <TableCell>Thao Tác</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {services
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((dichVu) => (
                            <TableRow key={dichVu.id}>
                                <TableCell>{dichVu.tenDichVu}</TableCell>
                                <TableCell>{dichVu.loaiDichVu}</TableCell>
                                <TableCell>{dichVu.gia ? `${dichVu.gia.toLocaleString()} VND` : 'N/A'}</TableCell>
                                <TableCell>{dichVu.thoiGian} giờ</TableCell>
                                <TableCell>{dichVu.trangThai}</TableCell>
                                <TableCell>
                                    {dichVu.trangThai === 'Đang hoạt động' ? (
                                        <Button variant='outlined' color='warning' size='small' onClick={() => xuLyDungDichVu(dichVu.id)}> Dừng dịch vụ </Button>
                                    ) : (
                                        <Button variant='outlined' color='info' size='small' onClick={() => xuLuTiepTucDichVu(dichVu.id)}> Tiếp tục dịch vụ </Button>
                                    )}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={services.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 15, 20]} // Customize as needed
                labelRowsPerPage="Số hàng mỗi trang"
            />
        </Paper>
    );

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
                                        label='Nhập giá dịch vụ (VND)'
                                        name="gia"
                                        value={dichVuData.gia}
                                        onChange={handleInputChange}
                                        fullWidth
                                        size='small'
                                        type=''
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
