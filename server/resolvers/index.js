import { DiaChiModel, DichVuModel, DonHangModel, KhachHangModel, LichThucHienModel, NhanVienModel } from '../models/index.js';
import fs from 'fs';
import archiver from 'archiver';
import path, {dirname} from 'path';
import { fileURLToPath } from 'url';
import jsonfile from 'jsonfile';
import unzipper from 'unzipper';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function epochToText(epoch) {
    const dateObject = new Date(epoch * 1000);
    const formattedDate = dateObject.toLocaleString();
}
const copyRecursiveSync = (src, dest) => {
    if (fs.existsSync(src)) {
        fs.mkdirSync(dest, { recursive: true });

        fs.readdirSync(src).forEach(file => {
            const srcFile = path.join(src, file);
            const destFile = path.join(dest, file);

            if (fs.lstatSync(srcFile).isDirectory()) {
                copyRecursiveSync(srcFile, destFile);
            } else {
                fs.copyFileSync(srcFile, destFile);
            }
        });
    }
};
export const resolvers = {
    Query: {
        danhSachDichVuDangHoatDong: async () => {
            const data = await DichVuModel.find({ trangThai: "Đang hoạt động" });
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
            const data = await DichVuModel.find({ tenDichVu: "Dọn dẹp nhà" });
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
            const danhSachNhanVien = await NhanVienModel.find({ phanQuyen: 'Tasker' });
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
            const data = await DonHangModel.find({
                trangThaiDonHang: { $in: ["Đang chờ duyệt", "Nhân viên từ chối"] }
            });
            return data;
        },
        DonHangDaDuyet: async (parent, args) => {
            const data = await DonHangModel.find({ 
                trangThaiDonHang: { $in: ["Đã duyệt đơn", "Đang thực hiện","Chờ xác nhận", 'Đã hoàn thành'] }
            });
            return data;
        },
        DonHangDaTuChoi: async (parent, args) => {
            const data = await DonHangModel.find({ trangThaiDonHang: "Đã từ chối" });
            return data;
        },
        NhanVienTheoId: async (parent, args) => {
            const data = await NhanVienModel.findOne({ _id: args.idNhanVien });
            return data;
        },
        TimNhanVienTheoEmail: async (parent, args) => {
            const data = await NhanVienModel.findOne({ email: args.email });
            return data;
        },
        DanhSachDonHangChoXacNhanTheoNhanVien: async (parent, args) => {
            const data = await DonHangModel.find({ nhanVien: args.idNhanVien, trangThaiDonHang: 'Chờ xác nhận' });
            return data;
        },
        DanhSachDonHangDaXacNhanTheoNhanVien: async (parent, args) => {
            const data = await DonHangModel.find({
                nhanVien: args.idNhanVien,
                trangThaiDonHang: { $in: ['Đang thực hiện', 'Đã hoàn thành'] }
            });
            return data;
        },
        TimDanhSachDonHangTheoDanhSachLichThucHien: async (parent, args) => {
            const data = await DonHangModel.find({ danhSachLichThucHien: { $in: args.idLichThucHien } });
            return data;
        },
        TimKhachHangTheoId: async (parent, args) => {
            const data = await KhachHangModel.findOne({ _id: args.idKhachHang });
            return data;
        },
        DanhSachDonHangTheoKhachHang: async (parent, args) => {
            const data = await DonHangModel.find({ khachHang: args.idKhachHang });
            return data;
        },
        TimKhachHangTheoEmail: async (parent, args) => {
            const data = await KhachHangModel.findOne({ email: args.email });
            return data;
        },
        SaoLuuDuLieu: async () => {
            try {
                const diaChiData = await DiaChiModel.find();
                const dichVuData = await DichVuModel.find();
                const donHangData = await DonHangModel.find();
                const khachHangData = await KhachHangModel.find();
                const lichThucHienData = await LichThucHienModel.find();
                const nhanVienData = await NhanVienModel.find();
        
                const urlFolderData = path.join(__dirname, '../uploads');
                const backupDir = path.join(__dirname, '../backup');
                const backupUploadsDir = path.join(backupDir, 'uploads');
                const backupListDir = path.join(__dirname, '../backupList');
        
                // Tạo thư mục backupList nếu chưa tồn tại
                if (!fs.existsSync(backupListDir)) {
                    fs.mkdirSync(backupListDir);
                }
        
                // Tạo thư mục backup nếu không tồn tại
                if (!fs.existsSync(backupDir)) {
                    fs.mkdirSync(backupDir);
                }
        
                // Lưu dữ liệu vào file .json
                await jsonfile.writeFile(path.join(backupDir, 'diaChiData.json'), diaChiData);
                await jsonfile.writeFile(path.join(backupDir, 'dichVuData.json'), dichVuData);
                await jsonfile.writeFile(path.join(backupDir, 'donHangData.json'), donHangData);
                await jsonfile.writeFile(path.join(backupDir, 'khachHangData.json'), khachHangData);
                await jsonfile.writeFile(path.join(backupDir, 'lichThucHienData.json'), lichThucHienData);
                await jsonfile.writeFile(path.join(backupDir, 'nhanVienData.json'), nhanVienData);
        
                // Tạo thư mục uploads trong backup nếu không tồn tại
                if (!fs.existsSync(backupUploadsDir)) {
                    fs.mkdirSync(backupUploadsDir);
                }
        
                // Sao chép thư mục uploads vào thư mục backup/uploads
                copyRecursiveSync(urlFolderData, backupUploadsDir);
        
                // Lấy ngày, tháng, năm (UTC+7)
                const now = new Date();
                const year = now.getFullYear();
                const month = now.getMonth() + 1; // Tháng bắt đầu từ 0, cộng thêm 1 để đúng tháng hiện tại
                const day = now.getDate();
                const hours = now.getHours();
                const minutes = now.getMinutes();
        
                // Định dạng thành chuỗi ngày-tháng-năm-giờ-phút
                const formattedDate = `${day}-${month}-${year}_${hours}-${minutes}`;
        
                // Đặt tên file backup với thời gian
                const backupFileName = `backup_${formattedDate}.zip`;
                const output = fs.createWriteStream(path.join(backupListDir, backupFileName));
                const archive = archiver('zip', {
                    zlib: { level: 9 } // Mức độ nén
                });
        
                output.on('close', function () {
                    console.log(archive.pointer() + ' total bytes');
                    console.log('Archiver has been finalized and the output file descriptor has closed.');
                });
        
                archive.on('error', function (err) {
                    throw err;
                });
        
                archive.pipe(output);
        
                archive.directory(backupDir, false);
        
                await archive.finalize();

                return `${backupFileName}.zip`;
        
            } catch (err) {
                return err.message ;
            }

        },
        PhucHoiDuLieu: async (parent, args) => {
            try {
                const backupFileName =  `/${args.backupFileName}`;
                const backupListDir = path.join(__dirname, '../backupList');
                const backupFilePath = path.join(backupListDir, backupFileName);
                
                if (!fs.existsSync(backupFilePath)) {
                    throw new Error(`File backup ${backupFileName} không tồn tại.`);
                }
        
                // Giải nén file backup
                const extractDir = path.join(__dirname, '../../DataBackup/extracted_backup');
                if (!fs.existsSync(extractDir)) {
                    fs.mkdirSync(extractDir);
                }
                await fs.createReadStream(backupFilePath)
                    .pipe(unzipper.Extract({ path: extractDir }))
                    .promise();
        
                // Đọc dữ liệu từ các file .json và lưu vào database
                const diaChiData = await jsonfile.readFile(path.join(extractDir, 'diaChiData.json'));
                const dichVuData = await jsonfile.readFile(path.join(extractDir, 'dichVuData.json'));
                const donHangData = await jsonfile.readFile(path.join(extractDir, 'donHangData.json'));
                const khachHangData = await jsonfile.readFile(path.join(extractDir, 'khachHangData.json'));
                const lichThucHienData = await jsonfile.readFile(path.join(extractDir, 'lichThucHienData.json'));
                const nhanVienData = await jsonfile.readFile(path.join(extractDir, 'nhanVienData.json'));
                
                // Xóa dữ liệu cũ trong các model
                await DiaChiModel.deleteMany({});
                await DichVuModel.deleteMany({});
                await DonHangModel.deleteMany({});
                await KhachHangModel.deleteMany({});
                await LichThucHienModel.deleteMany({});
                await NhanVienModel.deleteMany({});
        
                // Chèn dữ liệu mới từ backup
                await DiaChiModel.insertMany(diaChiData);
                await DichVuModel.insertMany(dichVuData);
                await DonHangModel.insertMany(donHangData);
                await KhachHangModel.insertMany(khachHangData);
                await LichThucHienModel.insertMany(lichThucHienData);
                await NhanVienModel.insertMany(nhanVienData);
        
                const urlFolderData = path.join(__dirname, '../uploads');
                if (!fs.existsSync(urlFolderData)) {
                    fs.mkdirSync(urlFolderData);
                }
                const backupUploadsDir = path.join(extractDir, 'uploads');
                copyRecursiveSync(backupUploadsDir, urlFolderData);
        
                fs.rmdirSync(extractDir, { recursive: true });
        
                return `Phục hồi dữ liệu từ ${backupFileName} thành công.`;
            } catch (err) {
                return err.message;
            }
        },
        

        ThongKe: async (parent, args) => {
            const today = new Date();
            const currentMonth = today.getMonth(); 
            const currentYear = today.getFullYear(); 
        
            const startDate = new Date(currentYear, currentMonth, 1);
            const endDate = new Date(currentYear, currentMonth + 1, 0, 23, 59, 59);
        
            const doanhThu12Thang = [];
            let thongKeThangHienTai = {};
        
            try {
                const donHangsThangHienTai = await DonHangModel.find({
                    ngayDatHang: { $gte: startDate, $lte: endDate },
                    trangThaiDonHang: { $in: ['Đang thực hiện', 'Đã hoàn thành'] }
                });
                const soDonHangThangHienTai = donHangsThangHienTai.length;
        
                let tongTienThangHienTai = 0;
                donHangsThangHienTai.forEach(donHang => {
                    tongTienThangHienTai += donHang.tongTien;
                });
        
                const khachHangsThangHienTai = await KhachHangModel.find({
                    createdAt: { $gte: startDate, $lte: endDate }
                });
                const soKhachHangMoi = khachHangsThangHienTai.length;
        
                // Lấy thông tin tháng trước
                const startDateThangTruoc = new Date(currentYear, currentMonth - 1, 1);
                const endDateThangTruoc = new Date(currentYear, currentMonth, 0, 23, 59, 59);
        
                const donHangsThangTruoc = await DonHangModel.find({
                    ngayDatHang: { $gte: startDateThangTruoc, $lte: endDateThangTruoc }
                });
                const soDonHangThangTruoc = donHangsThangTruoc.length;
        
                let tongTienThangTruoc = 0;
                donHangsThangTruoc.forEach(donHang => {
                    tongTienThangTruoc += donHang.tongTien;
                });
        
                const khachHangsThangTruoc = await KhachHangModel.find({
                    createdAt: { $gte: startDateThangTruoc, $lte: endDateThangTruoc }
                });
                const soKhachHangMoiThangTruoc = khachHangsThangTruoc.length;
        
                const phanTramSoDonHang = soDonHangThangTruoc !== 0 ? ((soDonHangThangHienTai - soDonHangThangTruoc) / soDonHangThangTruoc) * 100 : 0;
                const phanTramTongTien = tongTienThangTruoc !== 0 ? ((tongTienThangHienTai - tongTienThangTruoc) / tongTienThangTruoc) * 100 : 0;
                const phanTramSoKhachHang = soKhachHangMoiThangTruoc !== 0 ? ((soKhachHangMoi - soKhachHangMoiThangTruoc) / soKhachHangMoiThangTruoc) * 100 : 0;
        
                thongKeThangHienTai = {
                    soDonHangThangHienTai,
                    tongTienThangHienTai,
                    soKhachHangMoi,
                    phanTramSoDonHang,
                    phanTramTongTien,
                    phanTramSoKhachHang
                };
                for (let thang = 1; thang <= 12; thang++) {
                    const startDateThang = new Date(currentYear, thang - 1, 1);
                    const endDateThang = new Date(currentYear, thang, 0, 23, 59, 59);
        
                    const donHangs = await DonHangModel.find({
                        ngayDatHang: { $gte: startDateThang, $lte: endDateThang }
                    });
        
                    let doanhThuThang = 0;
                    donHangs.forEach(donHang => {
                        doanhThuThang += donHang.tongTien;
                    });
        
                    doanhThu12Thang.push({
                        doanhThu: doanhThuThang
                    });
                }
        
                // Trả về kết quả dưới dạng JSON string
                return JSON.stringify({
                    thongKeThangHienTai,
                    doanhThu12Thang
                });
            } catch (error) {
                throw new Error('Lỗi khi thực hiện thống kê: ' + error.message);
            }
        }
    },
    DonHang: {
        danhSachDichVu: async (parent) => {
            const uniqueIds = [...new Set(parent.danhSachDichVu)];
            const uniqueServices = await DichVuModel.find({ _id: { $in: uniqueIds } });
            const countMap = parent.danhSachDichVu.reduce((acc, id) => {
                acc[id] = (acc[id] || 0) + 1;
                return acc;
            }, {});
            const reconstructedDanhSachDichVu = uniqueServices.flatMap(service => 
                Array(countMap[service._id]).fill(service)
            );
            return reconstructedDanhSachDichVu;
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
        },
        diaChi: async (parent) => {
            const data = await DiaChiModel.findById({ _id: parent.diaChi });
            return data;
        }
    },
    LichThucHien: {
        donHang: async (parent) => {
            const data = await DonHangModel.findOne({ _id: parent.donHang });
            return data;
        }
    },

    Mutation: {
        themDonHang: async (parent, args) => {
            const danhSachLichThucHien = JSON.parse(args.danhSachLichThucHien);
            const danhSachIdLichThucHien = [];

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
                if (diaChi.id === undefined) {
                    const KH = await KhachHangModel.findById(khachHang.id);
                    KH.danhSachDiaChi.push(idDiaChi);
                    await KH.save();
                }
                idKhachHang = khachHang.id;
            }
            const lastDonHang = await DonHangModel.findOne().sort({ _id: -1 }).exec();
            let newMaDonHang;
            if (lastDonHang) {
                const lastMaDonHang = lastDonHang.maDonHang;
                const lastNumber = parseInt(lastMaDonHang.replace("DH", ""), 10);
                newMaDonHang = "DH" + (lastNumber + 1);
            } else {
                newMaDonHang = "DH1";
            }

            const donHangMoi = {
                ...args,
                khachHang: idKhachHang,
                diaChi: idDiaChi,
                maDonHang: newMaDonHang,
                ngayDatHang: (Math.floor(Date.now() / 1000)) * 1000,
                trangThaiDonHang: "Đang chờ duyệt"
            };

            const DonHang = new DonHangModel(donHangMoi);
            await DonHang.save();


            for (let i = 0; i < danhSachLichThucHien.length; i++) {
                const lichThucHien = danhSachLichThucHien[i];

                const danhSachLichThucHienMoi = new LichThucHienModel({
                    thoiGianBatDauLich: lichThucHien.thoiGianBatDau,
                    thoiGianKetThucLich: lichThucHien.thoiGianKetThuc,
                    trangThaiLich: "Đang chờ duyệt",
                    donHang: DonHang._id
                });
                const resLichThucHien = await danhSachLichThucHienMoi.save();
                danhSachIdLichThucHien.push(resLichThucHien._id);
            }

            const ngayBatDauMoi = await LichThucHienModel.findById(danhSachIdLichThucHien[0]);
            const ngayKetThucMoi = await LichThucHienModel.findById(danhSachIdLichThucHien[danhSachIdLichThucHien.length - 1]);

            DonHang.ngayBatDau = ngayBatDauMoi ? ngayBatDauMoi.thoiGianBatDauLich : null,
                DonHang.ngayKetThuc = ngayKetThucMoi ? ngayKetThucMoi.thoiGianKetThucLich : null,
                DonHang.danhSachLichThucHien = danhSachIdLichThucHien;
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
            const diaChi = JSON.parse(args.diaChi);
            const newDiaChi = new DiaChiModel({
                tinhTP: diaChi.tinhTP,
                quanHuyen: diaChi.quanHuyen,
                xaPhuong: diaChi.xaPhuong,
                soNhaTenDuong: diaChi.soNhaTenDuong,
                ghiChu: diaChi.ghiChuDiaChi
            });
            const resDiaChi = await newDiaChi.save();
            const nhanVienMoi = args;
            nhanVienMoi.diaChi = resDiaChi._id;
            nhanVienMoi.trangThaiTaiKhoan = "Đang hoạt động";
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
                donHang.trangThaiDonHang = "Chờ xác nhận";
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
        nhanVienXacNhanCongViec: async (parent, args) => {
            try {
                const donHang = await DonHangModel.findById(args.idDonHang);
                donHang.trangThaiDonHang = "Đang thực hiện";
                donHang.danhSachLichThucHien.forEach(async (id) => {
                    const lichThucHien = await LichThucHienModel.findById(id);
                    lichThucHien.trangThaiLich = 'Đang thực hiện';
                    await lichThucHien.save();
                });
                await donHang.save();
                return donHang;
            } catch (err) {
                return { "message": 'err' };
            }
        },
        nhanVienTuChoiCongViec: async (parent, args) => {
            try {
                const donHang = await DonHangModel.findById(args.idDonHang);
                const nhanVien = await NhanVienModel.findById(donHang.nhanVien[0]);
                donHang.trangThaiDonHang = "Nhân viên từ chối";
                donHang.lyDoNhanVienTuChoiDonHang = args.lyDoNhanVienTuChoiDonHang;
                donHang.danhSachLichThucHien.forEach(async (id) => {
                    const lichThucHien = await LichThucHienModel.findById(id);
                    lichThucHien.trangThaiLich = 'Nhân viên từ chối';
                    await lichThucHien.save();
                });
                await donHang.save();
                for (const lichThucHienId of donHang.danhSachLichThucHien) {
                    const index = nhanVien.lichLamViec.indexOf(lichThucHienId);
                    if (index !== -1) {
                        nhanVien.lichLamViec.splice(index, 1);
                    }
                }
                await nhanVien.save();
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
            const danhSachLichLamViec = await LichThucHienModel.find({ _id: { $in: donHang.danhSachLichThucHien } });
            danhSachLichLamViec.forEach(async lichThucHien => { lichThucHien.trangThaiLich = "Đã từ chối"; await lichThucHien.save(); });
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
        },
        themDichVu: async (parent, args) => {
            const dichVuMoi = args;
            const DichVu = new DichVuModel(dichVuMoi);
            DichVu.trangThai = "Dừng hoạt động";
            await DichVu.save();
            return DichVu;
        },
        xoaDichVu: async (parent, args) => {
            const dichVu = await DichVuModel.findByIdAndDelete(args.idDichVu);
            return dichVu;
        },
        suaDichVu: async (parent, args) => {
            const dichVu = await DichVuModel.findByIdAndUpdate(args.idDichVu, args, { new: true });
            return dichVu;
        },
        dungDichVu: async (parent, args) => {
            const dichVu = await DichVuModel.findByIdAndUpdate(args.idDichVu, { trangThai: "Dừng hoạt động" }, { new: true });
            return dichVu;
        },
        kichHoatDichVu: async (parent, args) => {
            const dichVu = await DichVuModel.findByIdAndUpdate(args.idDichVu, { trangThai: "Đang hoạt động" }, { new: true });
            return dichVu;
        },
        hoanThanhLich: async (parent, args) => {
            const lichThucHien = await LichThucHienModel.findById(args.idLichThucHien);
            lichThucHien.trangThaiLich = "Đã hoàn thành";
            // lichThucHien.nhanVienHoanThanh = args.idNhanVien;
            await lichThucHien.save();
            const DsLichThucHien = await LichThucHienModel.find({ donHang: lichThucHien.donHang });
            const allCompleted = DsLichThucHien.every(item => item.trangThaiLich === "Đã hoàn thành");
            if (allCompleted) {
                const donHang = await DonHangModel.findById(lichThucHien.donHang);
                donHang.trangThaiDonHang = "Đã hoàn thành";
                await donHang.save();
            }
            return lichThucHien;
        },
        themDiaChiTamThoi: async (parent, args) => {
            const diaChiMoi = args;
            const DiaChi = new DiaChiModel(diaChiMoi);
            await DiaChi.save();
            const khachHang = await KhachHangModel.findById("665afcd7bb0d528e34df544d");
            khachHang.danhSachDiaChi.push(DiaChi._id);
            await khachHang.save();
            return DiaChi;
        },
        danhGiaDonHang: async (parent, args) => {
            const donHang = await DonHangModel.findById(args.idDonHang);
            donHang.ghiChuDanhGia = args.ghiChuDanhGia;
            donHang.saoDanhGia = args.saoDanhGia;
            donHang.save();
            return donHang;
        },
        capNhatSoDienThoaiKhachHang: async (parent, args) => {
            const khachHang = await KhachHangModel.findById(args.idKhachHang);
            khachHang.soDienThoai = args.soDienThoai;
            khachHang.save();
            return khachHang;
        },
        xoaNhanVien: async (parent, args) => {
            const nhanVien = await NhanVienModel.findByIdAndDelete(args.idNhanVien);
            return nhanVien;
        },
        suaNhanVien: async (parent, args) => {
            const nhanVien = await NhanVienModel.findByIdAndUpdate
                (args.idNhanVien, args, { new: true });
            return nhanVien;
        }
                
    }
};
