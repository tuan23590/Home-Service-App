import React, { useState } from 'react';
import {
    Grid,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    TablePagination
} from '@mui/material';
import { useLoaderData } from 'react-router-dom';

const QuanLyKhachHang = () => {
    const data = useLoaderData();
    const [danhSachKhachHang, setDanhSachKhachHang] = useState(data);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const renderTable = (title, customers) => (
        <Paper sx={{ width: '100%', overflow: 'hidden', marginBottom: '20px' }}>
            <Typography sx={{ margin: '10px' }} variant='h4'>{title}</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Tên Khách Hàng</TableCell>
                        <TableCell>Số Điện Thoại</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Địa Chỉ</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {customers
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((khachHang) => (
                            <TableRow key={khachHang.id}>
                                <TableCell>{khachHang.tenKhachHang}</TableCell>
                                <TableCell>{khachHang.soDienThoai}</TableCell>
                                <TableCell>{khachHang.email}</TableCell>
                                <TableCell>
                                    {khachHang.danhSachDiaChi.map((diaChi) => (
                                        <>
                                        <div key={diaChi.id}>
                                            <p><strong>Địa chỉ:</strong> {diaChi.soNhaTenDuong}, {diaChi.xaPhuong}, {diaChi.quanHuyen}, {diaChi.tinhTP}</p>
                                            <p><strong>Ghi chú:</strong> {diaChi.ghiChu}</p>
                                        </div>
                                        <hr />
                                        </>
                                    ))}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={customers.length}
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
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {renderTable('Danh sách khách hàng', danhSachKhachHang)}
            </Grid>
        </Grid>
    );
};

export default QuanLyKhachHang;
