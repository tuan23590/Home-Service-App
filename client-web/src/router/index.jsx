import { Outlet, createBrowserRouter } from "react-router-dom";
import DangNhap from "../../pages/DangNhap";
import Home from "../../pages/Home";
import { APIDanhSachDonHangChoDuyet, APIDanhSachDonHangDaDuyet, APIDanhSachDonHangDaTuChoi, apiChiTietDonHang } from "../../utils/DonHangUtils";
import ServiceRegistration from "../../pages/ServiceRegistration";
import ThemDonHang from "../../src/components/ThemDonHang/index";
import DangKyNhanViec from "../../pages/DangKyNhanViec";
import DangKyNauAn from "../../pages/DangKyNauAn";
import CustomerInfo from "../../pages/CustomerInfo";
import CustomerInfo2 from "../../pages/CustomerInfo2";
import ReactGoogleMap from "../../pages/ReactGoogleMap";
import DonHangProvider from "../../src/context/DonHangProvider";
import TotalCleaning from "../../pages/TotalCleaning";
import GroceryShopping from "../../pages/GroceryShopping";
import GioiThieu from "../../pages/GioiThieu";
import LienHe from "../../pages/LienHe";
import AuthProvider from "../context/AuthProvider";
import ErrorPage from "../../pages/ErrorPage";
import SignUp from "../../pages/SignUp";
import ForgotPassword from "../../pages/ForgotPassword";
import DanhSachDonHang from "../components/DanhSachDonHang";
import ChiThietDonHangChoDuyet from "../components/ChiTietDonHang/ChiThietDonHangChoDuyet";
import ChiThietDonHangDaDuyet from "../components/ChiTietDonHang/ChiThietDonHangDaDuyet";
import ChiThietDonHangDaTuChoi from "../components/ChiTietDonHang/ChiThietDonHangDaTuChoi";
import QuanLy from "../../pages/QuanLy";
import QuanLyDichVu from "../components/QuanLyDichVu";
import { apiDanhSachDichVu } from "../../utils/DichVuUtils";
import ThongTinCongViec from "../../pages/ThongTinCongViec";
import QuanLyDonHangProtected from "./QuanLyDonHangProtected";
import XemChiTietDonHang from './../components/XemChiTietDonHang';
import ThongKe from "../components/ThongKe";
import QuanLyNhanVien from "../components/QuanLyNhanVien/index";
import { apiDanhSachNhanVien } from "../../utils/NhanVienUtils";
import QuanLyKhachHang from "../components/QuanLyKhachHang";
import { apiDanhSachKhachHang } from "../../utils/KhachHangUtils";
import SaoLuuPhucHoi from "../components/SaoLuuPhucHoi";
import TraCuuDonHang from "../../pages/TraCuuDonHang";
const MainLayout = () => {
    return <DonHangProvider>
        <Outlet />
        <ServiceRegistration />
    </DonHangProvider>
};
const AuthLayout = () => {
    return <AuthProvider>
        <Outlet />
    </AuthProvider>
};

// eslint-disable-next-line react-refresh/only-export-components
export default createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                element: <Home />,
                path: '/',
            },
            {
                element: <TraCuuDonHang />,
                path: '/TraCuuDonHang',
                children: [
                    {
                        element: <XemChiTietDonHang />,
                        path: `/TraCuuDonHang/:id`,
                        loader: apiChiTietDonHang,
                    }
                ]
            },
            {
                element: <ThongTinCongViec />,
                path: '/ThongTinCongViec',
                children: [
                    {
                        element: <XemChiTietDonHang />,
                        path: `/ThongTinCongViec/:id`,
                        loader: apiChiTietDonHang,
                    },
                ]
            },
            {
                element: <DangNhap />,
                path: '/DangNhap',
            },
            {
                element: <QuanLyDonHangProtected />,
                children: [
                    {
                        element: <QuanLy />,
                        path: '/QuanLy',
                        children: [
                            {
                                element: <ThongKe />,
                                path: '/QuanLy/ThongKe',
                            },
                            {
                                element: <DanhSachDonHang />,
                                path: `/QuanLy/DanhSachDonHangChoDuyet`,
                                loader: APIDanhSachDonHangChoDuyet,
                                children: [
                                    {
                                        element: <ChiThietDonHangChoDuyet />,
                                        path: `/QuanLy/DanhSachDonHangChoDuyet/:id`,
                                        loader: apiChiTietDonHang,
                                    },
                                ]
                            },
                            {
                                element: <DanhSachDonHang />,
                                path: `/QuanLy/DanhSachDonHangDaDuyet`,
                                loader: APIDanhSachDonHangDaDuyet,
                                children: [
                                    {
                                        element: <ChiThietDonHangDaDuyet />,
                                        path: `/QuanLy/DanhSachDonHangDaDuyet/:id`,
                                        loader: apiChiTietDonHang,
                                    },
                                ],
                            },
                            {
                                element: <DanhSachDonHang />,
                                path: `/QuanLy/DanhSachDonHangDaTuChoi`,
                                loader: APIDanhSachDonHangDaTuChoi,
                                children: [
                                    {
                                        element: <ChiThietDonHangDaTuChoi />,
                                        path: `/QuanLy/DanhSachDonHangDaTuChoi/:id`,
                                        loader: apiChiTietDonHang,
                                    },
                                ],
                            },
                            {
                                element: <ThemDonHang />,
                                path: `/QuanLy/ThemDonHang`,
                            },
                            {
                                element: <QuanLyDichVu />,
                                path: `/QuanLy/QuanLyDichVu`,
                                loader: apiDanhSachDichVu,
                            },
                            {
                                element: <QuanLyNhanVien />,
                                path: `/QuanLy/QuanLyNhanVien`,
                                loader: apiDanhSachNhanVien,
                            },
                            {
                                element: <QuanLyKhachHang />,
                                path: `/QuanLy/QuanLyKhachHang`,
                                loader: apiDanhSachKhachHang,
                            },
                            {
                                element: <SaoLuuPhucHoi />,
                                path: `/QuanLy/SaoLuuPhucHoi`,
                            }
                        ],
                    },
                ]
            }
        ]
    },
    {
        element: <MainLayout />,
        errorElement: <ErrorPage />,
        children: [
            
            {
                element: <ServiceRegistration />,
                path: 'dv1',
            },
            {
                element: <ThemDonHang />,
                path: '/themdonhang',
            },
            {
                element: <DangKyNhanViec />,
                path: '/dangkynhanviec',
            },
            {
                element: <DangKyNauAn />,
                path: '/dangkynauan',
            },
            {
                element: <CustomerInfo />,
                path: '/hienthithongtin',
            },
            {
                element: <ReactGoogleMap />,
                path: '/map',
            },
            {
                element: <TotalCleaning />,
                path: '/tongvesinh',
            },
            {
                element: <GroceryShopping />,
                path: '/dicho',
            },

            {
                element: <GioiThieu />,
                path: '/gioithieu',
            },
            {
                element: <LienHe />,
                path: '/lh',
            },
            {
                element: <CustomerInfo2 />,
                path: '/hienthithongtin2',
            },
            {
                element: <SignUp />,
                path: '/dktk',
            },
            {
                element: <ForgotPassword />,
                path: '/qmk',
            }
        ],
    },
]);
