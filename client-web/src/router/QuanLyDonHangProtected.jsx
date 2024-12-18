// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const QuanLyDonHangProtected = () => {
    const { user, nhanVien,khachHang} = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    if (!user?.uid) {
        navigate('/DangNhap');
    }
    if (khachHang) {
        alert('Tài khoản của bạn không có quyền truy cập vào hệ thống');
        navigate('/');
    }
    useEffect(() => {
        if (nhanVien) {
            if (nhanVien.phanQuyen !== 'NVCSKH' && nhanVien.phanQuyen !== 'Admin'&& nhanVien.phanQuyen !== 'NVQL') {
                alert('Tài khoản của bạn không có quyền truy cập vào hệ thống');
                navigate('/');
            } else {
                setLoading(false);
            }
        }
    }, [nhanVien]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <Outlet />;
};

export default QuanLyDonHangProtected;
