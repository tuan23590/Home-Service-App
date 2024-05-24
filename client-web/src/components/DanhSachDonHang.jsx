import React from 'react';
import { Outlet } from 'react-router-dom';

const DanhSachDonHang = () => {
    return (
        <div>
            Danh sách đơn hàng
            <Outlet/>
        </div>
    );
};

export default DanhSachDonHang;