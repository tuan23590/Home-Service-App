// eslint-disable-next-line no-unused-vars
import { GraphQLrequest } from './request';



export const DonHangLoader = async ()=> {
    const query = `query MyQuery {
      donHangs {
        id
        maDonHang
        khachHang
        ngayDatHang
        dichVu
        nhanVien
        thanhToan
        thoiGianThucHien {
          thoiGianBatDau
          thoiGianKetThuc
          trangThai
        }
        tongTien
        trangThaiDonHang
        vatNuoi
      
      }
    }
          
      `;
    const res = await fetch('https://api-ap-southeast-2.hygraph.com/v2/clv4uoiq108fp07w7579676h9/master',{
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
    const res = await fetch('https://api-ap-southeast-2.hygraph.com/v2/clv4uoiq108fp07w7579676h9/master',{
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
    $khachHang: String, 
    $trangThaiDonHang: String = "", 
    $tongTien: Int, 
    $vatNuoi: String, 
    $dichVu: String, $ghiChu: String) {
    createDonHang(
      data: {maDonHang: $maDonHang, khachHang: $khachHang, trangThaiDonHang: $trangThaiDonHang, tongTien: $tongTien, vatNuoi: $vatNuoi, dichVu: $dichVu, ghiChu: $ghiChu}
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
        khachHang: formData.khachHang,
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