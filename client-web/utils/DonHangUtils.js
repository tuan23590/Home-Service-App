// eslint-disable-next-line no-unused-vars

import { GRAPHQL_SERVER } from "./constants";

export const DonHangLoader = async ()=> {
    const query = `query DonHangDangChoDuyet {
      DonHangDangChoDuyet {
            id
            maDonHang
            ngayDatHang
            ngayBatDau
            ngayKetThuc
            soGioThucHien
            trangThaiDonHang
            vatNuoi
            ghiChu
            saoDanhGia
            ghiChuDanhGia
            khachHang {
              tenKhachHang
              soDienThoai
              email
            }
            danhSachDichVu {
              tenDichVu
              gia
              maDichVu
              loaiDichVu
              thoiGian
              moTaDichVu
            }
            uuTienTasker
            tongTien
            diaChi {
              id
              tinhTP
              quanHuyen
              xaPhuong
              soNhaTenDuong
              ghiChu
            }
            danhSachLichThucHien {
              thoiGianBatDauLich
              thoiGianKetThucLich
              trangThaiLich
            }
          }
    }  
      `;
    const res = await fetch(GRAPHQL_SERVER,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query
        })
    });
    const data = await res.json();
    return data;
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
          vatNuoi
          ghiChu
          saoDanhGia
          ghiChuDanhGia
          lyDoDoiNhanVien
          khachHang {
            tenKhachHang
            soDienThoai
            email
          }
          danhSachDichVu {
            tenDichVu
            gia
            maDichVu
            loaiDichVu
            thoiGian
            khoiLuongCongViec
          }
          uuTienTasker
          tongTien
          diaChi {
            id
            tinhTP
            quanHuyen
            xaPhuong
            soNhaTenDuong
            ghiChu
          }
          danhSachLichThucHien {
            id
            thoiGianBatDauLich
            thoiGianKetThucLich
            trangThaiLich
            lyDoDungLich
          }
      nhanVien {
        id
        tenNhanVien
        gioiTinh
        ngaySinh
        diaChi
        soDienThoai
        email
        cccd
        anhDaiDien
        dichVu {
          tenDichVu
        }
        ghiChu
        trangThaiTaiKhoan
        danhGia
        trangThaiHienTai
      }
    }
  }  
    `;
  const res = await fetch(GRAPHQL_SERVER,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
          query
      })
  });
  const data = await res.json();
  return data;
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
          vatNuoi
          ghiChu
          saoDanhGia
          ghiChuDanhGia
          lyDoTuChoi
          khachHang {
            tenKhachHang
            soDienThoai
            email
          }
          danhSachDichVu {
            tenDichVu
            gia
            maDichVu
            loaiDichVu
            thoiGian
            khoiLuongCongViec
          }
          uuTienTasker
          tongTien
          diaChi {
            id
            tinhTP
            quanHuyen
            xaPhuong
            soNhaTenDuong
            ghiChu
          }
          danhSachLichThucHien {
            thoiGianBatDauLich
            thoiGianKetThucLich
            trangThaiLich
          }
        }
  }  
    `;
  const res = await fetch(GRAPHQL_SERVER,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
          query
      })
  });
  const data = await res.json();
  return data;
}

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
  const res = await fetch(GRAPHQL_SERVER,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
          query
      })
  });
  const data = await res.json();
  return data;
}


export const apiChiTietDonHang = async ({params})=> {
  console.log(params.id);
  const query = `query DonHangTheoId($idDonHang: String) {
    DonHangTheoId(idDonHang: $idDonHang) {
      danhSachDichVu {
        gia
        khoiLuongCongViec
        loaiDichVu
        tenDichVu
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
      dichVuTheoYeuCauCuaKhachHang
      ghiChu
      giaDichVuTheoYeuCauCuaKhachHang
      khachHang {
        email
        soDienThoai
        tenKhachHang
      }
      lyDoDoiNhanVien
      lyDoHuyDonHang
      lyDoTuChoi
      maDonHang
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
  const res = await fetch(GRAPHQL_SERVER,{
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      },
      body: JSON.stringify({
          query,variables: { "idDonHang" : params.id }
      })
  });
  const data = await res.json();
  return data;
}



// export const TrangThaiLoader = async ()=> {
//     const query = `{
//         __type(name: "TrangThai") {
//           enumValues {
//             name
//           }
//         }
//       }              
//       `;
//     const res = await fetch(GRAPHQL_SERVER,{
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         body: JSON.stringify({
//             query
//         })
//     });
//     const data = await res.json();
//     return data;
// }


export const apiThemDonHang = async (formData) => {
  const query = `mutation ThemDonHang($soGioThucHien: Int, $danhSachLichThucHien: [String], $khachHang: String, $danhSachDichVu: [String], $vatNuoi: String, $ghiChu: String, $uuTienTasker: Boolean, $diaChi: String, $tongTien: Float, $dichVuTheoYeuCauCuaKhachHang: String, $giaDichVuTheoYeuCauCuaKhachHang: Float, $soThangLapLai: Int, $dichVuChinh: String) {
    themDonHang(soGioThucHien: $soGioThucHien, danhSachLichThucHien: $danhSachLichThucHien, khachHang: $khachHang, danhSachDichVu: $danhSachDichVu, vatNuoi: $vatNuoi, ghiChu: $ghiChu, uuTienTasker: $uuTienTasker, diaChi: $diaChi, tongTien: $tongTien, dichVuTheoYeuCauCuaKhachHang: $dichVuTheoYeuCauCuaKhachHang, giaDichVuTheoYeuCauCuaKhachHang: $giaDichVuTheoYeuCauCuaKhachHang, soThangLapLai: $soThangLapLai, dichVuChinh: $dichVuChinh) {
      maDonHang
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
      }
    })
  });
  
  const data = await res.json();
  return data;
};



export const themNhanVienVaoDonHang = async (idDonHang,idNhanVien) => {
  const query = `mutation ThemNhanVienVaoDonHang($idNhanVien: [String], $idDonHang: String) {
    themNhanVienVaoDonHang(idNhanVien: $idNhanVien, idDonHang: $idDonHang) {
      maDonHang
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
        idNhanVien,
        idDonHang
      }
    })
  });
  
  const data = await res.json();
  return data;
};

export const apiTuChoiDonHang = async (idDonHang, lyDoTuChoi) => {
  const query = `mutation TuChoiDonHang($lyDoTuChoi: String, $idDonHang: String) {
    tuChoiDonHang(lyDoTuChoi: $lyDoTuChoi, idDonHang: $idDonHang) {
      maDonHang
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
        lyDoTuChoi
      }
    })
  });
  
  const data = await res.json();
  return data;
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