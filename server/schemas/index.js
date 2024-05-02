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
        tenDichVu: String,
        maDichVu: String,
        moTaDichVu: String,
        gia: Int,
        thoiGian: Int,
        icon: String,
        iconSelected: String,
    },
    type ChuyenMon {
        tencChuyenMon: String,
    },
    type DiaChi {
        tinh: String,
        huyen: String,
        xa: String,
        soNhaTenDuong: String
    },
    type NhanVien {
        tenNhanVien: String,
        gioiTinh: Boolean,
        ngaySinh: String,
        diaChi: String,
        soDienThoai: String,
        email: String,
        cccd: String,
        idChuyenMon: [String],
        ghiChu: String,
        trangThaiTaiKhoan: String,
        danhGia: String,
        trangThaiHienTai: String
    },
    type KhachHang {
        tenKhachHang: String,
        idDiaChi: [String],
        soDienThoai: String,
        email: String
    },
    type LichThucHien {
        thoiGianBatDauLich: String,
        thoiGianKetThucLich: String,
        trangThaiLich: String
    },
    type DonHang {
        maDonHang:  String,
        ngayDatHang: String,
        ngayBatDau: String,
        ngayKetThuc: String,
        soGioThucHien: Int,
        idLichThucHien: [String],
        idKhachHang: String,
        idNhanVien: String,
        idDanhSachDichVu: [String],
        vatNuoi: String,
        ghiCHu: String,
        saoDanhGia: String,
        ghiChuDanhGia: String,
    },
    type Query {
        ChuyenMons: [ChuyenMon],
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
        addDichVu(tenDichVu: String!, maDichVu: String, moTaDichVu: String, gia: Int, thoiGian: Int, icon: String, iconSelected: String): DichVu,
    }
`