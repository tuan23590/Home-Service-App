import mongoose from 'mongoose'

const DiaChiSchema = new mongoose.Schema({
    tinh: {
        type: String
    },
    huyen:{
        type: String
    },
    xa:{
        type: String
    },
    soNhaTenDuong:{
        type: String
    }
},{timestamps: true});

const DiaChiModel = mongoose.model('DiaChi',DiaChiSchema);
export default DiaChiModel;