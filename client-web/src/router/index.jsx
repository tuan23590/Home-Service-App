import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../../pages/Login";
import Home from "../../pages/Home";
import Test from "../../pages/Test";
import { DonHangLoader } from "../../utils/DonHangUtils";
import Detal from "../../pages/Detal";
import OrderBrowser from "../../pages/OrderBrowser";
import ServiceRegistration from "../../pages/ServiceRegistration"; 
import ThemDonHang from "../../pages/ThemDonHang";
import DangKyNhanViec from "../../pages/DangKyNhanViec";
import DangKyNauAn from "../../pages/DangKyNauAn";
import CustomerInfo from "../../pages/CustomerInfo";
import ReactGoogleMap from "../../pages/ReactGoogleMap";
import DonHangProvider from "../../src/context/DonHangProvider";
import TotalCleaning from "../../pages/TotalCleaning";
import GroceryShopping from "../../pages/GroceryShopping";

const AuthLayout = () => {
   return  <DonHangProvider>
     <Outlet />
     </DonHangProvider>
};

// eslint-disable-next-line react-refresh/only-export-components
export default createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            {
                element: <Login />,
                path: '/login',
            },
            {
                element: (
                    <> 
                        <Home /> 
                    </>
                ),
                path: '/',
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
                loader: DonHangLoader,
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
            }
        ],
    },
]);
