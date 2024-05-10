import mongoose from 'mongoose'


const KhachHangSchema = new mongoose.Schema({
    tenKhachHang: {
        type: String,
        require: true
    },
    danhSachDiaChi:{
        type: [String]
    },
    soDienThoai:{
        type: String
    },
    email:{
        type: String
    }
},{timestamps: true});

const KhachHangModel = mongoose.model('KhachHang',KhachHangSchema);
export default KhachHangModel;