import { Autocomplete, Grid, Table, TableBody, TableCell, Checkbox, TableHead, TableRow, TextField, Typography, Box, FormControlLabel, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TablePagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { apiDanhSachDichVuDangHoatDong } from '../../../utils/DichVuUtils';
import { EPOCHTODATE, EPOCHTODATETIME } from '../../function/index';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
const ThongTinDonHang = ({ data }) => {
    const { donHangData, setDonHangData, chonNgayLamViecTrongTuan, setChonNgayLamViecTrongTuan, setSnackbar } = data;
    const [danhSachDichVuThem, setDanhSachDichVuThem] = useState([]);
    const [selectedDichVu, setSelectedDichVu] = useState([]);
    const [doiGio, setDoiGio] = useState(false);
    const [danhSachGioThucHien, setDanhSachGioThucHien] = useState([]);
    const danhSachThangLapLai = [{ label: 'Không lập lại' }, { value: 1, label: '1 tháng' }, { value: 2, label: '2 tháng' }, { value: 3, label: '3 tháng' }, { value: 4, label: '4 tháng' }, { value: 5, label: '5 tháng' }, { value: 6, label: '6 tháng' }, { value: 7, label: '7 tháng' }, { value: 8, label: '8 tháng' }, { value: 9, label: '9 tháng' }, { value: 10, label: '10 tháng' }, { value: 11, label: '11 tháng' }, { value: 12, label: '12 tháng' }];
    const [vatNuoi, setVatNuoi] = useState('');
    const [danhSachVatNuoi, setDanhSachVatNuoi] = useState(['Chó', 'Mèo', 'Khác']);
    const [gioDoiDaChon, setGioDoiDaChon] = useState(null);
    const [viTri, setViTri] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const danhSachLoaiDichVu = ['Dịch vụ cho gia đình','Dịch vụ chăm sóc và hỗ trợ', 'Dịch vụ bảo dưỡng điện máy', 'Dịch vụ dành cho doanh nghiệp', 'Dịch vụ tiện ích nâng cao']
    dayjs.locale('vi');
    useEffect(() => {
        setDonHangData(prevData => ({
            ...prevData,
            vatNuoi: vatNuoi
        }));
    }, [vatNuoi]);
    useEffect(() => {
        setDonHangData(prevData => ({
            ...prevData,
            danhSachDichVu: selectedDichVu,
            gioBatDau: null
        }));
    }, [selectedDichVu]);
    useEffect(() => {
        const generateTimeRanges = (interval) => {
            const timesArray = [];
            const businessStart = 8;
            const businessEnd = 17;
            for (let hour = businessStart; hour + interval <= businessEnd; hour++) {
                const startHour = hour.toString().padStart(2, '0');
                const endHour = (hour + interval).toString().padStart(2, '0');

                const timeString = `${startHour}:00 đến ${endHour}:00 (làm trong ${interval} giờ)`;
                if (!(hour <= 12 && hour + interval > 12)) {
                    timesArray.push({ timeString, startHour, interval });
                }
            }

            return timesArray;
        };

        const interval = donHangData.soGioThucHien || 1;
        const timeRanges = generateTimeRanges(interval);
        setDanhSachGioThucHien(timeRanges);
    }, [donHangData.soGioThucHien]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiDanhSachDichVuDangHoatDong();
                setDanhSachDichVuThem(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        setDonHangData(prevData => ({
            ...prevData,
            soThangLapLai: danhSachThangLapLai[0],
            ngayBatDau: dayjs(new Date()),
        }));
    }, []);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    const handleChangeDonHang = (e) => {
        const { name, value } = e.target;
        setDonHangData((prevData) => {
            const newData = { ...prevData, [name]: value };
            return newData;
        });
    };
    const handleSelect = (item) => {
        const existingService = selectedDichVu.find((dichVu) => dichVu.id === item.id);
        
        let newSelectedDichVu;
        if (existingService) {
            newSelectedDichVu = selectedDichVu.map((dichVu) =>
                dichVu.id === item.id ? { ...dichVu, soLanSuDung: dichVu.soLanSuDung + 1 } : dichVu
            );
        } else {
            newSelectedDichVu = [...selectedDichVu, { ...item, soLanSuDung: 1 }];
        }
    
        const newTotalTime = newSelectedDichVu.reduce((total, dichVu) => 
            total + (dichVu.thoiGian || 0) * (dichVu.soLanSuDung || 1), 0
        );
    
        if (newTotalTime <= 4) {
            setSelectedDichVu(newSelectedDichVu);
        } else {
            setSnackbar({ open: true, message: 'Đã đạt giới hạn thời gian thực hiện', severity: 'error' });
        }
    };
    useEffect(() => {
        setDonHangData(prevData => ({
            ...prevData,
            soGioThucHien: selectedDichVu.reduce((total, dichVu) => 
                total + (dichVu.thoiGian || 0) * (dichVu.soLanSuDung || 1), 0),
        }));
    }, [selectedDichVu]);
    


    const handleButtonClick = (day) => {
        if (chonNgayLamViecTrongTuan.includes(day)) {
            // Nếu ngày đã được chọn, loại bỏ khỏi danh sách
            setChonNgayLamViecTrongTuan(prevSelectedDays => prevSelectedDays.filter(item => item !== day));
        } else {
            // Nếu ngày chưa được chọn, thêm vào danh sách
            setChonNgayLamViecTrongTuan(prevSelectedDays => [...prevSelectedDays, day]);
        }
    };
    const handleDateChange = (date) => {
        const currentDate = new Date();

        if (date.$d <= currentDate.setDate(currentDate.getDate() - 1)) {
            setSnackbar({ open: true, message: 'Ngày không thể nhỏ hơn ngày hiện tại.', severity: 'error' });
        } else {
            setDonHangData((prevData) => ({
                ...prevData,
                ngayBatDau: date
            }));
        }
    };
    const xoaLich = (index) => {
        const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa không?");
        if (isConfirmed) {
            setDonHangData((prevData) => ({
                ...prevData,
                danhSachLichThucHien: prevData.danhSachLichThucHien.filter((lichThucHien, i) => i !== index)
            }));
            setSnackbar({ open: true, message: 'Xóa lịch thành công', severity: 'success' });
        }
    }
    const doiGioThucHien = () => {
        const startHour = parseInt(gioDoiDaChon.startHour);
        const thoiGianBatDau = donHangData.danhSachLichThucHien[viTri].thoiGianBatDau;

        const thoiGianBatDauMoi = new Date(thoiGianBatDau);
        thoiGianBatDauMoi.setHours(startHour);
        const thoiGianKetThuc = new Date(thoiGianBatDauMoi);
        thoiGianKetThuc.setHours(thoiGianKetThuc.getHours() + gioDoiDaChon.interval);
        const updatedData = {
            ...donHangData,
            danhSachLichThucHien: donHangData.danhSachLichThucHien.map((lich, idx) => {
                if (idx === viTri) {
                    return {
                        ...lich,
                        thoiGianBatDau: thoiGianBatDauMoi.getTime(),
                        thoiGianKetThuc: thoiGianKetThuc.getTime()
                    };
                }
                return lich;
            })
        };

        // Cập nhật state
        setDonHangData(updatedData);

        // Tắt chế độ đổi giờ
        setDoiGio(false);
        setGioDoiDaChon(null);
        setSnackbar({ open: true, message: 'Đổi giờ thực hiện thành công', severity: 'success' });
    }

    const handleKeyPress = (event) => {
        if (event.key == 'Enter') {
            setDoiGio(false);
            doiGioThucHien();
        }
    };
    const [loaiDichVu, setLoaiDichVu] = useState('');
    const [filteredDanhSachDichVuThem, setFilteredDanhSachDichVuThem] = useState([]);
    const handleLoaiDichVuChange = (event, newValue) => {
        setSelectedDichVu([]);
        setLoaiDichVu(newValue);
        if (newValue) {
            const filtered = danhSachDichVuThem.filter(dichVu => dichVu.loaiDichVu === newValue);
            setFilteredDanhSachDichVuThem(filtered);
        } else {
            setFilteredDanhSachDichVuThem([]);
        }
    };
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">Thông tin đơn hàng</Typography>
                </Grid>
                <Grid item xs={12}>
                <Autocomplete
                required
                getOptionLabel={(option) => option}
                options={danhSachLoaiDichVu}
                value={loaiDichVu}
                onChange={handleLoaiDichVuChange}
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
                <Grid item xs={12}>
                    <Typography><strong>Danh sách dịch vụ</strong></Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tên Dịch Vụ</TableCell>
                                <TableCell>Giá tiền</TableCell>
                                <TableCell>Số giờ thực hiện</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {filteredDanhSachDichVuThem.map((dichVu) => (
    <TableRow key={dichVu.id} sx={{
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: '#bec2cc',
        },
    }}>
        
        <TableCell>{dichVu.tenDichVu}</TableCell>
        <TableCell>{dichVu.gia !== null ? dichVu.gia.toLocaleString('vi-VN') + ' VNĐ' : ''} / giờ</TableCell>
        {/* <TableCell>{dichVu.thoiGian !== null ? '+ ' + dichVu.thoiGian + ' giờ' : ''} / lần</TableCell> */}
        <TableCell>
            <Box display="flex" alignItems="center">
                <Button
                variant="outlined"
                size='small'
                color='primary'
                    disabled={!selectedDichVu.some((item) => item.id === dichVu.id)}
                    onClick={(e) => {
                        e.stopPropagation();
                        const updatedSelectedDichVu = selectedDichVu.map((item) =>
                            item.id === dichVu.id ? { ...item, soLanSuDung: item.soLanSuDung - 1 } : item
                        ).filter((item) => item.soLanSuDung > 0);
                        setSelectedDichVu(updatedSelectedDichVu);
                    }}
                >
                    -
                </Button>
                <Typography variant="body1" component="span" style={{ margin: '0 8px' }}>
                    {selectedDichVu.find((item) => item.id === dichVu.id)?.soLanSuDung || 0} giờ
                </Typography>
                <Button onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(dichVu);
                }}
                variant="outlined"
                color='primary'
                size='small'
                >
                    +
                </Button>
            </Box>
        </TableCell>
    </TableRow>
))}

                        </TableBody>
                    </Table>
                </Grid>
                <Grid item xs={6}>
                    <Typography><strong>Tổng tiền: </strong>{donHangData.tongTien.toLocaleString('vi-VN') + ' VNĐ'} </Typography>
                </Grid>
                <Grid item xs={6}>
                    <Typography><strong>Thời gian thực hiện: </strong>{donHangData.soGioThucHien} <i>(Tối đa 4 giờ / đơn hàng)</i></Typography>
                    <Typography><i>* Vui lòng đặt 2 đơn gần giờ nhau nếu khách hàng yêu cầu quá 4 giờ</i></Typography>
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        required
                        options={danhSachVatNuoi}
                        value={donHangData.vatNuoi}
                        onChange={(event, newValue) => setVatNuoi(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Vật nuôi"
                                variant="outlined"
                                size="small"
                                fullWidth
                            />
                        )}
                    />
                </Grid>


                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Ghi chú cho đơn hàng"
                        name="ghiChu"
                        variant="outlined"
                        size="small"
                        multiline
                        minRows={6}
                        value={donHangData.ghiChu}
                        onChange={handleChangeDonHang}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        required
                        getOptionLabel={(option) => option.timeString}
                        options={danhSachGioThucHien}
                        value={donHangData.gioBatDau}
                        onChange={(event, newValue) => handleChangeDonHang({ target: { name: 'gioBatDau', value: newValue } })}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Chọn giờ bắt đầu và kết thúc"
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
                        getOptionLabel={(option) => option.label}
                        options={danhSachThangLapLai}
                        value={donHangData.soThangLapLai}
                        onChange={(event, newValue) => handleChangeDonHang({ target: { name: 'soThangLapLai', value: newValue } })}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Chọn số tháng lặp lại"
                                variant="outlined"
                                size="small"
                                fullWidth
                            />
                        )}
                    />
                </Grid>
                <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Box>
                        <Typography><strong>Chọn thứ làm việc trong tuần</strong></Typography>
                        <Box sx={{ flexDirection: 'row', marginTop: '20px' }}>
                            <Button sx={{ margin: '5px', width: '150px' }} variant={chonNgayLamViecTrongTuan.includes(1) ? 'contained' : 'outlined'} color='info' onClick={() => handleButtonClick(1)}>Thứ 2</Button>
                            <Button sx={{ margin: '5px', width: '150px' }} variant={chonNgayLamViecTrongTuan.includes(2) ? 'contained' : 'outlined'} color='info' onClick={() => handleButtonClick(2)}>Thứ 3</Button>
                            <Button sx={{ margin: '5px', width: '150px' }} variant={chonNgayLamViecTrongTuan.includes(3) ? 'contained' : 'outlined'} color='info' onClick={() => handleButtonClick(3)}>Thứ 4</Button>
                            <Button sx={{ margin: '5px', width: '150px' }} variant={chonNgayLamViecTrongTuan.includes(4) ? 'contained' : 'outlined'} color='info' onClick={() => handleButtonClick(4)}>Thứ 5</Button>
                            <Button sx={{ margin: '5px', width: '150px' }} variant={chonNgayLamViecTrongTuan.includes(5) ? 'contained' : 'outlined'} color='info' onClick={() => handleButtonClick(5)}>Thứ 6</Button>
                            <Button sx={{ margin: '5px', width: '150px' }} variant={chonNgayLamViecTrongTuan.includes(6) ? 'contained' : 'outlined'} color='info' onClick={() => handleButtonClick(6)}>Thứ 7</Button>
                            <Button sx={{ margin: '5px', width: '150px' }} variant={chonNgayLamViecTrongTuan.includes(0) ? 'contained' : 'outlined'} color='info' onClick={() => handleButtonClick(0)}>Chủ nhật</Button>
                        </Box>
                    </Box>
                    <Box>
                        <Typography><strong>Chọn ngày bắt đầu làm việc</strong></Typography>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar

                                value={donHangData.ngayBatDau}
                                onChange={handleDateChange}
                                dayOfWeekFormatter={(_day, weekday) => {
                                    if (_day.$W === 1) {
                                        return 'CN';
                                    } else if (_day.$W === 0) {
                                        return 'T7';
                                    } else {
                                        return 'T' + _day.$W;
                                    }
                                }}
                            />
                        </LocalizationProvider>
                    </Box>
                </Grid>
                {donHangData.danhSachLichThucHien.length ? (<Grid item xs={6}>

                    <Typography><strong>Danh sách lịch thực hiện</strong></Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Thời gian bắt đầu</TableCell>
                                <TableCell>Thời gian kết thúc</TableCell>
                                <TableCell>Thao tác</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {donHangData.danhSachLichThucHien
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const actualIndex = page * rowsPerPage + index; // Calculate the actual index
                                    return (
                                        <TableRow
                                            key={row.id}
                                            sx={{
                                                cursor: 'pointer',
                                                '&:hover': {
                                                    backgroundColor: '#bec2cc',
                                                },
                                            }}
                                        >
                                            <TableCell>{EPOCHTODATETIME(row.thoiGianBatDau)}</TableCell>
                                            <TableCell>{EPOCHTODATETIME(row.thoiGianKetThuc)}</TableCell>
                                            <TableCell>
                                                <Button
                                                    sx={{ marginRight: '10px' }}
                                                    variant='contained'
                                                    color='warning'
                                                    onClick={() => { setDoiGio(true); setViTri(actualIndex) }}>
                                                    Đổi giờ
                                                </Button>
                                                <Button
                                                    sx={{ marginRight: '10px' }}
                                                    variant='contained'
                                                    color='error'
                                                    onClick={() => xoaLich(actualIndex)}>
                                                    Xóa lịch
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography sx={{ marginTop: '15px' }}><strong>Tổng số ngày thực hiện: {donHangData.danhSachLichThucHien?.length}</strong></Typography>
                        <TablePagination
                            component="div"
                            count={donHangData.danhSachLichThucHien.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            rowsPerPageOptions={[5, 10, 15, 20, 30, 50, 100]}
                            labelRowsPerPage="Số hàng mỗi trang"
                        />
                    </Box>

                </Grid>) : (<></>)}

            </Grid>
            <Dialog open={doiGio} onClose={() => setDoiGio(false)} disableRestoreFocus onKeyPress={handleKeyPress}>
                <DialogTitle>Đổi giờ</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Chọn giờ muốn thay đổi:
                    </DialogContentText>
                    <Autocomplete
                        sx={{ width: '300px', marginTop: '10px' }}
                        required
                        getOptionLabel={(option) => option.timeString}
                        options={danhSachGioThucHien}
                        value={gioDoiDaChon}
                        onChange={(event, newValue) => setGioDoiDaChon(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Chọn giờ bắt đầu và kết thúc"
                                variant="outlined"
                                size="small"
                                fullWidth
                            />
                        )}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setDoiGio(false)} color="primary">
                        Hủy bỏ
                    </Button>
                    <Button onClick={doiGioThucHien} color="primary">
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default ThongTinDonHang;