import { GRAPHQL_SERVER } from "./constants";

export const apiDanhSachDichVu = async () => {
    const query = `query DichVus {
      DichVus {
        id
        tenDichVu
        maDichVu
        khoiLuongCongViec
        gia
        thoiGian
        loaiDichVu
      }
    }`;
    
    const res = await fetch(GRAPHQL_SERVER, {
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
    
    const res = await fetch(GRAPHQL_SERVER, {
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
        id
        tenDichVu
        khoiLuongCongViec
        gia
        thoiGian
        loaiDichVu
      }
    }`;
    
    const res = await fetch(GRAPHQL_SERVER, {
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