import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { apiSuaKhachHang } from '../../../utils/KhachHangUtils';

const EditProfileDialog = ({ data }) => {
    const { isEditProfileDialogOpen, closeEditDialog, thongTinKhachHang, fetchData } = data;
    const [formData, setFormData] = useState({
        idKhachHang: '',
        tenKhachHang: '',
        soDienThoai: '',
        email: '',
    });

    const [errors, setErrors] = useState({
        tenKhachHang: false,
        soDienThoai: false,
        email: false,
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        validateField(name, value);
    };

    const validateField = (name, value) => {
        let isValid = true;

        if (name === 'tenKhachHang' && !value.trim()) {
            isValid = false;
        } else if (name === 'soDienThoai' && !/^(03|05|07|08|09)\d{8}$/.test(value)) {
            isValid = false;
        } else if (name === 'email' && !/\S+@\S+\.\S+/.test(value)) {
            isValid = false;
        }

        setErrors({ ...errors, [name]: !isValid });
    };

    const isFormValid = () => {
        return Object.values(errors).every(error => !error) &&
            formData.tenKhachHang.trim() &&
            /^(03|05|07|08|09)\d{8}$/.test(formData.soDienThoai) &&
            /\S+@\S+\.\S+/.test(formData.email);
    };

    const handleSaveChanges = async () => {
        if (isFormValid()) {
            const data = await apiSuaKhachHang(formData);
            console.log(data);
            if (data) {
                alert('Cập nhật thông tin thành công');
                fetchData();
                closeEditDialog();
            } else {
                alert('Cập nhật thông tin thất bại');
            }
        } else {
            alert('Vui lòng điền đúng thông tin');
        }
    };

    useEffect(() => {
        if (thongTinKhachHang) {
            setFormData({
                idKhachHang: thongTinKhachHang.id,
                tenKhachHang: thongTinKhachHang.tenKhachHang,
                soDienThoai: thongTinKhachHang.soDienThoai,
                email: thongTinKhachHang.email,
            });
            setErrors({
                tenKhachHang: false,
                soDienThoai: false,
                email: false,
            });
        }
    }, [isEditProfileDialogOpen]);

    return (
        <Dialog open={isEditProfileDialogOpen} onClose={closeEditDialog}>
            <DialogTitle>Chỉnh sửa thông tin cá nhân</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="tenKhachHang"
                    name="tenKhachHang"
                    label="Tên khách hàng"
                    fullWidth
                    value={formData.tenKhachHang}
                    onChange={handleInputChange}
                    error={errors.tenKhachHang}
                    helperText={errors.tenKhachHang ? 'Tên khách hàng không được để trống' : ''}
                />
                <TextField
                    margin="dense"
                    id="soDienThoai"
                    type='number'
                    name="soDienThoai"
                    label="Số điện thoại"
                    fullWidth
                    value={formData.soDienThoai}
                    onChange={handleInputChange}
                    error={errors.soDienThoai}
                    helperText={errors.soDienThoai ? 'Số điện thoại không hợp lệ (phải là đầu số hợp lệ và 10 chữ số)' : ''}
                    sx={{
                        "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
                            display: "none",
                        },
                        "& input[type=number]": {
                            MozAppearance: "textfield",
                        },
                    }}
                />
                <TextField
                    margin="dense"
                    id="email"
                    name="email"
                    label="Email"
                    fullWidth
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    helperText={errors.email ? 'Email không hợp lệ' : ''}
                />
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' color='error' onClick={closeEditDialog}>
                    Hủy
                </Button>
                <Button variant='contained' color='info' onClick={handleSaveChanges} disabled={!isFormValid()}>
                    Lưu thay đổi
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditProfileDialog;
