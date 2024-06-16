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

  useEffect(() => {
    const giaDichVuThem = dichVuThem?.reduce((total, dichVu) => total + (dichVu.gia || 0), 0);
    setTongCong(dichVuChinh?.gia + giaDichVuThem);
    setTongTien(dichVuChinh?.gia + giaDichVuThem);
  } , [dichVuChinh, dichVuThem]);
  useEffect(() => {
      setTongTien(tongCong * lichLamViec.length);
  }, [lichLamViec]);
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
      setLichLamViec
     }}>
      {children}
    </DonHangContext.Provider>
  );
};