import React, { createContext, useState } from 'react';


export const DonHangContext = createContext();
export default function DonHangProvider({ children }) {
  const [chonDichVuThem, setChonDichVuThem] = useState();
  const [gioLam, setGioLam] = useState(new Date());
  const [chonThoiLuong, setChonThoiLuong] = useState();
  const [vatNuoi, setVatNuoi] = useState('');
  const [thoiGianLamViec, setThoiGianLamViec] = useState(0);
  const [tongCong, setTongCong] = useState(0);
  const [ngayLamViec, setNgayLamViec] = useState([]);
  const [test, setTest] = useState("test3");
  return (
    <DonHangContext.Provider value={{ 
      test,
      chonThoiLuong, 
      setChonThoiLuong,
      chonDichVuThem,
      setChonDichVuThem,
      vatNuoi,
      setVatNuoi,
      thoiGianLamViec, 
      setThoiGianLamViec,
      tongCong,
      gioLam, 
      setGioLam,
      ngayLamViec, 
      setNgayLamViec
     }}>
      {children}
    </DonHangContext.Provider>
  );
};