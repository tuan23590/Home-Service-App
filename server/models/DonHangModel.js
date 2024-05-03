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
    idLichThucHien:{
        type: [String]
    },
    idKhachHang:{
        type: String
    },
    idNhanVien:{
        type: String
    },
    idDanhSachDichVu:{
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