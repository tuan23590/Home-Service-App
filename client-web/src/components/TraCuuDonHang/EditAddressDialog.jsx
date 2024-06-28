import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField, MenuItem, Grid } from '@mui/material';
import { apiQuanHuyen, apiSuaDiaChi, apiThemDiaChi, apiTinhTP, apiXaPhuong } from '../../../utils/DiaChiUtil';

const EditAddressDialog = ({ data }) => {
    const { isEditAddressDialogOpen, closeEditDialog, diaChiSelected, fetchData, thongTinKhachHang } = data;

    const [dsTinhTP, setDsTinhTP] = useState([]);
    const [dsQuanHuyen, setDsQuanHuyen] = useState([]);
    const [dsXaPhuong, setDsXaPhuong] = useState([]);
    const [formData, setFormData] = useState({
        idKhachHang: '',
        soNhaTenDuong: '',
        xaPhuong: '',
        quanHuyen: '',
        tinhTP: '',
        ghiChu: '',
        idDiaChi: '',
    });

    const [errors, setErrors] = useState({
        soNhaTenDuong: false,
        xaPhuong: false,
        quanHuyen: false,
        tinhTP: false,
    });

    useEffect(() => {
        if (diaChiSelected) {
            setFormData({
                soNhaTenDuong: diaChiSelected.soNhaTenDuong,
                xaPhuong: diaChiSelected.xaPhuong,
                quanHuyen: diaChiSelected.quanHuyen,
                tinhTP: dsTinhTP.find((tinhTP) => tinhTP.name_with_type === diaChiSelected.tinhTP) || '',
                ghiChu: diaChiSelected.ghiChu,
                idKhachHang: thongTinKhachHang?.id,
                idDiaChi: diaChiSelected?.id,
            });
        } else {
            setFormData({
                soNhaTenDuong: '',
                xaPhuong: '',
                quanHuyen: '',
                tinhTP: '',
                ghiChu: '',
                idKhachHang: thongTinKhachHang?.id,
            });
        }
        setErrors({
            soNhaTenDuong: false,
            xaPhuong: false,
            quanHuyen: false,
            tinhTP: false,
        });
        setDsQuanHuyen([]);
        setDsXaPhuong([]);
    }, [diaChiSelected, isEditAddressDialogOpen, dsTinhTP, thongTinKhachHang?.id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let isValid = true;

        if (name === 'soNhaTenDuong' && !value.trim()) {
            isValid = false;
        } else if (name === 'xaPhuong' && !value) {
            isValid = false;
        } else if (name === 'quanHuyen' && !value) {
            isValid = false;
        } else if (name === 'tinhTP' && !value) {
            isValid = false;
        }

        setErrors({ ...errors, [name]: !isValid });
    };

    const isFormValid = () => {
        return Object.values(errors).every(error => !error) &&
            formData.soNhaTenDuong.trim() &&
            formData.xaPhuong &&
            formData.quanHuyen &&
            formData.tinhTP;
    };

    const handleSaveChanges = async () => {
        if (isFormValid()) {
            let data;
            if (diaChiSelected === null) {
                data = await apiThemDiaChi(formData);
                if (data) {
                    alert('Thêm địa chỉ mới thành công');
                } else {
                    alert('Thêm địa chỉ mới thất bại');
                }
            } else {
                data = await apiSuaDiaChi(formData);
                if (data) {
                    alert('Lưu thay đổi thành công');
                } else {
                    alert('Lưu thay đổi thất bại');
                }
            }
            if (data) {
                fetchData();
                closeEditDialog();
            }
        } else {
            alert('Vui lòng điền đúng thông tin');
        }
    };

    useEffect(() => {
        const fetchTinhTP = async () => {
            const data = await apiTinhTP();
            setDsTinhTP(data);
        };
        fetchTinhTP();
    }, []);

    useEffect(() => {
        if (formData.tinhTP) {
            const fetchQuanHuyen = async () => {
                setDsXaPhuong([]);
                const data = await apiQuanHuyen(formData.tinhTP.code);
                setDsQuanHuyen(data);
                if (diaChiSelected?.quanHuyen) {
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        quanHuyen: data.find((quanHuyen) => quanHuyen.name_with_type === diaChiSelected.quanHuyen) || '',
                    }));
                }
            };
            fetchQuanHuyen();
        }
    }, [formData.tinhTP, diaChiSelected?.quanHuyen]);

    useEffect(() => {
        if (formData.quanHuyen) {
            const fetchXaPhuong = async () => {
                const data = await apiXaPhuong(formData.quanHuyen.code);
                setDsXaPhuong(data);
                if (diaChiSelected?.xaPhuong) {
                    setFormData((prevFormData) => ({
                        ...prevFormData,
                        xaPhuong: data.find((xaPhuong) => xaPhuong.name_with_type === diaChiSelected.xaPhuong) || '',
                    }));
                }
            };
            fetchXaPhuong();
        }
    }, [formData.quanHuyen, diaChiSelected?.xaPhuong]);

    return (
        <Dialog open={isEditAddressDialogOpen} onClose={closeEditDialog} fullWidth maxWidth="md">
            <DialogTitle>Chỉnh sửa địa chỉ</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                    <Grid item xs={6}>
                        <TextField
                            select
                            autoFocus
                            id="tinhTP"
                            name="tinhTP"
                            label="Tỉnh/Thành phố"
                            fullWidth
                            value={formData.tinhTP}
                            onChange={handleInputChange}
                            error={errors.tinhTP}
                            helperText={errors.tinhTP ? 'Tỉnh/Thành phố không được để trống' : ''}
                        >
                            {dsTinhTP.map((tp) => (
                                <MenuItem key={tp.code} value={tp}>
                                    {tp.name_with_type}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            select
                            id="quanHuyen"
                            name="quanHuyen"
                            label="Quận/Huyện"
                            fullWidth
                            value={formData.quanHuyen}
                            onChange={handleInputChange}
                            error={errors.quanHuyen}
                            helperText={errors.quanHuyen ? 'Quận/Huyện không được để trống' : ''}
                        >
                            {dsQuanHuyen.map((qh) => (
                                <MenuItem key={qh.code} value={qh}>
                                    {qh.name_with_type}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            select
                            id="xaPhuong"
                            name="xaPhuong"
                            label="Xã/Phường"
                            fullWidth
                            value={formData.xaPhuong}
                            onChange={handleInputChange}
                            error={errors.xaPhuong}
                            helperText={errors.xaPhuong ? 'Xã/Phường không được để trống' : ''}
                        >
                            {dsXaPhuong.map((xp) => (
                                <MenuItem key={xp.code} value={xp}>
                                    {xp.name_with_type}
                                </MenuItem>
                            ))}
                        </TextField>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="soNhaTenDuong"
                            name="soNhaTenDuong"
                            label="Số nhà, tên đường"
                            fullWidth
                            value={formData.soNhaTenDuong}
                            onChange={handleInputChange}
                            error={errors.soNhaTenDuong}
                            helperText={errors.soNhaTenDuong ? 'Số nhà, tên đường không được để trống' : ''}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="ghiChu"
                            name="ghiChu"
                            label="Ghi chú"
                            fullWidth
                            value={formData.ghiChu}
                            onChange={handleInputChange}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' color='error' onClick={closeEditDialog}>
                    Hủy
                </Button>
                {diaChiSelected === null ? (
                    <Button variant='contained' color='info' onClick={handleSaveChanges} disabled={!isFormValid()}>
                        Thêm đia chỉ mới
                    </Button>
                ) : (
                    <Button variant='contained' color='info' onClick={handleSaveChanges} disabled={!isFormValid()}>
                        Lưu thay đổi
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default EditAddressDialog;
