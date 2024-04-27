import mongoose from 'mongoose'

const LichThucHienSchema = new mongoose.Schema({
    thoiGianBatDauLich: {
        type: String
    },
    thoiGianKetThucLich: {
        type: String
    },
    trangThaiLich: {
        type: String
    }
},{timestamps: true});

const LichThucHienModel = mongoose.model('LichThucHien',LichThucHienSchema);
export default LichThucHienModel;