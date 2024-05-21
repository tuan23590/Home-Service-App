import {DiaChiModel, DichVuModel, DonHangModel, KhachHangModel, LichThucHienModel, NhanVienModel} from '../models/index.js';

function epochToText(epoch){
    const dateObject = new Date(epoch * 1000);
    const formattedDate = dateObject.toLocaleString();
}
async function kiemTraLichLamViec(danhSachLich,thoiGianBatDau) {
    const lichLamViec =  LichThucHienModel.find({ _id: {$in: danhSachLich} });
    console.log("lichLamViec: ",lichLamViec)
}
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
        },
        DonHangTheoId: async (parent,args) =>{
            const data = await DonHangModel.findOne({_id: args.idDonHang});
            return data;
        },
        DanhSachNhanVienTrongViec: async (parent, args)=>{
            const data = await DonHangModel.findOne({_id: args.idDonHang});
            const ngayBatDau = data.ngayBatDau;
            const danhSachNhanVien = await NhanVienModel.find();
            console.log(danhSachNhanVien);

        },
    },
    DonHang: {
        danhSachDichVu:  async (parent)=>{
            const data = await DichVuModel.find({ _id: { $in: parent.danhSachDichVu } });
            return data;
        },
        khachHang: async (parent)=>{
            const data = await KhachHangModel.findOne({ _id: parent.khachHang });
            return data;
        },
        nhanVien: async (parent)=>{
            const data = await NhanVienModel.findOne({ _id: parent.nhanVien });
            return data;
        },
        danhSachLichThucHien: async (parent)=>{
            const data = await LichThucHienModel.find({ _id: { $in: parent.danhSachLichThucHien } });
            return data;
        }
    },
    KhachHang:{
        danhSachDiaChi: async (parent)=>{
            const data = await DiaChiModel.find({ _id: { $in: parent.danhSachDiaChi } });
            return data;
        }
    },
    NhanVien:{
        lichLamViec: async (parent)=>{
            const data = await LichThucHienModel.find({ _id: { $in: parent.lichLamViec } });
            return data;
        }
    },
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
        },
        themKhachHang: async (parent,args)=>{
            const khachHangMoi = args;
            const khachHang = new KhachHangModel(khachHangMoi);
            await khachHang.save();
            return khachHang;
        },
        themNhanVien: async (parent,args)=>{
            const nhanVienMoi = args;
            const nhanVien = new NhanVienModel(nhanVienMoi);
            await nhanVien.save();
            return nhanVien;
        },
        themLichThucHien: async (parent,args)=>{
            const lichThucHienMoi = args;
            const lichThucHien = new LichThucHienModel(lichThucHienMoi);
            await lichThucHien.save();
            return lichThucHien;
        }
    }
};
