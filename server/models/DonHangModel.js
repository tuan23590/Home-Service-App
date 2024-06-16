import mongoose from 'mongoose'

const DonHangSchema = new mongoose.Schema({
    maDonHang: {
        type: String
    },
    ngayDatHang:{
        type: Number
    },
    tongTien:{
        type: Number
    },
    ngayBatDau:{
        type: Number
    },
    ngayKetThuc:{
        type: Number
    },
    soGioThucHien:{
        type: Number
    },
    trangThaiDonHang: {
        type: String
    },
    danhSachLichThucHien:{
        type: [String]
    },
    diaChi: {
        type: String
    },
    khachHang:{
        type: String
    },
    nhanVien:{
        type: [String]
    },
    danhSachDichVu:{
        type: [String]
    },
    vatNuoi:{
        type: String
    },
    ghiChu:{
        type: String
    },
    saoDanhGia:{
        type: String
    },
    ghiChuDanhGia:{
        type: String
    },
    lyDoTuChoi:{
        type: String
    },
    uuTienTasker:{
        type: Boolean
    },
    nhanVienCu:{
        type: String
    },
    lyDoDoiNhanVien:{
        type: String
    },
    dichVuChinh:{
        type: String
    },
    soThangLapLai:{
        type: Number
    },
    
    
    
},{timestamps: true});

const DonHangModel = mongoose.model('DonHang',DonHangSchema);
export default DonHangModel;