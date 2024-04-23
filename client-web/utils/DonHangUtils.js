export const DonHangLoader = async ()=> {
    const query = `query QueryDonHang {
        donHangs {
          id
          maDonHang
          khachHang
          nhanVien
          ngayDatHang
          dichVu
          ghiChu
          vatNuoi
          thoiGianThucHien {
            thoiGianBatDau
            thoiGianKetThuc
            trangThai
          }
          tongTien
          thanhToan
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