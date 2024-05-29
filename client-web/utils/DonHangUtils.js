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

export const TrangThaiLoader = async ()=> {
    const query = `{
        __type(name: "TrangThai") {
          enumValues {
            name
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


export const themDonHang = async (formData) => {
  const query = `mutation Mutation(
    $maDonHang: String, 
    $makhachHang: String, 
    $trangThaiDonHang: String = "", 
    $tongTien: Int, 
    $vatNuoi: String, 
    $dichVu: String, $ghiChu: String) {
    createDonHang(
      data: {maDonHang: $maDonHang, makhachHang: $makhachHang, trangThaiDonHang: $trangThaiDonHang, tongTien: $tongTien, vatNuoi: $vatNuoi, dichVu: $dichVu, ghiChu: $ghiChu}
    ) {
      id
    }
  }
  
  `;
  const res = await fetch('https://api-ap-southeast-2.hygraph.com/v2/clv4uoiq108fp07w7579676h9/master', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables: {
        maDonHang: formData.maDonHang,
        makhachHang: formData.khachHang,
        trangThaiDonHang: formData.trangThaiDonHang,
        tongTien: parseInt(formData.tongTien),
        vatNuoi: formData.vatNuoi,
        dichVu: formData.dichVu,
      }
    })
  });
  
  const data = await res.json();
  pushingDonHang(data.data.createDonHang.id);
  return data;
};

export const pushingDonHang = async (ID) => {
  const query = `mutation MyMutation($id: ID) {
    publishDonHang(where: {id: $id}) {
      id
    }
  }  
  `;
  const res = await fetch('https://api-ap-southeast-2.hygraph.com/v2/clv4uoiq108fp07w7579676h9/master', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables: {
        id: ID
      }
    })
  });
  
  const data = await res.json();
  console.log(data);
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