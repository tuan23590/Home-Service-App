import mongoose from 'mongoose'

const NhanVienSchema = new mongoose.Schema({
    tenNhanVien: {
        type: String,
        require: true
    },
    gioiTinh:{
        type: Boolean
    },
    ngaySinh:{
        type: Date
    },
    diaChi:{
        type: String
    },
    soDienThoai:{
        type: String
    },
    email:{
        type: String
    },
    cccd:{
        type: String
    },
    idChuyenMon:{
        type: [String]
    },
    ghiChu:{
        type: String
    },
    trangThaiTaiKhoan:{
        type: String
    },
    danhGia:{
        type: String
    },
    trangThaiHienTai:{
        type: String
    }
    
},{timestamps: true});

const NhanVienModel = mongoose.model('NhanVien',NhanVienSchema);
export default NhanVienModel;