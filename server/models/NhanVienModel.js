import mongoose from 'mongoose'

const NhanVienSchema = new mongoose.Schema({
    tenNhanVien: {
        type: String,
        require: true
    },
    lichLamViec:
    {
        type: [String]
    },
    gioiTinh:{
        type: String
    },
    ngaySinh:{
        type: String
    },
    diaChi:{
        type: String
    },
    soDienThoai:{
        type: String
    },
    dichVu:{
        type: [String]
    },
    email:{
        type: String
    },
    cccd:{
        type: String
    },
    ghiChu:{
        type: String
    },
    trangThaiTaiKhoan:{
        type: String
    },
    danhGia:{
        type: Number
    },
    trangThaiHienTai:{
        type: String
    },
    phanQuyen:{
        type: String
    }
    
},{timestamps: true});

const NhanVienModel = mongoose.model('NhanVien',NhanVienSchema);
export default NhanVienModel;