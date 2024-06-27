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
    const query = `query TimKhachHangTheoEmail($email: String) {
  TimKhachHangTheoEmail(email: $email) {
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



  export const apiThemKhachHang = async (data) => {
    const query = `mutation ThemKhachHang($tenKhachHang: String, $soDienThoai: String, $email: String) {
  themKhachHang(tenKhachHang: $tenKhachHang, soDienThoai: $soDienThoai, email: $email) {
    id
    email
    soDienThoai
    tenKhachHang
  }
}`;
    const {themKhachHang} = await GraphQLrequest({query,variables: {
      tenKhachHang: data.displayName,
      soDienThoai: data.phoneNumber,
      email: data.email
    }})
    return themKhachHang;
  };


  export const apiCapNhatSoDienThoaiKhachHang = async (idKhachHang,soDienThoai) => {
    const query = `mutation CapNhatSoDienThoaiKhachHang($soDienThoai: String, $idKhachHang: String) {
  capNhatSoDienThoaiKhachHang(soDienThoai: $soDienThoai, idKhachHang: $idKhachHang) {
    soDienThoai
    tenKhachHang
    email
  }
}`;
    const {capNhatSoDienThoaiKhachHang} = await GraphQLrequest({query,variables: {
      idKhachHang,
      soDienThoai
    }})
    return capNhatSoDienThoaiKhachHang;
  };