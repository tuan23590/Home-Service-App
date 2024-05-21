import {DiaChiModel, DichVuModel, DonHangModel, KhachHangModel, LichThucHienModel, NhanVienModel} from '../models/index.js';
import fs from 'fs';


function epochToText(epoch){
    const dateObject = new Date(epoch * 1000);
    const formattedDate = dateObject.toLocaleString();
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
        DanhSachNhanVienTrongViec: async (parent, args) => {
            const data = await DonHangModel.findOne({_id: args.idDonHang});
            const thoiGianBatDauDonHang = data.ngayBatDau;
            const danhSachNhanVien = await NhanVienModel.find();
            const nhanVienKhongTrungLich = [];
        
            for (let i = 0; i < danhSachNhanVien.length; i++) {
                const lichLamViecCuaNhanVien = await LichThucHienModel.find({ _id: {$in: danhSachNhanVien[i].lichLamViec} });
                let coTrungLich = false;
        
                for (let j = 0; j < lichLamViecCuaNhanVien.length; j++) {
                    const lich = lichLamViecCuaNhanVien[j];
                    if (thoiGianBatDauDonHang >= lich.thoiGianBatDauLich && thoiGianBatDauDonHang <= lich.thoiGianKetThucLich) {
                        coTrungLich = true;
                        break;
                    }
                }
                if (!coTrungLich) {
                    nhanVienKhongTrungLich.push(danhSachNhanVien[i]);
                }
            }
        
            console.log('nhanVienKhongTrungLich: ', nhanVienKhongTrungLich);
            return nhanVienKhongTrungLich;
        },
        DanhSachTinhTp: (parent,args) => {
            try {
                const tinhData = fs.readFileSync('addressData/tinh_tp.json', 'utf8');
                const tinhObject = JSON.parse(tinhData);
                const danhSachTinh = Object.values(tinhObject);
                return danhSachTinh;
            } catch (err) {
                console.error('Lỗi khi đọc file tinh_tp.json:', err);
                return [];
            }
        },
        DanhSachQuanHuyen: (parent, args) => {
            const idTinhTP = args.idTinhTP;
            try {
                const quanHuyenData = fs.readFileSync('addressData/quan_huyen.json', 'utf8');
                const quanHuyenObject = JSON.parse(quanHuyenData);
                const danhSachQuanHuyen = Object.values(quanHuyenObject).filter(quanHuyen => quanHuyen.parent_code === idTinhTP);
                return danhSachQuanHuyen;
            } catch (err) {
                console.error('Lỗi khi đọc file quan_huyen.json:', err);
                return [];
            }
        },
        DanhSachXaPhuong: (parent, args) => {
            const idQuanHuyen = args.idQuanHuyen;
            try {
                const xaPhuongData = fs.readFileSync('addressData/xa_phuong.json', 'utf8');
                const xaPhuongObject = JSON.parse(xaPhuongData);
                const danhSachXaPhuong = Object.values(xaPhuongObject).filter(xaPhuong => xaPhuong.parent_code === idQuanHuyen);
                return danhSachXaPhuong;
            } catch (err) {
                console.error('Lỗi khi đọc file quan_huyen.json:', err);
                return [];
            }
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
        },
        themDiaChi: async (parent,args)=>{
            const diaChiMoi = args;
            const diaChi = new DiaChiModel(diaChiMoi);
            await diaChi.save();
            return diaChi;
        },
        themNhanVienVaoDonHang: async (parent,args) =>{
            try {
                const donHang = await DonHangModel.findById(args.idDonHang);
                donHang.nhanVien.push(args.idNhanVien);

                const nhanVien = await NhanVienModel.findById(args.idNhanVien);
                nhanVien.lichLamViec = nhanVien.lichLamViec.concat(donHang.danhSachLichThucHien);

                await donHang.save();
                await nhanVien.save();
                return 'success';
            } catch (err) {
                return err;
            }
        },
    }
};
