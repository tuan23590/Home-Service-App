// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { themDonHang } from '../utils/DonHangUtils';

export default function ThemDonHang() {

    const [formData, setFormData] = useState({
        maDonHang: '',
        khachHang: '',
        trangThaiDonHang: '',
        tongTien: '',
        vatNuoi: '',
        dichVu: '',
        ghiChu: ''
      });
    
      const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit =  async () => {
        const data = await themDonHang(formData);
        console.log(data);
      };


return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField
            name="maDonHang"
            label="Mã đơn hàng"
            value={formData.maDonHang}
            onChange={handleChange}
        />
        <TextField
            name="khachHang"
            label="Khách hàng"
            value={formData.khachHang}
            onChange={handleChange}
        />
        <TextField
            name="trangThaiDonHang"
            label="Trạng thái đơn hàng"
            value={formData.trangThaiDonHang}
            onChange={handleChange}
        />
        <TextField
            name="tongTien"
            label="Tổng tiền"
            value={formData.tongTien}
            onChange={handleChange}
        />
        <TextField
            name="vatNuoi"
            label="Vật nuôi"
            value={formData.vatNuoi}
            onChange={handleChange}
        />
        <TextField
            name="dichVu"
            label="Dịch vụ"
            value={formData.dichVu}
            onChange={handleChange}
        />
        <TextField
            name="ghiChu"
            label="Ghi chú"
            value={formData.ghiChu}
            onChange={handleChange}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit}>
            Tạo đơn hàng
        </Button>
    </form>
);
}
