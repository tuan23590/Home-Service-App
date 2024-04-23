import { Outlet, createBrowserRouter } from "react-router-dom";
import Login from "../../pages/Login";
import Home from "../../pages/Home";
import Test from "../../pages/Test";
import { DonHangLoader } from "../../utils/DonHangUtils";
import Detal from "../../pages/Detal";
const AuthLayout = ()=>{
   return <Outlet />
}

export default createBrowserRouter([
{
    element:<AuthLayout />,
    children:[
    {
        element : <Login />,
        path : '/login',
    },
    {
        element : <Home />,
        path : '/'
    },
    {
        element: <Test/>,
        path: '/test',
        loader: DonHangLoader,
        children:[
            {
                element: <Detal />,
                path: `DonHang/:maDonHang`
            }
        ]
    },
    {
        
    }
]
}
])