export const NhanVienLoader = async () => {
    const query = `query MyQuery {
      nhanViens {
        id
        ten
        }
      }
    }`;

    const res = await fetch('https://api-ap-southeast-2.hygraph.com/v2/clv4uoiq108fp07w7579676h9/master', {
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

  const fetchNhanViens = async () => {
    try {
      const responseData = await NhanVienLoader();
      setNhanViens(responseData.data.nhanViens);
    } catch (error) {
      console.error('Error fetching employee data:', error);
    }
  };
  import { GRAPHQL_SERVER } from "./constants";

export const apiDanhSachNhanVienNhanDonHang = async (idDonHang) => {
    const query = `query DanhSachNhanVienTrongViec($idDonHang: String) {
      DanhSachNhanVienTrongViec(idDonHang: $idDonHang) {
        id
        tenNhanVien
        gioiTinh
        ngaySinh
        diaChi
        soDienThoai
        email
        cccd
        dichVu {
          tenDichVu
          maDichVu
        }
        ghiChu
        trangThaiTaiKhoan
        danhGia
        trangThaiHienTai
        anhDaiDien
      }
    }`;
    const res = await fetch(GRAPHQL_SERVER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ query,variables:{ idDonHang }})
    });
    
    const data = await res.json();
    return data;
  };
  