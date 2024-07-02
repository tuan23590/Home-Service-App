import { GRAPHQL_SERVER } from "./constants";
import { GraphQLrequest } from "./request";

export const apiDanhSachNhanVienNhanDonHang = async (idDonHang) => {
    const query = `query DanhSachNhanVienTrongViec($idDonHang: String) {
      DanhSachNhanVienTrongViec(idDonHang: $idDonHang) {
        id
        tenNhanVien
        gioiTinh
        ngaySinh
        diaChi {
      id
      ghiChu
      quanHuyen
      soNhaTenDuong
      tinhTP
      xaPhuong
    }
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
        diaChi {
      id
      ghiChu
      quanHuyen
      soNhaTenDuong
      tinhTP
      xaPhuong
    }
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
        diaChi {
      id
      ghiChu
      quanHuyen
      soNhaTenDuong
      tinhTP
      xaPhuong
    }
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
    diaChi {
      id
      ghiChu
      quanHuyen
      soNhaTenDuong
      tinhTP
      xaPhuong
    }
  }
}`;
    const {NhanViens} = await GraphQLrequest({query})
    return NhanViens;
  };

  export const apiXoaNhanVien = async (idNhanVien) => {
    const query = `mutation XoaNhanVien($idNhanVien: String) {
  xoaNhanVien(idNhanVien: $idNhanVien) {
    id
  }
}`;
    const {xoaNhanVien} = await GraphQLrequest({query,variables:{ idNhanVien }})
    return xoaNhanVien;
  };


  export const apiSuaNhanVien = async () => {
    const query = `mutation SuaNhanVien($idNhanVien: String, $tenNhanVien: String, $gioiTinh: String, $ngaySinh: String, $diaChi: String, $soDienThoai: String, $email: String, $cccd: String, $ghiChu: String, $trangThaiTaiKhoan: String, $danhGia: Float, $trangThaiHienTai: String, $chuyenMon: String) {
  suaNhanVien(idNhanVien: $idNhanVien, tenNhanVien: $tenNhanVien, gioiTinh: $gioiTinh, ngaySinh: $ngaySinh, diaChi: $diaChi, soDienThoai: $soDienThoai, email: $email, cccd: $cccd, ghiChu: $ghiChu, trangThaiTaiKhoan: $trangThaiTaiKhoan, danhGia: $danhGia, trangThaiHienTai: $trangThaiHienTai, chuyenMon: $chuyenMon) {
    id
  }
}`;
    const {suaNhanVien} = await GraphQLrequest({query})
    return suaNhanVien;
  };
  export const apiThemNhanVien = async (formData) => {
    const query = `mutation ThemNhanVien($tenNhanVien: String, $gioiTinh: String, $diaChi: String, $ngaySinh: Float, $soDienThoai: String, $email: String, $cccd: String, $ghiChu: String, $danhGia: Float, $chuyenMon: String, $anhDaiDien: String, $taiLieu: [String], $phanQuyen: String) {
  themNhanVien(tenNhanVien: $tenNhanVien, gioiTinh: $gioiTinh, diaChi: $diaChi, ngaySinh: $ngaySinh, soDienThoai: $soDienThoai, email: $email, cccd: $cccd, ghiChu: $ghiChu, danhGia: $danhGia, chuyenMon: $chuyenMon, anhDaiDien: $anhDaiDien, taiLieu: $taiLieu, phanQuyen: $phanQuyen) {
    id
  }
}`;
    const ngaySinh = new Date(formData.ngaySinh).getTime();
    const diaChi = JSON.stringify({
      tinhTP: formData.tinhTP.name_with_type,
      quanHuyen: formData.quanHuyen.name_with_type,
      xaPhuong: formData.xaPhuong.name_with_type,
      soNhaTenDuong: formData.soNhaTenDuong,
      ghiChuDiaChi: formData.ghiChuDiaChi
    });
    const {themNhanVien} = await GraphQLrequest({query,variables: {
      tenNhanVien: formData.tenNhanVien,
      gioiTinh: formData.gioiTinh,
      diaChi: diaChi,
      ngaySinh: ngaySinh,
      soDienThoai: formData.soDienThoai,
      email: formData.email,
      cccd: formData.cccd,
      ghiChu: formData.ghiChu,
      chuyenMon: formData.chuyenMon,
      anhDaiDien: formData.anhDaiDien,
      taiLieu: formData.taiLieu,
      phanQuyen: formData.phanQuyen
    }})
    return themNhanVien;
  };