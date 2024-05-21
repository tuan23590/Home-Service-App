// eslint-disable-next-line no-unused-vars
import { GraphQLrequest } from './request';
const API_URL = 'http://localhost:4000/graphql'

export const DonHangLoader = async ()=> {
    const query = `query DonHangs {
      DonHangs {
        id
        maDonHang
        ngayDatHang
        ngayBatDau
        ngayKetThuc
        soGioThucHien
        trangThaiDonHang
        vatNuoi
        ghiCHu
        saoDanhGia
        ghiChuDanhGia
        khachHang {
          tenKhachHang
          danhSachDiaChi
          soDienThoai
          email
        }
        danhSachDichVu {
          tenDichVu
          gia
          maDichVu
          loaiDichVu
        }
      }
    }  
      `;
    const res = await fetch(API_URL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query
        })
    });
    const data = await res.json();
    return data;
}


export const TrangThaiLoader = async ()=> {
    const query = `{
        __type(name: "TrangThai") {
          enumValues {
            name
          }
        }
      }              
      `;
    const res = await fetch(API_URL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            query
        })
    });
    const data = await res.json();
    return data;
}


export const themDonHang = async (formData) => {
  const query = `mutation Mutation(
    $maDonHang: String, 
    $makhachHang: String, 
    $trangThaiDonHang: String = "", 
    $tongTien: Int, 
    $vatNuoi: String, 
    $dichVu: String, $ghiChu: String) {
    createDonHang(
      data: {maDonHang: $maDonHang, makhachHang: $makhachHang, trangThaiDonHang: $trangThaiDonHang, tongTien: $tongTien, vatNuoi: $vatNuoi, dichVu: $dichVu, ghiChu: $ghiChu}
    ) {
      id
    }
  }
  
  `;
  const res = await fetch('https://api-ap-southeast-2.hygraph.com/v2/clv4uoiq108fp07w7579676h9/master', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables: {
        maDonHang: formData.maDonHang,
        makhachHang: formData.khachHang,
        trangThaiDonHang: formData.trangThaiDonHang,
        tongTien: parseInt(formData.tongTien),
        vatNuoi: formData.vatNuoi,
        dichVu: formData.dichVu,
      }
    })
  });
  
  const data = await res.json();
  pushingDonHang(data.data.createDonHang.id);
  return data;
};

export const pushingDonHang = async (ID) => {
  const query = `mutation MyMutation($id: ID) {
    publishDonHang(where: {id: $id}) {
      id
    }
  }  
  `;
  const res = await fetch('https://api-ap-southeast-2.hygraph.com/v2/clv4uoiq108fp07w7579676h9/master', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables: {
        id: ID
      }
    })
  });
  
  const data = await res.json();
  console.log(data);
  return data;
};