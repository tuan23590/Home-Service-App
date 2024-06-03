import { DiaChiModel, DichVuModel, DonHangModel, KhachHangModel, LichThucHienModel, NhanVienModel } from '../models/index.js';
import fs from 'fs';


function epochToText(epoch) {
    const dateObject = new Date(epoch * 1000);
    const formattedDate = dateObject.toLocaleString();
}
export const resolvers = {
    Query: {
        DichVus: async () => {
            const data = await DichVuModel.find();
            return data;
        },
        NhanViens: async () => {
            const data = await NhanVienModel.find();
            return data;
        },
        DiaChis: async () => {
            const data = await DiaChiModel.find();
            return data;
        },
        DichVus: async () => {
            const data = await DichVuModel.find();
            return data;
        },
        DonHangs: async () => {
            const data = await DonHangModel.find();
            return data;
        },
        KhachHangs: async () => {
            const data = await KhachHangModel.find();
            return data;
        },
        LichThucHiens: async () => {
            const data = await LichThucHienModel.find();
            return data;
        },
        NhanViens: async () => {
            const data = await NhanVienModel.find();
            return data;
        },
        DichVuCaLe: async () => {
            const data = await DichVuModel.find({ loaiDichVu: "CaLe" });
            return data;
        },
        DichVuThem: async () => {
            const data = await DichVuModel.find({ loaiDichVu: "DichVuThem" });
            return data;
        },
        DonHangTheoId: async (parent, args) => {
            const data = await DonHangModel.findOne({ _id: args.idDonHang });
            return data;
        },
        DanhSachNhanVienTrongViec: async (parent, args) => {
            const data = await DonHangModel.findOne({ _id: args.idDonHang });
            const thoiGianBatDauDonHang = data.ngayBatDau;
            const danhSachNhanVien = await NhanVienModel.find();
            const nhanVienKhongTrungLich = [];

            for (let i = 0; i < danhSachNhanVien.length; i++) {
                const lichLamViecCuaNhanVien = await LichThucHienModel.find({ _id: { $in: danhSachNhanVien[i].lichLamViec } });
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
            return nhanVienKhongTrungLich;
        },
        DanhSachTinhTp: (parent, args) => {
            try {
                const tinhData = fs.readFileSync('addressData/tinh_tp.json', 'utf8');
                const tinhObject = JSON.parse(tinhData);
                const danhSachTinh = Object.values(tinhObject);
                return danhSachTinh;
            } catch (err) {
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
                return [];
            }
        },
        TrangThaiDonHang: (parent, args) => {
            return ['Đang chờ duyệt', 'Đã duyệt đơn', 'Đang thực hiện', 'Đã hoàn thành', "Đã từ chối"];
        },
        DonHangDangChoDuyet: async (parent, args) => {
            const data = await DonHangModel.find({ trangThaiDonHang: "Đang chờ duyệt" });
            return data;
        },
        DonHangDaDuyet: async (parent, args) => {
            const data = await DonHangModel.find({ trangThaiDonHang: "Đã duyệt đơn" });
            return data;
        },
        DonHangDaTuChoi: async (parent, args) => {
            const data = await DonHangModel.find({ trangThaiDonHang: "Đã từ chối" });
            return data;
        }
    },
    DonHang: {
        danhSachDichVu: async (parent) => {
            const data = await DichVuModel.find({ _id: { $in: parent.danhSachDichVu } });
            return data;
        },
        khachHang: async (parent) => {
            const data = await KhachHangModel.findOne({ _id: parent.khachHang });
            return data;
        },
        nhanVien: async (parent) => {
            const data = await NhanVienModel.find({ _id: parent.nhanVien });
            return data;
        },
        danhSachLichThucHien: async (parent) => {
            const data = await LichThucHienModel.find({ _id: { $in: parent.danhSachLichThucHien } });
            return data;
        },
        diaChi: async (parent) => {
            const data = await DiaChiModel.findById({ _id: parent.diaChi });
            return data;
        },
        dichVuChinh: async (parent) => {
            const data = await DichVuModel.findById({ _id: parent.dichVuChinh });
            return data;
        }
    },
    KhachHang: {
        danhSachDiaChi: async (parent) => {
            const data = await DiaChiModel.find({ _id: { $in: parent.danhSachDiaChi } });
            return data;
        }
    },
    NhanVien: {
        lichLamViec: async (parent) => {
            const data = await LichThucHienModel.find({ _id: { $in: parent.lichLamViec } });
            return data;
        },
        dichVu: async (parent) => {
            const data = await DichVuModel.find({ _id: { $in: parent.dichVu } });
            return data;
        }
    },

    Mutation: {
        themDichVu: async (parent, args) => {
            const dichVuMoi = args;
            const DichVu = new DichVuModel(dichVuMoi);
            await DichVu.save();
            return DichVu;
        },
        themDonHang: async (parent, args) => {

            const danhSachLichThucHien = JSON.parse(args.danhSachLichThucHien);
            const danhSachIdLichThucHien = [];
            for (let i = 0; i < danhSachLichThucHien.length; i++) {
                const lichThucHien = danhSachLichThucHien[i];

                const danhSachLichThucHienMoi = new LichThucHienModel({
                    thoiGianBatDauLich: lichThucHien.thoiGianBatDau,
                    thoiGianKetThucLich: lichThucHien.thoiGianKetThuc,
                    trangThaiLich: "Đang thực hiện"
                });
                const resLichThucHien = await danhSachLichThucHienMoi.save();
                danhSachIdLichThucHien.push(resLichThucHien._id);
            }

            const diaChi = JSON.parse(args.diaChi);
            let idDiaChi;
            if (diaChi.id === undefined) {
                const diaChiMoi = new DiaChiModel({
                    tinhTP: diaChi.tinhTp.name_with_type,
                    quanHuyen: diaChi.quanHuyen.name_with_type,
                    xaPhuong: diaChi.xaPhuong.name_with_type,
                    soNhaTenDuong: diaChi.soNhaTenDuong,
                    ghiChu: diaChi.ghiChu
                });
                const resDiaChi = await diaChiMoi.save();
                idDiaChi = resDiaChi._id;
            } else {
                idDiaChi = diaChi.id;
            }
            console.log(idDiaChi);
            const khachHang = JSON.parse(args.khachHang);

            let idKhachHang;
            if (khachHang.id === undefined) {
            const khachHangMoi = new KhachHangModel({
                tenKhachHang: khachHang.tenKhachHang,
                soDienThoai: khachHang.soDienThoai,
                email: khachHang.email,
                danhSachDiaChi: [idDiaChi]
            });
            const resKhachHang = await khachHangMoi.save();
            idKhachHang = resKhachHang._id;
            } else {
                const KH = await KhachHangModel.findById(khachHang.id);
                KH.danhSachDiaChi.push(idDiaChi);
                await KH.save();
                idKhachHang = khachHang.id;
            }



            const lastDonHang = await DonHangModel.findOne().sort({ _id: -1 }).exec();
            const ngayBatDauMoi = await LichThucHienModel.findById(danhSachIdLichThucHien[0]);
            const ngayKetThucMoi = await LichThucHienModel.findById(danhSachIdLichThucHien[danhSachIdLichThucHien.length - 1]);

            let newMaDonHang;
            if (lastDonHang) {
                const lastMaDonHang = lastDonHang.maDonHang;
                const lastNumber = parseInt(lastMaDonHang.replace("DH", ""), 10);
                console.log(lastDonHang);
                newMaDonHang = "DH" + (lastNumber + 1);
            } else {
                newMaDonHang = "DH1";
            }

            const donHangMoi = {
                ...args,
                khachHang: idKhachHang,
                diaChi: idDiaChi,
                danhSachLichThucHien: danhSachIdLichThucHien,
                maDonHang: newMaDonHang,
                ngayBatDau: ngayBatDauMoi ? ngayBatDauMoi.thoiGianBatDauLich : null,
                ngayKetThuc: ngayKetThucMoi ? ngayKetThucMoi.thoiGianKetThucLich : null,
                ngayDatHang: (Math.floor(Date.now() / 1000))*1000,
                trangThaiDonHang: "Đang chờ duyệt"
            };

            const DonHang = new DonHangModel(donHangMoi);
            await DonHang.save();
            return DonHang;
        },
        themKhachHang: async (parent, args) => {
            const khachHangMoi = args;
            const khachHang = new KhachHangModel(khachHangMoi);
            await khachHang.save();
            return khachHang;
        },
        themNhanVien: async (parent, args) => {
            const nhanVienMoi = args;
            const nhanVien = new NhanVienModel(nhanVienMoi);
            await nhanVien.save();
            return nhanVien;
        },
        themLichThucHien: async (parent, args) => {
            const lichThucHienMoi = args;
            const lichThucHien = new LichThucHienModel(lichThucHienMoi);
            await lichThucHien.save();
            return lichThucHien;
        },
        themDiaChi: async (parent, args) => {
            const diaChiMoi = args;
            const diaChi = new DiaChiModel(diaChiMoi);
            await diaChi.save();
            return diaChi;
        },
        themNhanVienVaoDonHang: async (parent, args) => {
            try {

                const donHang = await DonHangModel.findById(args.idDonHang);
                donHang.trangThaiDonHang = "Đã duyệt đơn";
                args.idNhanVien.forEach(id => {
                    donHang.nhanVien.push(id);
                });
                args.idNhanVien.forEach(async (id) => {
                    const nv = await NhanVienModel.findById(id);
                    nv.lichLamViec = nv.lichLamViec.concat(donHang.danhSachLichThucHien);
                    await nv.save();
                });

                await donHang.save();
                return donHang;
            } catch (err) {
                return { "message": 'err' };
            }
        },
        capNhatTrangThaiDonHang: async (parent, args) => {
            const donHang = await DonHangModel.findById(args.idDonHang);
            donHang.trangThaiDonHang = args.trangThaiDonHang;
            donHang.save();
            return donHang;
        },
        tuChoiDonHang: async (parent, args) => {
            const donHang = await DonHangModel.findById(args.idDonHang);
            donHang.trangThaiDonHang = "Đã từ chối";
            donHang.lyDoTuChoi = args.lyDoTuChoi;
            donHang.save();
            return donHang;
        },
        huyDonHang: async (parent, args) => {
            try {
                // Lấy thông tin đơn hàng từ cơ sở dữ liệu
                const donHang = await DonHangModel.findById(args.idDonHang);
                donHang.trangThaiDonHang = "Đã hủy đơn";

                // Tìm kiếm thông tin nhân viên liên quan đến đơn hàng
                const nhanVien = await NhanVienModel.find({ _id: { $in: donHang.nhanVien } });

                // Lặp qua danh sách các lịch làm việc thực hiện từ đơn hàng
                donHang.danhSachLichThucHien.forEach(lichThucHien => {
                    // Lặp qua từng nhân viên để kiểm tra lịch làm việc
                    nhanVien.forEach(async (nv, index) => {
                        const indexToRemove = nv.lichLamViec.indexOf(lichThucHien);
                        // Nếu tìm thấy lịch làm việc trùng, loại bỏ nó khỏi danh sách của nhân viên
                        if (indexToRemove !== -1) {
                            nhanVien[index].lichLamViec.splice(indexToRemove, 1);
                            // Cập nhật lại thông tin nhân viên trong cơ sở dữ liệu
                            await NhanVienModel.findByIdAndUpdate(nv._id, { $set: { lichLamViec: nv.lichLamViec } });
                        }
                    });
                });
                donHang.save();

            } catch (error) {
                console.error("Lỗi khi hủy đơn hàng:", error);
            }
        },
        dungLichThucHien: async (parent, args) => {
            const lichThucHien = await LichThucHienModel.findById(args.idLichThucHien);
            lichThucHien.trangThaiLich = "Đã dừng lịch";
            lichThucHien.lyDoDungLich = args.lyDoDungLich;
            lichThucHien.save();
            return lichThucHien;
        },
        tiepTucLichThucHien: async (parent, args) => {
            const lichThucHien = await LichThucHienModel.findById(args.idLichThucHien);
            lichThucHien.trangThaiLich = "Đang thực hiện";
            lichThucHien.lyDoDungLich = null;
            lichThucHien.save();
            return lichThucHien;
        },
        doiNhanVien: async (parent, args) => {
            const donHang = await DonHangModel.findById(args.idDonHang);
            donHang.lyDoDoiNhanVien = args.lyDoDoiNhanVien;
            donHang.nhanVienCu = args.idNhanVienCu;
            const index = donHang.nhanVien.indexOf(args.idNhanVienCu);
            if (index !== -1)
                donHang.nhanVien[index] = args.idNhanVienMoi;

            const nhanVienCu = await NhanVienModel.findById(args.idNhanVienCu);
            donHang.danhSachLichThucHien.forEach(async lichThucHien => {
                const indexToRemove = nhanVienCu.lichLamViec.indexOf(lichThucHien);
                if (indexToRemove !== -1) {
                    nhanVienCu.lichLamViec.splice(indexToRemove, 1);
                    await NhanVienModel.findByIdAndUpdate(nhanVienCu._id, { $set: { lichLamViec: nhanVienCu.lichLamViec } });
                }
            });

            const nv = await NhanVienModel.findById(args.idNhanVienMoi);
            nv.lichLamViec = nv.lichLamViec.concat(donHang.danhSachLichThucHien);

            await nv.save();
            await nhanVienCu.save();
            await donHang.save();
            return donHang;
        }
    }
};
