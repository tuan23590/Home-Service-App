import { request, gql } from 'graphql-request'



const MASTER_URL = 'https://api-ap-southeast-2.hygraph.com/v2/clv4uoiq108fp07w7579676h9/master'
const API_URL = 'http://192.168.1.46:4000/graphql'
const getSlider=async()=>{
const query = gql`
query GetSlider {
    sliders {
      id
      name
      image {
        url
      }
    }
  }
`
const result = await request(MASTER_URL, query)
return result;
}


const getCategory=async()=>{
    const query = gql`
    query getCategory {
        categories {
          id
          name
          type
          icon {
            url
          }
        }
      }   
    `
    const result = await request(MASTER_URL, query)
    return result;
}


const getDiscovers=async()=>{ 
  const query = gql`
  query getDiscover {
    discovers {
      name
      image {
        url
      }
    }
  }     
  `
  const result = await request(MASTER_URL, query)
  return result;
}

const getDichVuThem=async()=>{ 
  
  const query = gql`
  query Query {
    DichVuThem {
      id
      tenDichVu
      maDichVu
      khoiLuongCongViec
      gia
      thoiGian
      icon
      iconSelected
    }
  }        
  `
  const result = await request(API_URL, query)
  return result;
}
const themLichThucHien = async (lichLamViec, thoiLuongDonHang) => {
  const lichLamViecEpoch = lichLamViec.map(date => Math.floor(date.getTime() / 1000));
  const lichLamViecEpochCongThoiLuongDonHang = lichLamViecEpoch.map(epoch => epoch + thoiLuongDonHang * 3600);

  const promises = lichLamViecEpochCongThoiLuongDonHang.map((epoch, i) => {
    const variables = {
      thoiGianBatDauLich: lichLamViecEpoch[i],
      thoiGianKetThucLich: epoch,
      trangThaiLich: "Chưa hoàn thành"
    };

    const query = gql`
      mutation ThemLichThucHien${i}($thoiGianBatDauLich: Int, $thoiGianKetThucLich: Int, $trangThaiLich: String) {
        themLichThucHien(thoiGianBatDauLich: $thoiGianBatDauLich, thoiGianKetThucLich: $thoiGianKetThucLich, trangThaiLich: $trangThaiLich) {
          id
        }
      }
    `;
    return request(API_URL, query, variables);
  });
  const results = await Promise.all(promises);
  return results;
};




const themDonHang=async(lichLamViec,dichVuChinh,dichVuThem,vatNuoi,ghiChu,uuTienTasker,tongTien)=>{ 

  const results = await themLichThucHien(lichLamViec,dichVuChinh.thoiGian);
  const resultIDs = results.map(result => result.themLichThucHien.id);
  const variables = {
    ngayBatDau: 3924293849023,
    ngayKetThuc: 3492394892038,
    soGioThucHien: dichVuChinh.thoiGian,
    danhSachLichThucHien: resultIDs,
    khachHang: "663e5bc32b0d073597bbf0d3",
    danhSachDichVu: [...dichVuThem.map(item => item.id), dichVuChinh.id],
    vatNuoi: vatNuoi,
    ghiChu: ghiChu,
    uuTienTasker: uuTienTasker,
    tongTien: tongTien,
    diaChi: "664c3c36de267a6cf527557e"
  };
  const query = gql`
  mutation ThemDonHang($soGioThucHien: Int, $danhSachLichThucHien: [String], $khachHang: String, $danhSachDichVu: [String], $vatNuoi: String, $ghiChu: String, $uuTienTasker: Boolean, $tongTien: Float, $diaChi: String) {
    themDonHang(soGioThucHien: $soGioThucHien, danhSachLichThucHien: $danhSachLichThucHien, khachHang: $khachHang, danhSachDichVu: $danhSachDichVu, vatNuoi: $vatNuoi, ghiChu: $ghiChu, uuTienTasker: $uuTienTasker, tongTien: $tongTien, diaChi: $diaChi) {
      maDonHang
    }
  }           
  `
  const result = await request(API_URL, query,variables)
  return result;
}


const getDichVuCaLe=async()=>{ 
  
  const query = gql`
  query Query {
    DichVuCaLe {
      id
      maDichVu
      khoiLuongCongViec
      gia
      thoiGian
    }
  }        
  `
  const result = await request(API_URL, query)
  return result;
}

const apiTinhTP=async()=>{ 
  
  const query = gql`
  query DanhSachTinhTp {
        DanhSachTinhTp {
        name_with_type
          code
        }
      }        
  `
  const result = await request(API_URL, query)
  return result;
}
const apiQuanHuyen=async(idTinhTp)=>{ 
  const query = gql`
  query DanhSachQuanHuyen($idTinhTp: String) {
        DanhSachQuanHuyen(idTinhTP: $idTinhTp) {
        name_with_type
          code
        }
      }     
  `
  const variavles = {
    idTinhTp: idTinhTp
  }
  const result = await request(API_URL, query,variavles)
  return result;
}
const apiXaPhuong=async(idQuanHuyen)=>{ 
  
  const query = gql`
  query DanhSachXaPhuong($idQuanHuyen: String) {
        DanhSachXaPhuong(idQuanHuyen: $idQuanHuyen) {
        name_with_type
          code
        }
      }  
  `
  const variavles = {
    idQuanHuyen: idQuanHuyen
  }
  const result = await request(API_URL, query,variavles)
  return result;
}
const apiThemDiaChi=async(address)=>{ 
  const query = gql`
mutation ThemDiaChi($idKhachHang: String, $tinhTp: String, $quanHuyen: String, $xaPhuong: String, $soNhaTenDuong: String, $ghiChu: String) {
  themDiaChi(idKhachHang: $idKhachHang, tinhTP: $tinhTp, quanHuyen: $quanHuyen, xaPhuong: $xaPhuong, soNhaTenDuong: $soNhaTenDuong, ghiChu: $ghiChu) {
    id
    ghiChu
    quanHuyen
    soNhaTenDuong
    tinhTP
    xaPhuong
  }
}
  `
  const variavles = {
    tinhTp: address.tinhTPName,
    quanHuyen: address.quanHuyenName,
    xaPhuong: address.xaPhuongName,
    soNhaTenDuong: address.soNhaTenDuong,
    ghiChu: address.ghiChuDiaChi,
    idKhachHang: address.khachHangId
  }
  const result = await request(API_URL, query,variavles)
  return result;
}
const apiDanhSachDiaChi=async(id)=>{ 
  
  const query = gql`
  query TimNhanVienTheoEmail($idKhachHang: String) {
  TimKhachHangTheoId(idKhachHang: $idKhachHang) {
    danhSachDiaChi {
      xaPhuong
      tinhTP
      soNhaTenDuong
      quanHuyen
      id
      ghiChu
    }
    email
    id
    soDienThoai
    tenKhachHang
  }
} 
  `
  const variavles = {
    idKhachHang: id
  }
  const result = await request(API_URL, query,variavles)
  return result;
}

const apiThemDonHang=async(donHangData)=>{ 
  console.log('donHangData',donHangData.diaChi.id);
  const query = gql`
  mutation ThemDonHang($soGioThucHien: Int, $danhSachLichThucHien: [String], $khachHang: String, $danhSachDichVu: [String], $vatNuoi: String, $ghiChu: String, $diaChi: String, $tongTien: Float, $soThangLapLai: Int) {
    themDonHang(soGioThucHien: $soGioThucHien, danhSachLichThucHien: $danhSachLichThucHien, khachHang: $khachHang, danhSachDichVu: $danhSachDichVu, vatNuoi: $vatNuoi, ghiChu: $ghiChu, diaChi: $diaChi, tongTien: $tongTien, soThangLapLai: $soThangLapLai) {
      maDonHang
    }
  } 
  `
  const millisecondsToHours = 1000 * 60 * 60;
  const convertedData = donHangData.lichLamViec.map(date => {
    const thoiGianBatDau = date.getTime(); // Chuyển đổi thành epoch time (milliseconds)
    const thoiGianKetThuc = thoiGianBatDau + donHangData.dichVuChinh.thoiGian * millisecondsToHours; // Tính toán gioKetThuc
    return {
      thoiGianBatDau,
        thoiGianKetThuc
    };
});
console.log('convertedData',convertedData);

  const variables = {
    soGioThucHien: donHangData.dichVuChinh.thoiGian,
    danhSachLichThucHien: JSON.stringify(convertedData),
    khachHang: JSON.stringify(donHangData.khachHang),
    danhSachDichVu: Array(donHangData.dichVuChinh.thoiGian).fill(donHangData.dichVuChinh.id),
    vatNuoi: donHangData.vatNuoi,
    ghiChu: donHangData.ghiChu,
    diaChi: JSON.stringify(donHangData.diaChi),
    tongTien: donHangData.tongTien,
    soThangLapLai: 0
};
//   console.log('variables',variables);
  const result = await request(API_URL, query,variables)
  console.log('result',result);
  return result;
}

const apiDanhSachDonHang=async(id)=>{ 
  
  const query = gql`
  query DanhSachDonHangTheoKhachHang($idKhachHang: String) {
  DanhSachDonHangTheoKhachHang(idKhachHang: $idKhachHang) {
    id
    maDonHang
    ngayDatHang
    ngayBatDau
    ngayKetThuc
    soGioThucHien
    trangThaiDonHang
    danhSachLichThucHien {
      trangThaiLich
      thoiGianKetThucLich
      thoiGianBatDauLich
      lyDoDungLich
    }
    nhanVien {
      cccd
      chuyenMon
      danhGia
      ghiChu
      email
      gioiTinh
      ngaySinh
      soDienThoai
      tenNhanVien
    }
    diaChi {
      xaPhuong
      tinhTP
      soNhaTenDuong
      quanHuyen
      id
      ghiChu
    }
    vatNuoi
    ghiChu
    saoDanhGia
    ghiChuDanhGia
    uuTienTasker
    tongTien
    lyDoTuChoi
    lyDoDoiNhanVien
    soThangLapLai
    saoDanhGia
    lyDoNhanVienTuChoiDonHang
    danhSachDichVu {
      id
      loaiDichVu
      tenDichVu
      thoiGian
    }
  }
} 
  `
  const variavles = {
    idKhachHang: id
  }
  const result = await request(API_URL, query,variavles)
  return result;
}
const apiDanhGiaDonHang=async(danhGiaData)=>{ 
  
  const query = gql`
  mutation DanhGiaDonHang($idDonHang: String, $saoDanhGia: Float, $ghiChuDanhGia: String) {
  danhGiaDonHang(idDonHang: $idDonHang, saoDanhGia: $saoDanhGia, ghiChuDanhGia: $ghiChuDanhGia) {
    maDonHang
  }
}
  `
  const variavles = {
    idDonHang: danhGiaData.idDonHang,
    saoDanhGia: parseFloat(danhGiaData.saoDanhGia),
    ghiChuDanhGia: danhGiaData.ghiChuDanhGia
  }
  const result = await request(API_URL, query,variavles)
  return result;
}

const apiThemKhachHang=async(tenKhachHang,soDienThoai,email,uid)=>{ 
  
  const query = gql`
 mutation ThemKhachHang($tenKhachHang: String, $soDienThoai: String, $email: String, $uid: String) {
  themKhachHang(tenKhachHang: $tenKhachHang, soDienThoai: $soDienThoai, email: $email, uid: $uid) {
    id
    email
    soDienThoai
    tenKhachHang
  }
}
  `
  const variavles = {
    tenKhachHang: tenKhachHang,
    soDienThoai: soDienThoai,
    email: email,
    uid: uid
  }
  const result = await request(API_URL, query,variavles)
  return result;
}

const apiKhachHangTheoUid =async(uid)=>{ 
  
  const query = gql`
 query TimKhachHangTheoUid($uid: String) {
  TimKhachHangTheoUid(uid: $uid) {
    id
    tenKhachHang
    soDienThoai
    email
    uid
  }
}
  `
  const variavles = {
    uid: uid
  }
  const result = await request(API_URL, query,variavles)
  return result;
}


const apiNhanVienTheoEmail =async(email)=>{ 
  
  const query = gql`
 query TimNhanVienTheoEmail($email: String) {
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
          donHang {
            id
            maDonHang
          }
        }
        anhDaiDien
        chuyenMon
  }
}
  `
  const variavles = {
    email: email
  }
  const result = await request(API_URL, query,variavles)
  return result;
}


const apiDanhSachDonHangChoNhan =async(idNhanVien)=>{ 
  
  const query = gql`
query DanhSachDonHangChoXacNhanTheoNhanVien($idNhanVien: String) {
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
        donHang{
        id
        }
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
  `
  const variavles = {
    idNhanVien: idNhanVien
  }
  const result = await request(API_URL, query,variavles)
  return result;
}



const apiNhanVienXacNhanCongViec =async(idDonHang)=>{ 
  
  const query = gql`
mutation NhanVienXacNhanCongViec($idDonHang: String) {
  nhanVienXacNhanCongViec(idDonHang: $idDonHang) {
    maDonHang
  }
}
  `
  const variavles = {
    idDonHang: idDonHang
  }
  const result = await request(API_URL, query,variavles)
  return result;
}
const apiNhanVienTuChoiCongViec =async(idDonHang,lyDoNhanVienTuChoiDonHang)=>{ 
  
  const query = gql`
mutation NhanVienTuChoiCongViec($idDonHang: String, $lyDoNhanVienTuChoiDonHang: String) {
  nhanVienTuChoiCongViec(idDonHang: $idDonHang, lyDoNhanVienTuChoiDonHang: $lyDoNhanVienTuChoiDonHang) {
    maDonHang
  }
}
  `
  const variavles = {
    idDonHang: idDonHang,
    lyDoNhanVienTuChoiDonHang: lyDoNhanVienTuChoiDonHang
  }
  const result = await request(API_URL, query,variavles)
  return result;
}

const apiChiTietDonHang =async(idDonHang)=>{ 
  
  const query = gql`
query DonHangTheoId($idDonHang: String) {
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
  `
  const variavles = {
    idDonHang: idDonHang,
  }
  const result = await request(API_URL, query,variavles)
  return result;
}

const apiDanhSachDonHangDaXacNhanTheoNhanVien =async(idNhanVien)=>{ 
  
  const query = gql`
query DanhSachDonHangDaXacNhanTheoNhanVien($idNhanVien: String) {
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
  `
  const variavles = {
    idNhanVien: idNhanVien,
  }
  const result = await request(API_URL, query,variavles)
  return result;
}


export default {
  apiDanhSachDonHangDaXacNhanTheoNhanVien,
  apiChiTietDonHang,
  apiNhanVienXacNhanCongViec,
  apiNhanVienTuChoiCongViec,
  apiDanhSachDonHangChoNhan,
  apiNhanVienTheoEmail,
  apiKhachHangTheoUid,
    apiThemKhachHang,
    getSlider,
    getCategory,
    getDiscovers,
    getDichVuThem,
    getDichVuCaLe,
    themDonHang,
    apiTinhTP,
    apiQuanHuyen,
    apiXaPhuong,
    apiThemDiaChi,
    apiDanhSachDiaChi,
    apiThemDonHang,
    apiDanhSachDonHang,
    apiDanhGiaDonHang
};


