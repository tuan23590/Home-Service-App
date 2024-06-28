import { GraphQLrequest } from "./request";
export const apiTinhTP = async () => {
    const query = `query DanhSachTinhTp {
        DanhSachTinhTp {
        name_with_type
          code
        }
      }`;
    const {DanhSachTinhTp} = await GraphQLrequest({query});
    return DanhSachTinhTp;
};

export const apiXaPhuong = async (idQuanHuyen) => {
    const query = `query DanhSachXaPhuong($idQuanHuyen: String) {
        DanhSachXaPhuong(idQuanHuyen: $idQuanHuyen) {
        name_with_type
          code
        }
      }`;
    const {DanhSachXaPhuong} = await GraphQLrequest({query, variables: {idQuanHuyen}});
    return DanhSachXaPhuong;
};

export const apiQuanHuyen = async (idTinhTp) => {
    const query = `query DanhSachQuanHuyen($idTinhTp: String) {
        DanhSachQuanHuyen(idTinhTP: $idTinhTp) {
        name_with_type
          code
        }
      }`;
    const {DanhSachQuanHuyen} = await GraphQLrequest({query, variables: {idTinhTp}});
    return DanhSachQuanHuyen;
};


export const apiSuaDiaChi = async (data) => {
  console.log(data);
  const query = `mutation SuaDiaChi($idKhachHang: String, $idDiaChi: String, $tinhTp: String, $quanHuyen: String, $xaPhuong: String, $soNhaTenDuong: String, $ghiChu: String) {
  suaDiaChi(idKhachHang: $idKhachHang, idDiaChi: $idDiaChi, tinhTP: $tinhTp, quanHuyen: $quanHuyen, xaPhuong: $xaPhuong, soNhaTenDuong: $soNhaTenDuong, ghiChu: $ghiChu) {
    id
  }
}`;
  const {suaDiaChi} = await GraphQLrequest({query, variables: {
    idKhachHang: data.idKhachHang,
    idDiaChi: data.idDiaChi,
    tinhTp: data.tinhTP.name_with_type,
    quanHuyen: data.quanHuyen.name_with_type,
    xaPhuong: data.xaPhuong.name_with_type,
    soNhaTenDuong: data.soNhaTenDuong,
    ghiChu: data.ghiChu
  }});
  return suaDiaChi;
};

export const apiXoaDiaChi = async (idDiaChi,idKhachHang) => {
  const query = `mutation XoaDiaChi($idDiaChi: String, $idKhachHang: String) {
  xoaDiaChi(idDiaChi: $idDiaChi, idKhachHang: $idKhachHang) {
    id
  }
}`;
  const {xoaDiaChi} = await GraphQLrequest({query, variables: {
    idDiaChi,
    idKhachHang
  }});
  return xoaDiaChi;
};

export const apiThemDiaChi = async (data) => {
  const query = `mutation ThemDiaChi($tinhTp: String, $quanHuyen: String, $xaPhuong: String, $soNhaTenDuong: String, $ghiChu: String, $idKhachHang: String) {
  themDiaChi(tinhTP: $tinhTp, quanHuyen: $quanHuyen, xaPhuong: $xaPhuong, soNhaTenDuong: $soNhaTenDuong, ghiChu: $ghiChu, idKhachHang: $idKhachHang) {
    id
  }
}`;
  const {themDiaChi} = await GraphQLrequest({query, variables: {
    tinhTp: data.tinhTP.name_with_type,
    quanHuyen: data.quanHuyen.name_with_type,
    xaPhuong: data.xaPhuong.name_with_type,
    soNhaTenDuong: data.soNhaTenDuong,
    ghiChu: data.ghiChu,
    idKhachHang: data.idKhachHang
  }});
  return themDiaChi;
};