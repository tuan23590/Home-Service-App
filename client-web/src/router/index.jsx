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
import ProtectedRoute from "./ProtectedRoute";
import ErrorPage from "../../pages/ErrorPage";
import SignUp from "../../pages/SignUp";
import ForgotPassword from "../../pages/ForgotPassword";


import DanhSachDonHang from "../components/DanhSachDonHang";
import ChiThietDonHangChoDuyet from "../components/ChiTietDonHang/ChiThietDonHangChoDuyet";
import ChiThietDonHangDaDuyet from "../components/ChiTietDonHang/ChiThietDonHangDaDuyet";
import ChiThietDonHangDaTuChoi from "../components/ChiTietDonHang/ChiThietDonHangDaTuChoi";
import QuanLyDonHang from "../../pages/QuanLyDonHang";
import QuanLyDichVu from "../components/QuanLyDichVu";
import { apiDanhSachDichVu } from "../../utils/DichVuUtils";
import LichLamViec from "../../pages/LichLamViec";
const AuthLayout = () => {
   return  <DonHangProvider>
     <Outlet />
     <ServiceRegistration />
     </DonHangProvider>,
     
     <AuthProvider>
        <Outlet />
     </AuthProvider>
};

// eslint-disable-next-line react-refresh/only-export-components
export default createBrowserRouter([
    {
        element: <AuthLayout />,
        errorElement:<ErrorPage />,
        children: [
            {
                element: <DangNhap />,
                path: '/DangNhap',
            },
            {
                    element: <ProtectedRoute />,
                    children:[
                        {
                        element: <Home /> ,
                                path: '/',
                        },
                    ]
            },
            {
                element: <QuanLyDonHang />,
                path: '/QuanLyDonHang',
                children: [
                    {
                        element: <DanhSachDonHang />,
                        path: `/QuanLyDonHang/DanhSachDonHangChoDuyet`,
                        loader: APIDanhSachDonHangChoDuyet,
                        children: [
                            {
                                element: <ChiThietDonHangChoDuyet />,
                                path: `/QuanLyDonHang/DanhSachDonHangChoDuyet/:id`,
                                loader: apiChiTietDonHang,
                            },
                        ]
                    },
                    {
                        element: <DanhSachDonHang />,
                        path: `/QuanLyDonHang/DanhSachDonHangDaDuyet`,
                        loader: APIDanhSachDonHangDaDuyet,
                        children: [
                            {
                                element: <ChiThietDonHangDaDuyet />,
                                path: `/QuanLyDonHang/DanhSachDonHangDaDuyet/:id`,
                                loader: apiChiTietDonHang,
                            },
                        ],
                    },
                    {
                        element: <DanhSachDonHang />,
                        path: `/QuanLyDonHang/DanhSachDonHangDaTuChoi`,
                        loader: APIDanhSachDonHangDaTuChoi,
                        children: [
                            {
                                element: <ChiThietDonHangDaTuChoi />,
                                path: `/QuanLyDonHang/DanhSachDonHangDaTuChoi/:id`,
                                loader: apiChiTietDonHang,
                            },
                        ],
                    },
                    {
                        element: <ThemDonHang />,
                        path: `/QuanLyDonHang/ThemDonHang`,
                    },
                    {
                        element: <QuanLyDichVu />,
                        path: `/QuanLyDonHang/QuanLyDichVu`,
                        loader: apiDanhSachDichVu,
                    }
                ],
            },
            {
                element:   <LichLamViec />,
                path: '/LichLamViec',
            },
            {
                element:   <ServiceRegistration />,
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
