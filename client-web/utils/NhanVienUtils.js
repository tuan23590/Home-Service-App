import { GRAPHQL_SERVER } from "./constants";

export const apiDanhSachNhanVienNhanDonHang = async (idDonHang) => {
    const query = `query DanhSachNhanVienTrongViec($idDonHang: String) {
      DanhSachNhanVienTrongViec(idDonHang: $idDonHang) {
        id
        tenNhanVien
        gioiTinh
        ngaySinh
        diaChi
        soDienThoai
        email
        cccd
        dichVu {
          tenDichVu
          maDichVu
        }
        ghiChu
        trangThaiTaiKhoan
        danhGia
        trangThaiHienTai
        anhDaiDien
      }
    }`;
    const res = await fetch(GRAPHQL_SERVER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ query,variables:{ idDonHang }})
    });
    
    const data = await res.json();
    return data;
  };
  
  export const apiThayDoiNhanVien = async (idDonHang,idNhanVienCu,idNhanVienMoi,lyDoDoiNhanVien) => {
    const query = `mutation DoiNhanVien($idDonHang: String, $idNhanVienCu: String, $idNhanVienMoi: String, $lyDoDoiNhanVien: String) {
      doiNhanVien(idDonHang: $idDonHang, idNhanVienCu: $idNhanVienCu, idNhanVienMoi: $idNhanVienMoi, lyDoDoiNhanVien: $lyDoDoiNhanVien) {
        maDonHang
      }
    }`;
    const res = await fetch(GRAPHQL_SERVER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ query,variables:{ idDonHang ,idNhanVienCu,idNhanVienMoi,lyDoDoiNhanVien}})
    });
    
    const data = await res.json();
    return data;
  };
  export const apiThongTinNhanVien = async (idNhanVien) => {
    const query = `query NhanVienTheoId($idNhanVien: String) {
      NhanVienTheoId(idNhanVien: $idNhanVien) {
        id
        tenNhanVien
        gioiTinh
        ngaySinh
        diaChi
        soDienThoai
        email
        cccd
        dichVu {
          tenDichVu
        }
        ghiChu
        trangThaiTaiKhoan
        danhGia
        trangThaiHienTai
        lichLamViec {
          id
          thoiGianBatDauLich
          thoiGianKetThucLich
          trangThaiLich
          lyDoDungLich
        }
        anhDaiDien
      }
    }`;

    const res = await fetch(GRAPHQL_SERVER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ query,variables: {idNhanVien:'6656a534a06300b51a80064e'} })
    });

    const data = await res.json();
    return data;
  };