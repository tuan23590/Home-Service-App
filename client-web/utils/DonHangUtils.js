// eslint-disable-next-line no-unused-vars

import { GRAPHQL_SERVER } from "./constants";
import { GraphQLrequest } from "./request";

export const APIDanhSachDonHangChoDuyet = async ()=> {
  const query = `query DonHangDangChoDuyet {
    DonHangDangChoDuyet {
           id
          maDonHang
          ngayDatHang
          ngayBatDau
          ngayKetThuc
          soGioThucHien
          trangThaiDonHang
    }
  }  
    `;
  const {DonHangDangChoDuyet} = await GraphQLrequest({query})
  return DonHangDangChoDuyet;
}

export const apiChiTietDonHang = async ({params})=> {
  const query = `query DonHangTheoId($idDonHang: String) {
    DonHangTheoId(idDonHang: $idDonHang) {
      danhSachDichVu {
        gia
        khoiLuongCongViec
        loaiDichVu
        tenDichVu
        thoiGian
      }
      danhSachLichThucHien {
        id
        lyDoDungLich
        thoiGianBatDauLich
        thoiGianKetThucLich
        trangThaiLich
      }
      diaChi {
        ghiChu
        quanHuyen
        soNhaTenDuong
        tinhTP
      }
      ghiChu
      khachHang {
        email
        soDienThoai
        tenKhachHang
      }
      lyDoDoiNhanVien
      lyDoTuChoi
      maDonHang
      lyDoNhanVienTuChoiDonHang
      ngayBatDau
      ngayDatHang
      ghiChuDanhGia
      saoDanhGia
      id
      ngayKetThuc
      nhanVien {
        id
        anhDaiDien
        cccd
        email
        ghiChu
        gioiTinh
        ngaySinh
        soDienThoai
        tenNhanVien
        dichVu {
          tenDichVu
        }
        danhGia
      }
      soGioThucHien
      soThangLapLai
      tongTien
      trangThaiDonHang
      uuTienTasker
      vatNuoi
    }
  }  
    `;
  const {DonHangTheoId} = await GraphQLrequest({query, variables: {idDonHang: params.id}});
  return DonHangTheoId;
}


export const APIDanhSachDonHangDaDuyet = async ()=> {
  const query = `query DonHangDaDuyet {
    DonHangDaDuyet {
          id
          maDonHang
          ngayDatHang
          ngayBatDau
          ngayKetThuc
          soGioThucHien
          trangThaiDonHang
    }
  }  
    `;
  const {DonHangDaDuyet} = await GraphQLrequest({query})
  return DonHangDaDuyet;
}
export const APIDanhSachDonHangDaTuChoi = async ()=> {
  const query = `query DonHangDaTuChoi {
    DonHangDaTuChoi {
           id
          maDonHang
          ngayDatHang
          ngayBatDau
          ngayKetThuc
          soGioThucHien
          trangThaiDonHang
    }
  }  
    `;
  const {DonHangDaTuChoi} = await GraphQLrequest({query})
  return DonHangDaTuChoi;
}

export const apiThemDonHang = async (formData) => {
  const query = `mutation ThemDonHang($soGioThucHien: Int, $khachHang: String, $vatNuoi: String, $ghiChu: String, $uuTienTasker: Boolean, $diaChi: String, $tongTien: Float, $dichVuTheoYeuCauCuaKhachHang: String, $giaDichVuTheoYeuCauCuaKhachHang: Float, $soThangLapLai: Int, $dichVuChinh: String, $danhSachLichThucHien: [String], $danhSachDichVu: [String]) {
    themDonHang(soGioThucHien: $soGioThucHien, khachHang: $khachHang, vatNuoi: $vatNuoi, ghiChu: $ghiChu, uuTienTasker: $uuTienTasker, diaChi: $diaChi, tongTien: $tongTien, dichVuTheoYeuCauCuaKhachHang: $dichVuTheoYeuCauCuaKhachHang, giaDichVuTheoYeuCauCuaKhachHang: $giaDichVuTheoYeuCauCuaKhachHang, soThangLapLai: $soThangLapLai, dichVuChinh: $dichVuChinh, danhSachLichThucHien: $danhSachLichThucHien, danhSachDichVu: $danhSachDichVu) {
      maDonHang
    }
  }
  `;
  console.log(formData.danhSachDichVu);
  const {themDonHang} = await GraphQLrequest ({query,
    variables: {
      soGioThucHien: formData.soGioThucHien,
      danhSachLichThucHien: JSON.stringify(formData.danhSachLichThucHien),
      khachHang: JSON.stringify(formData.khachHang),
      danhSachDichVu: formData.danhSachDichVu.map(dichVu => dichVu.id),
      vatNuoi: formData.vatNuoi,
      ghiChu: formData.ghiChu,
      uuTienTasker: null,
      diaChi: JSON.stringify(formData.diaChi),
      tongTien: formData.tongTien,
      soThangLapLai: formData.soThangLapLai.value,
    }});
  return themDonHang;
};



export const themNhanVienVaoDonHang = async (idDonHang,idNhanVien) => {
  const query = `mutation ThemNhanVienVaoDonHang($idNhanVien: [String], $idDonHang: String) {
    themNhanVienVaoDonHang(idNhanVien: $idNhanVien, idDonHang: $idDonHang) {
      maDonHang
    }
  }
  `;  
  const {themNhanVienVaoDonHang} = await GraphQLrequest({ query,
    variables: {
      idNhanVien,
      idDonHang
    }})
  return themNhanVienVaoDonHang;
};

export const apiTuChoiDonHang = async (idDonHang, lyDoTuChoi) => {
  const query = `mutation TuChoiDonHang($lyDoTuChoi: String, $idDonHang: String) {
    tuChoiDonHang(lyDoTuChoi: $lyDoTuChoi, idDonHang: $idDonHang) {
      maDonHang
    }
  }
  `;
  const {TuChoiDonHang} = await GraphQLrequest({query,
    variables: {
      idDonHang,
      lyDoTuChoi
    }})
  return TuChoiDonHang;
};
export const apiHuyDonHang = async (idDonHang, lyDoHuyDonHang) => {
  const query = `mutation HuyDonHang($idDonHang: String, $lyDoHuyDonHang: String) {
    huyDonHang(idDonHang: $idDonHang, lyDoHuyDonHang: $lyDoHuyDonHang) {
      maDonHang
      lyDoHuyDonHang
    }
  }
  `;
  const res = await fetch(GRAPHQL_SERVER, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables: {
        idDonHang,
        lyDoHuyDonHang
      }
    })
  });
  
  const data = await res.json();
  return data;
};

export const apiDanhSachDonHangChoXacNhanTheoNhanVien = async (idNhanVien)=> {
  const query = `query DanhSachDonHangChoXacNhanTheoNhanVien($idNhanVien: String) {
  DanhSachDonHangChoXacNhanTheoNhanVien(idNhanVien: $idNhanVien) {
   danhSachDichVu {
        gia
        khoiLuongCongViec
        loaiDichVu
        tenDichVu
        thoiGian
      }
      danhSachLichThucHien {
        id
        lyDoDungLich
        thoiGianBatDauLich
        thoiGianKetThucLich
        trangThaiLich
      }
      diaChi {
        ghiChu
        quanHuyen
        soNhaTenDuong
        tinhTP
      }
      ghiChu
      khachHang {
        email
        soDienThoai
        tenKhachHang
      }
      maDonHang
      ngayBatDau
      ngayDatHang
      id
      ngayKetThuc
      soGioThucHien
      soThangLapLai
      tongTien
      trangThaiDonHang
      vatNuoi
  }
}  
    `;
  const {DanhSachDonHangChoXacNhanTheoNhanVien} = await GraphQLrequest({query, variables: {idNhanVien}});
  return DanhSachDonHangChoXacNhanTheoNhanVien;
}
export const apiDanhSachDonHangDaXacNhanTheoNhanVien = async (idNhanVien)=> {
  const query = `query DanhSachDonHangDaXacNhanTheoNhanVien($idNhanVien: String) {
  DanhSachDonHangDaXacNhanTheoNhanVien(idNhanVien: $idNhanVien) {
   danhSachDichVu {
        gia
        khoiLuongCongViec
        loaiDichVu
        tenDichVu
        thoiGian
      }
      danhSachLichThucHien {
        id
        lyDoDungLich
        thoiGianBatDauLich
        thoiGianKetThucLich
        trangThaiLich
      }
      diaChi {
        ghiChu
        quanHuyen
        soNhaTenDuong
        tinhTP
      }
      dichVuChinh {
        gia
        khoiLuongCongViec
        loaiDichVu
        tenDichVu
      }
      ghiChu
      khachHang {
        email
        soDienThoai
        tenKhachHang
      }
      maDonHang
      ngayBatDau
      ngayDatHang
      id
      ngayKetThuc
      soGioThucHien
      soThangLapLai
      tongTien
      trangThaiDonHang
      vatNuoi
  }
}  
    `;
  const {DanhSachDonHangDaXacNhanTheoNhanVien} = await GraphQLrequest({query, variables: {idNhanVien}});
  return DanhSachDonHangDaXacNhanTheoNhanVien;
}
export const apiNhanVienXacNhanCongViec = async (idDonHang)=> {
  const query = `mutation NhanVienXacNhanCongViec($idDonHang: String) {
  nhanVienXacNhanCongViec(idDonHang: $idDonHang) {
    maDonHang
  }
}
    `;
  const {nhanVienXacNhanCongViec} = await GraphQLrequest({query, variables: {idDonHang}});
  return nhanVienXacNhanCongViec;
}
export const apiNhanVienTuChoiCongViec = async (idDonHang,lyDoNhanVienTuChoiDonHang)=> {
  const query = `mutation NhanVienTuChoiCongViec($idDonHang: String, $lyDoNhanVienTuChoiDonHang: String) {
  nhanVienTuChoiCongViec(idDonHang: $idDonHang, lyDoNhanVienTuChoiDonHang: $lyDoNhanVienTuChoiDonHang) {
    maDonHang
  }
}
    `;
  const {NhanVienTuChoiCongViec} = await GraphQLrequest({query, variables: {idDonHang,lyDoNhanVienTuChoiDonHang}});
  return NhanVienTuChoiCongViec;
}

export const apiTimDanhSachDonHangTheoDanhSachLichThucHien = async (idLichThucHien)=> {
  const query = `query TimDanhSachDonHangTheoDanhSachLichThucHien($idLichThucHien: [String]) {
  TimDanhSachDonHangTheoDanhSachLichThucHien(idLichThucHien: $idLichThucHien) {
    danhSachDichVu {
        gia
        khoiLuongCongViec
        loaiDichVu
        tenDichVu
        thoiGian
      }
      danhSachLichThucHien {
        id
        lyDoDungLich
        thoiGianBatDauLich
        thoiGianKetThucLich
        trangThaiLich
      }
      diaChi {
        ghiChu
        quanHuyen
        soNhaTenDuong
        tinhTP
      }
      dichVuChinh {
        gia
        khoiLuongCongViec
        loaiDichVu
        tenDichVu
      }
      ghiChu
      khachHang {
        email
        soDienThoai
        tenKhachHang
      }
      lyDoDoiNhanVien
      lyDoTuChoi
      maDonHang
      lyDoNhanVienTuChoiDonHang
      ngayBatDau
      ngayDatHang
      id
      ngayKetThuc
      nhanVien {
        id
        anhDaiDien
        cccd
        email
        ghiChu
        gioiTinh
        ngaySinh
        soDienThoai
        tenNhanVien
        dichVu {
          tenDichVu
        }
        danhGia
      }
      soGioThucHien
      soThangLapLai
      tongTien
      trangThaiDonHang
      uuTienTasker
      vatNuoi
  }
}
    `;
  const {TimDanhSachDonHangTheoDanhSachLichThucHien} = await GraphQLrequest({query, variables: {idLichThucHien}});
  return TimDanhSachDonHangTheoDanhSachLichThucHien;
}

export const apiDanhSachDonHangTheoKhachHang = async (idKhachHang)=> {
  const query = `query Query($idKhachHang: String) {
  DanhSachDonHangTheoKhachHang(idKhachHang: $idKhachHang) {
    danhSachDichVu {
      tenDichVu
      thoiGian
      loaiDichVu
      id
    }
    danhSachLichThucHien {
      id
      lyDoDungLich
      thoiGianBatDauLich
      thoiGianKetThucLich
      trangThaiLich
    }
    ghiChu
    diaChi {
      ghiChu
      id
      quanHuyen
      soNhaTenDuong
      tinhTP
      xaPhuong
    }
    ghiChuDanhGia
    id
    lyDoDoiNhanVien
    lyDoNhanVienTuChoiDonHang
    lyDoTuChoi
    maDonHang
    trangThaiDonHang
    tongTien
    ghiChuDanhGia
    saoDanhGia
    ngayBatDau
    ngayDatHang
    ngayKetThuc
    nhanVien {
      anhDaiDien
      cccd
      chuyenMon
      danhGia
      diaChi {
        ghiChu
        id
        quanHuyen
        soNhaTenDuong
        tinhTP
        xaPhuong
      }
      email
      ghiChu
      gioiTinh
      id
      dichVu {
        tenDichVu
        loaiDichVu
      }
      ngaySinh
      soDienThoai
      tenNhanVien
      trangThaiTaiKhoan
    }
  }
}
    `;
  const {DanhSachDonHangTheoKhachHang} = await GraphQLrequest({query, variables: {idKhachHang}});
  return DanhSachDonHangTheoKhachHang;
}

export const apiDanhGiaDonHang = async (idDonHang,saoDanhGia,ghiChuDanhGia)=> {
  const query = `mutation DanhGiaDonHang($idDonHang: String, $saoDanhGia: Float, $ghiChuDanhGia: String) {
  danhGiaDonHang(idDonHang: $idDonHang, saoDanhGia: $saoDanhGia, ghiChuDanhGia: $ghiChuDanhGia) {
    maDonHang
  }
}
    `;
  const {danhGiaDonHang} = await GraphQLrequest({query, variables: {idDonHang,saoDanhGia,ghiChuDanhGia}});
  return danhGiaDonHang;
}