import React, { useEffect, useState } from 'react';
import {
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    TableSortLabel,
    TablePagination,
    Box,
    Divider,
    Tooltip,
} from '@mui/material';
import { fetchUploadedBackups, deleteFile } from '../../utils/HinhAnhUtils';
import { IMAGE_SERVER } from '../../utils/constants';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import FileUpload from './FileUpload';
import { apiPhucHoiDuLieu, apiTaoSaoLuu } from '../../utils/HeThongUtils';

const SaoLuuPhucHoi = () => {
    const [uploadedBackup, setUploadedBackup] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('path');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    useEffect(() => {
        fetchUploadedBackups()
            .then(response => setUploadedBackup(response.data))
            .catch(error => console.error('Error fetching documents: ', error));
    }, []);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleDeleteFile = (fileType, path) => {
        const filename = path.substring(fileType === 'backup' ? '/backups/'.length : null);
        deleteFile(fileType, filename)
            .then(() => {
                setUploadedBackup(uploadedBackup.filter(backup => backup.path !== path));
            })
            .catch(error => console.error(`Error deleting ${fileType}: `, error));
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const sortedRows = (rows) => {
        return rows.sort((a, b) => {
            if (orderBy === 'path') {
                return order === 'asc' ? a.path.localeCompare(b.path) : b.path.localeCompare(a.path);
            }
            return 0;
        });
    };

    const paginatedRows = (rows) => {
        return sortedRows(rows).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    };
    const handleUploadSuccess = (filePath) => {
        console.log('Uploaded path: ', filePath);
        alert('Upload thành công');
        window.location.reload();
    };
    const handleTaoFileSaoLuu = async () => {
        try{
            const data = await apiTaoSaoLuu();
            alert('Tạo thành công file sao lưu');
            window.location.reload();
        }catch(error){
            alert('Tạo thành công file sao lưu');
            window.location.reload();
        }
    };
    const handleKhoiPhucDuLieu = async (backupFileName) => {
        const conform = window.confirm(`Bạn có chắc chắn muốn phục hồi dữ liệu từ file ${backupFileName.split('/').slice(-1)[0]} không? Các dữ liệu hiện tại sẽ bị xóa hết và thay thế bằng dữ liệu từ file ${backupFileName.split('/').slice(-1)[0]}`);
        if(conform){
            const data = await apiPhucHoiDuLieu(backupFileName.split('/').slice(-1)[0]);
            if(data){
                alert(`sao lưu ${backupFileName.split('/').slice(-1)[0]} đã được phục hồi thành công`);
            }
        }
           
    };
    return (
        <Paper>
            <Box sx={{display: 'flex', justifyContent: 'space-between',padding: '10px'}}>
            <Typography variant="h4">
                Danh sách File khôi phục hệ thống:
            </Typography>
            <Box sx={{display: 'flex'}}>
            <FileUpload accept=""
                onUploadSuccess={handleUploadSuccess} />
            <Button variant='contained' color='info' size='small' sx={{marginLeft: '10px', width: '40%'}} onClick={handleTaoFileSaoLuu}>
                Tạo File sao lưu     
            </Button>
            </Box>
            </Box>
            <Divider />
            <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sortDirection={orderBy === 'path' ? order : false}>
                                <TableSortLabel
                                    active={orderBy === 'path'}
                                    direction={orderBy === 'path' ? order : 'asc'}
                                    onClick={(event) => handleRequestSort(event, 'path')}
                                >
                                    Tên File
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Tải Xuống</TableCell>
                            <TableCell>Hành động</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedRows(uploadedBackup).map((backup) => (
                            <TableRow key={backup.path}>
                                <TableCell>{backup.path.split('/').slice(-1)[0]}</TableCell>
                                <TableCell>
                                    <a href={`${IMAGE_SERVER}${backup.path}`} target="_blank" rel="noopener noreferrer">
                                        <Tooltip title="Tải xuống">
                                            <DownloadForOfflineIcon sx={{paddingInline: '10px'}} color="primary"/>
                                        </Tooltip>
                                    </a>
                                </TableCell>
                                <TableCell>
                                    {uploadedBackup.length > 1 && (
                                        <Button
                                            variant="contained"
                                            color='error'
                                            onClick={() => handleDeleteFile('backup', backup.path)}
                                        >
                                            Xóa
                                        </Button>
                                    )}
                                    <Button
                                            variant="contained"
                                            color='info'
                                            onClick={() => handleKhoiPhucDuLieu(backup.path)}
                                            sx={{ marginLeft: '10px' }}
                                        >
                                            Phục hồi dữ liệu
                                        </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={uploadedBackup.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default SaoLuuPhucHoi;
