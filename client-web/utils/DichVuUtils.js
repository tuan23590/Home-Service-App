const API_URL = 'http://localhost:4000/graphql'

export const DBDataDichVu = async () => {
    const query = `query Query {
      dichVus {
        id
        tenDichVu
        thoiGianLamViec
        giaTien
        }
      }`;
    
    const res = await fetch('https://api-ap-southeast-2.hygraph.com/v2/clv4uoiq108fp07w7579676h9/master', {
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
  };

  export const dichVuLoader = async () => {
    const query = `query DichVuThem {
      DichVuThem {
        id
        tenDichVu
        gia
        thoiGian
      }
    }`;
    
    const res = await fetch(API_URL, {
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
  };


  export const apiDanhSachDichVuChinh = async () => {
    const query = `query DichVuCaLe {
      DichVuCaLe {
        tenDichVu
        khoiLuongCongViec
        gia
        thoiGian
        loaiDichVu
      }
    }`;
    
    const res = await fetch(API_URL, {
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
  };