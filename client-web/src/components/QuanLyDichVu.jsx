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
} from '@mui/material';

const QuanLyDichVu = () => {
    const { data } = useLoaderData();

    // Filter services into main services and additional services
    const dichVuChinh = data.DichVus.filter(dichVu => dichVu.loaiDichVu === 'CaLe');
    const dichVuThem = data.DichVus.filter(dichVu => dichVu.loaiDichVu === 'DichVuThem');

    const renderTable = (title, services) => (
        <Paper sx={{ width: '100%', overflow: 'hidden', marginBottom: '20px' }}>
            <h2>{title}</h2>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Tên Dịch Vụ</TableCell>
                        <TableCell>Mã Dịch Vụ</TableCell>
                        <TableCell>Khối Lượng Công Việc</TableCell>
                        <TableCell>Giá</TableCell>
                        <TableCell>Thời Gian</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {services.map((dichVu) => (
                        <TableRow key={dichVu.id}>
                            <TableCell>{dichVu.id}</TableCell>
                            <TableCell>{dichVu.tenDichVu}</TableCell>
                            <TableCell>{dichVu.maDichVu}</TableCell>
                            <TableCell>{dichVu.khoiLuongCongViec}</TableCell>
                            <TableCell>{dichVu.gia ? `${dichVu.gia} VND` : 'N/A'}</TableCell>
                            <TableCell>{dichVu.thoiGian ? `${dichVu.thoiGian} giờ` : 'N/A'}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                {renderTable('Dịch Vụ Chính', dichVuChinh)}
            </Grid>
            <Grid item xs={12} md={6}>
                {renderTable('Dịch Vụ Thêm', dichVuThem)}
            </Grid>
        </Grid>
    );
};

export default QuanLyDichVu;
