// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { TextField, Button, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { themDonHang } from '../utils/DonHangUtils';
import { DBDataDichVu } from '../utils/DichVuUtils';

export default function ThemDonHang() {
    // eslint-disable-next-line no-unused-vars
    const [selectedDichVu, setSelectedDichVu] = useState('');
    const [dichVus, setDichVus] = useState([]);
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
    
    const handleSubmit = async () => {
        const data = await themDonHang(formData);
        console.log(data);
        alert('Đã thêm đơn hàng');
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await DBDataDichVu();
                setDichVus(data.dichVus);
            } catch (error) {
                console.error('Error fetching service data:', error);
            }
        };
        fetchData();
    }, []);
    
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '400px' }}>
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
                <FormControl>
                    <InputLabel id="dich-vu-label">Dịch vụ</InputLabel>
                    <Select
                        labelId="dich-vu-label"
                        id="dich-vu-select"
                        name='dichVu'
                        value={selectedDichVu}
                        onChange={handleChange}
                    >
                        {dichVus.map((dichVu) => (
                            <MenuItem key={dichVu.id} value={dichVu.id}>
                                {dichVu.tenDichVu}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
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
        </div>
    );
}
