import { Autocomplete, Grid, Table, TableBody, TableCell, Checkbox, TableHead, TableRow, TextField, Typography, Box, FormControlLabel, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, TablePagination } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { apiDanhSachDichVuChinh, dichVuLoader } from '../../../utils/DichVuUtils';
import { EPOCHTODATE, EPOCHTODATETIME } from '../../function/index';

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import 'dayjs/locale/vi';
const ThongTinDonHang = ({ data }) => {
    const { donHangData, setDonHangData, chonNgayLamViecTrongTuan, setChonNgayLamViecTrongTuan, setSnackbar } = data;
    const [danhSachDichVuChinh, setDanhSachDichVuChinh] = useState([]);
    const [danhSachDichVuThem, setDanhSachDichVuThem] = useState([]);
    const [selectedDichVu, setSelectedDichVu] = useState([]);
    const [doiGio, setDoiGio] = useState(false);
    const [danhSachGioThucHien, setDanhSachGioThucHien] = useState([]);
    const [dichVuChinh, setDichVuChinh] = useState(null);
    const danhSachThangLapLai = [{ label: 'Không lập lại' }, { value: 1, label: '1 tháng' }, { value: 2, label: '2 tháng' }, { value: 3, label: '3 tháng' }, { value: 4, label: '4 tháng' }, { value: 5, label: '5 tháng' }, { value: 6, label: '6 tháng' }, { value: 7, label: '7 tháng' }, { value: 8, label: '8 tháng' }, { value: 9, label: '9 tháng' }, { value: 10, label: '10 tháng' }, { value: 11, label: '11 tháng' }, { value: 12, label: '12 tháng' }];
    const [vatNuoi, setVatNuoi] = useState('');
    const [danhSachVatNuoi, setDanhSachVatNuoi] = useState(['Chó', 'Mèo', 'Khác']);
    const [gioDoiDaChon, setGioDoiDaChon] = useState(null);
    const [viTri, setViTri] = useState(null);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    dayjs.locale('vi');
    useEffect(() => {
        setDonHangData(prevData => ({
            ...prevData,
            dichVuChinh: dichVuChinh,
            vatNuoi: vatNuoi
        }));
        setSelectedDichVu([]);
    }, [dichVuChinh, vatNuoi]);

    useEffect(() => {
        const generateTimeRanges = (interval) => {
            const timesArray = [];
            const businessStart = 9;
            const businessEnd = 17;
            for (let hour = businessStart; hour + interval <= businessEnd; hour++) {
                const startHour = hour.toString().padStart(2, '0');
                const endHour = (hour + interval).toString().padStart(2, '0');

                const timeString = `${startHour}:00 đến ${endHour}:00 (làm trong ${interval} giờ)`;

                timesArray.push({ timeString, startHour, interval });
            }

            return timesArray;
        };

        const interval = donHangData.dichVuChinh?.thoiGian || 1;
        const timeRanges = generateTimeRanges(interval);
        setDanhSachGioThucHien(timeRanges);
    }, [donHangData.dichVuChinh]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const dataDanhSachDichvuThem = await dichVuLoader();
                setDanhSachDichVuThem(dataDanhSachDichvuThem.data.DichVuThem);
                const dataDanhSachDichVuChinh = await apiDanhSachDichVuChinh();
                setDanhSachDichVuChinh(dataDanhSachDichVuChinh.data.DichVuCaLe);
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
    useEffect(() => {
        const totalThoiGian = (dichVuChinh?.thoiGian || 0) + selectedDichVu.reduce((total, dichVu) => total + (dichVu.thoiGian || 0), 0);
        const dichVuChinhMoi = danhSachDichVuChinh.find(item => item.thoiGian === totalThoiGian);
        setDonHangData((prevData) => ({
            ...prevData,
            dichVuChinh: dichVuChinhMoi,
            danhSachDichVuThem: selectedDichVu,
            gioBatDau: null,
        }));
    }, [selectedDichVu]);
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
            if (name === 'dichVuChinh') {
                newData.gioBatDau = null;
                newData.ngayBatDau = null;
            }
            return newData;
        });
    };
    const handleSelect = (item) => {
        if (selectedDichVu.includes(item)) {
            setSelectedDichVu(selectedDichVu.filter((dichVu) => dichVu !== item));
        } else {
            if ((dichVuChinh.thoiGian || 0) + selectedDichVu.reduce((total, dichVu) => total + (dichVu.thoiGian || 0), 0) < 4 || item.thoiGian === null) {
                setSelectedDichVu([...selectedDichVu, item]);
            } else {
                alert("Không thể thêm dịch vụ vì đã đạt tối đa thời gian.");
            }
        }

    };
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

        // endDate;

        if (date.$d <= currentDate.setDate(currentDate.getDate() - 1)) {
            alert("Ngày không thể nhỏ hơn ngày hiện tại.");
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
        // Lấy giờ từ value.startHour và chuyển thành số nguyên
        const startHour = parseInt(gioDoiDaChon.startHour);

        // Lấy thời gian bắt đầu hiện tại từ donHangData
        const thoiGianBatDau = donHangData.danhSachLichThucHien[viTri].thoiGianBatDau;

        // Tính toán thời gian kết thúc mới bằng cách cộng thêm số giờ từ value.interval


        // Thiết lập thời gian bắt đầu mới
        const thoiGianBatDauMoi = new Date(thoiGianBatDau);
        thoiGianBatDauMoi.setHours(startHour);
        const thoiGianKetThuc = new Date(thoiGianBatDauMoi);
        thoiGianKetThuc.setHours(thoiGianKetThuc.getHours() + gioDoiDaChon.interval);
        // Cập nhật dữ liệu
        const updatedData = {
            ...donHangData,
            danhSachLichThucHien: donHangData.danhSachLichThucHien.map((lich, idx) => {
                if (idx === viTri) {
                    return {
                        ...lich,
                        thoiGianBatDau: thoiGianBatDauMoi.getTime(), // Chuyển thành milliseconds
                        thoiGianKetThuc: thoiGianKetThuc.getTime() // Chuyển thành milliseconds
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

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Typography variant="h6">Thông tin đơn hàng</Typography>
                </Grid>
                <Grid item xs={6}>
                    <Autocomplete
                        required
                        getOptionLabel={(option) => option.tenDichVu}
                        options={danhSachDichVuChinh}
                        value={donHangData.dichVuChinh}
                        onChange={(event, newValue) => setDichVuChinh(newValue)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Dịch vụ chính"
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
                    <Typography><strong>Danh sách dich vụ thêm</strong></Typography>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Chọn</TableCell>
                                <TableCell>Tên Dịch Vụ</TableCell>
                                <TableCell>Giá</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {danhSachDichVuThem.map((dichVu) => (
                                <TableRow key={dichVu.id} sx={{
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: '#bec2cc',
                                    },
                                }} onClick={() => handleSelect(dichVu)}>
                                    <TableCell>
                                        <Checkbox
                                            checked={selectedDichVu.includes(dichVu)}
                                            onChange={() => handleSelect(dichVu)}
                                        />
                                    </TableCell>
                                    <TableCell>{dichVu.tenDichVu}</TableCell>
                                    <TableCell>{dichVu.gia !== null ? '+ ' + dichVu.gia + ' VNĐ' : '+ ' + dichVu.thoiGian + ' giờ'}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Grid>

                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Ghi chú"
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
                    <TextField
                        fullWidth
                        label="Dịch vụ theo yêu cầu của khách hàng"
                        name="dichVuTheoYeuCauCuaKhachHang"
                        variant="outlined"
                        size="small"
                        value={donHangData.dichVuTheoYeuCauCuaKhachHang}
                        onChange={handleChangeDonHang}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        fullWidth
                        label="Giá DV theo yêu cầu của khách hàng"
                        name="giaDichVuTheoYeuCauCuaKhachHang"
                        variant="outlined"
                        size="small"
                        type='number'
                        value={donHangData.giaDichVuTheoYeuCauCuaKhachHang}
                        onChange={handleChangeDonHang}
                    />
                </Grid>
                <Grid container item xs={6} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button variant={chonNgayLamViecTrongTuan.includes(1) ? 'contained' : 'outlined'} color='info' onClick={() => handleButtonClick(1)}>T2</Button>
                    <Button variant={chonNgayLamViecTrongTuan.includes(2) ? 'contained' : 'outlined'} color='info' onClick={() => handleButtonClick(2)}>T3</Button>
                    <Button variant={chonNgayLamViecTrongTuan.includes(3) ? 'contained' : 'outlined'} color='info' onClick={() => handleButtonClick(3)}>T4</Button>
                    <Button variant={chonNgayLamViecTrongTuan.includes(4) ? 'contained' : 'outlined'} color='info' onClick={() => handleButtonClick(4)}>T5</Button>
                    <Button variant={chonNgayLamViecTrongTuan.includes(5) ? 'contained' : 'outlined'} color='info' onClick={() => handleButtonClick(5)}>T6</Button>
                    <Button variant={chonNgayLamViecTrongTuan.includes(6) ? 'contained' : 'outlined'} color='info' onClick={() => handleButtonClick(6)}>T7</Button>
                    <Button variant={chonNgayLamViecTrongTuan.includes(0) ? 'contained' : 'outlined'} color='info' onClick={() => handleButtonClick(0)}>CN</Button>
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
                {donHangData.danhSachLichThucHien.length ? (<Grid item xs={12}>

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

                    <TablePagination
                        component="div"
                        count={donHangData.danhSachLichThucHien.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        rowsPerPageOptions={[10, 15, 20, 30, 50, 100]}
                        labelRowsPerPage="Số hàng mỗi trang"
                    />
                    <Typography><strong>Tổng số ngày thực hiện: {donHangData.danhSachLichThucHien?.length}</strong></Typography>
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