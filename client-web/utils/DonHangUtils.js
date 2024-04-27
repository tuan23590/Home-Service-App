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