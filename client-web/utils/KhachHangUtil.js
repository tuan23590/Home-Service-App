import { GRAPHQL_SERVER } from './constants';
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
    const res = await fetch(GRAPHQL_SERVER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ query })
    });
    
    const data = await res.json();
    return data;
  };
  