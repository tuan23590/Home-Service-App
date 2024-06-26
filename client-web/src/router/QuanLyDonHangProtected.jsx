// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState, useContext } from 'react';
import { Outlet, Navigate, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

const QuanLyDonHangProtected = () => {
    const { user, nhanVien } = useContext(AuthContext);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    if (!user?.uid) {
        navigate('/DangNhap');
    }
    useEffect(() => {
        if (nhanVien) {
            if (nhanVien.phanQuyen !== 'NVCSKH' && nhanVien.phanQuyen !== 'Admin') {
                alert('Tài khoản của bạn không có quyền truy cập vào hệ thống');
                navigate('/');
            } else {
                setLoading(false);
            }
        }else{
            alert('Tài khoản của bạn không có quyền truy cập vào hệ thống');
            navigate('/');
        }
    }, [nhanVien]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return <Outlet />;
};

export default QuanLyDonHangProtected;
