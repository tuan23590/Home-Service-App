import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    TextField,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { apiTinhTP, apiQuanHuyen, apiXaPhuong } from '../../../utils/DiaChiUtil'
import { apiThemNhanVien } from '../../../utils/NhanVienUtils'
import FileUpload from '../FileUpload';
import dayjs from 'dayjs';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
const ThongTinNhanVien = ({ open, handleClose, nhanVien, action }) => {
    const [dsTinhTP, setDsTinhTP] = useState([]);
    const [dsQuanHuyen, setDsQuanHuyen] = useState([]);
    const [dsXaPhuong, setDsXaPhuong] = useState([]);
    const [formData, setFormData] = useState({
        tenNhanVien: '',
        gioiTinh: '',
        ngaySinh: '',
        diaChi: '',
        soDienThoai: '',
        email: '',
        cccd: '',
        ghiChu: '',
        trangThaiTaiKhoan: '',
        danhGia: '',
        trangThaiHienTai: '',
        phanQuyen: '',
        anhDaiDien: '',
        chuyenMon: '',
    });

    useEffect(() => {
        const fetchTinhTP = async () => {
            const data = await apiTinhTP();
            setDsTinhTP(data);
        }
        fetchTinhTP();
    }, []);
    useEffect(() => {
        if(formData.tinhTP){
            const fetchQuanHuyen = async () => {
                setDsXaPhuong([]);
                const data = await apiQuanHuyen(formData.tinhTP.code);
                setDsQuanHuyen(data);
               if(nhanVien.diaChi.quanHuyen){
                setFormData((prevFormData) => ({
                    ...prevFormData,
                    quanHuyen: data.find((quanHuyen) => quanHuyen.name_with_type === nhanVien.diaChi.quanHuyen) || '',
                }));
               }
            }
            fetchQuanHuyen();
        }
    }, [formData.tinhTP]);
    useEffect(() => {
       if(formData.quanHuyen){
        const fetchXaPhuong = async () => {
            const data = await apiXaPhuong(formData.quanHuyen.code);
            setDsXaPhuong(data);
            if(nhanVien.diaChi.xaPhuong){
            setFormData((prevFormData) => ({
                ...prevFormData,
                xaPhuong: data.find((xaPhuong) => xaPhuong.name_with_type === nhanVien.diaChi.xaPhuong) || '',
            }));
        }
        }
        fetchXaPhuong();
       }
    }, [formData.quanHuyen]);
    useEffect(() => {
        if (nhanVien) {
            const formattedDate = nhanVien.ngaySinh ? dayjs(nhanVien.ngaySinh).format('YYYY-MM-DD') : '';
            setFormData({
                tenNhanVien: nhanVien.tenNhanVien || '',
                gioiTinh: nhanVien.gioiTinh || '',
                ngaySinh: formattedDate,
                diaChi: nhanVien.diaChi || '',
                soDienThoai: nhanVien.soDienThoai || '',
                email: nhanVien.email || '',
                cccd: nhanVien.cccd || '',
                ghiChu: nhanVien.ghiChu || '',
                trangThaiTaiKhoan: nhanVien.trangThaiTaiKhoan || '',
                danhGia: nhanVien.danhGia || '',
                trangThaiHienTai: nhanVien.trangThaiHienTai || '',
                phanQuyen: nhanVien.phanQuyen || '',
                anhDaiDien: nhanVien.anhDaiDien || '',
                chuyenMon: nhanVien.chuyenMon || '',
                taiLieu: nhanVien.taiLieu || [],
                tinhTP: dsTinhTP.find((tinhTP) => tinhTP.name_with_type === nhanVien.diaChi.tinhTP) || '',
                quanHuyen: '',
                xaPhuong: '',
                soNhaTenDuong: nhanVien.diaChi.soNhaTenDuong || '',
                ghiChuDiaChi: nhanVien.diaChi.ghiChu || '',
            });

        } else {
            setFormData({
                tenNhanVien: '',
                gioiTinh: '',
                ngaySinh: dayjs(new Date("2000-01-01")).format('YYYY-MM-DD'),
                diaChi: '',
                soDienThoai: '',
                email: '',
                cccd: '',
                ghiChu: '',
                trangThaiTaiKhoan: '',
                danhGia: '',
                trangThaiHienTai: '',
                phanQuyen: '',
                anhDaiDien: '',
                chuyenMon: '',
                taiLieu: [],
                tinhTP: '',
                quanHuyen: '',
                xaPhuong: '',
                soNhaTenDuong: '',
                ghiChuDiaChi: '',
            });
        }
    }, [nhanVien, open]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let valid = true;
        const requiredFields = [
            'tenNhanVien',
            'gioiTinh',
            'ngaySinh',
            'soDienThoai',
            'email',
            'cccd',
            'phanQuyen',
            'tinhTP',
            'quanHuyen',
            'xaPhuong',
            'soNhaTenDuong',
        ];
        if(new Date(formData.ngaySinh).getFullYear() > new Date().getFullYear() - 18 && valid){
            valid = false;
            alert('Nhân viên phải đủ 18 tuổi trở lên');
        }
        requiredFields.forEach((field) => {
            if (!formData[field] && valid) {
                valid = false;
                alert(`Vui lòng nhập đầy đủ thông tin`);
            }
        });
        return valid;
    };


    const handleSubmitEdit = () => {
        
    };
    const handleSubmitAdd = async () => {
        if(validateForm()){
           const data = await apiThemNhanVien(formData);
           const auth = getAuth();
           await createUserWithEmailAndPassword(auth, formData.email,formData.email)
           .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
        if (data) {
            alert('Thêm nhân viên mới thành công');
            handleClose();
            window.location.reload();
        } else {
            alert('Thêm nhân viên mới thất bại');
        }
        }
    };
    const handleImageUploadSuccess = (filePath) => {
        console.log('Uploaded image path: ', filePath);
        setFormData((prevFormData) => ({
            ...prevFormData,
            anhDaiDien: filePath[0],
        }));
    };
    const handleDocumentUploadSuccess = (filePath) => {
        console.log('Uploaded document path: ', filePath);
        setFormData((prevFormData) => ({
            ...prevFormData,
            taiLieu: filePath,
        }));
    };
    return (
        //maxWidth="sm"
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md" >
            <DialogTitle>{
                action === 'add' ? 'Thêm nhân viên mới' : action === 'edit' ? 'Chỉnh sửa thông tin nhân viên' : 'Chi tiết nhân viên'
            }</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ marginTop: '10px' }}>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Phân quyền*</InputLabel>
                            <Select
                                name="phanQuyen"
                                value={formData.phanQuyen}
                                disabled={action === 'view' ? true : false}
                                onChange={handleChange}>
                                {formData.phanQuyen !== 'Admin' ? null : (
                                    <MenuItem value="Admin">Admin</MenuItem>
                                )}
                                <MenuItem value="NVQL">Nhân viên quản lý</MenuItem>
                                <MenuItem value="NVCSKH">Nhân viên châm sóc khách hàng</MenuItem>
                                <MenuItem value="Tasker">Tasker</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            disabled={action === 'view' ? true : false}
                            fullWidth
                            label="Tên nhân viên*"
                            name="tenNhanVien"
                            value={formData.tenNhanVien}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Giới tính*</InputLabel>
                            <Select
                                disabled={action === 'view' ? true : false}
                                name="gioiTinh"
                                value={formData.gioiTinh}
                                onChange={handleChange}
                            >
                                <MenuItem value="Nam">Nam</MenuItem>
                                <MenuItem value="Nữ">Nữ</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            disabled={action === 'view' ? true : false}
                            label="Ngày sinh*"
                            name="ngaySinh"
                            value={formData.ngaySinh}
                            type='date'
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            disabled={action === 'view' ? true : false}
                            label="CCCD*"
                            name="cccd"
                            value={formData.cccd}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Tỉnh/Thành phố*</InputLabel>
                            <Select
                                name="tinhTP"
                                disabled={action === 'view' ? true : false}
                                value={formData.tinhTP}
                                onChange={handleChange}
                            >
                                {dsTinhTP.map((tinhTP) => (
                                    <MenuItem key={tinhTP.code} value={tinhTP}>{tinhTP.name_with_type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Quận/Huyện*</InputLabel>
                            <Select
                                name="quanHuyen"
                                disabled={action === 'view' ? true : false}
                                value={formData.quanHuyen}
                                onChange={handleChange}
                            >
                                {dsQuanHuyen.map((quanHuyen) => (
                                    <MenuItem key={quanHuyen.code} value={quanHuyen}>{quanHuyen.name_with_type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <FormControl fullWidth>
                            <InputLabel>Xã/Phường*</InputLabel>
                            <Select
                                name="xaPhuong"
                                disabled={action === 'view' ? true : false}
                                value={formData.xaPhuong}
                                onChange={handleChange}
                            >
                                {dsXaPhuong.map((xaPhuong) => (
                                    <MenuItem key={xaPhuong.code} value={xaPhuong}>{xaPhuong.name_with_type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            disabled={action === 'view' ? true : false}
                            label="Số nhà tên đường*"
                            name="soNhaTenDuong"
                            value={formData.soNhaTenDuong}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            disabled={action === 'view' ? true : false}
                            label="Ghi chú địa chỉ"
                            name="ghiChuDiaChi"
                            value={formData.ghiChuDiaChi}
                            onChange={handleChange}
                        />
                    </Grid>

                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            disabled={action === 'view' ? true : false}
                            label="Email*"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            fullWidth
                            disabled={action === 'view' ? true : false}
                            label="Số điện thoại*"
                            name="soDienThoai"
                            value={formData.soDienThoai}
                            onChange={handleChange}
                        />
                    </Grid>
                    {formData.phanQuyen === 'Tasker' ? (
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel>Chuyên môn*</InputLabel>
                                <Select
                                    name="chuyenMon"
                                    disabled={action === 'view' ? true : false}
                                    value={formData.chuyenMon}
                                    onChange={handleChange}>
                                    <MenuItem value="Dịch vụ cho gia đình">Dịch vụ cho gia đình</MenuItem>
                                    <MenuItem value="Dịch vụ chăm sóc và hỗ trợ">Dịch vụ chăm sóc và hỗ trợ</MenuItem>
                                    <MenuItem value="Dịch vụ bảo dưỡng điện máy">Dịch vụ bảo dưỡng điện máy</MenuItem>
                                    <MenuItem value="Dịch vụ dành cho doanh nghiệp">Dịch vụ dành cho doanh nghiệp</MenuItem>
                                    <MenuItem value="Dịch vụ tiện ích nâng cao">Dịch vụ tiện ích nâng cao</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    ) : null}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            disabled={action === 'view' ? true : false}
                            label="Ghi chú nhân viên"
                            name="ghiChu"
                            value={formData.ghiChu}
                            onChange={handleChange}

                        />
                    </Grid>
                    {action === 'add' ? null : (
                        <Grid item xs={6}>
                            <FormControl fullWidth>
                                <InputLabel>Trạng thái tài khoản</InputLabel>
                                <Select
                                    name="trangThaiTaiKhoan"
                                    disabled={action === 'view' ? true : false}
                                    value={formData.trangThaiTaiKhoan}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="Đang hoạt động">Đang hoạt động</MenuItem>
                                    <MenuItem value="Ngừng hoạt động">Ngừng hoạt động</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                    )}
                    {action === 'view' ? null : (
                        <>
                        <Grid item xs={6}>
                        <FileUpload
                            accept="image/*"
                            onUploadSuccess={handleImageUploadSuccess}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <FileUpload
                            accept="application/*"
                            onUploadSuccess={handleDocumentUploadSuccess}
                        />
                    </Grid>
                        </>
                    )}
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' size='small' sx={{ paddingInline: '15px' }} onClick={handleClose} color="secondary">
                    Hủy
                </Button>
                {formData.phanQuyen === 'Admin' ? null :
                    action === 'add' ? (
                        <Button variant='contained' size='small' sx={{ paddingInline: '15px' }} onClick={handleSubmitAdd} color='info'>
                            Thêm nhân viên mới
                        </Button>
                    ) : action === 'edit' ? (
                        <Button variant='contained' size='small' sx={{ paddingInline: '15px' }} onClick={handleSubmitEdit} color="info">
                            Lưu thay đổi
                        </Button>
                    ) : null}
            </DialogActions>
        </Dialog>
    );
};

export default ThongTinNhanVien;
