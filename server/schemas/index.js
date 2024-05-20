// export const typeDefs = `#graphql

// type Product {
//     id: String,
//     description: String,
//     quantity: Int,
//     name: String,
//     price: Float,
//     image: String,
//     category: [Category]
// },
// type Category{
//     id: String,
//     name: String,
//     icon: String,
//     level: Int,
//     category: [Category]
// },
// type Customer{
//     id: String,
//     name: String,
// },
// type Query {
//     products: [Product],
//     categorys:[Category],
//     productByProductId(productId: String): Product
//     productsByCategoryId(categoryId: String): [Product]
// },
// type Mutation {
//     addProduct(name: String!, description: String, quantity: Int,price: Float,image: String, categoryId: String): String,
//     addCategory(name: String,icon: String,level: Int, parentId: String): String,
// }
// `;
export const typeDefs = `#graphql
    type DichVu {
        id: String,
        tenDichVu: String,
        maDichVu: String,
        moTaDichVu: String,
        gia: Int,
        thoiGian: Int,
        icon: String,
        iconSelected: String,
        loaiDichVu: String,
    },
    type DiaChi {
        tinh: String,
        huyen: String,
        xa: String,
        soNhaTenDuong: String
    },
    type NhanVien {
        tenNhanVien: String,
        gioiTinh: String,
        ngaySinh: String,
        diaChi: String,
        soDienThoai: String,
        email: String,
        cccd: String,
        dichVu: [String],
        ghiChu: String,
        trangThaiTaiKhoan: String,
        danhGia: Float,
        trangThaiHienTai: String
    },
    type KhachHang {
        tenKhachHang: String,
        danhSachDiaChi: [String],
        soDienThoai: String,
        email: String
    },
    type LichThucHien {
        thoiGianBatDauLich: Int,
        thoiGianKetThucLich: Int,
        trangThaiLich: String
    },
    type DonHang {
        id: String,
        maDonHang:  String,
        ngayDatHang: String,
        ngayBatDau: String,
        ngayKetThuc: String,
        soGioThucHien: Int,
        trangThaiDonHang: String,
        danhSachLichThucHien: [LichThucHien],
        khachHang: KhachHang,
        nhanVien: NhanVien,
        danhSachDichVu: [DichVu],
        vatNuoi: String,
        ghiCHu: String,
        saoDanhGia: String,
        ghiChuDanhGia: String,
    },
    type Query {
        DiaChis: [DiaChi],
        DichVus: [DichVu],
        DonHangs: [DonHang],
        KhachHangs: [KhachHang],
        LichThucHiens: [LichThucHien],
        NhanViens: [NhanVien],
        DichVuCaLe: [DichVu],
        DichVuThem: [DichVu],
    },
    type Mutation {
        themDichVu(tenDichVu: String!, maDichVu: String, moTaDichVu: String, gia: Int, thoiGian: Int, icon: String, iconSelected: String): DichVu,
        themDonHang(maDonHang:  String,
            ngayDatHang: String,
            ngayBatDau: String,
            ngayKetThuc: String,
            soGioThucHien: Int,
            danhSachLichThucHien: [String],
            khachHang: String,
            nhanVien: String,
            danhSachDichVu: [String],
            vatNuoi: String,
            ghiCHu: String,
            saoDanhGia: String,
            trangThaiDonHang: String,
            ghiChuDanhGia: String): DonHang,
        themKhachHang(tenKhachHang: String, danhSachDiaChi: [String], soDienThoai: String, email: String): KhachHang,
        themNhanVien(tenNhanVien: String, gioiTinh: String, ngaySinh: String, diaChi: String, soDienThoai: String, email: String, cccd: String, dichVu: [String], ghiChu: String, trangThaiTaiKhoan: String, danhGia: Float, trangThaiHienTai: String): NhanVien,
        themLichThucHien(thoiGianBatDauLich: Int, thoiGianKetThucLich: Int, trangThaiLich: String): LichThucHien,
    }
`