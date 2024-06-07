// eslint-disable-next-line no-unused-vars
import React, { createContext, useEffect, useState } from 'react'
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { apiTimNhanVienTheoEmail } from '../../utils/NhanVienUtils';

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [nhanVien,setNhanVien] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();
    useEffect(() => {
        const unsubscribed = auth.onIdTokenChanged(async (user) => {
            if (user?.uid) {
                setUser(user);
                localStorage.setItem('accessToken', user.accessToken);
                const data = await apiTimNhanVienTheoEmail(user.email);
                if (!data) {
                  alert('Tài khoản của bạn không có quyền truy cập vào hệ thống 1');
                  user.auth.signOut();
                  return;
                }
                setNhanVien(data);
                console.log(data);
                return;
            }
            setUser({});
            localStorage.clear();
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
