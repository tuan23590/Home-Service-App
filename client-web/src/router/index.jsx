import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../../pages/Login";
import Home from "../../pages/Home";
import Test from "../../pages/Test";
import { APIDanhSachDonHangChoDuyet, APIDanhSachDonHangDaDuyet, APIDanhSachDonHangDaTuChoi, DonHangLoader } from "../../utils/DonHangUtils";
import Detal from "../../pages/Detal";
import OrderBrowser from "../../pages/OrderBrowser";
import ServiceRegistration from "../../pages/ServiceRegistration"; 
import ThemDonHang from "../../pages/ThemDonHang";
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


import ChiTietDonHang from "../components/ChiTietDonHang/ChiThietDonHang";
import DanhSachDonHangChoDuyet from "../components/DanhSachDonHang/DanhSachDonHangChoDuyet";
import DanhSachDonHangDaDuyet from "../components/DanhSachDonHang/DanhSachDonHangDaDuyet";
import DanhSachDonHangDaTuChoi from "../components/DanhSachDonHang/DanhSachDonHangDaTuChoi";
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
                element: <Login />,
                path: '/login',
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
                element: <Test />,
                path: '/test',
                loader: DonHangLoader,
                children: [
                    {
                        element: <Detal />,
                        path: `DonHang/:maDonHang`,
                    },
                ],
            },
            {
                element: <OrderBrowser />,
                path: '/order',
                children: [
                    {
                        element: <DanhSachDonHangChoDuyet />,
                        path: `/order/DanhSachDonHangChoDuyet`,
                        loader: APIDanhSachDonHangChoDuyet,
                        children: [
                            {
                                element: <ChiTietDonHang />,
                                path: `/order/DanhSachDonHangChoDuyet/ChiTietDonHang`,
                            },
                        ]
                    },
                    {
                        element: <DanhSachDonHangDaDuyet />,
                        path: `/order/DanhSachDonHangDaDuyet`,
                        loader: APIDanhSachDonHangDaDuyet,
                        children: [
                            {
                                element: <ChiTietDonHang />,
                                path: `/order/DanhSachDonHangDaDuyet/ChiTietDonHang`,
                            },
                        ],
                    },
                    {
                        element: <DanhSachDonHangDaTuChoi />,
                        path: `/order/DanhSachDonHangDaTuChoi`,
                        loader: APIDanhSachDonHangDaTuChoi,
                        children: [
                            {
                                element: <ChiTietDonHang />,
                                path: `/order/DanhSachDonHangDaTuChoi/ChiTietDonHang`,
                            },
                        ],
                    }
                ],
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
        ],
    },
]);
