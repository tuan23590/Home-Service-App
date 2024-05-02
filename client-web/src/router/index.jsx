import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../../pages/Login";
import Home from "../../pages/Home";
import Test from "../../pages/Test";
import { DonHangLoader } from "../../utils/DonHangUtils";
import Detal from "../../pages/Detal";
import OrderBrowser from "../../pages/OrderBrowser";
import ServiceRegistration from "../../pages/ServiceRegistration"; 
import ThemDonHang from "../../pages/ThemDonHang";

const AuthLayout = () => {
   return <Outlet />;
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
                children: [],
            },
            {
                element:   <ServiceRegistration />,
                path: 'dv1',
            },
            {
                element: <ThemDonHang />,
                path: '/themdonhang',
            }
        ],
    },
]);
