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
  export const apiTimKhachHangTheoUid = async (uid) => {
    const query = `query TimKhachHangTheoUid($uid: String) {
  TimKhachHangTheoUid(uid: $uid) {
    id
    tenKhachHang
    soDienThoai
    email
    uid
  }
}`;
    const {TimKhachHangTheoUid} = await GraphQLrequest({query,variables: {uid}})
    return TimKhachHangTheoUid;
  };



  export const apiThemKhachHang = async (data) => {
    const query = `mutation ThemKhachHang($tenKhachHang: String, $soDienThoai: String, $email: String, $uid: String) {
  themKhachHang(tenKhachHang: $tenKhachHang, soDienThoai: $soDienThoai, email: $email, uid: $uid) {
    id
    email
    soDienThoai
    tenKhachHang
  }
}`;
    const phoneNumber =localStorage.getItem('phoneNumber') || null
    const displayName = localStorage.getItem('displayName') || null
    const {themKhachHang} = await GraphQLrequest({query,variables: {
      uid: data.uid,
      tenKhachHang: displayName || data.displayName,
      soDienThoai: phoneNumber || null,
      email: data.email
    }})
    localStorage.removeItem('phoneNumber');
    localStorage.removeItem('displayName');
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

  export const apiSuaKhachHang = async (data) => {
    console.log(data);
    const query = `mutation SuaKhachHang($idKhachHang: String, $tenKhachHang: String, $soDienThoai: String, $email: String) {
  suaKhachHang(idKhachHang: $idKhachHang, tenKhachHang: $tenKhachHang, soDienThoai: $soDienThoai, email: $email) {
    id
  }
}`;
    const {suaKhachHang} = await GraphQLrequest({query,variables: {
      idKhachHang: data.idKhachHang,
      tenKhachHang: data.tenKhachHang,
      soDienThoai: data.soDienThoai,
      email: data.email
    }})
    return suaKhachHang;
  };
  export const apiTimKhachHangTheoId = async (idKhachHang) => {
    const query = `  query TimKhachHangTheoId($idKhachHang: String) {
    TimKhachHangTheoId(idKhachHang: $idKhachHang) {
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
    const {TimKhachHangTheoId} = await GraphQLrequest({query,variables: {
      idKhachHang
    }
    })
    return TimKhachHangTheoId;
  };



