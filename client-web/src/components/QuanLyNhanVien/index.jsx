import React, { useState } from 'react';
import {
    Box,
    Button,
    Divider,
    Typography,
    TableContainer,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    TablePagination,
    Paper,
    Avatar,
    TableSortLabel,
    Tooltip,
} from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import NhanVienDetail from './ThongTinNhanVien';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { apiXoaNhanVien } from '../../../utils/NhanVienUtils';
import { IMAGE_SERVER } from '../../../utils/constants';

const QuanLyNhanVien = () => {
    const [danhSachNhanVien,setDanhSachNhanVien] = useState(useLoaderData());
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [orderBy, setOrderBy] = useState('');
    const [order, setOrder] = useState('asc');
    const [openDialog, setOpenDialog] = useState(false); // State để quản lý mở/đóng dialog
    const [selectedNhanVien, setSelectedNhanVien] = useState(null); // State để lưu thông tin nhân viên được chọn
    const [action, setAction] = useState(null);
    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrderBy(property);
        setOrder(isAsc ? 'desc' : 'asc');
    };

    const sortedData = () => {
        if (!orderBy) {
            return danhSachNhanVien;
        }
        return danhSachNhanVien.sort((a, b) => {
            const aValue = a[orderBy] || '';
            const bValue = b[orderBy] || '';
            if (order === 'asc') {
                return aValue.localeCompare(bValue);
            } else {
                return bValue.localeCompare(aValue);
            }
        });
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenDialog = () => {
        setAction('add');
        setSelectedNhanVien(null);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setAction(null);
        setSelectedNhanVien(null);
        
    };

    const handleClickRow = (nhanVien) => {
        setAction('view');
        setSelectedNhanVien(nhanVien);
        setOpenDialog(true);
    };
    const handleDelete = async (nhanVien) => {
        const confirmDelete = window.confirm(`Bạn có chắc chắn muốn xóa nhân viên ${nhanVien.tenNhanVien} không?`);
        if (confirmDelete) {
            const data = await apiXoaNhanVien(nhanVien.id);
            if (data) {
                alert(`Xóa nhân viên ${nhanVien.tenNhanVien} thành công`);
                const updatedDanhSach = danhSachNhanVien.filter(nv => nv.id !== nhanVien.id);
                setDanhSachNhanVien(updatedDanhSach);
                setSelectedNhanVien(null);
            } else {
                alert('Xóa nhân viên thất bại!');
            }
        }
    };
    
    const handleEdit = (nhanVien) => {
        setAction('edit');
        setSelectedNhanVien(nhanVien);
        setOpenDialog(true);
    }

    return (
        <Paper>
            <Box sx={{ padding: '10px', display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="h4">Quản lý nhân viên</Typography>
                <Button
                    variant="contained"
                    color="info"
                    size="small"
                    onClick={() => handleOpenDialog()} // Mở dialog để thêm mới nhân viên
                >
                    Thêm nhân viên
                </Button>
            </Box>
            <Divider />
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell />
                            <SortableTableCell label="Tên nhân viên" sortKey="tenNhanVien" />
                            <SortableTableCell label="Email" sortKey="email" />
                            <SortableTableCell label="Chuyên nôn" sortKey="chuyenMon" />
                            <SortableTableCell
                                label="Trạng thái tài khoản"
                                sortKey="trangThaiTaiKhoan"
                            />
                            <SortableTableCell label="Phân quyền" sortKey="phanQuyen" />
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData()
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((nhanVien) => (
                                <TableRow key={nhanVien.id} sx={{ '&:hover': {
                                    background: '#bec2cc'
                                  },cursor: 'pointer'}}>
                                    <TableCell onClick={() => handleClickRow(nhanVien)}>
                                        <Avatar
                                            alt={nhanVien.tenNhanVien}
                                            src={`${IMAGE_SERVER}${nhanVien.anhDaiDien}`}
                                            sx={{ width: '25px', height: '25px' }}
                                        />
                                    </TableCell>
                                    <TableCell onClick={() => handleClickRow(nhanVien)}>{nhanVien.tenNhanVien}</TableCell>
                                    <TableCell onClick={() => handleClickRow(nhanVien)}>{nhanVien.email}</TableCell>
                                    <TableCell onClick={() => handleClickRow(nhanVien)}>{nhanVien.chuyenMon||'Không có chuyên môn'}</TableCell>
                                    <TableCell onClick={() => handleClickRow(nhanVien)}>{nhanVien.trangThaiTaiKhoan}</TableCell>
                                    <TableCell onClick={() => handleClickRow(nhanVien)}>{nhanVien.phanQuyen}</TableCell>
                                    {nhanVien.phanQuyen !== 'Admin' ? (
                                        <TableCell>
                                        <Tooltip title="Xóa" arrow onClick={()=>handleDelete(nhanVien)}>
                                            <DeleteIcon sx={{paddingInline: '10px'}} color="error" />
                                        </Tooltip>
                                        <Tooltip title="Chỉnh sửa" arrow onClick={()=>handleEdit(nhanVien)}>
                                            <EditIcon sx={{paddingInline: '10px'}} color="primary" />
                                        </Tooltip>
                                    </TableCell>
                                    ):null}
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={danhSachNhanVien.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </TableContainer>
            {/* Dialog để hiển thị chi tiết hoặc chỉnh sửa nhân viên */}
            <NhanVienDetail
                open={openDialog}
                handleClose={handleCloseDialog}
                nhanVien={selectedNhanVien}
                action={action}
            />
        </Paper>
    );
};

const SortableTableCell = ({ label, sortKey }) => {
    const { orderBy, order, handleRequestSort } = useSortableTable(sortKey);

    return (
        <TableCell>
            <TableSortLabel
                active={orderBy === sortKey}
                direction={orderBy === sortKey ? order : 'asc'}
                onClick={() => handleRequestSort(sortKey)}
            >
                {label}
            </TableSortLabel>
        </TableCell>
    );
};

const useSortableTable = (defaultOrderBy) => {
    const [orderBy, setOrderBy] = useState(defaultOrderBy);
    const [order, setOrder] = useState('asc');

    const handleRequestSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrderBy(property);
        setOrder(isAsc ? 'desc' : 'asc');
    };

    return { orderBy, order, handleRequestSort };
};

export default QuanLyNhanVien;
