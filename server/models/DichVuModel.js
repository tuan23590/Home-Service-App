import mongoose from 'mongoose'

const DichVuSchema = new mongoose.Schema({
    tenDichVu: {
        type: String,
        require: true
    },
    moTaDichVu:{
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
    }
},{timestamps: true});

const DichVuModel = mongoose.model('DichVu',DichVuSchema);
export default DichVuModel;