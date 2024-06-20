import { GraphQLrequest } from "./request";

export const apiDanhSachDichVu = async () => {
    const query = `query DichVus {
      DichVus {
        id
        tenDichVu
        maDichVu
        khoiLuongCongViec
        gia
        thoiGian
        loaiDichVu
        trangThai
      }
    }`;
    const {DichVus} = await GraphQLrequest({query});
    return DichVus;
  };
  export const apiDanhSachDichVuDangHoatDong = async () => {
    const query = `query danhSachDichVuDangHoatDong {
      danhSachDichVuDangHoatDong {
        id
        tenDichVu
        maDichVu
        khoiLuongCongViec
        gia
        thoiGian
        loaiDichVu
        trangThai
      }
    }`;
    const {danhSachDichVuDangHoatDong} = await GraphQLrequest({query});
    return danhSachDichVuDangHoatDong;
  };


  export const apiThemDichVu = async (dichVuData) => {
    const query = `mutation ThemDichVu($tenDichVu: String!, $khoiLuongCongViec: String, $gia: Int, $thoiGian: Int, $loaiDichVu: String) {
  themDichVu(tenDichVu: $tenDichVu, khoiLuongCongViec: $khoiLuongCongViec, gia: $gia, thoiGian: $thoiGian, loaiDichVu: $loaiDichVu) {
    tenDichVu
  }
}`;
    const {themDichVu} = await GraphQLrequest({query, variables: {
      tenDichVu: dichVuData.tenDichVu,
      khoiLuongCongViec: dichVuData.khoiLuongCongViec,
      gia: parseInt(dichVuData.gia),
      thoiGian: dichVuData.thoiGian.value,
      loaiDichVu: dichVuData.loaiDichVu
    }});
    return themDichVu;
  };

  export const apiDungDichVu = async (idDichVu) => {
    const query = `mutation DungDichVu($idDichVu: String) {
  dungDichVu(idDichVu: $idDichVu) {
    maDichVu
    trangThai
  }
}`;
    const {dungDichVu} = await GraphQLrequest({query,variables: {idDichVu}});
    return dungDichVu;
  };

  export const apiTiepTucDichVu = async (idDichVu) => {
    const query = `mutation KichHoatDichVu($idDichVu: String) {
  kichHoatDichVu(idDichVu: $idDichVu) {
    trangThai
  }
}`;
    const {kichHoatDichVu} = await GraphQLrequest({query,variables: {idDichVu}});
    return kichHoatDichVu;
  };