import { GraphQLrequest } from "./request";

export const apiDanhSachKhachHang = async () => {
    const query = `query KhachHangs {
        KhachHangs {
          id
          tenKhachHang
          danhSachDiaChi {
            id
            tinhTP
            quanHuyen
            xaPhuong
            soNhaTenDuong
            ghiChu
          }
          soDienThoai
          email
          uid
        }
      }`;
   
    const {KhachHangs} = await GraphQLrequest({query});
    return KhachHangs;
  };
  