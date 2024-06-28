import React, { useState } from 'react';
import { Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Paper, Rating, TextField, Typography } from '@mui/material';
import { EPOCHTODATE, EPOCHTODATETIMETOTIME } from '../../function/index';
import { apiDanhGiaDonHang } from '../../../utils/DonHangUtils';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const DonHangDaMua = ({ data }) => {
    const { danhSachDonHang, loading, fetchData } = data;
    const [filter, setFilter] = useState('Tất cả');
    const [openReviewDialog, setOpenReviewDialog] = useState(false);
    const [rating, setRating] = useState(0); // For star rating (out of 5)
    const [reviewText, setReviewText] = useState('');
    const [donHangSelected, setDonHangSelected] = useState(null);
    const [searchOrderId, setSearchOrderId] = useState('');
    const navigate = useNavigate();

    const filteredDonHang = danhSachDonHang.filter(donHang => {
        if (filter === 'Tất cả') return true;
        if (filter === 'Đang xử lý') return donHang.trangThaiDonHang === 'Đang chờ duyệt' || donHang.trangThaiDonHang === 'Chờ xác nhận';
        return donHang.trangThaiDonHang === filter;
    }).filter(donHang => {
        return donHang.maDonHang.toLowerCase().includes(searchOrderId.toLowerCase());
    });

    const handleOpenReviewDialog = (donHang) => {
        setDonHangSelected(donHang);
        setOpenReviewDialog(true);
    };

    const handleCloseReviewDialog = () => {
        setOpenReviewDialog(false);
        setDonHangSelected(null);
    };

    const handleSaveReview = async () => {
        const data = await apiDanhGiaDonHang(donHangSelected.id, rating, reviewText);
        if (data) {
            alert('Đánh giá đơn hàng thành công');
            setOpenReviewDialog(false);
            setDonHangSelected(null);
            setReviewText('');
            setRating(0);
            fetchData();
        } else {
            alert('Đánh giá đơn hàng thất bại');
        }
    };

    return (
        <>
            <Typography variant="h5" sx={{ marginBottom: '10px' }}>Danh sách đơn hàng</Typography>
            <Box>
                {['Tất cả', 'Đang xử lý', 'Đang thực hiện', 'Đã hoàn thành', 'Đã từ chối'].map((status, index) => (
                    <Button
                        key={index}
                        variant={filter === status ? 'contained' : 'outlined'}
                        color={filter === status ? 'info' : 'inherit'}
                        size='small'
                        sx={{ marginLeft: index === 0 ? '0' : '5px' }}
                        onClick={() => setFilter(status)}
                    >
                        {status}
                    </Button>
                ))}
            </Box>

            <TextField
                label='Nhập mã đơn hàng cần tìm...'
                sx={{
                    marginY: '15px',
                    width: '500px',
                }}
                autoFocus
                value={searchOrderId}
                onChange={(e) => setSearchOrderId(e.target.value)}
                InputProps={{
                    endAdornment: (
                        <SearchIcon />
                    )
                }}
            />

            <Divider />
            {loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                    <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ height: '76vh', overflowX: 'auto'}}>
                    {filteredDonHang.length > 0 ? (
                        filteredDonHang.map((donHang, index) => (
                            <Paper
                                key={index}
                                sx={{
                                    padding: 2,
                                    marginTop: 2,
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5',
                                    }
                                }}
                            >
                                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <Typography><strong>Đơn hàng:</strong> {donHang?.maDonHang}</Typography>
                                    <Typography
                                        sx={{
                                            backgroundColor:
                                                donHang.trangThaiDonHang === 'Đang thực hiện' ? '#66bb6a' :
                                                    donHang.trangThaiDonHang === 'Đã hoàn thành' ? '#64b5f6' :
                                                        donHang.trangThaiDonHang === 'Đang chờ duyệt' ? '#fff176' :
                                                            donHang.trangThaiDonHang === 'Chờ xác nhận' ? '#fff176' :
                                                                '#e57373',
                                            padding: '5px', borderRadius: '5px'
                                        }}
                                    >
                                        {donHang.trangThaiDonHang}
                                    </Typography>

                                </Box>
                                <Divider sx={{ marginY: '10px' }} />
                                <Typography><strong>Ngày đặt hàng:</strong> {EPOCHTODATE(donHang.ngayDatHang)}</Typography>
                                <Typography><strong>Thời gian thực hiện:</strong> {EPOCHTODATETIMETOTIME(donHang.ngayBatDau, donHang.ngayKetThuc)}</Typography>
                                <Typography>
                                    <strong>Dịch vụ: </strong>
                                    {donHang.danhSachDichVu.map((dichVu, index) => (
                                        index === donHang.danhSachDichVu.length - 1
                                            ? dichVu.tenDichVu
                                            : `${dichVu.tenDichVu}, `
                                    ))}
                                </Typography>
                                {donHang.trangThaiDonHang === 'Đã hoàn thành' && (
                                    <Typography><strong>Đánh giá đơn hàng: </strong> {donHang.saoDanhGia ? (`${donHang.saoDanhGia} sao`) : ('Chưa đánh giá')}</Typography>
                                )}
                                <Typography><strong>Tổng tiền: </strong> <span style={{ fontSize: '25px' }}>{donHang.tongTien.toLocaleString()} VNĐ</span></Typography>
                                <Divider sx={{ marginY: '10px' }} />
                                <Box sx={{ display: 'flex', justifyContent: 'end' }}>
                                    {donHang.trangThaiDonHang === 'Đã hoàn thành' && (
                                        <Button variant='outlined' color={donHang.saoDanhGia ? ('info') : ('inherit')} size='small' onClick={() => { handleOpenReviewDialog(donHang) }}>{donHang.saoDanhGia ? ('Đánh giá đơn hàng') : ('Đánh giá lại đơn hàng')}</Button>
                                    )}
                                    <Button variant='contained' color='info' size='small' sx={{ marginLeft: '5px' }} onClick={() => { navigate(`./${donHang.id}`) }}>Xem chi tiết</Button>

                                </Box>
                            </Paper>
                        ))
                    ) : (
                        <Typography variant="body1" sx={{ textAlign: 'center', marginTop: 2 }}>
                            Không có đơn hàng nào
                        </Typography>
                    )}
                </Box>
            )}
            <Dialog open={openReviewDialog} onClose={handleCloseReviewDialog} fullWidth maxWidth="sm">
                <DialogTitle>Đánh giá đơn hàng {donHangSelected?.maDonHang}</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant='h6'>Đánh giá:</Typography>
                        <Rating
                            size="large"
                            value={rating}
                            onChange={(event, newValue) => {
                                setRating(newValue);
                            }}
                        />
                        <Typography variant='h6'>({rating}/5)</Typography>
                    </Box>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Nội dung đánh giá"
                        fullWidth
                        multiline
                        value={reviewText}
                        onChange={(event) => {
                            setReviewText(event.target.value);
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button variant='outlined' color='error' sx={{ width: '100px' }} onClick={handleCloseReviewDialog}>
                        Hủy
                    </Button>
                    <Button variant='contained' color='info' sx={{ width: '200px' }} onClick={handleSaveReview}>
                        Đánh giá đơn hàng
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default DonHangDaMua;
