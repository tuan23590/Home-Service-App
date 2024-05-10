import mongoose from 'mongoose'

const DonHangSchema = new mongoose.Schema({
    maDonHang: {
        type: String
    },
    ngayDatHang:{
        type: String
    },
    ngayBatDau:{
        type: String
    },
    ngayKetThuc:{
        type: String
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
    khachHang:{
        type: String
    },
    nhanVien:{
        type: String
    },
    danhSachDichVu:{
        type: [String]
    },
    vatNuoi:{
        type: String
    },
    ghiCHu:{
        type: String
    },
    saoDanhGia:{
        type: String
    },
    ghiChuDanhGia:{
        type: String
    },
    
},{timestamps: true});

const DonHangModel = mongoose.model('DonHang',DonHangSchema);
export default DonHangModel;