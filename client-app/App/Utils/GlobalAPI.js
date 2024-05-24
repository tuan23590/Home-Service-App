import { request, gql } from 'graphql-request'



const MASTER_URL = 'https://api-ap-southeast-2.hygraph.com/v2/clv4uoiq108fp07w7579676h9/master'
const API_URL = 'http://192.168.1.33:4000/graphql'
const getSlider=async()=>{
const query = gql`
query GetSlider {
    sliders {
      id
      name
      image {
        url
      }
    }
  }
`
const result = await request(MASTER_URL, query)
return result;
}


const getCategory=async()=>{
    const query = gql`
    query getCategory {
        categories {
          id
          name
          type
          icon {
            url
          }
        }
      }   
    `
    const result = await request(MASTER_URL, query)
    return result;
}


const getDiscovers=async()=>{ 
  const query = gql`
  query getDiscover {
    discovers {
      name
      image {
        url
      }
    }
  }     
  `
  const result = await request(MASTER_URL, query)
  return result;
}

const getDichVuThem=async()=>{ 
  
  const query = gql`
  query Query {
    DichVuThem {
      id
      tenDichVu
      maDichVu
      moTaDichVu
      gia
      thoiGian
      icon
      iconSelected
    }
  }        
  `
  const result = await request(API_URL, query)
  return result;
}
const themLichThucHien = async (lichLamViec, thoiLuongDonHang) => {
  const lichLamViecEpoch = lichLamViec.map(date => Math.floor(date.getTime() / 1000));
  const lichLamViecEpochCongThoiLuongDonHang = lichLamViecEpoch.map(epoch => epoch + thoiLuongDonHang * 3600);

  const promises = lichLamViecEpochCongThoiLuongDonHang.map((epoch, i) => {
    const variables = {
      thoiGianBatDauLich: lichLamViecEpoch[i],
      thoiGianKetThucLich: epoch,
      trangThaiLich: "Chưa hoàn thành"
    };

    const query = gql`
      mutation ThemLichThucHien${i}($thoiGianBatDauLich: Int, $thoiGianKetThucLich: Int, $trangThaiLich: String) {
        themLichThucHien(thoiGianBatDauLich: $thoiGianBatDauLich, thoiGianKetThucLich: $thoiGianKetThucLich, trangThaiLich: $trangThaiLich) {
          id
        }
      }
    `;
    return request(API_URL, query, variables);
  });
  const results = await Promise.all(promises);
  return results;
};




const themDonHang=async(lichLamViec,dichVuChinh,dichVuThem,vatNuoi,ghiChu,uuTienTasker,tongTien)=>{ 

  const results = await themLichThucHien(lichLamViec,dichVuChinh.thoiGian);
  const resultIDs = results.map(result => result.themLichThucHien.id);
  const variables = {
    ngayBatDau: 3924293849023,
    ngayKetThuc: 3492394892038,
    soGioThucHien: dichVuChinh.thoiGian,
    danhSachLichThucHien: resultIDs,
    khachHang: "663e5bc32b0d073597bbf0d3",
    danhSachDichVu: [...dichVuThem.map(item => item.id), dichVuChinh.id],
    vatNuoi: vatNuoi,
    ghiChu: ghiChu,
    uuTienTasker: uuTienTasker,
    tongTien: tongTien,
    diaChi: "664c3c36de267a6cf527557e"
  };
  const query = gql`
  mutation ThemDonHang($soGioThucHien: Int, $danhSachLichThucHien: [String], $khachHang: String, $danhSachDichVu: [String], $vatNuoi: String, $ghiChu: String, $uuTienTasker: Boolean, $tongTien: Float, $diaChi: String) {
    themDonHang(soGioThucHien: $soGioThucHien, danhSachLichThucHien: $danhSachLichThucHien, khachHang: $khachHang, danhSachDichVu: $danhSachDichVu, vatNuoi: $vatNuoi, ghiChu: $ghiChu, uuTienTasker: $uuTienTasker, tongTien: $tongTien, diaChi: $diaChi) {
      maDonHang
    }
  }           
  `
  const result = await request(API_URL, query,variables)
  return result;
}


const getDichVuCaLe=async()=>{ 
  
  const query = gql`
  query Query {
    DichVuCaLe {
      id
      maDichVu
      moTaDichVu
      gia
      thoiGian
    }
  }        
  `
  const result = await request(API_URL, query)
  return result;
}
export default {
    getSlider,
    getCategory,
    getDiscovers,
    getDichVuThem,
    getDichVuCaLe,
    themDonHang
};


