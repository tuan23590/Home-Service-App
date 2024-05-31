import mongoose from 'mongoose'

const DichVuSchema = new mongoose.Schema({
    tenDichVu: {
        type: String,
        require: true
    },
    maDichVu:{
        type: String
    },
    loaiDichVu:{
        type: String
    },
    khoiLuongCongViec:{
        type: String
    },
    gia:{
        type: Number
    },
    thoiGian:{
        type: Number
    },
    icon:{
        type: String
    },
    iconSelected:{
        type: String
    },
    dichVuTheoYeuCauCuaKhachHang:{
        type: String
    },
    giaDichVuTheoYeuCauCuaKhachHang:{
        type: Number
    },
    soThangLapLai:{
        type: Number
    },
    dichVuChinh:{
        type: String
    },
},{timestamps: true});

const DichVuModel = mongoose.model('DichVu',DichVuSchema);
export default DichVuModel;