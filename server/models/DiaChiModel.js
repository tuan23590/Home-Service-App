import mongoose from 'mongoose'

const DiaChiSchema = new mongoose.Schema({
    tinhTP: {
        type: String
    },
    quanHuyen:{
        type: String
    },
    xaPhuong:{
        type: String
    },
    soNhaTenDuong:{
        type: String
    }
},{timestamps: true});

const DiaChiModel = mongoose.model('DiaChi',DiaChiSchema);
export default DiaChiModel;