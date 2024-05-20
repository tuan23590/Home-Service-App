import { request, gql } from 'graphql-request'



const MASTER_URL = 'https://api-ap-southeast-2.hygraph.com/v2/clv4uoiq108fp07w7579676h9/master'
const API_URL = 'http://192.168.1.25:4000/graphql'

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

// const themLichThucHien = async (lichLamViec, thoiLuongDonHang) => {
//   const lichLamViecEpoch = lichLamViec.map(date => Math.floor(date.getTime() / 1000));
//   const lichLamViecEpochCongThoiLuongDonHang = lichLamViecEpoch.map(epoch => epoch + thoiLuongDonHang * 3600);

//   // Khai báo mảng các biến tham số cho số lượng phần tử trong danh sách lichLamViecEpoch
//   const variablesList = lichLamViecEpochCongThoiLuongDonHang.map((epoch, index) => ({
//     thoiGianBatDauLich: lichLamViecEpoch[index],
//     thoiGianKetThucLich: lichLamViecEpochCongThoiLuongDonHang[index], 
//     trangThaiLich: "Chưa hoàn thành"
//   }));

//   // Tạo mảng các câu truy vấn GraphQL dựa trên số lượng phần tử trong danh sách lichLamViecEpoch
//   const queries = variablesList.map((variables, index) => gql`
//     mutation ThemLichThucHien${index}($thoiGianBatDauLich: Int, $thoiGianKetThucLich: Int, $trangThaiLich: String) {
//       themLichThucHien(thoiGianBatDauLich: $thoiGianBatDauLich, thoiGianKetThucLich: $thoiGianKetThucLich, trangThaiLich: $trangThaiLich) {
//         id
//       }
//     }
//   `);
//   const results = await Promise.all(queries.map((query, index) => request(API_URL, query, variablesList[index])));
//   // Tạo mảng các kết quả từ các câu truy vấn GraphQL
//   // Trích xuất danh sách ID từ kết quả của mỗi câu truy vấn GraphQL
 

//   return results;
// }

const themLichThucHien = async (lichLamViec, thoiLuongDonHang) => {
  const lichLamViecEpoch = lichLamViec.map(date => Math.floor(date.getTime() / 1000));
  const lichLamViecEpochCongThoiLuongDonHang = lichLamViecEpoch.map(epoch => epoch + thoiLuongDonHang * 3600);

  const results = [];

  for (let i = 0; i < lichLamViecEpochCongThoiLuongDonHang.length; i++) {
    const variables = {
      thoiGianBatDauLich: lichLamViecEpoch[i],
      thoiGianKetThucLich: lichLamViecEpochCongThoiLuongDonHang[i], // Giả sử thời gian kết thúc cũng bằng thời gian bắt đầu
      trangThaiLich: "Chưa hoàn thành"
    };

    const query = gql`
      mutation ThemLichThucHien${i}($thoiGianBatDauLich: Int, $thoiGianKetThucLich: Int, $trangThaiLich: String) {
        themLichThucHien(thoiGianBatDauLich: $thoiGianBatDauLich, thoiGianKetThucLich: $thoiGianKetThucLich, trangThaiLich: $trangThaiLich) {
          id
        }
      }
    `;

    const result = await request(API_URL, query, variables);
    console.log(result);
    results.push(result);
  }

  return results;
}



const themDonHang=async(vatNuoi,dichVuThem,dichVuChinh,gioLam,lichLamViec,tongTien,uuTienTasker,ghiChu)=>{ 

  const results = await themLichThucHien(lichLamViec,dichVuChinh.thoiGian);
  const resultIDs = results.map(result => result.themLichThucHien.id);

  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  const ngayBatDau = new Date(lichLamViec[0]).toISOString();
  const ngayKetThuc = new Date(lichLamViec[lichLamViec.length - 1]).toISOString();
  const variables = {
    maDonHang: "ABC123",
    ngayDatHang: formattedDate,
    ngayBatDau: ngayBatDau,
    ngayKetThuc: ngayKetThuc,
    soGioThucHien: dichVuChinh.thoiGian,
    danhSachLichThucHien: resultIDs,
    khachHang: "123",
    danhSachDichVu: [...dichVuThem.map(item => item.id), dichVuChinh.id],
    vatNuoi: vatNuoi,
    ghiCHu: ghiChu,
    trangThaiDonHang: "Đang xử lý",
    uuTienTasker: uuTienTasker,
    tongTien: tongTien
  };
  const query = gql`
  mutation Mutation($maDonHang: String, $ngayDatHang: String, $ngayBatDau: String, $ngayKetThuc: String, $soGioThucHien: Int, $danhSachLichThucHien: [String], $khachHang: String, $danhSachDichVu: [String], $vatNuoi: String, $ghiCHu: String, $trangThaiDonHang: String, $uuTienTasker: Boolean, $tongTien: Float) {
    themDonHang(maDonHang: $maDonHang, ngayDatHang: $ngayDatHang, ngayBatDau: $ngayBatDau, ngayKetThuc: $ngayKetThuc, soGioThucHien: $soGioThucHien, danhSachLichThucHien: $danhSachLichThucHien, khachHang: $khachHang, danhSachDichVu: $danhSachDichVu, vatNuoi: $vatNuoi, ghiCHu: $ghiCHu, trangThaiDonHang: $trangThaiDonHang, uuTienTasker: $uuTienTasker, tongTien: $tongTien) {
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


