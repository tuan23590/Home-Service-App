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
    const query = `mutation ThemDichVu($tenDichVu: String!, $khoiLuongCongViec: String, $gia: Int, $thoiGian: Int) {
  themDichVu(tenDichVu: $tenDichVu, khoiLuongCongViec: $khoiLuongCongViec, gia: $gia, thoiGian: $thoiGian) {
    tenDichVu
  }
}`;
    const {themDichVu} = await GraphQLrequest({query, variables: {
      tenDichVu: dichVuData.tenDichVu,
      khoiLuongCongViec: dichVuData.khoiLuongCongViec,
      gia: dichVuData.gia.value,
      thoiGian: dichVuData.thoiGian.value
    }});
    return themDichVu;
  };