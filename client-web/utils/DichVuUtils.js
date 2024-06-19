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
      }
    }`;
    const {DichVus} = await GraphQLrequest({query});
    return DichVus;
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