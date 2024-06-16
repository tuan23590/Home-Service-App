export const typeDefs = `#graphql
    type DichVu {
        id: String,
        tenDichVu: String,
        maDichVu: String,
        khoiLuongCongViec: String,
        gia: Int,
        thoiGian: Int,
        icon: String,
        iconSelected: String,
        loaiDichVu: String,
    },
    type DiaChi {
        id: String,
        tinhTP: String,
        quanHuyen: String,
        xaPhuong: String,
        soNhaTenDuong: String,
        ghiChu: String
    },
    type NhanVien {
        id: String,
        tenNhanVien: String,
        gioiTinh: String,
        ngaySinh: String,
        diaChi: String,
        soDienThoai: String,
        email: String,
        cccd: String,
        dichVu: [DichVu],
        ghiChu: String,
        trangThaiTaiKhoan: String,
        danhGia: Float,
        trangThaiHienTai: String,
        lichLamViec: [LichThucHien],
        phanQuyen: String,
        anhDaiDien: String,
    },
    type KhachHang {
        id: String,
        tenKhachHang: String,
        danhSachDiaChi: [DiaChi],
        soDienThoai: String,
        email: String,
    },
    type LichThucHien {
        id: String,
        thoiGianBatDauLich: Float,
        thoiGianKetThucLich: Float,
        trangThaiLich: String,
        lyDoDungLich: String,
        nhanVienHoanThanh: String,
        donHang: DonHang
    },
    type DonHang {
        id: String,
        maDonHang:  String,
        ngayDatHang: Float,
        ngayBatDau: Float,
        ngayKetThuc: Float,
        soGioThucHien: Int,
        trangThaiDonHang: String,
        danhSachLichThucHien: [LichThucHien],
        khachHang: KhachHang,
        nhanVien: [NhanVien],
        danhSachDichVu: [DichVu],
        diaChi: DiaChi,
        vatNuoi: String,
        ghiChu: String,
        saoDanhGia: String,
        ghiChuDanhGia: String,
        uuTienTasker: Boolean,
        tongTien: Float,
        lyDoTuChoi: String,
        lyDoDoiNhanVien: String,
        nhanVienCu : NhanVien,
        soThangLapLai: Int,
        dichVuChinh: DichVu,
        lyDoNhanVienTuChoiDonHang: String,
    },
    type TinhTp {
        name: String,
        slug: String,
        type: String,
        name_with_type: String,
        code: String,
    },
    type QuanHuyen{
        name: String,
        type: String,
        slug: String,
        name_with_type: String,
        path: String,
        path_with_type: String,
        code: String,
        parent_code: String,
    },
    type XaPhuong {
        name: String,
        type: String,
        slug: String,
        name_with_type: String,
        path: String,
        path_with_type: String,
        code: String,
        parent_code: String,
    },
    type Query {
        DiaChis: [DiaChi],
        DichVus: [DichVu],
        DonHangs: [DonHang],
        KhachHangs: [KhachHang],
        LichThucHiens: [LichThucHien],
        NhanViens: [NhanVien],
        DichVuCaLe: [DichVu],
        DonHangTheoId(idDonHang: String): DonHang
        DichVuThem: [DichVu],
        DanhSachNhanVienTrongViec(idDonHang: String): [NhanVien],
        DanhSachTinhTp: [TinhTp],
        DanhSachQuanHuyen(idTinhTP: String): [QuanHuyen],
        DanhSachXaPhuong(idQuanHuyen: String): [XaPhuong],
        TrangThaiDonHang: [String],
        DonHangDangChoDuyet: [DonHang],
        DonHangDaDuyet: [DonHang],
        DonHangDaTuChoi: [DonHang],
        NhanVienTheoId(idNhanVien: String): NhanVien,
        TimNhanVienTheoEmail(email: String): NhanVien,
        DanhSachDonHangTheoNhanVien(idNhanVien: String): [DonHang],
    },
    type Mutation {
        themDichVu(tenDichVu: String!, maDichVu: String, khoiLuongCongViec: String, gia: Int, thoiGian: Int, icon: String, iconSelected: String): DichVu,
        themDonHang(
            soGioThucHien: Int,
            danhSachLichThucHien: [String],
            khachHang: String,
            danhSachDichVu: [String],
            vatNuoi: String,
            ghiChu: String,
            uuTienTasker: Boolean,
            diaChi: String,
            tongTien: Float,
            dichVuTheoYeuCauCuaKhachHang: String,
            giaDichVuTheoYeuCauCuaKhachHang: Float,
            soThangLapLai: Int,
            dichVuChinh: String): DonHang,
        themKhachHang(tenKhachHang: String, danhSachDiaChi: [String], soDienThoai: String, email: String): KhachHang,
        themNhanVien(
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
            lichLamViec: [String],
            trangThaiHienTai: String): NhanVien,
        themLichThucHien(thoiGianBatDauLich: Int, thoiGianKetThucLich: Int, trangThaiLich: String): LichThucHien,
        themNhanVienVaoDonHang(idNhanVien: [String], idDonHang: String): DonHang,
        themDiaChi(tinhTP: String,quanHuyen: String,xaPhuong: String,soNhaTenDuong: String,ghiChu: String): DiaChi,
        capNhatTrangThaiDonHang(idDonHang: String, trangThaiDonHang: String): DonHang,
        tuChoiDonHang(idDonHang: String,lyDoTuChoi: String): DonHang,
        huyDonHang(idDonHang: String,lyDoHuyDonHang: String): DonHang,
        dungLichThucHien(idLichThucHien: String, lyDoDungLich: String): LichThucHien,
        tiepTucLichThucHien(idLichThucHien: String): LichThucHien,
        doiNhanVien(idDonHang: String,idNhanVienCu: String,idNhanVienMoi: String,lyDoDoiNhanVien: String): DonHang,
        nhanVienXacNhanCongViec(idDonHang: String): DonHang,
        nhanVienTuChoiCongViec(idDonHang: String, lyDoNhanVienTuChoiDonHang: String): DonHang,
    }
`