import fakeData from '../fakeData/index.js'
import {ChuyenMonModel, DiaChiModel, DichVuModel, DonHangModel, KhachHangModel, LichThucHienModel, NhanVienModel} from '../models/index.js';
export const resolvers = {
    Query:{
        DichVus: async ()=>{
            const data = await DichVuModel.find();
            return data;
        },
        NhanViens: async ()=>{
            const data = await NhanVienModel.find();
            return data;
        },
        ChuyenMons: async ()=>{
            const data = await ChuyenMonModel.find();
            return data;
        },
        DiaChis: async ()=>{
            const data = await DiaChiModel.find();
            return data;
        },
        DichVus: async ()=>{
            const data = await DichVuModel.find();
            return data;
        },
        DonHangs: async ()=>{
            const data = await DonHangModel.find();
            return data;
        },
        KhachHangs: async ()=>{
            const data = await KhachHangModel.find();
            return data;
        },
        LichThucHiens: async ()=>{
            const data = await LichThucHienModel.find();
            return data;
        },
        NhanViens: async ()=>{
            const data = await NhanVienModel.find();
            return data;
        },
        DichVuCaLe: async ()=>{
            const data = await DichVuModel.find({ loaiDichVu: "CaLe" });
            return data;
        },
        DichVuThem: async ()=>{
            const data = await DichVuModel.find({ loaiDichVu: "DichVuThem" });
            return data;
        }
    },
    // DonHangs: {
    //     idDanhSachDichVu: ()=>{
    //         return {text: 'test'}
    //     }
    // },
    Mutation: {
        themDichVu: async (parent,args)=>{
            const dichVuMoi = args;
            const DichVu = new DichVuModel(dichVuMoi);
            await DichVu.save();
            return DichVu;
        },
        themDonHang: async (parent,args)=>{
            const donHangMoi = args;
            const DonHang = new DonHangModel(donHangMoi);
            await DonHang.save();
            return DonHang;
        }
    }
};
