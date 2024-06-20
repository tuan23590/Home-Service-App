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
    TextField,
    Button,
    TablePagination
} from '@mui/material';
import { useLoaderData } from 'react-router-dom';

const QuanLyNhanVien = () => {
    const data = useLoaderData();

    const [danhSachNhanVien, setDanhSachNhanVien] = useState(data);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const renderTable = (title, employees) => (
        <Paper sx={{ width: '100%', overflow: 'hidden', marginBottom: '20px' }}>
            <Typography sx={{ margin: '10px' }} variant='h4'>{title}</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Tên Nhân Viên</TableCell>
                        <TableCell>Giới Tính</TableCell>
                        <TableCell>Ngày Sinh</TableCell>
                        <TableCell>Số Điện Thoại</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Trạng Thái Tài Khoản</TableCell>
                        <TableCell>Phân Quyền</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {employees
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((nhanVien) => (
                            <TableRow key={nhanVien.id}>
                                <TableCell>{nhanVien.tenNhanVien}</TableCell>
                                <TableCell>{nhanVien.gioiTinh}</TableCell>
                                <TableCell>{nhanVien.ngaySinh}</TableCell>
                                <TableCell>{nhanVien.soDienThoai}</TableCell>
                                <TableCell>{nhanVien.email}</TableCell>
                                <TableCell>{nhanVien.trangThaiTaiKhoan}</TableCell>
                                <TableCell>{nhanVien.phanQuyen}</TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <TablePagination
                component="div"
                count={employees.length}
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
                {renderTable('Danh sách nhân viên', danhSachNhanVien)}
            </Grid>
        </Grid>
    );
};

export default QuanLyNhanVien;
