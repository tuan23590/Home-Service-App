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

  export const apiDanhSachDichVuThem = async () => {
    const query = `query DichVuThem {
      DichVuThem {
        id
        tenDichVu
        gia
        thoiGian
      }
    }`;

    const {DichVuThem} = await GraphQLrequest({query});
    return DichVuThem;
  };


  export const apiDanhSachDichVuChinh = async () => {
    const query = `query DichVuCaLe {
      DichVuCaLe {
        id
        tenDichVu
        khoiLuongCongViec
        gia
        thoiGian
        loaiDichVu
      }
    }`;
    const {DichVuCaLe} = await GraphQLrequest({query});
    return DichVuCaLe;
  };