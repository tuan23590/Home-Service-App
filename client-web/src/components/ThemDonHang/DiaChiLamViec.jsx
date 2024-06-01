import { Autocomplete, Grid, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { apiQuanHuyen, apiTinhTP, apiXaPhuong } from '../../../utils/DiaChiUtil';

const DiaChiLamViec = ({data}) => {
    const {diaChiData,setDiaChiData,khachHangData} = data;
    const [danhSachTinhTp, setDanhSachTinhTp] = useState([]);
    const [danhSachQuanHuyen, setDanhSachQuanHuyen] = useState([]);
    const [danhSachXaPhuong, setDanhSachXaPhuong] = useState([]);
    const [diaChiSelected,setDiaChiSelected] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await apiTinhTP();
                setDanhSachTinhTp(data.DanhSachTinhTp)
                const dsDiaChiCuaKhachHang = khachHangData.danhSachDiaChi;
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
        console.log(khachHangData.danhSachDiaChi)
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (diaChiData.tinhTp?.code) {
                    const { data } = await apiQuanHuyen(diaChiData.tinhTp?.code);
                    setDanhSachQuanHuyen(data.DanhSachQuanHuyen)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [diaChiData.tinhTp]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                if (diaChiData.quanHuyen?.code) {
                    const { data } = await apiXaPhuong(diaChiData.quanHuyen?.code);
                    setDanhSachXaPhuong(data.DanhSachXaPhuong)
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [diaChiData.quanHuyen]);


    const handleChangeDiaChi = (event) => {
        const { name, value } = event.target;

        setDiaChiData((prevData) => {
            const newData = { ...prevData, [name]: value };

            // Reset các trường khác khi tinhTp thay đổi
            if (name === 'tinhTp') {
                newData.quanHuyen = null;
                newData.xaPhuong = null;
                newData.soNhaTenDuong = '';
                newData.ghiChu = '';
                setDanhSachQuanHuyen([]);
                setDanhSachXaPhuong([]);
            }
            if (name === 'quanHuyen') {
                newData.xaPhuong = null;
                newData.soNhaTenDuong = '';
                newData.ghiChu = '';
                setDanhSachXaPhuong([]);
            }
            if (name === 'xaPhuong') {
                newData.soNhaTenDuong = '';
                newData.ghiChu = '';
            }

            return newData;
        });
    };
    return (
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <Typography variant="h6">Địa chỉ làm việc</Typography>
        </Grid>
        <Grid item xs={12}>
                <Autocomplete
                    required
                    getOptionLabel={(option) => option.tinhTP}
                    options={diaChiData}
                    value={khachHangData?.danhSachDiaChi}
                    //onChange={(event,value) => handleChangeAutocompleteKhachHang(event,value)}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Danh sách địa chỉ của khách hàng"
                            variant="outlined"
                            size="small"
                            fullWidth
                        />
                    )}
                />
            </Grid>
        <Grid item xs={6}>
            <Autocomplete
                options={danhSachTinhTp}
                getOptionLabel={(option) => option.name_with_type}
                value={diaChiData.tinhTp}
                onChange={(event, newValue) => handleChangeDiaChi({ target: { name: 'tinhTp', value: newValue } })}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Tỉnh/Thành phố"
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
                options={danhSachQuanHuyen}
                getOptionLabel={(option) => option.name_with_type}
                value={diaChiData.quanHuyen}
                onChange={(event, newValue) => handleChangeDiaChi({ target: { name: 'quanHuyen', value: newValue } })}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Quận/Huyện"
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
                options={danhSachXaPhuong}
                getOptionLabel={(option) => option.name_with_type}
                value={diaChiData.xaPhuong}
                onChange={(event, newValue) => handleChangeDiaChi({ target: { name: 'xaPhuong', value: newValue } })}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Xã/Phường"
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                )}
            />
        </Grid>
        <Grid item xs={6}>
            <TextField
            required
                fullWidth
                label="Số nhà/Tên đường"
                name="soNhaTenDuong"
                variant="outlined"
                size="small"
                value={diaChiData.soNhaTenDuong}
                onChange={handleChangeDiaChi}
            />
        </Grid>
        <Grid item xs={6}>
            <TextField
                fullWidth
                label="Ghi chú địa chỉ"
                name="ghiChu"
                variant="outlined"
                size="small"
                value={diaChiData.ghiChu}
                onChange={handleChangeDiaChi}
            />
        </Grid>
    </Grid>
    );
};

export default DiaChiLamViec;