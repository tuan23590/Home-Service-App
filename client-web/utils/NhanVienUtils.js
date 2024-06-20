import { GRAPHQL_SERVER } from "./constants";
import { GraphQLrequest } from "./request";

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
        chuyenMon
      }
    }`;
    const {DanhSachNhanVienTrongViec} = await GraphQLrequest({query,variables:{ idDonHang }})
    return DanhSachNhanVienTrongViec;
  };
  
  export const apiThayDoiNhanVien = async (idDonHang,idNhanVienCu,idNhanVienMoi,lyDoDoiNhanVien) => {
    const query = `mutation DoiNhanVien($idDonHang: String, $idNhanVienCu: String, $idNhanVienMoi: String, $lyDoDoiNhanVien: String) {
      doiNhanVien(idDonHang: $idDonHang, idNhanVienCu: $idNhanVienCu, idNhanVienMoi: $idNhanVienMoi, lyDoDoiNhanVien: $lyDoDoiNhanVien) {
        maDonHang
      } 
    }`;
    
    const {doiNhanVien} = await GraphQLrequest({query,variables:{ idDonHang ,idNhanVienCu,idNhanVienMoi,lyDoDoiNhanVien}});
    return doiNhanVien;
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
        chuyenMon
      }
    }`;
    const {NhanVienTheoId} = await GraphQLrequest({query,variables: {idNhanVien}})
    return NhanVienTheoId;
  };
  export const apiTimNhanVienTheoEmail = async (email) => {
    const query = `query TimNhanVienTheoEmail($email: String) {
  TimNhanVienTheoEmail(email: $email) {
     id
        tenNhanVien
        gioiTinh
        ngaySinh
        diaChi
        soDienThoai
        phanQuyen
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
        chuyenMon
  }
}`;
    const {TimNhanVienTheoEmail} = await GraphQLrequest({query,variables: {email}})
    return TimNhanVienTheoEmail;
  };
  export const apiDanhSachNhanVien = async () => {
    const query = `query NhanViens {
  NhanViens {
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
      id
    }
    ghiChu
    trangThaiTaiKhoan
    danhGia
    trangThaiHienTai
    phanQuyen
    anhDaiDien
    chuyenMon
  }
}`;
    const {NhanViens} = await GraphQLrequest({query})
    return NhanViens;
  };