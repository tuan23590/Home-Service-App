import mongoose from 'mongoose'

const DonHangSchema = new mongoose.Schema({
    maDonHang: {
        type: String
    },
    ngayDatHang:{
        type: Date
    },
    ngayBatDau:{
        type: Date
    },
    ngayKetThuc:{
        type: Date
    },
    soGioThucHien:{
        type: Number
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