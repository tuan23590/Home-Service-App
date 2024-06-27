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
        trangThai: String,
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
        ngaySinh: Float,
        diaChi: DiaChi,
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
        chuyenMon: String,
        taiLieu: [String],
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
        saoDanhGia: Float,
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
        DanhSachDonHangChoXacNhanTheoNhanVien(idNhanVien: String): [DonHang],
        DanhSachDonHangDaXacNhanTheoNhanVien(idNhanVien: String): [DonHang],
        TimDanhSachDonHangTheoDanhSachLichThucHien(idLichThucHien: [String]): [DonHang],
        ThongKe: String,
        danhSachDichVuDangHoatDong: [DichVu],
        TimKhachHangTheoId(idKhachHang: String): KhachHang,
        DanhSachDonHangTheoKhachHang(idKhachHang: String): [DonHang],
        TimKhachHangTheoEmail(email: String): KhachHang,
    },
    type Mutation {
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
            ngaySinh: Float, 
            diaChi: String, 
            soDienThoai: String, 
            email: String, 
            cccd: String, 
            ghiChu: String, 
            trangThaiTaiKhoan: String, 
            danhGia: Float, 
            chuyenMon: String,
            anhDaiDien: String,
            taiLieu: [String],
            phanQuyen: String,
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
        themDichVu(tenDichVu: String!, khoiLuongCongViec: String, gia: Int, thoiGian: Int, loaiDichVu: String): DichVu,
        xoaDichVu(idDichVu: String): DichVu,
        suaDichVu(idDichVu: String, tenDichVu: String, khoiLuongCongViec: String, gia: Int, thoiGian: Int,loaiDichVu: String): DichVu,
        dungDichVu(idDichVu: String): DichVu,
        kichHoatDichVu(idDichVu: String): DichVu,
        hoanThanhLich(idLichThucHien: String): LichThucHien,
        themDiaChiTamThoi(tinhTP: String,quanHuyen: String,xaPhuong: String,soNhaTenDuong: String,ghiChu: String): DiaChi,
        danhGiaDonHang(idDonHang: String, saoDanhGia: Float, ghiChuDanhGia: String): DonHang,
        capNhatSoDienThoaiKhachHang(idKhachHang: String, soDienThoai: String): KhachHang,
        xoaNhanVien(idNhanVien: String): NhanVien,
        suaNhanVien(
            idNhanVien: String,
            tenNhanVien: String, 
            gioiTinh: String, 
            ngaySinh: Float, 
            diaChi: String, 
            soDienThoai: String, 
            email: String, 
            cccd: String, 
            ghiChu: String, 
            trangThaiTaiKhoan: String, 
            danhGia: Float,
            chuyenMon: String,
            trangThaiHienTai: String): NhanVien,
    }
`