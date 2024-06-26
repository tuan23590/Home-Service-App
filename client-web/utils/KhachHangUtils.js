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
        }
      }`;
   
    const {KhachHangs} = await GraphQLrequest({query});
    return KhachHangs;
  };
  export const apiTimKhachHangTheoEmail = async (email) => {
    const query = `query TimKhachHangTheoEmail {
  TimKhachHangTheoEmail {
    danhSachDiaChi {
      ghiChu
      id
      quanHuyen
      soNhaTenDuong
      tinhTP
      xaPhuong
    }
    email
    id
    soDienThoai
    tenKhachHang
  }
}`;
    const {TimKhachHangTheoEmail} = await GraphQLrequest({query,variables: {email}})
    return TimKhachHangTheoEmail;
  };