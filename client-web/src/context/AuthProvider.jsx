// eslint-disable-next-line no-unused-vars
import React, { createContext, useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { apiTimNhanVienTheoEmail } from '../../utils/NhanVienUtils';
import { apiTimKhachHangTheoEmail } from '../../utils/KhachHangUtils';

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [nhanVien,setNhanVien] = useState(null);
    const [khachHang,setKhachHang] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();
    useEffect(() => {
        const unsubscribed = auth.onIdTokenChanged(async (user) => {
            if (user?.uid) {
                setUser(user);
                localStorage.setItem('accessToken', user.accessToken);
                const dataKH = await apiTimKhachHangTheoEmail(user.email);
                if (dataKH) {
                    setKhachHang(dataKH);
                    return;
                }
                const dataNV = await apiTimNhanVienTheoEmail(user.email);
                if (dataNV) {
                    setNhanVien(dataNV);
                    return;
                }
                alert('Tài khoản không tồn tại');
                return;
            }
            setUser({});
            localStorage.setItem('accessToken', null);
        });

        return () => {
            unsubscribed();
        };
    }, [auth]);
    return (
        <AuthContext.Provider value={{ user, setUser,nhanVien,setNhanVien }}>
            {children}
        </AuthContext.Provider>
    );
}
