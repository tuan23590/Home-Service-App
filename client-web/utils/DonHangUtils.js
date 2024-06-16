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
        diaChi
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
      nhanVienCu {
        anhDaiDien
        cccd
        diaChi
        email
        ghiChu
        gioiTinh
        ngaySinh
        soDienThoai
        tenNhanVien
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
  const query = `mutation ThemDonHang($soGioThucHien: Int, $danhSachLichThucHien: [String], $khachHang: String, $danhSachDichVu: [String], $vatNuoi: String, $ghiChu: String, $uuTienTasker: Boolean, $diaChi: String, $tongTien: Float, $dichVuTheoYeuCauCuaKhachHang: String, $giaDichVuTheoYeuCauCuaKhachHang: Float, $soThangLapLai: Int, $dichVuChinh: String) {
    themDonHang(soGioThucHien: $soGioThucHien, danhSachLichThucHien: $danhSachLichThucHien, khachHang: $khachHang, danhSachDichVu: $danhSachDichVu, vatNuoi: $vatNuoi, ghiChu: $ghiChu, uuTienTasker: $uuTienTasker, diaChi: $diaChi, tongTien: $tongTien, dichVuTheoYeuCauCuaKhachHang: $dichVuTheoYeuCauCuaKhachHang, giaDichVuTheoYeuCauCuaKhachHang: $giaDichVuTheoYeuCauCuaKhachHang, soThangLapLai: $soThangLapLai, dichVuChinh: $dichVuChinh) {
      maDonHang
    }
  }
  `;
 
  const {ThemDonHang} = await GraphQLrequest ({query,
    variables: {
      soGioThucHien: formData.dichVuChinh.thoiGian,
      danhSachLichThucHien: JSON.stringify(formData.danhSachLichThucHien),
      khachHang: JSON.stringify(formData.khachHang),
      danhSachDichVu: formData.danhSachDichVuThem.map(dichVu => dichVu.id),
      vatNuoi: formData.vatNuoi,
      ghiChu: formData.ghiChu,
      uuTienTasker: null,
      diaChi: JSON.stringify(formData.diaChi),
      tongTien: formData.tongTien,
      dichVuTheoYeuCauCuaKhachHang: formData.dichVuTheoYeuCauCuaKhachHang,
      giaDichVuTheoYeuCauCuaKhachHang: parseFloat(formData.giaDichVuTheoYeuCauCuaKhachHang),
      soThangLapLai: formData.soThangLapLai.value,
      dichVuChinh: formData.dichVuChinh.id
    }});
  return ThemDonHang;
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

export const apiDanhSachDonHangTheoNhanVien = async (idNhanVien)=> {
  const query = `query DanhSachDonHangTheoNhanVien($idNhanVien: String) {
  DanhSachDonHangTheoNhanVien(idNhanVien: $idNhanVien) {
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
  const {DanhSachDonHangTheoNhanVien} = await GraphQLrequest({query, variables: {idNhanVien}});
  return DanhSachDonHangTheoNhanVien;
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