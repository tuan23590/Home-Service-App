import mongoose from 'mongoose'

const LichThucHienSchema = new mongoose.Schema({
    thoiGianBatDauLich: {
        type: Number
    },
    thoiGianKetThucLich: {
        type: Number
    },
    trangThaiLich: {
        type: String
    }
},{timestamps: true});

const LichThucHienModel = mongoose.model('LichThucHien',LichThucHienSchema);
export default LichThucHienModel;