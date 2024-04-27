import mongoose from 'mongoose'

const ChuyenMonSchema = new mongoose.Schema({
    tenChuyenMon: {
        type: String
    }
},{timestamps: true});

const ChuyenMonModel = mongoose.model('ChuyenMon',ChuyenMonSchema);
export default ChuyenMonModel;