import { Autocomplete, Grid, Table, TableBody, TableCell, Checkbox, TableHead, TableRow, TextField, Typography, Box, FormControlLabel, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { apiDanhSachDichVuChinh, dichVuLoader } from '../../../utils/DichVuUtils';
import {EPOCHTODATE, EPOCHTODATETIME} from '../../function/index';
const ThongTinDonHang = ({ data }) => {
    const { donHangData, setDonHangData,chonNgayLamViecTrongTuan, setChonNgayLamViecTrongTuan} = data;
    const [danhSachDichVuChinh, setDanhSachDichVuChinh] = useState([]);
    const [danhSachDichVuThem, setDanhSachDichVuThem] = useState([]);
    const [selectedDichVu, setSelectedDichVu] = useState([]);
    const [danhSachNgayThucHien, setDanhSachNgayThucHien] = useState([]);
    const [danhSachGioThucHien, setDanhSachGioThucHien] = useState([]);
    const [dichVuChinh, setDichVuChinh] = useState(null);
    const danhSachThangLapLai = [{ value: 1, label: '1 tháng' }, { value: 2, label: '2 tháng' }, { value: 3, label: '3 tháng' }, { value: 4, label: '4 tháng' }, { value: 5, label: '5 tháng' }, { value: 6, label: '6 tháng' }, { value: 7, label: '7 tháng' }, { value: 8, label: '8 tháng' }, { value: 9, label: '9 tháng' }, { value: 10, label: '10 tháng' }, { value: 11, label: '11 tháng' }, { value: 12, label: '12 tháng' }];

    useEffect(() => {
        setDonHangData(prevData => ({
            ...prevData,
            dichVuChinh: dichVuChinh
        }));
        setSelectedDichVu([]);
    }, [dichVuChinh]);
    useEffect(() => {
        const daysOfWeek = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
        const generateNext30Days = () => {
            const today = new Date();
            const daysArray = [];
            for (let i = 0; i < 30; i++) {
                const nextDay = new Date(today);
                nextDay.setDate(today.getDate() + i + 1);

                const day = nextDay.getDate().toString().padStart(2, '0');
                const month = (nextDay.getMonth() + 1).toString().padStart(2, '0');
                const year = nextDay.getFullYear();
                const formattedDate = `${day}-${month}-${year}`;

                daysArray.push({ formattedDate, nextDay });
            }
            return daysArray;
        };

        const next30Days = generateNext30Days();
        setDanhSachNgayThucHien(next30Days);
    }, []);
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
    return (
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
                <TextField
                    fullWidth
                    label="Vật nuôi"
                    name="vatNuoi"
                    variant="outlined"
                    size="small"
                    value={donHangData.vatNuoi}
                    onChange={handleChangeDonHang}
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
                <Button variant={chonNgayLamViecTrongTuan.includes("Monday") ? 'contained' : 'outlined'} color='info' onClick={() => handleButtonClick("Monday")}>T2</Button>
                <Button variant={chonNgayLamViecTrongTuan.includes("Tuesday") ? 'contained' : 'outlined'} color='info' onClick={() => handleButtonClick("Tuesday")}>T3</Button>
                <Button variant={chonNgayLamViecTrongTuan.includes("Wednesday") ? 'contained' : 'outlined'} color='info' onClick={() => handleButtonClick("Wednesday")}>T4</Button>
                <Button variant={chonNgayLamViecTrongTuan.includes("Thursday") ? 'contained' : 'outlined'} color='info' onClick={() => handleButtonClick("Thursday")}>T5</Button>
                <Button variant={chonNgayLamViecTrongTuan.includes("Friday") ? 'contained' : 'outlined'} color='info' onClick={() => handleButtonClick("Friday")}>T6</Button>
                <Button variant={chonNgayLamViecTrongTuan.includes("Saturday") ? 'contained' : 'outlined'} color='info' onClick={() => handleButtonClick("Saturday")}>T7</Button>
                <Button variant={chonNgayLamViecTrongTuan.includes("Sunday") ? 'contained' : 'outlined'} color='info' onClick={() => handleButtonClick("Sunday")}>CN</Button>
            </Grid>
            <Grid item xs={6}>
                <Autocomplete
                    options={danhSachNgayThucHien}
                    getOptionLabel={(option) => option.formattedDate}
                    value={donHangData.ngayBatDau}
                    onChange={(event, newValue) => handleChangeDonHang({ target: { name: 'ngayBatDau', value: newValue } })}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Chọn ngày thực hiện"
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
            <Grid item xs={12}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Ngày bắt đầu</TableCell>
                            <TableCell>Ngày kết thúc</TableCell>
                            <TableCell>Thao tác</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {donHangData.danhSachLichThucHien.map((lichThucHien) => (
                            <TableRow key={lichThucHien.thoiGianBatDau} sx={{
                                cursor: 'pointer',
                                '&:hover': {
                                    backgroundColor: '#bec2cc',
                                },
                            }} 
                            // onClick={() => handleSelect(dichVu)}
                            >
                                <TableCell>{EPOCHTODATETIME(lichThucHien.thoiGianBatDau)}</TableCell>
                                <TableCell>{EPOCHTODATETIME(lichThucHien.thoiGianKetThuc)}</TableCell>
                                <TableCell>
                                    <Button variant='contained' color='error'>Xóa</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
    );
};

export default ThongTinDonHang;