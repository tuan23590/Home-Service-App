import React, { createContext, useEffect, useState } from 'react';


export const DonHangContext = createContext();
export default function DonHangProvider({ children }) {
  const [dichVuThem, setDichVuThem] = useState();
  const [gioLam, setGioLam] = useState(new Date());
  const [thoiLuong, setThoiLuong] = useState();
  const [vatNuoi, setVatNuoi] = useState('');
  const [tongCong, setTongCong] = useState(0);
  const [lichLamViec, setLichLamViec] = useState([]);
  const [uuTienTasker, setUuTienTasker] = useState(false);
  const [dichVuChinh, setDichVuChinh] = useState();
  const [ghiChu, setGhiChu] = useState('');
  const [tongTien, setTongTien] = useState(0);
  const [diaChi, setDiaChi] = useState();
  const [khachHang, setKhachHang] = useState();
  useEffect(() => {
    setTongTien(dichVuChinh?.gia);
    
  } , [dichVuChinh]);
  useEffect(() => {
    const length = lichLamViec && lichLamViec.length > 0 ? lichLamViec.length : 1;
    setTongTien(dichVuChinh?.gia * length);
}, [lichLamViec]);

useEffect(() => {
}, [diaChi]);
  return (
    <DonHangContext.Provider value={{ 
      tongTien, 
      setTongTien,
      ghiChu, 
      setGhiChu,
      dichVuChinh, 
      setDichVuChinh,
      thoiLuong, 
      setThoiLuong,
      dichVuThem,
      setDichVuThem,
      vatNuoi,
      setVatNuoi,
      tongCong,
      uuTienTasker, 
      setUuTienTasker,
      gioLam, 
      setGioLam,
      lichLamViec, 
      setLichLamViec,
      diaChi, 
      setDiaChi,
      khachHang, 
      setKhachHang
     }}>
      {children}
    </DonHangContext.Provider>
  );
};